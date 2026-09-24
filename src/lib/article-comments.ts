import { z } from "zod";

export const commentStatuses = { pending: "待审核", approved: "已公开", hidden: "已隐藏" } as const;
export type CommentStatus = keyof typeof commentStatuses;
export const commentArticleId = /^[a-z0-9][a-z0-9-]{0,159}$/;
export const publicCommentColumns = "id,article_id,nickname,body,created_at,official_reply,replied_at";
export function allowsComments(article: { category: string }) {
  return ["学术观点", "学术动态"].includes(article.category);
}
export const commentInput = z.object({
  nickname: z.string().trim().min(2).max(30).refine(value => !/[<>\r\n]/.test(value) && !/子殷|官方|管理员/.test(value)),
  body: z.string().trim().min(5).max(2000),
  submission_id: z.uuid(),
  website: z.string().max(200).optional(),
}).strict();
export const moderationInput = z.object({
  status: z.enum(["pending", "approved", "hidden"]),
  official_reply: z.string().trim().max(2000),
  version: z.number().int().nonnegative(),
}).strict();
export type PublicComment = {
  id: string; article_id: string; nickname: string; body: string; created_at: string;
  official_reply: string | null; replied_at: string | null;
};
export type StaffComment = PublicComment & { status: CommentStatus; version: number; article_title: string };
export type CommentPage = { items: PublicComment[]; page: number; hasMore: boolean };
export type StaffCommentPage = { items: StaffComment[]; page: number; hasMore: boolean };
export function commentPage(value: string | null) {
  const page = Number(value || 1);
  return Number.isInteger(page) && page > 0 && page <= 10000 ? page : 1;
}
export function commentDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}

export function commentJson(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
// Bound the stream itself, including requests without a Content-Length header.
export async function readCommentJson(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_body");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 12288) { await reader.cancel(); throw new Error("body_too_large"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
