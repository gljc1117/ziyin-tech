"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OpinionThumbnail, hasOpinionVisual } from "@/components/content/OpinionVisual";
import { newsDateLabel, type PublishedNewsItem as NewsItem } from "@/lib/news-types";
import { motion } from "framer-motion";


const preferredCategoryOrder = ["合作动态", "技术进展", "学术观点", "学术动态", "视频科普", "公司动态"];

const categoryColor: Record<string, string> = {
  学术观点: "bg-blue-50 text-blue-800",
  公司动态: "bg-cyan-50 text-cyan-800",
  技术进展: "bg-purple-50 text-purple-800",
  合作动态: "bg-emerald-50 text-emerald-800",
  学术动态: "bg-amber-50 text-amber-800",
  视频科普: "bg-cyan-50 text-cyan-800",
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
                ? "bg-blue-700 text-white"
                : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-blue-50 hover:text-blue-800"
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
        <div className="mt-16 text-center text-slate-500">
          <p className="text-lg">暂无相关新闻</p>
          <p className="mt-1 text-sm">请稍后再来查看</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 sm:px-0">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`/news/${item.id}`}
                className="group flex flex-row-reverse items-start gap-4 border-b border-slate-200 bg-white py-6 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:gap-7 sm:px-6"
              >
                {item.cover_image_url && <div className="relative w-24 shrink-0 overflow-hidden rounded-xl sm:w-40">
                  {hasOpinionVisual(item.id) ? <OpinionThumbnail id={item.id} /> : <div className="relative aspect-square bg-slate-100"><Image src={item.cover_image_url} alt="" fill sizes="(max-width: 640px) 96px, 160px" className="object-cover" /></div>}
                </div>}
                <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      categoryColor[item.category] ?? "bg-white/10 text-slate-600"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-sm text-slate-600">
                    {newsDateLabel(item)}
                  </span>
                </div>
                <h2 className="mt-2 text-lg leading-relaxed sm:text-[22px] font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h2>
                {item.summary && (
                  <p className="mt-2 text-[15px] leading-7 text-slate-600 line-clamp-2 sm:text-base">
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
