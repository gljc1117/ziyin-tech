import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们",
  description:
    "子殷科技是一家专注于医学3D打印服务解决方案的高新技术企业，与近40家医院合作，完成近2000例临床案例。依托上海交大附属九院3D打印技术临床转化研发中心。",
  openGraph: {
    title: "关于我们 | 子殷科技 - 数字骨科智能手术规划平台",
    description:
      "子殷科技是一家专注于医学3D打印服务解决方案的高新技术企业，与近40家医院合作，完成近2000例临床案例。",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
