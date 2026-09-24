import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";

test("comment intake, moderation and public visibility in isolated Postgres", async t => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    grant usage on schema public, auth to anon, authenticated;
    grant execute on function auth.uid() to anon, authenticated;
    create table public.demo_requests (
      id uuid primary key default gen_random_uuid(), doctor_name text not null,
      hospital_name text not null, department text, phone text not null,
      modules text[] default '{}', monthly_cases text, notes text,
      status text default 'pending', created_at timestamptz default now()
    );
    alter table public.demo_requests enable row level security;
    create policy "演示申请可写" on public.demo_requests for insert with check (true);
  `);
  for (const file of ["20260923074638_staff_inquiry_management.sql", "20260924053524_article_comments.sql"]) {
    await db.exec(readFileSync(new URL(`../supabase/migrations/${file}`, import.meta.url), "utf8"));
  }
  const member = randomUUID(), outsider = randomUUID();
  await db.query("insert into auth.users(id) values ($1),($2)", [member, outsider]);
  await db.query("insert into public.staff_members(user_id,display_name) values ($1,'QA reviewer')", [member]);
  const as = async (role, id, action) => {
    await db.exec(`set role ${role}`);
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id || ""]);
    try { return await action(); } finally {
      await db.exec("reset role"); await db.query("select set_config('request.jwt.claim.sub','',false)");
    }
  };
  const submit = (article, nickname, body, nonce = randomUUID()) => db.query("insert into public.article_comments(article_id,nickname,body,submission_id) values ($1,$2,$3,$4)", [article, nickname, body, nonce]);
  const publicRows = () => db.query("select id,article_id,nickname,body,official_reply,replied_at,created_at from public.article_comments");
  const denied = (action, code = "42501") => assert.rejects(action, error => error.code === code);
  let first;
  const nonce = randomUUID();
  await t.test("pending submissions are saved and hidden; retrying the same nonce is idempotent", async () => {
    await as("anon", null, async () => {
      await submit("paper-a", "测试读者", "测试问题：如何评价支架力学性能？", nonce);
      await submit("paper-a", "测试读者", "测试问题：如何评价支架力学性能？", nonce);
      assert.equal((await publicRows()).rows.length, 0);
      await denied(() => db.query("select submission_id,moderated_by,version from public.article_comments"));
      await denied(() => db.query("insert into public.article_comments(article_id,nickname,body,submission_id,status) values ('paper-a','冒充者','不应通过的内容',$1,'approved')", [randomUUID()]));
      await denied(() => db.query("update public.article_comments set status='approved'"));
      await denied(() => db.query("delete from public.article_comments"));
    });
    const rows = (await db.query("select * from public.article_comments")).rows;
    assert.equal(rows.length, 1); first = rows[0].id;
    assert.equal(rows[0].status, "pending"); assert.equal(rows[0].official_reply, null);
  });
  await t.test("database validates inputs and enforces throttling even with direct API access", async () => {
    await as("anon", null, async () => {
      await denied(() => submit("paper-a", "测试读者", "同一分钟内的另一条评论"), "P0429");
      await denied(() => submit("paper-a", "另一读者", "测试问题：如何评价支架力学性能？"), "P0429");
      await denied(() => submit("paper-a", "子殷官方", "试图伪造官方留言"), "23514");
      await denied(() => submit("paper-a", "测试字符", "x"), "23514");
      await denied(() => submit("../../private", "测试路径", "不合法的文章编号"), "23514");
      await denied(() => db.query("select private.guard_comment_intake()"));
      await submit("paper-b", "另一读者", "另一个文章的讨论内容");
    });
  });
  await t.test("non-staff users cannot view pending content, reply or enroll themselves", async () => {
    await as("authenticated", outsider, async () => {
      assert.equal((await db.query("select * from public.article_comments")).rows.length, 0);
      assert.equal((await db.query("update public.article_comments set status='approved' returning id")).rows.length, 0);
      await denied(() => submit("paper-c", "外部用户", "不能使用登录角色插入"));
      await denied(() => db.query("insert into public.staff_members(user_id,display_name) values ($1,'intruder')", [outsider]));
    });
  });
  await t.test("staff approval and official reply become visible; other articles remain private", async () => {
    await as("authenticated", member, async () => {
      assert.equal((await db.query("select * from public.article_comments")).rows.length, 2);
      const saved = await db.query("update public.article_comments set status='approved', official_reply='测试官方回复：建议先明确载荷与评价终点。' where id=$1 and version=0 returning *", [first]);
      assert.equal(saved.rows[0].version, 1); assert.equal(saved.rows[0].moderated_by, member);
      assert.ok(saved.rows[0].replied_at);
      await denied(() => db.query("update public.article_comments set body='篡改读者原文' where id=$1", [first]));
      await denied(() => db.query("update public.article_comments set moderated_by=$1 where id=$2", [outsider, first]));
      await denied(() => db.query("delete from public.article_comments"));
    });
    await as("anon", null, async () => {
      const rows = (await publicRows()).rows;
      assert.equal(rows.length, 1); assert.equal(rows[0].article_id, "paper-a");
      assert.match(rows[0].official_reply, /评价终点/);
    });
  });
  await t.test("a stale version cannot overwrite another review; hiding removes reply and comment from public reads", async () => {
    await as("authenticated", member, async () => {
      const stale = await db.query("update public.article_comments set official_reply='过时的回复' where id=$1 and version=0 returning id", [first]);
      assert.equal(stale.rows.length, 0);
      await db.query("update public.article_comments set status='hidden' where id=$1 and version=1", [first]);
    });
    await as("anon", null, async () => assert.equal((await publicRows()).rows.length, 0));
  });
  await t.test("disabling staff revokes reads and writes immediately", async () => {
    await db.query("update public.staff_members set active=false where user_id=$1", [member]);
    await as("authenticated", member, async () => {
      assert.equal((await db.query("select * from public.article_comments")).rows.length, 0);
      assert.equal((await db.query("update public.article_comments set status='approved' returning id")).rows.length, 0);
    });
  });
  await t.test("the intake cap is enforced across different articles and nicknames", async () => {
    await as("anon", null, async () => {
      for (let i = 0; i < 28; i++) await submit(`paper-${i}`, `限流测试${i}`, `隔离环境限流验证 ${i}`);
      await denied(() => submit("paper-over-cap", "限流测试溢出", "第31条应被限流"), "P0429");
    });
  });
});
