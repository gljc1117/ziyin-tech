import { z } from "zod";

export const demoProducts = ["医疗AI / CalcAI", "医学3D打印 / 医工造物", "数智医学中心", "其他合作"] as const;
export const demoVolumes = ["<20", "20-50", ">50", "不适用"] as const;
export const demoRequestSchema = z.object({
  name: z.string().trim().min(2, "请输入姓名").max(50, "姓名过长"),
  hospital: z.string().trim().min(2, "请输入医院或机构名称").max(120, "机构名称过长"),
  department: z.string().trim().min(1, "请选择科室").max(80),
  phone: z.string().trim().regex(/^1[3-9]\d{9}$/, "请输入有效手机号"),
  products: z.array(z.enum(demoProducts)).min(1, "请至少选择一项需求").max(demoProducts.length),
  surgery_volume: z.enum(demoVolumes, { error: "请选择月手术量或不适用" }),
  notes: z.string().trim().max(2000, "备注最多2000字").optional(),
});
export type DemoRequestData = z.infer<typeof demoRequestSchema>;

export async function handleDemoRequest(
  request: Request,
  save?: (data: DemoRequestData) => Promise<void>,
): Promise<Response> {
  let body: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > 16_384) {
      return Response.json({ success: false, error: "提交内容过长" }, { status: 413 });
    }
    body = JSON.parse(text);
  } catch {
    return Response.json({ success: false, error: "提交格式有误，请重新填写" }, { status: 400 });
  }
  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ success: false, error: "请检查必填信息及内容长度" }, { status: 400 });
  }
  if (!save) {
    return Response.json({ success: false, error: "预约服务暂不可用，本次信息未保存，请稍后重试" }, { status: 503 });
  }
  try {
    await save(parsed.data);
    return Response.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ success: false, error: "暂未确认预约保存成功，请稍后重试" }, { status: 503 });
  }
}
