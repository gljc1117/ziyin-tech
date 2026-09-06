import type { Metadata } from "next";
export const SITE_URL = "https://www.chcomct.cn";
export const SITE_DESCRIPTION = "子殷科技围绕医疗AI、医学3D打印与数智医学中心，连接临床需求、医工协作与项目交付。了解医工造物、CalcAI及合作服务。";

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
