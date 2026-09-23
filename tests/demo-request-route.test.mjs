import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const routeSource = ts.transpileModule(
  readFileSync(new URL("../src/app/api/demo-request/route.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;
function route(env) {
  const exports = {};
  runInNewContext(routeSource, {
    exports,
    process: { env },
    require: (name) => name === "@/lib/demo-request"
      ? require("../.qa/checks/demo-request.js")
      : require(name),
  });
  return exports.POST;
}
const input = {
  name: "接口回归测试", hospital: "测试机构", department: "其他",
  phone: "13800000000", products: ["其他合作"], surgery_volume: "不适用",
  notes: "自动回归测试，无真实联系人",
};
const request = () => new Request("http://localhost/api/demo-request", {
  method: "POST", body: JSON.stringify(input),
});

test("public inquiry uses the configured anon key without requiring an admin key", async (t) => {
  let stored;
  let receivedKey;
  let denied = false;
  const server = createServer(async (req, res) => {
    assert.equal(req.url, "/rest/v1/demo_requests");
    assert.equal(req.method, "POST");
    receivedKey = req.headers.apikey;
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    if (denied) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ code: "42501", message: "private database detail" }));
    } else {
      stored = JSON.parse(Buffer.concat(chunks).toString());
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const post = route({
    NEXT_PUBLIC_SUPABASE_URL: `http://127.0.0.1:${server.address().port}`,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-public-key",
  });
  const response = await post(request());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(receivedKey, "test-public-key");
  assert.deepEqual(stored, {
    doctor_name: input.name, hospital_name: input.hospital,
    department: input.department, phone: input.phone, modules: input.products,
    monthly_cases: input.surgery_volume, notes: input.notes, status: "pending",
  });

  denied = true;
  const failure = await post(request());
  assert.equal(failure.status, 503);
  const body = await failure.json();
  assert.equal(body.success, false);
  assert.equal(JSON.stringify(body).includes("private database detail"), false);
});

test("missing public configuration still fails closed", async () => {
  const response = await route({})(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
});
