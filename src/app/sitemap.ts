import { PRODUCTS } from "@/lib/products";
import type { MetadataRoute } from "next";
import { getEditorialArticles } from "@/lib/editorial-content";
import { getNewsArticles } from "@/lib/company-news";
import { SPECIALTY_AI_CLOSED_LOOP } from "@/lib/specialty-ai-closed-loop";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.chcomct.cn";

  const editorial = [
    ...[SPECIALTY_AI_CLOSED_LOOP, ...getNewsArticles(false)].map((item) => ({ url: base + "/news/" + item.id })),
    ...getEditorialArticles(false).map((item) => ({ url: base + "/cases/" + item.id })),
  ];
  return [
    ...editorial,
    { url: base + "/products", changeFrequency: "monthly", priority: 0.9 },
    ...PRODUCTS.map(p=>({url: base + "/products/" + p.slug, priority: 0.8})),
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cases`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/cases/lung-case`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cases/fullbody`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demo`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
