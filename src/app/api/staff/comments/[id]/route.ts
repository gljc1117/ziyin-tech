import { inquiryIdPattern, requireStaff, staffJson } from "@/lib/staff-server";
import { allowsComments, moderationInput, readCommentJson } from "@/lib/article-comments";
import { getPublishedNews } from "@/lib/published-news";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireStaff(request);
    if (auth.response) return auth.response;
    const { id } = await context.params;
    if (!inquiryIdPattern.test(id)) return staffJson({ error: "评论编号无效。" }, 400);
    let input;
    try { input = moderationInput.safeParse(await readCommentJson(request)); }
    catch { return staffJson({ error: "提交内容无效或过长。" }, 400); }
    if (!input.success) return staffJson({ error: "请核对审核状态和回复（最多 2000 字）。" }, 400);
    if (input.data.status === "approved") {
      const { data, error } = await auth.db.from("article_comments").select("article_id").eq("id", id).maybeSingle();
      if (error) return staffJson({ error: "无法核对文章，请稍后重试。" }, 503);
      if (!data) return staffJson({ error: "评论不存在或无权操作。" }, 404);
      if (!(await getPublishedNews()).some(article => article.id === data.article_id && allowsComments(article))) {
        return staffJson({ error: "文章已下线或未开放讨论，无法公开此评论。" }, 400);
      }
    }
    const { data, error } = await auth.db.from("article_comments")
      .update({ status: input.data.status, official_reply: input.data.official_reply || null })
      .eq("id", id).eq("version", input.data.version).select("id,version").maybeSingle();
    if (error) return staffJson({ error: "保存失败，请稍后重试。" }, 503);
    if (!data) return staffJson({ error: "评论已被其他同事更新，请刷新列表后再操作。" }, 409);
    return staffJson({ message: "已保存。", version: data.version });
  } catch { return staffJson({ error: "评论服务暂不可用，请稍后重试。" }, 503); }
}
