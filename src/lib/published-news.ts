import { cache } from "react";
import { createServerClient } from "./supabase-server";
import { canDisplayNews } from "./content-policy";
import { getNewsArticles } from "./company-news";
import type { PublishedNewsItem } from "./news-types";

export const getPublishedNews = cache(async (): Promise<PublishedNewsItem[]> => {
  const editorial = getNewsArticles();
  const imported: PublishedNewsItem[] = editorial.map((item) => ({
    id: item.id, title: item.title, summary: item.summary, content: null,
    category: item.category, published_at: item.sourcePublishedAt,
    display_date: item.dateLabel, cover_image_url: item.cover.url,
  }));
  const supabase = createServerClient();
  let existing: PublishedNewsItem[] = [];
  if (supabase) {
    const { data, error } = await supabase.from("news")
      .select("id, title, summary, content, category, published_at")
      .eq("is_published", true).order("published_at", { ascending: false });
    if (!error && data) existing = data.filter(canDisplayNews);
  }
  // A reviewed existing row keeps precedence if a catalog entry uses the same ID.
  const merged = [...new Map([...imported, ...existing].map((item) => [item.id, item])).values()];
  const dateKey = (item: PublishedNewsItem) => item.published_at || editorial.find((entry) => entry.id === item.id)?.eventDate || "";
  return merged.sort((left, right) => dateKey(right).localeCompare(dateKey(left)));
});
