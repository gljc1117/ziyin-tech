import { requireStaff, staffJson } from "@/lib/staff-server";
import { commentPage, commentStatuses, publicCommentColumns } from "@/lib/article-comments";
import { getPublishedNews } from "@/lib/published-news";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const auth = await requireStaff(request);
    if (auth.response) return auth.response;
    const params = new URL(request.url).searchParams;
    const page = commentPage(params.get("page"));
    const status = params.get("status") || "pending";
    if (!Object.hasOwn(commentStatuses, status)) return staffJson({ error: "审核状态无效。" }, 400);
    const [{ data, error }, articles] = await Promise.all([
      auth.db.from("article_comments").select(`${publicCommentColumns},status,version`)
        .eq("status", status).order("created_at", { ascending: false }).order("id", { ascending: false }).range((page - 1) * 20, page * 20),
      getPublishedNews(),
    ]);
    if (error) return staffJson({ error: "评论暂时无法加载，请稍后重试。" }, 503);
    const titles = new Map(articles.map(article => [article.id, article.title]));
    return staffJson({ items: (data || []).slice(0, 20).map(item => ({ ...item, article_title: titles.get(item.article_id) || "文章已下线或不存在（请隐藏）" })), page, hasMore: (data || []).length > 20 });
  } catch { return staffJson({ error: "评论服务暂不可用，请稍后重试。" }, 503); }
}
