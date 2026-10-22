import { requirePublisher, publishingJson, publishingColumns, publishingId, readPublishingJson } from "@/lib/publishing-server";
import { articleUpdate } from "@/lib/publishing-types";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  try {
    const auth = await requirePublisher(request);
    if (auth.response) return auth.response;
    const { id } = await context.params;
    if (!publishingId.test(id)) return publishingJson({ error: "文章不存在。" }, 404);
    let input;
    try { input = articleUpdate.safeParse(await readPublishingJson(request)); }
    catch { return publishingJson({ error: "正文无效或过长。" }, 400); }
    if (!input.success) return publishingJson({ error: "请核对文章内容和版本。" }, 400);
    const { data: existing, error: lookupError } = await auth.db.from("news").select("id,version")
      .eq("id", id).eq("author_id", auth.member.user_id).maybeSingle();
    if (lookupError) return publishingJson({ error: "暂时无法核对文章。" }, 503);
    if (!existing) return publishingJson({ error: "文章不存在或无权修改。" }, 404);
    if (existing.version !== input.data.version) return publishingJson({ error: "文章已在其他页面更新，请先复制当前编辑内容，再刷新列表。" }, 409);
    const { version, ...fields } = input.data;
    const { data, error } = await auth.db.from("news").update(fields)
      .eq("id", id).eq("author_id", auth.member.user_id).eq("version", version)
      .select(publishingColumns).maybeSingle();
    if (error) return publishingJson({ error: "文章未能保存，请稍后重试。" }, 503);
    if (!data) return publishingJson({ error: "文章版本或权限已变化，请复制当前内容后刷新。" }, 409);
    return publishingJson({ item: data });
  } catch { return publishingJson({ error: "发文服务暂不可用。" }, 503); }
}
