import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StaffAuthLanding from "@/components/staff/StaffAuthLanding";
import ContactWidget from "@/components/contact/ContactWidget";
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
    default: "子殷科技 - 数智医学产品与医工转化服务",
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
    title: "子殷科技 - 数智医学产品与医工转化服务",
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
        alt: "子殷科技 - 数智医学产品与医工转化服务",
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
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-5 py-3 text-blue-900 focus:not-sr-only">跳至主要内容</a>
        <StaffAuthLanding />
        <Navbar />
        <div id="main-content" tabIndex={-1} className="flex-1">{children}</div>
        <Footer />
        <ContactWidget />
      </body>
    </html>
  );
}
