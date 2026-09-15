import { pageMetadata } from "@/lib/site";
import { getPublishedNews } from "@/lib/published-news";
import NewsListClient from "@/components/news/NewsListClient";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata("新闻动态", "子殷科技公司动态、技术进展和合作信息", "/news");


export default async function NewsPage() {
  const news = await getPublishedNews();

  return (
    <main className="min-h-screen bg-[#f5f7fa] pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="text-3xl font-bold text-slate-900">新闻动态</h1>
        <p className="mt-2 text-sm text-slate-600">
          了解子殷科技最新进展
        </p>
        <NewsListClient initialNews={news} />
      </div>
    </main>
  );
}
