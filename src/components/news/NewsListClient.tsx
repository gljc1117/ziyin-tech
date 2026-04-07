"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NewsItem {
  id: string;
  title: string;
  summary: string | null;
  category: string;
  published_at: string;
}

const categories = ["全部", "公司动态", "技术进展", "合作动态", "学术动态"];

const categoryColor: Record<string, string> = {
  公司动态: "bg-cyan-500/20 text-cyan-300",
  技术进展: "bg-purple-500/20 text-purple-300",
  合作动态: "bg-emerald-500/20 text-emerald-300",
  学术动态: "bg-amber-500/20 text-amber-300",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

export default function NewsListClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [active, setActive] = useState("全部");

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
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-cyan-500/30 hover:bg-white/[0.08]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      categoryColor[item.category] ?? "bg-white/10 text-white/60"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-white/40">
                    {formatDate(item.published_at)}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h2>
                {item.summary && (
                  <p className="mt-2 text-sm leading-relaxed text-white/50 line-clamp-2">
                    {item.summary}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
