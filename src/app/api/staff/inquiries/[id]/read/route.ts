import { inquiryIdPattern, requireStaff, staffJson } from "@/lib/staff-server";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireStaff(request);
  if (auth.response) return auth.response;
  const { id } = await context.params;
  if (!inquiryIdPattern.test(id)) return staffJson({ error: "需求不存在。" }, 404);
  const { error } = await auth.db.from("inquiry_reads").upsert({ user_id: auth.member.user_id, inquiry_id: id }, { onConflict: "user_id,inquiry_id", ignoreDuplicates: true });
  if (error) return staffJson({ error: "未能更新已读状态，请重试。" }, 503);
  return staffJson({ success: true });
}
