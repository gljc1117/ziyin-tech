import type { Metadata } from "next";
export const SITE_URL = "https://www.chcomct.cn";
export const SITE_DESCRIPTION = "子殷科技，面向医院提供医学三维建模、模型与导板打印服务，支持科研项目申报、医工协同研发与技术成果转化。了解产品能力、公开项目进展与合作方式。";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: {
      title: title + " | 子殷科技", description,
      url: SITE_URL + path, siteName: "子殷科技", locale: "zh_CN", type: "website",
      images: [{ url: SITE_URL + "/og-image.png", width: 1200, height: 630, alt: "子殷科技" }],
    },
  };
}
