import { createClient } from "@supabase/supabase-js";
import { staffJson } from "./staff-server";
import type { PublishingMember } from "./publishing-types";

export { staffJson as publishingJson };
export const publishingColumns = "id,title,summary,content,category,byline,author_id,is_published,version,published_at,created_at,updated_at";
export const publishingId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function requirePublisher(request: Request) {
  const token = request.headers.get("authorization")?.match(/^Bearer (\S+)$/i)?.[1];
  if (!token) return { response: staffJson({ error: "请先登录官网发文账号。" }, 401) } as const;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { response: staffJson({ error: "发文服务暂不可用。" }, 503) } as const;
  const db = createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const { data: { user }, error } = await db.auth.getUser(token);
  if (error || !user) return { response: staffJson({ error: "登录已失效，请重新登录。" }, 401) } as const;
  const { data: member, error: memberError } = await db.from("website_publishers")
    .select("user_id,display_name,active").eq("user_id", user.id).eq("active", true).maybeSingle();
  if (memberError) return { response: staffJson({ error: "发文权限服务暂不可用。" }, 503) } as const;
  if (!member) return { response: staffJson({ error: "此账号尚未开通官网发文权限，请联系管理员。" }, 403) } as const;
  return { db, member: member as PublishingMember } as const;
}

export async function readPublishingJson(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new Error("invalid_content_type");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("missing_body");
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 1000000) { await reader.cancel(); throw new Error("body_too_large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const all = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { all.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(all));
}
