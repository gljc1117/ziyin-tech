import Link from "next/link";
import Image from "next/image";
import { newsDateLabel } from "@/lib/news-types";
import { getPublishedNews } from "@/lib/published-news";


const categoryColor: Record<string, string> = {
  公司动态: "bg-cyan-500/20 text-cyan-300",
  技术进展: "bg-purple-500/20 text-purple-300",
  合作动态: "bg-emerald-500/20 text-emerald-300",
};


export default async function LatestNews() {
  const news = (await getPublishedNews()).slice(0, 3);

  if (news.length === 0) return null;

  return (
    <section className="bg-[#0A2463] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">最新动态</h2>
            <p className="mt-2 text-sm text-white/50">了解子殷科技最新进展</p>
          </div>
          <Link
            href="/news"
            className="hidden text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300 sm:block"
          >
            查看全部 →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {news.map((item) => (
            <div key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-cyan-500/30 hover:bg-white/[0.08]"
              >
                {item.cover_image_url && <div className="relative mb-5 aspect-video overflow-hidden rounded-lg bg-slate-100"><Image src={item.cover_image_url} alt={item.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain" /></div>}
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      categoryColor[item.category] ?? "bg-white/10 text-white/60"
                    }`}
                  >
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-white/40">
                  {newsDateLabel(item)}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/news"
            className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
          >
            查看全部 →
          </Link>
        </div>
      </div>
    </section>
  );
}
