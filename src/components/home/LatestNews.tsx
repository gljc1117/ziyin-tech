import Link from "next/link";
import { newsDateLabel } from "@/lib/news-types";
import { getPublishedNews } from "@/lib/published-news";
import { newsDisplayTitle } from "@/lib/news-presentation";

export default async function LatestNews() {
  const all = await getPublishedNews();
  const selected = all
    .filter(({ category }) => category === "公司动态" || category === "合作动态")
    .slice(0, 3);

  return (
    <section aria-labelledby="home-latest" className="bg-[#f4f7fb] py-12 sm:py-16">
      <div className="site-container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="home-latest" className="text-3xl font-semibold text-slate-900">近期进展</h2>
          <Link href="/news" className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700">
            查看全部动态 →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {selected.map((item) => (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-white">
              <Link href={`/news/${item.id}`} className="group block h-full rounded-xl p-5 focus-visible:outline-2 focus-visible:outline-blue-700">
                <p className="text-xs leading-6 text-blue-700">{newsDateLabel(item)}</p>
                <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-900 group-hover:text-blue-800">
                  {newsDisplayTitle(item)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
