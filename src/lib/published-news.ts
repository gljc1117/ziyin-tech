import { cache } from "react";
import { createServerClient } from "./supabase-server";
import { canDisplayNews } from "./content-policy";
import { getNewsArticles } from "./company-news";
import { SPECIALTY_AI_CLOSED_LOOP } from "./specialty-ai-closed-loop";
import type { PublishedNewsItem } from "./news-types";
import { PUBLISHED_DATES } from "./published-dates";

// 官网发布日期：优先取回填表，其次解析 id 尾部的 -YYYYMMDD 日期后缀，
// 再退回来源发布日期与事件日期。列表排序与展示一律以发布日期为准（2026-11-22 用户定）。
type DatedItem = { id: string; sourcePublishedAt: string | null; eventDate: string; dateLabel: string };
const publishDateOf = (item: DatedItem): string => {
  const fromMap = PUBLISHED_DATES[item.id];
  if (fromMap) return fromMap;
  const suffix = /-(\d{4})(\d{2})(\d{2})$/.exec(item.id);
  if (suffix) return `${suffix[1]}-${suffix[2]}-${suffix[3]}`;
  return item.sourcePublishedAt ?? item.eventDate;
};
const cnDate = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}年${m}月${d}日`;
};
// 标签以日期开头时，把新闻日期换成发布日期；带语义前缀的标签（成交公告 · …）保持原样。
const displayDateOf = (item: DatedItem): string => {
  if (/^\d{4}年\d{1,2}月\d{1,2}日/.test(item.dateLabel)) {
    return item.dateLabel.replace(/^\d{4}年\d{1,2}月\d{1,2}日/, cnDate(publishDateOf(item)));
  }
  return item.dateLabel;
};

export const getPublishedNews = cache(async (): Promise<PublishedNewsItem[]> => {
  const editorial = [SPECIALTY_AI_CLOSED_LOOP, ...getNewsArticles()];
  const imported: PublishedNewsItem[] = editorial.map((item) => ({
    id: item.id, title: item.title, summary: item.summary, content: null,
    category: item.category, published_at: publishDateOf(item),
    display_date: displayDateOf(item), cover_image_url: item.cover.url,
  }));
  const supabase = createServerClient();
  let existing: PublishedNewsItem[] = [];
  if (supabase) {
    const { data, error } = await supabase.from("news")
      .select("id, title, summary, content, category, published_at, byline")
      .eq("is_published", true).order("published_at", { ascending: false });
    if (!error && data) existing = data.filter(canDisplayNews);
  }
  // A reviewed existing row keeps precedence if a catalog entry uses the same ID.
  const merged = [...new Map([...imported, ...existing].map((item) => [item.id, item])).values()];
  const dateKey = (item: PublishedNewsItem) => item.published_at || editorial.find((entry) => entry.id === item.id)?.eventDate || "";
  return merged.sort((left, right) => dateKey(right).localeCompare(dateKey(left)));
});
