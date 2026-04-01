import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ziyin-tech.vercel.app"),
  title: {
    default: "子殷科技 - 数字骨科智能手术规划平台",
    template: "%s | 子殷科技 - 数字骨科智能手术规划平台",
  },
  description:
    "CT/MRI三维重建 + AI手术规划，让骨科精准手术触手可及。上海子殷科技有限公司，已取得二类医疗器械注册证。",
  keywords: [
    "3D打印",
    "骨科",
    "三维重建",
    "手术规划",
    "医疗器械",
    "PEEK",
    "数字骨科",
    "CT重建",
    "子殷科技",
  ],
  openGraph: {
    title: "子殷科技 - 数字骨科智能手术规划平台",
    description:
      "CT/MRI三维重建 + AI手术规划，让骨科精准手术触手可及。",
    url: "https://ziyin-tech.vercel.app",
    siteName: "子殷科技",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "子殷科技 - 数字骨科智能手术规划平台",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
