import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedNews } from "@/lib/published-news";
import NewsContent from "@/components/news/NewsContent";
import { getEditorialArticle } from "@/lib/editorial-content";
import EditorialArticleBody from "@/components/content/EditorialArticleBody";
import { newsDateLabel } from "@/lib/news-types";


const categoryColor: Record<string, string> = {
  公司动态: "bg-cyan-500/20 text-cyan-300",
  技术进展: "bg-purple-500/20 text-purple-300",
  合作动态: "bg-emerald-500/20 text-emerald-300",
  学术动态: "bg-amber-500/20 text-amber-300",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = (await getPublishedNews()).find((item) => item.id === id);
  if (!data) return { title: "新闻详情", robots: { index: false, follow: false } };

  const metadata = pageMetadata(data.title, data.summary ?? "子殷科技新闻动态", "/news/" + id);
  const editorial = getEditorialArticle(id);
  if (!editorial) return metadata;
  return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: editorial.cover.url, alt: editorial.cover.alt, width: editorial.cover.width, height: editorial.cover.height }] }, ...(editorial.status === "candidate" ? { robots: { index: false, follow: false } } : {}) };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = (await getPublishedNews()).find((item) => item.id === id);
  if (!news) notFound();

  const date = newsDateLabel(news);
  const editorial = getEditorialArticle(id);

  const body = news.content || news.summary;

  return (
    <main className="min-h-screen bg-[#060e24] pt-24 pb-16">
      <article className="mx-auto max-w-3xl px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              categoryColor[news.category] ?? "bg-white/10 text-white/60"
            }`}
          >
            {news.category}
          </span>
          <span className="text-xs text-white/40">{date}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-white">
          {news.title}
        </h1>

        {editorial ? <EditorialArticleBody article={editorial} /> : body && <NewsContent content={body} />}

        <div className="mt-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                clipRule="evenodd"
              />
            </svg>
            返回新闻列表
          </Link>
        </div>
      </article>
    </main>
  );
}
