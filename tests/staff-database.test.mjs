import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";

// A real, isolated Postgres engine. No production accounts or customer data.
test("employee access, intake, assignment, audit, unread and conflict boundaries", async t => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`
    create role anon; create role authenticated;
    create schema auth; create table auth.users (id uuid primary key);
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
    grant all on public.demo_requests to anon, authenticated;
    create policy "演示申请可写" on public.demo_requests for insert with check (true);
  `);
  await db.exec(readFileSync(new URL("../supabase/migrations/20260923074638_staff_inquiry_management.sql", import.meta.url), "utf8"));
  const manager = "10000000-0000-4000-8000-000000000001";
  const member = "10000000-0000-4000-8000-000000000002";
  const outsider = "10000000-0000-4000-8000-000000000003";
  await db.query("insert into auth.users (id) values ($1),($2),($3)", [manager, member, outsider]);
  await db.query("insert into public.staff_members(user_id,display_name,role) values ($1,'QA manager','manager'),($2,'QA member','member')", [manager, member]);
  async function as(role, id, action) {
    await db.exec(`set role ${role}`);
    await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id || ""]);
    try { return await action(); } finally { await db.exec("reset role"); }
  }
  const rows = async sql => (await db.query(sql)).rows;
  const denied = (action, code = "42501") => assert.rejects(action, e => e.code === code);
  let inquiry;
  await t.test("anonymous public intake succeeds, but cannot read or set internal fields", async () => {
    await as("anon", null, async () => {
      await db.query("insert into public.demo_requests(doctor_name,hospital_name,phone,status) values ('QA only','QA org','13800000000','pending')");
      await denied(() => rows("select * from public.demo_requests"));
      await denied(() => rows("select * from public.staff_inquiry_overview"));
      await denied(() => db.query("insert into public.demo_requests(doctor_name,hospital_name,phone,assigned_to) values ('x','x','x',$1)", [member]));
      await denied(() => db.query("insert into public.demo_requests(doctor_name,hospital_name,phone,status) values ('x','x','x','converted')"));
      await denied(() => db.query("delete from public.demo_requests"));
    });
    inquiry = (await rows("select id from public.demo_requests"))[0].id;
  });
  await t.test("ordinary authenticated accounts cannot read, self-enrol or run staff writes", async () => {
    await as("authenticated", outsider, async () => {
      assert.equal((await rows("select * from public.staff_inquiry_overview")).length, 0);
      assert.equal((await rows("select * from public.staff_members")).length, 0);
      await denied(() => db.query("insert into public.staff_members(user_id,display_name,role) values ($1,'intruder','manager')", [outsider]));
      await denied(() => db.query("select public.staff_save_inquiry($1,0,'contacted',null,'intrusion')", [inquiry]));
    });
  });
  await t.test("active staff can read and claim an unassigned inquiry", async () => {
    await as("authenticated", member, async () => {
      assert.equal((await rows("select * from public.staff_inquiry_overview")).length, 1);
      await db.query("select public.staff_save_inquiry($1,0,'contacted',$2,'QA follow-up')", [inquiry, member]);
      const current = (await rows("select * from public.demo_requests"))[0];
      assert.equal(current.version, 1); assert.equal(current.assigned_to, member); assert.equal(current.status, "contacted");
      const events = await rows("select * from public.inquiry_activity");
      assert.equal(events.length, 2); assert.ok(events.every(e => e.actor_id === member));
    });
  });
  await t.test("members cannot reassign to others, alter customer details or rewrite history", async () => {
    await as("authenticated", member, async () => {
      await denied(() => db.query("select public.staff_save_inquiry($1,1,'converted',$2,'must roll back')", [inquiry, manager]));
      await denied(() => db.query("update public.demo_requests set phone='other' where id=$1", [inquiry]));
      await denied(() => db.query("delete from public.inquiry_activity"));
      await denied(() => db.query("insert into public.inquiry_activity(inquiry_id,actor_id,kind,body) values ($1,$2,'note','spoof')", [inquiry, manager]));
      await denied(() => db.query("insert into public.inquiry_activity(inquiry_id,actor_id,kind,body) values ($1,$2,'change','spoof')", [inquiry, member]));
      assert.equal((await rows("select version from public.demo_requests"))[0].version, 1);
    });
  });
  await t.test("manager assignment is recorded; a stale version cannot overwrite or append a note", async () => {
    await as("authenticated", manager, async () => {
      await db.query("select public.staff_save_inquiry($1,1,'contacted',$2,null)", [inquiry, manager]);
      const count = (await rows("select * from public.inquiry_activity")).length;
      await denied(() => db.query("select public.staff_save_inquiry($1,1,'converted',$2,'stale note')", [inquiry, member]), "40001");
      assert.equal((await rows("select * from public.inquiry_activity")).length, count);
      assert.equal((await rows("select assigned_to from public.demo_requests"))[0].assigned_to, manager);
    });
  });
  await t.test("read markers persist per person and cannot be forged for coworkers", async () => {
    await as("authenticated", member, async () => {
      assert.equal((await rows("select has_read from public.staff_inquiry_overview"))[0].has_read, false);
      await db.query("insert into public.inquiry_reads(user_id,inquiry_id) values ($1,$2) on conflict(user_id,inquiry_id) do nothing", [member, inquiry]);
      assert.equal((await rows("select has_read from public.staff_inquiry_overview"))[0].has_read, true);
      await denied(() => db.query("insert into public.inquiry_reads(user_id,inquiry_id) values ($1,$2)", [manager, inquiry]));
    });
    await as("authenticated", manager, async () => {
      assert.equal((await rows("select has_read from public.staff_inquiry_overview"))[0].has_read, false);
      assert.equal((await rows("select * from public.inquiry_reads")).length, 0);
    });
  });
  await t.test("disabling a member revokes live reads/writes and prevents assignment", async () => {
    await db.query("update public.staff_members set active=false where user_id=$1", [member]);
    await as("authenticated", member, async () => {
      assert.equal((await rows("select * from public.staff_inquiry_overview")).length, 0);
      assert.equal((await rows("select * from public.inquiry_activity")).length, 0);
      await denied(() => db.query("select public.staff_save_inquiry($1,2,'converted',$2,null)", [inquiry, member]));
    });
    await as("authenticated", manager, async () => {
      await denied(() => db.query("select public.staff_save_inquiry($1,2,'contacted',$2,null)", [inquiry, member]), "22023");
      await db.query("select public.staff_save_inquiry($1,2,'converted',null,'QA complete')", [inquiry]);
      assert.equal((await rows("select status from public.demo_requests"))[0].status, "converted");
    });
  });
});
