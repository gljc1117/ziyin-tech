import type { MetadataRoute } from "next";
import { getEditorialArticles } from "@/lib/editorial-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.chcomct.cn";

  const editorial = getEditorialArticles(false).flatMap((item) => [{ url: base + "/news/" + item.id }, { url: base + "/cases/" + item.id }]);
  return [
    ...editorial,
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cases`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/cases/lung-case`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cases/fullbody`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demo`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
