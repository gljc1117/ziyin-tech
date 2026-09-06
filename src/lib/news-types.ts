export interface PublishedNewsItem {
  id: string; title: string; summary: string | null; content: string | null;
  category: string; published_at: string | null;
  display_date?: string; cover_image_url?: string;
}
export function newsDateLabel(item: { published_at: string | null; display_date?: string }) {
  if (item.display_date) return item.display_date;
  if (!item.published_at) return "发布日期待补充";
  const date = new Date(item.published_at);
  return Number.isNaN(date.getTime()) ? "发布日期待补充" : date.toLocaleDateString("zh-CN", {
    timeZone: "Asia/Shanghai", year: "numeric", month: "long", day: "numeric",
  });
}
