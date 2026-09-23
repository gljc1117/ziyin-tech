import type { Metadata } from "next";
export const SITE_URL = "https://www.chcomct.cn";
export const SITE_DESCRIPTION = "子殷科技，面向医院的数智医学产品与医工转化服务商。了解Chcomct SM医学图像处理软件、医学3D打印、科研协作与数智医学中心共建。";

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
