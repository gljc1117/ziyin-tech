"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";

interface NewsItem {
  id: string;
  title: string;
  category: string;
  published_at: string;
}

const categoryColor: Record<string, string> = {
  公司动态: "bg-cyan-500/20 text-cyan-300",
  技术进展: "bg-purple-500/20 text-purple-300",
  合作动态: "bg-emerald-500/20 text-emerald-300",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("news")
      .select("id, title, category, published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        if (data) setNews(data);
      });
  }, []);

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
          {news.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/news/${item.id}`}
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-cyan-500/30 hover:bg-white/[0.08]"
              >
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
                  {formatDate(item.published_at)}
                </p>
              </Link>
            </motion.div>
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
