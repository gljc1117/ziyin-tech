"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OpinionCover, hasOpinionVisual } from "@/components/content/OpinionVisual";
import { newsDateLabel, type PublishedNewsItem as NewsItem } from "@/lib/news-types";
import { motion } from "framer-motion";


const preferredCategoryOrder = ["合作动态", "技术进展", "学术观点", "学术动态", "视频科普", "公司动态"];

const categoryColor: Record<string, string> = {
  学术观点: "bg-sky-500/20 text-sky-200",
  公司动态: "bg-cyan-500/20 text-cyan-300",
  技术进展: "bg-purple-500/20 text-purple-300",
  合作动态: "bg-emerald-500/20 text-emerald-300",
  学术动态: "bg-amber-500/20 text-amber-300",
  视频科普: "bg-cyan-500/20 text-cyan-200",
};


export default function NewsListClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [active, setActive] = useState("全部");
  const categoryCounts = useMemo(
    () =>
      initialNews.reduce<Record<string, number>>((counts, item) => {
        counts[item.category] = (counts[item.category] ?? 0) + 1;
        return counts;
      }, {}),
    [initialNews],
  );
  const categories = useMemo(() => {
    const available = Object.keys(categoryCounts);
    const ordered = preferredCategoryOrder.filter((category) => categoryCounts[category]);
    const remaining = available
      .filter((category) => !preferredCategoryOrder.includes(category))
      .sort((left, right) => left.localeCompare(right, "zh-CN"));
    return ["全部", ...ordered, ...remaining];
  }, [categoryCounts]);

  const filtered = active === "全部"
    ? initialNews
    : initialNews.filter((n) => n.category === active);

  return (
    <>
      {/* 分类筛选 */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === cat
                ? "bg-cyan-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
            <span className="ml-1.5 text-xs opacity-70">
              {cat === "全部" ? initialNews.length : categoryCounts[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* 新闻卡片 */}
      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-white/40">
          <p className="text-lg">暂无相关新闻</p>
          <p className="mt-1 text-sm">请稍后再来查看</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`/news/${item.id}`}
                className={`group block rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 sm:p-6 ${hasOpinionVisual(item.id) ? "md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] md:items-center md:gap-8" : ""}`}
              >
                {hasOpinionVisual(item.id) ? <OpinionCover id={item.id} /> : item.cover_image_url && <div className="relative mb-5 h-48 overflow-hidden rounded-lg bg-slate-100 sm:h-64"><Image src={item.cover_image_url} alt={item.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-contain" /></div>}
                <div className={hasOpinionVisual(item.id) ? "mt-5 min-w-0 md:mt-0" : "min-w-0"}>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      categoryColor[item.category] ?? "bg-white/10 text-white/60"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-sm text-slate-300">
                    {newsDateLabel(item)}
                  </span>
                </div>
                <h2 className="mt-3 text-xl leading-relaxed sm:text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h2>
                {item.summary && (
                  <p className="mt-3 text-base leading-7 text-slate-300 line-clamp-3">
                    {item.summary}
                  </p>
                )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
