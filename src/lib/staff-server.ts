import { createClient } from "@supabase/supabase-js";
import type { StaffMember } from "./staff-types";

export function staffJson(data: unknown, status = 200) {
  return Response.json(data, { status, headers: {
    "Cache-Control": "private, no-store, max-age=0", "Vary": "Authorization",
    "X-Robots-Tag": "noindex, nofollow",
  } });
}

export async function requireStaff(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
  if (!token) return { response: staffJson({ error: "请先登录员工账号。" }, 401) } as const;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { response: staffJson({ error: "员工服务暂不可用。" }, 503) } as const;
  // A new client per request; no service-role key and no shared auth state.
  const db = createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data: { user }, error } = await db.auth.getUser(token);
  if (error || !user) return { response: staffJson({ error: "登录已失效，请重新登录。" }, 401) } as const;
  const { data: member, error: memberError } = await db.from("staff_members")
    .select("user_id,display_name,role,active").eq("user_id", user.id).eq("active", true).maybeSingle();
  if (memberError) return { response: staffJson({ error: "权限服务暂不可用，请稍后重试。" }, 503) } as const;
  if (!member) return { response: staffJson({ error: "此账号尚未开通合作需求管理权限，请联系管理员。" }, 403) } as const;
  return { db, member: member as StaffMember } as const;
}

export const inquiryIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
