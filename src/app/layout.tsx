import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import { SITE_URL, SITE_DESCRIPTION } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "子殷科技 - 医疗AI · 医学3D打印 · 数智医学中心",
    template: "%s | 子殷科技",
  },
  description:
    SITE_DESCRIPTION,
  keywords: [
    "数字骨科",
    "三维重建",
    "AI手术规划",
    "CT重建",
    "骨科3D打印",
    "手术导航",
    "术前规划",
    "子殷科技",
    "医疗器械",
  ],
  openGraph: {
    title: "子殷科技 - 医疗AI · 医学3D打印 · 数智医学中心",
    description:
      SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "子殷科技",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "子殷科技 - 医疗AI · 医学3D打印 · 数智医学中心",
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
