import { requirePublisher, publishingJson, publishingColumns, readPublishingJson } from "@/lib/publishing-server";
import { articleFields } from "@/lib/publishing-types";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const auth = await requirePublisher(request);
    if (auth.response) return auth.response;
    const rawPage = Number(new URL(request.url).searchParams.get("page") || 1);
    const page = Number.isInteger(rawPage) && rawPage > 0 && rawPage <= 10000 ? rawPage : 1;
    const { data, error } = await auth.db.from("news").select(publishingColumns)
      .eq("author_id", auth.member.user_id).order("updated_at", { ascending: false })
      .order("id", { ascending: false }).range((page - 1) * 20, page * 20);
    if (error) return publishingJson({ error: "文章暂时无法加载。" }, 503);
    return publishingJson({ member: auth.member, items: (data || []).slice(0, 20), page, hasMore: (data || []).length > 20 });
  } catch { return publishingJson({ error: "发文服务暂不可用。" }, 503); }
}

export async function POST(request: Request) {
  try {
    const auth = await requirePublisher(request);
    if (auth.response) return auth.response;
    let input;
    try { input = articleFields.safeParse(await readPublishingJson(request)); }
    catch { return publishingJson({ error: "正文无效或过长，请缩减后重试。" }, 400); }
    if (!input.success) return publishingJson({ error: "请核对标题、署名、栏目和正文长度。" }, 400);
    const { data, error } = await auth.db.from("news")
      .insert({ ...input.data, author_id: auth.member.user_id }).select(publishingColumns).single();
    if (error) return publishingJson({ error: "草稿未能保存，请稍后重试。" }, 503);
    return publishingJson({ item: data }, 201);
  } catch { return publishingJson({ error: "发文服务暂不可用。" }, 503); }
}
