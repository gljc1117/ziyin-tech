import Link from "next/link";
import Image from "next/image";
import { newsDateLabel } from "@/lib/news-types";
import { getPublishedNews } from "@/lib/published-news";
import { newsChannel, newsDisplayTitle } from "@/lib/news-presentation";
export default async function LatestNews() {
  const all = await getPublishedNews();
  const selected = ["企业动态", "项目实践", "子殷洞察"].map((channel) => ({
    channel,
    item: all.find((item) => newsChannel(item.category) === channel),
  }));
  return (
    <section className="bg-[#f4f7fb] py-16 sm:py-20">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">动态与洞察</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              在实践中前进，在思考中更新
            </h2>
          </div>
          <Link href="/news" className="text-sm font-semibold text-blue-700">
            查看全部 →
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {selected.map(
            ({ channel, item }) =>
              item && (
                <article key={channel}>
                  <div className="mb-4 flex justify-between border-b border-slate-300 pb-3">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {channel}
                    </h3>
                    <Link
                      href={`/news?channel=${encodeURIComponent(channel)}`}
                      className="text-xs text-blue-700"
                    >
                      更多 →
                    </Link>
                  </div>
                  <Link href={`/news/${item.id}`} className="group">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-white">
                      <Image
                        src={item.cover_image_url || "/og-image.png"}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-contain"
                      />
                    </div>
                    <h4 className="mt-5 text-lg font-semibold leading-7 text-slate-900 group-hover:text-blue-800">
                      {newsDisplayTitle(item)}
                    </h4>
                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {newsDateLabel(item)}
                    </p>
                  </Link>
                </article>
              ),
          )}
        </div>
      </div>
    </section>
  );
}
