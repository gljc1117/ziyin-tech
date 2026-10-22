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
  const code = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  runInNewContext(code, { exports, Response, Request, URL, TextDecoder, Uint8Array, process: { env }, require: name => overrides[name] || require(name) });
  return exports;
}
test("actual publishing routes enforce independent live membership, ownership filters and conflicts", async t => {
  const user = "20000000-0000-4000-8000-000000000001";
  const article = "30000000-0000-4000-8000-000000000001";
  const fields = { title: "QA paper", summary: "QA summary", content: "QA synthetic paper, long enough for publication.", category: "学术观点", byline: "QA author" };
  let mode = "publisher", calls = 0, writes = 0, version = 0;
  const server = createServer(async (req, res) => {
    calls++;
    assert.equal(req.headers.authorization, "Bearer qa-token");
    res.setHeader("Content-Type", "application/json");
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/auth/v1/user") {
      if (mode === "expired") { res.statusCode = 401; res.end(JSON.stringify({ message: "invalid token" })); }
      else res.end(JSON.stringify({ id: user, email: "qa@example.invalid" }));
    } else if (url.pathname === "/rest/v1/website_publishers") {
      assert.equal(url.searchParams.get("user_id"), "eq." + user);
      assert.equal(url.searchParams.get("active"), "eq.true");
      if (mode === "failure") { res.statusCode = 500; res.end(JSON.stringify({ message: "private backend failure" })); }
      else res.end(JSON.stringify(mode === "outsider" ? null : { user_id: user, display_name: "QA publisher", active: true }));
    } else if (url.pathname === "/rest/v1/news") {
      if (req.method === "GET" && url.searchParams.get("select") === "id,version") {
        assert.equal(url.searchParams.get("author_id"), "eq." + user);
        res.end(JSON.stringify(mode === "foreign" ? null : { id: article, version }));
      } else if (req.method === "GET") {
        assert.equal(url.searchParams.get("author_id"), "eq." + user);
        res.end("[]");
      } else {
        writes++;
        let body = ""; for await (const chunk of req) body += chunk;
        const input = JSON.parse(body);
        if (req.method === "POST") {
          assert.equal(input.author_id, user); assert.equal(input.is_published, undefined);
          res.statusCode = 201;
          res.end(JSON.stringify({ ...fields, id: article, author_id: user, is_published: false, version: 0 }));
        } else {
          assert.equal(req.method, "PATCH");
          assert.equal(url.searchParams.get("author_id"), "eq." + user);
          assert.equal(url.searchParams.get("version"), "eq." + version);
          assert.equal(input.author_id, undefined); assert.equal(input.version, undefined);
          res.end(JSON.stringify({ ...fields, id: article, author_id: user, is_published: input.is_published, version: ++version }));
        }
      }
    } else { res.statusCode = 500; res.end("{}"); }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const env = { NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${server.address().port}`, NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-public-key" };
  const staff = compile("../src/lib/staff-server.ts", env);
  const helper = compile("../src/lib/publishing-server.ts", env, { "./staff-server": staff });
  const types = compile("../src/lib/publishing-types.ts", env);
  const overrides = { "@/lib/publishing-server": helper, "@/lib/publishing-types": types };
  const list = compile("../src/app/api/publishing/articles/route.ts", env, overrides);
  const detail = compile("../src/app/api/publishing/articles/[id]/route.ts", env, overrides);
  const context = { params: Promise.resolve({ id: article }) };
  const request = (method, body) => new Request("http://localhost/api/publishing/articles/" + article, {
    method, headers: { Authorization: "Bearer qa-token", "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const unauthenticated = await list.POST(new Request("http://localhost/api/publishing/articles", { method: "POST", headers: { Cookie: "session=pretend" } }));
  assert.equal(unauthenticated.status, 401); assert.equal(calls, 0);
  for (const [scenario, status] of [["expired", 401], ["outsider", 403], ["failure", 503]]) {
    mode = scenario;
    for (const action of [() => list.POST(request("POST", fields)), () => detail.PATCH(request("PATCH", { ...fields, version: 0, is_published: true }), context)]) {
      const result = await action(); assert.equal(result.status, status, scenario);
      assert.equal(result.headers.get("cache-control"), "private, no-store, max-age=0");
      assert.equal(result.headers.get("vary"), "Authorization");
      assert.equal((await result.text()).includes("private backend failure"), false);
    }
  }
  assert.equal(writes, 0);
  mode = "publisher";
  assert.equal((await list.POST(request("POST", { ...fields, is_published: true }))).status, 400);
  assert.equal((await list.POST(request("POST", { ...fields, author_id: user }))).status, 400);
  assert.equal((await list.POST(request("POST", { ...fields, content: "x".repeat(1000001) }))).status, 400);
  const created = await list.POST(request("POST", fields)); assert.equal(created.status, 201);
  assert.equal((await created.json()).item.is_published, false);
  mode = "foreign";
  assert.equal((await detail.PATCH(request("PATCH", { ...fields, version: 0, is_published: true }), context)).status, 404);
  mode = "publisher";
  const published = await detail.PATCH(request("PATCH", { ...fields, version: 0, is_published: true }), context);
  assert.equal(published.status, 200); assert.equal((await published.json()).item.version, 1);
  assert.equal((await detail.PATCH(request("PATCH", { ...fields, version: 0, is_published: true }), context)).status, 409);
  assert.equal((await detail.PATCH(request("PATCH", { ...fields, author_id: user, version: 1, is_published: true }), context)).status, 400);
  assert.equal(writes, 2);
});
