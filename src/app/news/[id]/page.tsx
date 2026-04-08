import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase-server";
import NewsContent from "@/components/news/NewsContent";

interface NewsDetail {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  category: string;
  published_at: string;
}

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
  const supabase = createServerClient();
  if (!supabase) return { title: "新闻详情" };

  const { data } = await supabase
    .from("news")
    .select("title, summary")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!data) return { title: "新闻详情" };

  return {
    title: data.title,
    description: data.summary ?? undefined,
    openGraph: {
      title: `${data.title} | 子殷科技`,
      description: data.summary ?? undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();
  if (!supabase) notFound();

  const { data: news } = await supabase
    .from("news")
    .select("id, title, summary, content, category, published_at")
    .eq("id", id)
    .eq("is_published", true)
    .single<NewsDetail>();

  if (!news) notFound();

  const date = new Date(news.published_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

        {body && <NewsContent content={body} />}

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
