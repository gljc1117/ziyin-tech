import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.chcomct.cn";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cases`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/cases/lung-case`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cases/fullbody`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/viewer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
