import { z } from "zod";

export const publishingCategories = ["学术观点", "技术进展", "公司动态", "合作动态", "学术动态"] as const;
export const articleFields = z.object({
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().max(1000),
  content: z.string().trim().max(200000),
  category: z.enum(publishingCategories),
  byline: z.string().trim().min(1).max(120),
}).strict();
export const articleUpdate = articleFields.extend({
  version: z.number().int().nonnegative(),
  is_published: z.boolean(),
}).strict().refine(value => !value.is_published || value.content.length >= 20, { message: "发布正文至少 20 字。" });
export type ArticleFields = z.infer<typeof articleFields>;
export type PublishingArticle = ArticleFields & {
  id: string; author_id: string; is_published: boolean; version: number;
  published_at: string | null; created_at: string; updated_at: string;
};
export type PublishingMember = { user_id: string; display_name: string; active: boolean };
export type PublishingList = { member: PublishingMember; items: PublishingArticle[]; hasMore: boolean; page: number };
