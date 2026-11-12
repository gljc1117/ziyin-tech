import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { EDITORIAL_ARTICLES, getEditorialArticles, getEditorialArticle, getEditorialCases } = require("../.qa/checks/editorial-content.js");
const { newsDateLabel } = require("../.qa/checks/news-types.js");

test("authorized articles are published by default; candidates and withdrawn stay isolated", () => {
  assert.equal(getEditorialArticles(false).length, 4);
  assert.equal(getEditorialCases(false).length, 4);
  for (const item of EDITORIAL_ARTICLES) {
    assert.equal(item.status, "approved");
    assert.equal(getEditorialArticle(item.id, false)?.id, item.id);
  }
  const fixture = EDITORIAL_ARTICLES[0];
  const originalStatus = fixture.status;
  try {
    fixture.status = "candidate";
    assert.equal(getEditorialArticle(fixture.id, false), undefined);
    assert.equal(getEditorialArticle(fixture.id, true)?.id, fixture.id);
    fixture.status = "withdrawn";
    assert.equal(getEditorialArticle(fixture.id, false), undefined);
    assert.equal(getEditorialArticle(fixture.id, true), undefined);
  } finally {
    fixture.status = originalStatus;
  }
  assert.equal(getEditorialArticle("TEST001", true), undefined);
});
test("news and project views share identities while preserving project phase", () => {
  const articles = getEditorialArticles(true);
  const cases = getEditorialCases(true);
  assert.equal(new Set(articles.map((item) => item.id)).size, articles.length);
  assert.deepEqual(cases.map((item) => item.id), articles.map((item) => item.id));
  const henan = cases.find((item) => item.id === "henan-tcm-3d-printing-service-2026");
  assert.equal(henan.category, "service_project");
  assert.equal(henan.tags[0], "已投入使用");
  assert.match(henan.cover_image_url, /henan-tcm-center-collaboration/);
  assert.equal(henan.images.length, 2);
  assert.equal(getEditorialArticle(henan.id, false).eventDate, "2026-06-09");
  const tianjin = cases.find((item) => item.id === "tianjin-hospital-3d-printing-operation-20261112");
  assert.equal(tianjin.category, "service_project");
  assert.equal(tianjin.tags[0], "运营中");
  assert.match(tianjin.summary, /2026年7月.*约4个月/);
  assert.equal(cases.find((item) => item.id.includes("medical-center")).category, "medical_center");
  assert.equal(cases.find((item) => item.id.includes("knee-guides")).category, "surgical_guide");
  assert.ok(cases.every((item) => item.is_published === true && item.published_at === undefined));
});
test("unknown article publication dates remain unknown; event month is not invented as a day", () => {
  const knee = getEditorialArticle("xiaogan-knee-guides-2026", true);
  assert.equal(knee.eventDate, "2026-06");
  assert.equal(knee.sourcePublishedAt, null);
  assert.equal(newsDateLabel({ published_at: null, display_date: knee.dateLabel }), "应用观察 · 2026年6月");
  assert.equal(newsDateLabel({ published_at: null }), "发布日期待补充");
  assert.equal(newsDateLabel({ published_at: "invalid" }), "发布日期待补充");
  assert.equal(newsDateLabel({ published_at: "2026-06-03T16:00:00Z" }), "2026年6月4日");
});
test("every displayed image is present and matches the selected source bytes", () => {
  const provenance = JSON.parse(readFileSync("docs/editorial-source-intake-20260906.json", "utf8"));
  const expected = new Map(provenance.selectedImages.map((item) => ["/images/editorial/" + item.file, item.sha256]));
  expected.set("/og-image.png", "fe22a003c897ab7734a699be54d3f69b3eae800ff9bd41e4b8f3795ea68bf095");
  expected.set("/images/editorial/henan-tcm-center-collaboration-20261112.jpg", "339bc0cb74eec72f7df0a61af17554213d8d190c27c296d1fb77fff9cc01237a");
  expected.set("/images/editorial/henan-tcm-center-exhibition-20261112.webp", "ca91b4346de44f634b3cf3966960c8c3e2ec3cabde923678c01616089aafbc94");
  expected.set("/images/editorial/henan-tcm-center-quality-20261112.webp", "16584cc6a6083f9fbd674befa13bb81a8fa494f31c16ed0147cf42c74140100a");
  const updates = EDITORIAL_ARTICLES.flatMap(({ caseProfile }) => caseProfile.update ? [caseProfile.update] : []);
  for (const item of [...EDITORIAL_ARTICLES, ...updates]) for (const image of [item.cover, ...item.gallery]) {
    const path = "public" + image.url;
    assert.equal(existsSync(path), true);
    assert.equal(createHash("sha256").update(readFileSync(path)).digest("hex"), expected.get(image.url));
    assert.ok(image.alt.length > 0 && image.width > 0 && image.height > 0);
  }
});
