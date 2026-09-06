import { z } from "zod";
const modelSchema = z.object({
  name: z.string().min(1).max(100),
  format: z.string().refine((value) => value.toLowerCase() === "stl"),
  url: z.string().url().refine((value) => {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "pangu-models-1376181172.cos.ap-shanghai.myqcloud.com" &&
      url.pathname.startsWith("/models/") && !url.username && !url.password;
  }),
  size_mb: z.number().finite().nonnegative(),
  md5: z.string().optional(),
});
const manifestSchema = z.object({
  case_id: z.string().min(1),
  generated_at: z.string(),
  models: z.array(modelSchema).min(1).max(200).refine((models) =>
    new Set(models.map((model) => model.url)).size === models.length &&
    new Set(models.map((model) => model.name)).size === models.length),
});
export function parseManifest(input: unknown) {
  const result = manifestSchema.safeParse(input);
  if (!result.success) throw new Error("模型清单为空或格式不受支持");
  return result.data;
}
