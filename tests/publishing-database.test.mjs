import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";

test("website publishing protects drafts, ownership, immutable versions and customer isolation", async t => {
  const db = new PGlite(); t.after(() => db.close());
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    grant usage on schema public,auth to anon,authenticated;
    grant execute on function auth.uid() to anon,authenticated;
    create table public.demo_requests (
      id uuid primary key default gen_random_uuid(),doctor_name text not null,hospital_name text not null,
      department text,phone text not null,modules text[] default '{}',monthly_cases text,notes text,
      status text default 'pending',created_at timestamptz default now()
    );
    alter table public.demo_requests enable row level security;
    grant all on public.demo_requests to anon,authenticated;
    create policy "演示申请可写" on public.demo_requests for insert with check(true);
    create table public.news (
      id uuid primary key default gen_random_uuid(),title text not null,summary text,content text,cover_url text,
      category text default '公司动态',is_published boolean default true,
      published_at timestamptz default now(),created_at timestamptz default now()
    );
    alter table public.news enable row level security;
    grant all on public.news to anon,authenticated;
    create policy "Public read access" on public.news for select using(true);
    create policy "已发布新闻可读" on public.news for select using(is_published=true);
    insert into public.news(title,content,is_published) values('原有公开文章','original published content',true),('原有私密草稿','must stay private',false);
    insert into public.demo_requests(doctor_name,hospital_name,phone) values('QA only','QA institution','synthetic');
  `);
  await db.exec(readFileSync(new URL("../supabase/migrations/20260923074638_staff_inquiry_management.sql",import.meta.url),"utf8"));
  await db.exec(readFileSync(new URL("../supabase/migrations/20261022095642_website_publishing.sql",import.meta.url),"utf8"));
  const ids = [1,2,3,4].map(n => `20000000-0000-4000-8000-00000000000${n}`);
  const [owner,other,outsider,staff] = ids;
  for (const id of ids) await db.query("insert into auth.users(id) values($1)",[id]);
  await db.query("insert into public.website_publishers(user_id,display_name) values($1,'QA publisher'),($2,'QA other')",[owner,other]);
  await db.query("insert into public.staff_members(user_id,display_name,role) values($1,'QA business manager','manager')",[staff]);
  async function as(role,id,action) {
    await db.exec(`set role ${role}`);
    await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id || ""]);
    try { return await action(); } finally { await db.exec("reset role"); }
  }
  const rows = async (sql,args=[]) => (await db.query(sql,args)).rows;
  const denied = action => assert.rejects(action,e=>e.code==="42501");
  let article, otherArticle;
  const body = "A synthetic research article, with enough text to publish.";
  async function draft(user,title) {
    return (await rows("insert into public.news(title,summary,content,category,byline,author_id) values($1,'QA summary',$2,'学术观点','QA author',$3) returning id,version,is_published,published_at",[title,body,user]))[0];
  }
  await t.test("migration closes unrestricted reads and preserves existing published content",async()=>{
    await as("anon",null,async()=>{
      const result=await rows("select title,content from public.news");
      assert.deepEqual(result,[{title:"原有公开文章",content:"original published content"}]);
      await denied(()=>rows("select * from public.news_revisions"));
      await denied(()=>rows("insert into public.news(title) values('anonymous write')"));
      await denied(()=>rows("truncate public.news"));
    });
    assert.equal((await rows("select content from public.news where title='原有私密草稿'"))[0].content,"must stay private");
  });
  await t.test("ordinary accounts and existing business managers get no publishing privilege",async()=>{
    for(const id of [outsider,staff]) await as("authenticated",id,async()=>{
      assert.equal((await rows("select * from public.website_publishers")).length,0);
      await denied(()=>draft(id,"unauthorized draft"));
      await denied(()=>rows("insert into public.website_publishers(user_id,display_name) values($1,'self-enrol')",[id]));
    });
  });
  await t.test("publisher gets own draft, no customer records and no colleague membership",async()=>{
    await as("authenticated",owner,async()=>{
      article=await draft(owner,"我的草稿");
      assert.equal(article.is_published,false); assert.equal(article.published_at,null); assert.equal(article.version,0);
      assert.equal((await rows("select * from public.website_publishers")).length,1);
      assert.equal((await rows("select * from public.demo_requests")).length,0);
      assert.equal((await rows("select * from public.staff_inquiry_overview")).length,0);
      await denied(()=>draft(other,"forged owner"));
      await denied(()=>rows("insert into public.news(title,summary,content,category,byline,author_id,is_published) values('bad','',$1,'学术观点','QA',$2,true)",[body,owner]));
    });
    await as("authenticated",other,async()=>{otherArticle=await draft(other,"同事私密草稿");assert.equal((await rows("select id from public.news where id=$1",[article.id])).length,0);});
    await as("anon",null,async()=>assert.equal((await rows("select id from public.news where id in($1,$2)",[article.id,otherArticle.id])).length,0));
  });
  await t.test("owners cannot edit others, reassign ownership, forge timestamps or erase history",async()=>{
    await as("authenticated",owner,async()=>{
      assert.equal((await rows("update public.news set title='tampered' where id=$1 returning id",[otherArticle.id])).length,0);
      await denied(()=>rows("update public.news set author_id=$1 where id=$2",[other,article.id]));
      await denied(()=>rows("update public.news set version=99,published_at=now() where id=$1",[article.id]));
      await denied(()=>rows("delete from public.news where id=$1",[article.id]));
      await denied(()=>rows("delete from public.news_revisions"));
      await denied(()=>rows("update public.news_revisions set snapshot='{}'"));
      await denied(()=>rows("insert into public.news_revisions(news_id,owner_id,actor_id,version,action,snapshot) values($1,$2,$2,99,'edited','{}')",[article.id,owner]));
    });
  });
  await t.test("publishing is visible publicly while prior draft versions remain private",async()=>{
    await as("authenticated",owner,async()=>{
      const saved=(await rows("update public.news set is_published=true where id=$1 and version=0 returning *",[article.id]))[0];
      assert.equal(saved.version,1); assert.ok(saved.published_at);
      const revisions=await rows("select version,actor_id,action,snapshot from public.news_revisions where news_id=$1 order by version",[article.id]);
      assert.equal(revisions.length,2);assert.ok(revisions.every(r=>r.actor_id===owner));
      assert.equal(revisions[0].snapshot.is_published,false);assert.equal(revisions[1].action,"published");
      assert.equal((await rows("update public.news set title='stale overwrite' where id=$1 and version=0 returning id",[article.id])).length,0);
      assert.equal((await rows("select version from public.news_revisions where news_id=$1",[article.id])).length,2);
    });
    await as("anon",null,async()=>assert.equal((await rows("select id from public.news where id=$1",[article.id])).length,1));
    await as("authenticated",other,async()=>{
      assert.equal((await rows("update public.news set content='overwrite published colleague' where id=$1 returning id",[article.id])).length,0);
      assert.equal((await rows("select id from public.news_revisions where news_id=$1",[article.id])).length,0);
    });
  });
  await t.test("live disable revokes writes and unpublished reads, including existing sessions",async()=>{
    await db.query("update public.website_publishers set active=false where user_id=$1",[other]);
    await as("authenticated",other,async()=>{
      assert.equal((await rows("select id from public.news where id=$1",[otherArticle.id])).length,0);
      assert.equal((await rows("select id from public.news_revisions")).length,0);
      assert.equal((await rows("update public.news set is_published=true where id=$1 returning id",[otherArticle.id])).length,0);
      await denied(()=>draft(other,"disabled draft"));
    });
  });
  await t.test("withdrawal removes the public article and retains the published snapshot",async()=>{
    await as("authenticated",owner,async()=>{
      await rows("update public.news set is_published=false where id=$1 and version=1",[article.id]);
      const history=await rows("select action,snapshot from public.news_revisions where news_id=$1 order by version",[article.id]);
      assert.deepEqual(history.map(r=>r.action),["created","published","withdrawn"]);
      assert.equal(history[1].snapshot.is_published,true);
    });
    await as("anon",null,async()=>assert.equal((await rows("select id from public.news where id=$1",[article.id])).length,0));
  });
});
