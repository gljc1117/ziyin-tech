import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { createServer } from "node:http";
import { createClient } from "@supabase/supabase-js";
import ts from "typescript";

const helper = {};
runInNewContext(ts.transpileModule(readFileSync(new URL("../src/lib/staff-password.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { exports: helper, URLSearchParams });

test("missing, expired, duplicate and unrelated links cannot reuse an existing employee session", async () => {
  let calls = 0;
  const client = { auth: { setSession() { calls++; }, getUser() { calls++; } } };
  for (const hash of ["", "#section", "#type=signup&access_token=a&refresh_token=b", "#type=invite&access_token=a", "#type=recovery&access_token=a&refresh_token=b&access_token=c", "#error_code=otp_expired&error_description=untrusted-content"]) {
    await assert.rejects(helper.establishPasswordSetupSession(client, hash), /设置链接无效或已过期/);
  }
  assert.equal(calls, 0);
});

test("homepage callback detection leaves normal anchors alone", () => {
  assert.equal(helper.isPasswordSetupCallback("#products"), false);
  assert.equal(helper.isPasswordSetupCallback("#type=invite&access_token=a&refresh_token=b"), true);
  assert.equal(helper.isPasswordSetupCallback("#error_code=otp_expired"), true);
});

test("password validation requires sufficient length and matching confirmation", () => {
  assert.notEqual(helper.validateStaffPassword("short", "short"), "");
  assert.notEqual(helper.validateStaffPassword("long-enough-password", "different-password"), "");
  assert.notEqual(helper.validateStaffPassword("x".repeat(129), "x".repeat(129)), "");
  assert.equal(helper.validateStaffPassword("Synthetic-Test-Password-42!", "Synthetic-Test-Password-42!"), "");
});

test("real SDK validates invitation/recovery sessions with Auth and can update only that session's password", async t => {
  let reject = false;
  let updates = 0;
  const user = { id: "10000000-0000-4000-8000-000000000001", email: "synthetic-qa@example.invalid", aud: "authenticated", created_at: new Date().toISOString() };
  const encode = data => Buffer.from(JSON.stringify(data)).toString("base64url");
  const token = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: user.id, exp: Math.floor(Date.now() / 1000) + 3600 })}.synthetic-signature`;
  const server = createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (req.url !== "/auth/v1/user") { res.statusCode = 404; res.end("{}"); return; }
    assert.equal(req.headers.authorization, `Bearer ${token}`);
    if (reject) { res.statusCode = 401; res.end(JSON.stringify({ message: "private-provider-diagnostic" })); return; }
    if (req.method === "PUT") {
      let body = ""; for await (const chunk of req) body += chunk;
      assert.equal(JSON.parse(body).password, "Synthetic-Test-Password-42!"); updates++;
    }
    res.end(JSON.stringify(user));
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const client = createClient(`http://127.0.0.1:${server.address().port}`, "synthetic-public-key", { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  for (const type of ["invite", "recovery"]) {
    assert.equal(await helper.establishPasswordSetupSession(client, `#type=${type}&access_token=${token}&refresh_token=synthetic-refresh`), user.email);
  }
  assert.equal((await client.auth.updateUser({ password: "Synthetic-Test-Password-42!" })).error, null);
  assert.equal(updates, 1);
  reject = true;
  await assert.rejects(helper.establishPasswordSetupSession(client, `#type=recovery&access_token=${token}&refresh_token=synthetic-refresh`), /设置链接无效或已过期/);
});
