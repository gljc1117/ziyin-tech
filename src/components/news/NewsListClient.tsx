"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsDateLabel, type PublishedNewsItem } from "@/lib/news-types";
import {
  NEWS_CHANNELS,
  type NewsChannel,
  newsChannel,
  newsDisplayTitle,
  filterNews,
} from "@/lib/news-presentation";
export default function NewsListClient({
  initialNews,
  initialChannel = "全部",
}: {
  initialNews: PublishedNewsItem[];
  initialChannel?: NewsChannel;
}) {
  const [active, setActive] = useState<NewsChannel>(initialChannel);
  const [query, setQuery] = useState("");
  const filtered = filterNews(initialNews, active, query);
  return (
    <>
      <div className="flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
        <div aria-label="内容分类" className="flex flex-wrap gap-2">
          {NEWS_CHANNELS.map((channel) => (
            <button
              key={channel}
              aria-pressed={active === channel}
              onClick={() => setActive(channel)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium ${active === channel ? "bg-[#153d83] text-white" : "bg-white text-slate-600 hover:bg-blue-50"}`}
            >
              {channel}
              <span className="ml-2 text-xs">
                {channel === "全部"
                  ? initialNews.length
                  : initialNews.filter(
                      (i) => newsChannel(i.category) === channel,
                    ).length}
              </span>
            </button>
          ))}
        </div>
        <label className="sm:w-52">
          <span className="sr-only">搜索动态与洞察</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900"
          />
        </label>
      </div>
      <p role="status" className="mt-4 text-xs text-slate-500">
        {active} · {filtered.length} 篇
      </p>
      <div className="divide-y divide-slate-200">
        {filtered.map((item) => (
          <article key={item.id} className="py-7">
            <Link
              href={`/news/${item.id}`}
              className="group flex items-start gap-4 sm:gap-6"
            >
              <div className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:w-48">
                <Image
                  src={item.cover_image_url || "/og-image.png"}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 96px, 192px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs leading-5 text-slate-500">
                  <span className="font-medium text-blue-800">
                    {item.category}
                  </span>
                  <span>{newsDateLabel(item)}</span>
                </p>
                <h2
                  title={item.title}
                  className="mt-2 line-clamp-2 text-base font-semibold leading-7 text-slate-900 group-hover:text-blue-800 sm:text-xl"
                >
                  {newsDisplayTitle(item)}
                </h2>
                {item.summary && (
                  <p className="mt-3 hidden text-sm leading-7 text-slate-600 sm:line-clamp-2">
                    {item.summary}
                  </p>
                )}
                <span className="mt-3 inline-block text-xs font-medium text-blue-700">
                  阅读全文 →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="py-20 text-center">
          <p className="text-lg text-slate-700">没有找到匹配内容</p>
          <button
            onClick={() => {
              setQuery("");
              setActive("全部");
            }}
            className="mt-5 text-sm text-blue-700 underline"
          >
            查看全部文章
          </button>
        </div>
      )}
    </>
  );
}
