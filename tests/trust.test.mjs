import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { handleDemoRequest } = require("../.qa/checks/demo-request.js");
const { parseManifest } = require("../.qa/checks/model-manifest.js");
const { getPublicDemo } = require("../.qa/checks/public-demos.js");
const { canDisplayNews, canDisplayCase } = require("../.qa/checks/content-policy.js");
const input = { name: "测试用户", hospital: "测试机构", department: "其他", phone: "13800000000", products: ["数智医学中心"], surgery_volume: "不适用" };
const request = (body = input) => new Request("http://localhost/api/demo-request", { method: "POST", body: JSON.stringify(body) });

test("missing service config cannot acknowledge or echo contact details", async () => {
  const response = await handleDemoRequest(request());
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.success, false);
  assert.equal(JSON.stringify(body).includes(input.phone), false);
});
test("database failure cannot return success", async () => {
  const response = await handleDemoRequest(request(), async () => { throw new Error("private DB detail"); });
  assert.equal(response.status, 503);
  assert.equal((await response.text()).includes("private DB detail"), false);
});
test("acknowledgement waits for persistence and stores only validated data", async () => {
  let release;
  let saved;
  const gate = new Promise((resolve) => { release = resolve; });
  let resolved = false;
  const pending = handleDemoRequest(request({ ...input, name: " 测试用户 ", unexpected: "ignore" }), async (value) => { saved = value; await gate; }).then((value) => { resolved = true; return value; });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(resolved, false);
  assert.equal(saved.name, "测试用户");
  assert.equal(saved.unexpected, undefined);
  release();
  assert.deepEqual(await (await pending).json(), { success: true });
});
test("invalid, oversized and malformed input never reaches storage", async () => {
  let writes = 0;
  const save = async () => { writes++; };
  for (const body of [{ ...input, phone: "123" }, { ...input, products: ["arbitrary"] }, { ...input, notes: "字".repeat(2001) }]) {
    assert.equal((await handleDemoRequest(request(body), save)).status, 400);
  }
  assert.equal((await handleDemoRequest(request({ ...input, notes: "字".repeat(10000) }), save)).status, 413);
  assert.equal((await handleDemoRequest(new Request("http://localhost", { method: "POST", body: "{" }), save)).status, 400);
  assert.equal(writes, 0);
});
const manifest = { case_id: "lung-case", generated_at: "2026-09-06", models: [{ name: "lung", format: "stl", size_mb: 1, url: "https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/lung-case/lung.stl" }] };
test("manifest accepts supported models and rejects empty, duplicate and unexpected-origin resources", () => {
  assert.equal(parseManifest(manifest).models.length, 1);
  for (const value of [null, { ...manifest, models: [] }, { ...manifest, models: [...manifest.models, ...manifest.models] }, { ...manifest, models: [{ ...manifest.models[0], url: "https://example.com/model.stl" }] }, { ...manifest, models: [{ ...manifest.models[0], size_mb: -1 }] }]) {
    assert.throws(() => parseManifest(value));
  }
});
test("test and unapproved seed entries are not publicly eligible", () => {
  assert.equal(getPublicDemo("TEST001"), undefined);
  assert.equal(getPublicDemo("../private"), undefined);
  assert.equal(getPublicDemo("lung-case").id, "lung-case");
  assert.equal(canDisplayNews({ title: "子殷科技完成数字骨科平台核心模块开发" }), false);
  assert.equal(canDisplayCase({ title: "胫骨平台骨折手术导板" }), false);
});
