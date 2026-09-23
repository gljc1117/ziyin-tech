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
  runInNewContext(source, { exports, Response, Request, URL, TextEncoder, process: { env }, require: name => overrides[name] || require(name) });
  return exports;
}
test("actual staff API validates sessions and membership on every request, never caches private responses", async t => {
  let mode = "member";
  let calls = 0;
  const id = "10000000-0000-4000-8000-000000000001";
  const server = createServer((req, res) => {
    calls++;
    assert.equal(req.headers.authorization, "Bearer qa-token");
    res.setHeader("Content-Type", "application/json");
    if (req.url === "/auth/v1/user") {
      if (mode === "expired") { res.statusCode = 401; res.end(JSON.stringify({ message: "expired" })); }
      else res.end(JSON.stringify({ id, email: "qa@example.invalid" }));
    } else if (req.url.startsWith("/rest/v1/staff_members")) {
      if (mode === "failure") { res.statusCode = 500; res.end(JSON.stringify({ message: "private db error" })); }
      else res.end(JSON.stringify(mode === "outsider" ? null : { user_id: id, display_name: "QA", role: "member", active: true }));
    } else if (req.url.startsWith("/rest/v1/rpc/staff_save_inquiry")) {
      res.statusCode = 409; res.end(JSON.stringify({ code: "40001", message: "inquiry_conflict" }));
    } else { res.statusCode = 500; res.end("{}"); }
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const env = { NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${server.address().port}`, NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-public-key" };
  const helper = compile("../src/lib/staff-server.ts", env);
  const route = compile("../src/app/api/staff/inquiries/[id]/route.ts", env, { "@/lib/staff-server": helper });
  const context = { params: Promise.resolve({ id }) };
  const request = (body = {}) => new Request("http://localhost/api/staff/inquiries/" + id, { method: "PATCH", headers: { Authorization: "Bearer qa-token" }, body: JSON.stringify(body) });
  const noSession = await route.GET(new Request("http://localhost/api/staff/inquiries/" + id), context);
  assert.equal(noSession.status, 401); assert.equal(calls, 0);
  for (const [scenario, status] of [["expired", 401], ["outsider", 403], ["failure", 503]]) {
    mode = scenario;
    const response = await route.PATCH(request(), context);
    assert.equal(response.status, status, scenario);
    assert.equal(response.headers.get("cache-control"), "private, no-store, max-age=0");
    assert.equal(response.headers.get("vary"), "Authorization");
    assert.equal((await response.text()).includes("private db error"), false);
  }
  mode = "member";
  const invalid = await route.PATCH(request({ status: "deleted", version: 0, assigned_to: null }), context);
  assert.equal(invalid.status, 400);
  const conflict = await route.PATCH(request({ status: "contacted", version: 0, assigned_to: null, note: "QA" }), context);
  assert.equal(conflict.status, 409);
  assert.match((await conflict.json()).error, /其他同事更新/);
  const missingConfig = compile("../src/lib/staff-server.ts", {});
  assert.equal((await missingConfig.requireStaff(request())).response.status, 503);
});
