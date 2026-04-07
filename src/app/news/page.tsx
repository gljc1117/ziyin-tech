import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase-server";
import NewsListClient from "@/components/news/NewsListClient";

export const metadata: Metadata = {
  title: "新闻动态",
  description: "子殷科技最新公司动态、技术进展和合作信息",
  openGraph: {
    title: "新闻动态 | 子殷科技 - 数字骨科智能手术规划平台",
    description: "子殷科技最新公司动态、技术进展和合作信息",
  },
};

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  category: string;
  published_at: string;
}

export default async function NewsPage() {
  const supabase = createServerClient();
  let news: NewsItem[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("news")
      .select("id, title, summary, category, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    news = data ?? [];
  }

  return (
    <main className="min-h-screen bg-[#060e24] pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-3xl font-bold text-white">新闻动态</h1>
        <p className="mt-2 text-sm text-white/50">
          了解子殷科技最新进展
        </p>
        <NewsListClient initialNews={news} />
      </div>
    </main>
  );
}
