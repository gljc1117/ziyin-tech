import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const {
  NEWS_CHANNELS,
  filterNews,
  newsDisplayTitle,
} = require("../.qa/checks/news-presentation.js");
const { PRODUCTS, productInquiryHref } = require("../.qa/checks/products.js");
const { demoRequestSchema } = require("../.qa/checks/demo-request.js");

test("news channels partition records without losing future categories or modifying source titles", () => {
  const items = ["公司动态", "合作动态", "学术观点", "新栏目"].map(
    (category, i) => ({
      id: String(i),
      category,
      title: `原标题 ${i}`,
      summary: null,
      content: null,
      published_at: null,
    }),
  );
  const before = structuredClone(items);
  const selected = NEWS_CHANNELS.filter((c) => c !== "全部").flatMap((c) =>
    filterNews(items, c, ""),
  );
  assert.deepEqual(
    selected.map((i) => i.id).sort(),
    items.map((i) => i.id).sort(),
  );
  assert.equal(new Set(selected.map((i) => i.id)).size, items.length);
  assert.equal(newsDisplayTitle(items[3]), items[3].title);
  assert.deepEqual(items, before);
  assert.deepEqual(
    filterNews(items, "全部", "  原标题 2 ").map((i) => i.id),
    ["2"],
  );
  assert.equal(filterNews(items, "项目实践", "原标题 2").length, 0);
});

test("every product inquiry round-trips through its URL and the server's accepted request schema", () => {
  for (const product of PRODUCTS) {
    const selected = new URL(
      productInquiryHref(product),
      "https://example.test",
    ).searchParams.get("product");
    assert.equal(selected, product.inquiry);
    const parsed = demoRequestSchema.safeParse({
      name: "测试人员",
      hospital: "测试机构",
      department: "其他",
      phone: "13800000000",
      products: [selected],
      surgery_volume: "不适用",
    });
    assert.equal(parsed.success, true, product.slug);
  }
});
