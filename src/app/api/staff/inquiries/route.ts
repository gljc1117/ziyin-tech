import { requireStaff, staffJson } from "@/lib/staff-server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireStaff(request);
  if (auth.response) return auth.response;
  const { db, member } = auth;
  const params = new URL(request.url).searchParams;
  const parsedPage = Number(params.get("page") || 1);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? Math.min(parsedPage, 100000) : 1;
  const pageSize = 20;
  // Strip PostgREST filter syntax and LIKE wildcards from free-text input.
  const search = (params.get("q") || "").slice(0, 80).replace(/[,().%_\\"']/g, " ").trim();
  const status = params.get("status");
  const scope = params.get("scope");
  let query = db.from("staff_inquiry_overview").select("*", { count: "exact" });
  if (search) query = query.or(`doctor_name.ilike.%${search}%,hospital_name.ilike.%${search}%,phone.ilike.%${search}%`);
  if (status && ["pending", "contacted", "converted"].includes(status)) query = query.eq("status", status);
  if (scope === "unread") query = query.eq("has_read", false);
  if (scope === "mine") query = query.eq("assigned_to", member.user_id);
  if (scope === "unassigned") query = query.is("assigned_to", null);
  const [list, unread, pending, mine, total, newest, members] = await Promise.all([
    query.order("created_at", { ascending: false }).order("id", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1),
    db.from("staff_inquiry_overview").select("id", { count: "exact", head: true }).eq("has_read", false),
    db.from("demo_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
    db.from("demo_requests").select("id", { count: "exact", head: true }).eq("assigned_to", member.user_id),
    db.from("demo_requests").select("id", { count: "exact", head: true }),
    db.from("demo_requests").select("id").order("created_at", { ascending: false }).order("id", { ascending: false }).limit(1),
    db.from("staff_members").select("user_id,display_name,role,active").order("display_name"),
  ]);
  if ([list, unread, pending, mine, total, newest, members].some(result => result.error)) {
    return staffJson({ error: "需求暂时无法加载，请稍后重试。" }, 503);
  }
  return staffJson({ items: list.data, total: list.count, page, pageSize,
    stats: { unread: unread.count, pending: pending.count, mine: mine.count, total: total.count },
    newestId: newest.data?.[0]?.id || null, member, members: members.data });
}
