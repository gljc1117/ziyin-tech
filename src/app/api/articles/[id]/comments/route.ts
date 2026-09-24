import { createServerClient } from "@/lib/supabase-server";
import { getPublishedNews } from "@/lib/published-news";
import { allowsComments, commentArticleId, commentInput, commentJson, commentPage, publicCommentColumns, readCommentJson } from "@/lib/article-comments";

export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
async function articleExists(id: string) {
  return commentArticleId.test(id) && (await getPublishedNews()).some(article => article.id === id && allowsComments(article));
}
export async function GET(request: Request, context: Context) {
  const { id } = await context.params;
  try {
    if (!await articleExists(id)) return commentJson({ error: "这篇文章暂未开放讨论。" }, 404);
    const db = createServerClient();
    if (!db) return commentJson({ error: "评论暂时无法加载，请稍后重试。" }, 503);
    const page = commentPage(new URL(request.url).searchParams.get("page"));
    const { data, error } = await db.from("article_comments").select(publicCommentColumns)
      .eq("article_id", id).eq("status", "approved")
      .order("created_at", { ascending: false }).order("id", { ascending: false })
      .range((page - 1) * 20, page * 20);
    if (error) return commentJson({ error: "评论暂时无法加载，请稍后重试。" }, 503);
    return commentJson({ items: (data || []).slice(0, 20), page, hasMore: (data || []).length > 20 });
  } catch { return commentJson({ error: "评论暂时无法加载，请稍后重试。" }, 503); }
}
export async function POST(request: Request, context: Context) {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return commentJson({ error: "请从文章页面提交评论。" }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return commentJson({ error: "请使用评论表单提交。" }, 415);
  }
  let input;
  try { input = commentInput.safeParse(await readCommentJson(request)); }
  catch (error) { return commentJson({ error: "评论内容无效或过长。" }, error instanceof Error && error.message === "body_too_large" ? 413 : 400); }
  if (!input.success || input.data.website) return commentJson({ error: "请填写 2–30 字昵称和 5–2000 字评论，昵称请勿使用官方身份。" }, 400);
  const { id } = await context.params;
  try {
    if (!await articleExists(id)) return commentJson({ error: "这篇文章暂未开放讨论。" }, 404);
    const db = createServerClient();
    if (!db) return commentJson({ error: "评论未能保存，请稍后重试。" }, 503);
    const { error } = await db.from("article_comments").insert({
      article_id: id, nickname: input.data.nickname, body: input.data.body, submission_id: input.data.submission_id,
    });
    if (error?.code === "P0429") return commentJson({ error: "提交较频繁或内容重复，请稍后再试。" }, 429);
    if (error) return commentJson({ error: "评论未能保存，请稍后重试。" }, 503);
    return commentJson({ message: "评论已提交，审核通过后将在本文下方展示。" }, 202);
  } catch { return commentJson({ error: "评论未能保存，请稍后重试。" }, 503); }
}
