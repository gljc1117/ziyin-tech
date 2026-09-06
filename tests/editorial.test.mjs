import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { EDITORIAL_ARTICLES, getEditorialArticles, getEditorialArticle, getEditorialCases } = require("../.qa/checks/editorial-content.js");
const { newsDateLabel } = require("../.qa/checks/news-types.js");

test("authorized articles are published by default; candidates and withdrawn stay isolated", () => {
  assert.equal(getEditorialArticles(false).length, 3);
  assert.equal(getEditorialCases(false).length, 3);
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
  assert.equal(cases.find((item) => item.id.startsWith("henan-")).category, "service_project");
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
  for (const item of EDITORIAL_ARTICLES) for (const image of [item.cover, ...item.gallery]) {
    const path = "public" + image.url;
    assert.equal(existsSync(path), true);
    assert.equal(createHash("sha256").update(readFileSync(path)).digest("hex"), expected.get(image.url));
    assert.ok(image.alt.length > 0 && image.width > 0 && image.height > 0);
  }
});
