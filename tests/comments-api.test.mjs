import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
function compile(path, env, overrides = {}) {
  const exports = {};
  const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  runInNewContext(source, { exports, Response, Request, URL, TextEncoder, TextDecoder, Error, process: { env }, require: name => overrides[name] || require(name) });
  return exports;
}
test("comment routes validate public intake and protect staff moderation", async t => {
  const id = "10000000-0000-4000-8000-000000000001";
  let mode = "ok", calls = 0, latestInsert;
  const server = createServer(async (req, res) => {
    calls++;
    res.setHeader("Content-Type", "application/json");
    const url = new URL(req.url, "http://localhost");
    const isStaff = req.headers.authorization === "Bearer qa-token";
    if (url.pathname === "/auth/v1/user") {
      if (mode === "expired") { res.statusCode = 401; res.end(JSON.stringify({ message: "expired" })); }
      else res.end(JSON.stringify({ id }));
    } else if (url.pathname === "/rest/v1/staff_members") {
      res.end(JSON.stringify(mode === "outsider" ? null : { user_id: id, display_name: "QA", role: "member", active: true }));
    } else if (url.pathname === "/rest/v1/article_comments") {
      if (mode === "database-failure" || mode === "rate") {
        res.statusCode = mode === "rate" ? 400 : 500;
        res.end(JSON.stringify({ code: mode === "rate" ? "P0429" : "42P01", message: "private database details" })); return;
      }
      if (req.method === "POST") {
        let body = ""; for await (const chunk of req) body += chunk;
        latestInsert = JSON.parse(body); res.statusCode = 201; res.end("null");
      } else if (req.method === "PATCH") {
        assert.equal(isStaff, true); assert.equal(url.searchParams.get("version"), "eq.0");
        let body = ""; for await (const chunk of req) body += chunk;
        assert.deepEqual(Object.keys(JSON.parse(body)).sort(), ["official_reply", "status"]);
        res.end(JSON.stringify(mode === "conflict" ? [] : { id, version: 1 }));
      } else if (url.searchParams.get("select") === "article_id") {
        res.end(JSON.stringify({ article_id: mode === "removed" ? "removed-paper" : "paper-a" }));
      } else {
        if (!isStaff) {
          assert.equal(url.searchParams.get("status"), "eq.approved");
          assert.equal(url.searchParams.get("article_id"), "eq.paper-a");
          assert.equal(url.searchParams.get("select"), "id,article_id,nickname,body,created_at,official_reply,replied_at");
        }
        res.end(JSON.stringify(Array.from({ length: 21 }, (_, i) => ({ id: `${id}-${i}`, article_id: "paper-a", nickname: "QA", body: "测试已公开讨论", status: isStaff ? "pending" : undefined }))));
      }
    } else { res.statusCode = 404; res.end("{}"); }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const env = { NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${server.address().port}`, NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-public-key" };
  const helpers = compile("../src/lib/article-comments.ts", env);
  const aliases = {
    "@/lib/article-comments": helpers,
    "@/lib/supabase-server": compile("../src/lib/supabase-server.ts", env),
    "@/lib/staff-server": compile("../src/lib/staff-server.ts", env),
    "@/lib/published-news": { getPublishedNews: async () => [{ id: "paper-a", category: "学术观点", title: "测试论文" }, { id: "company-news", category: "公司动态", title: "公司报道" }] },
  };
  const route = compile("../src/app/api/articles/[id]/comments/route.ts", env, aliases);
  const staffList = compile("../src/app/api/staff/comments/route.ts", env, aliases);
  const staffUpdate = compile("../src/app/api/staff/comments/[id]/route.ts", env, aliases);
  const context = article => ({ params: Promise.resolve({ id: article }) });
  const valid = { nickname: "测试读者", body: "对文章方法的测试问题", submission_id: id };
  const post = (body = valid, headers = {}) => new Request("https://www.example.test/api/articles/paper-a/comments", { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://www.example.test", ...headers }, body: JSON.stringify(body) });
  const patch = (body = { status: "approved", official_reply: "测试官方回复", version: 0 }, authorized = true) => new Request(`https://www.example.test/api/staff/comments/${id}`, { method: "PATCH", headers: authorized ? { Authorization: "Bearer qa-token" } : {}, body: JSON.stringify(body) });
  await t.test("valid submission writes only allowed reader fields and reports pending, never published", async () => {
    const response = await route.POST(post(), context("paper-a"));
    assert.equal(response.status, 202); assert.match((await response.json()).message, /审核通过后/);
    assert.deepEqual(latestInsert, { ...valid, article_id: "paper-a" });
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
  await t.test("invalid, oversized, forged, honeypot and cross-site submissions do not reach the database", async () => {
    const before = calls;
    for (const input of [{ ...valid, body: "短" }, { ...valid, nickname: "子殷官方" }, { ...valid, status: "approved" }, { ...valid, website: "spam" }]) {
      assert.equal((await route.POST(post(input), context("paper-a"))).status, 400);
    }
    assert.equal((await route.POST(post(valid, { Origin: "https://elsewhere.test" }), context("paper-a"))).status, 403);
    assert.equal((await route.POST(post(valid, { "Content-Type": "text/plain" }), context("paper-a"))).status, 415);
    assert.equal((await route.POST(post({ ...valid, body: "x".repeat(13000) }), context("paper-a"))).status, 413);
    assert.equal((await route.POST(post(), context("missing-paper"))).status, 404);
    assert.equal((await route.POST(post(), context("company-news"))).status, 404);
    assert.equal(calls, before);
  });
  await t.test("public pagination selects approved rows only and uses no cache", async () => {
    const response = await route.GET(new Request("https://example.test/api/articles/paper-a/comments?page=2"), context("paper-a"));
    const result = await response.json();
    assert.equal(response.status, 200); assert.equal(result.items.length, 20); assert.equal(result.hasMore, true); assert.equal(result.page, 2);
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
  await t.test("rate limits and outages never produce a false success or expose database errors", async () => {
    mode = "rate"; assert.equal((await route.POST(post(), context("paper-a"))).status, 429);
    mode = "database-failure";
    for (const response of [await route.POST(post(), context("paper-a")), await route.GET(new Request("https://example.test"), context("paper-a"))]) {
      assert.equal(response.status, 503); assert.doesNotMatch(await response.text(), /private database/);
    }
    mode = "ok";
  });
  await t.test("missing or expired sessions and non-staff accounts cannot moderate", async () => {
    const before = calls;
    assert.equal((await staffUpdate.PATCH(patch(undefined, false), context(id))).status, 401);
    assert.equal(calls, before);
    for (const [scenario, status] of [["expired", 401], ["outsider", 403]]) {
      mode = scenario;
      const response = await staffUpdate.PATCH(patch(), context(id));
      assert.equal(response.status, status); assert.match(response.headers.get("cache-control"), /no-store/);
    }
    mode = "ok";
  });
  await t.test("staff listing, moderation validation, conflict handling and removed articles", async () => {
    const response = await staffList.GET(new Request("https://example.test/api/staff/comments", { headers: { Authorization: "Bearer qa-token" } }));
    assert.equal(response.status, 200); assert.equal((await response.json()).items[0].article_title, "测试论文");
    assert.equal((await staffUpdate.PATCH(patch({ status: "deleted", official_reply: "", version: 0 }), context(id))).status, 400);
    assert.equal((await staffUpdate.PATCH(patch(), context(id))).status, 200);
    mode = "conflict"; assert.equal((await staffUpdate.PATCH(patch(), context(id))).status, 409);
    mode = "removed"; assert.equal((await staffUpdate.PATCH(patch(), context(id))).status, 400);
    assert.equal((await staffUpdate.PATCH(patch({ status: "hidden", official_reply: "", version: 0 }), context(id))).status, 200);
  });
  await t.test("unconfigured services fail closed", async () => {
    const noConfig = compile("../src/app/api/articles/[id]/comments/route.ts", {}, { ...aliases, "@/lib/supabase-server": { createServerClient: () => null } });
    assert.equal((await noConfig.POST(post(), context("paper-a"))).status, 503);
  });
});
