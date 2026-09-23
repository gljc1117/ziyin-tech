import { z } from "zod";
import { inquiryIdPattern, requireStaff, staffJson } from "@/lib/staff-server";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
const updateSchema = z.object({
  version: z.number().int().min(0), status: z.enum(["pending", "contacted", "converted"]),
  assigned_to: z.uuid().nullable(), note: z.string().trim().max(2000).optional(),
}).strict();

export async function GET(request: Request, context: Context) {
  const auth = await requireStaff(request);
  if (auth.response) return auth.response;
  const { id } = await context.params;
  if (!inquiryIdPattern.test(id)) return staffJson({ error: "需求不存在。" }, 404);
  const [inquiry, activity] = await Promise.all([
    auth.db.from("staff_inquiry_overview").select("*").eq("id", id).maybeSingle(),
    auth.db.from("inquiry_activity").select("id,actor_id,kind,body,changes,created_at").eq("inquiry_id", id).order("created_at", { ascending: false }).limit(100),
  ]);
  if (inquiry.error || activity.error) return staffJson({ error: "详情暂时无法加载，请重试。" }, 503);
  if (!inquiry.data) return staffJson({ error: "需求不存在。" }, 404);
  return staffJson({ inquiry: inquiry.data, activity: activity.data });
}

export async function PATCH(request: Request, context: Context) {
  const auth = await requireStaff(request);
  if (auth.response) return auth.response;
  const { id } = await context.params;
  if (!inquiryIdPattern.test(id)) return staffJson({ error: "需求不存在。" }, 404);
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 12000) return staffJson({ error: "跟进内容过长。" }, 413);
  let input;
  try { input = updateSchema.safeParse(JSON.parse(raw)); } catch { return staffJson({ error: "请检查填写内容。" }, 400); }
  if (!input.success) return staffJson({ error: "请检查状态、负责人和跟进内容（最多 2000 字）。" }, 400);
  const { error } = await auth.db.rpc("staff_save_inquiry", {
    request_id: id, expected_version: input.data.version, next_status: input.data.status,
    next_assignee: input.data.assigned_to, followup: input.data.note || null,
  });
  if (error?.code === "40001") return staffJson({ error: "这条需求已被其他同事更新。请刷新详情，确认后再保存。" }, 409);
  if (error?.code === "42501") return staffJson({ error: "分派给其他同事需要管理员权限。" }, 403);
  if (error?.code === "22023") return staffJson({ error: "负责人已停用或状态无效，请刷新后重试。" }, 400);
  if (error) return staffJson({ error: "保存失败，填写内容已保留，请重试。" }, 503);
  return staffJson({ success: true });
}
