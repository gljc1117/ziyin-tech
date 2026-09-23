import type { PublishedNewsItem } from "./news-types";
export const NEWS_CHANNELS = [
  "全部",
  "企业动态",
  "项目实践",
  "子殷洞察",
] as const;
export type NewsChannel = (typeof NEWS_CHANNELS)[number];
export function newsChannel(category: string): NewsChannel {
  if (category === "学术观点") return "子殷洞察";
  if (["合作动态", "技术进展", "学术动态", "视频科普"].includes(category))
    return "项目实践";
  return "企业动态";
}
const shortTitles: Record<string, string> = {
  "chcomct-sm-medical-imaging-approval-20260922":
    "Chcomct SM 获第二类医疗器械注册证",
  "organizational-cognition-self-correction-20260922": "从个人判断到组织认知",
  "specialty-ai-closed-loop-productization-20260920":
    "从大平台到专科闭环：医疗AI的产品化路径",
  "responsible-clinical-ai-six-rules-20260919": "医生如何负责任地使用人工智能",
  "medical-ai-regulation-nmpa-fda-20260917":
    "从NMPA到FDA：医疗AI的规范化与临床落地",
  "calcai-shanghai-sixth-foot-ankle-alliance-2026":
    "CalcAI亮相上海六院足踝联盟大会",
  "henan-tcm-3d-printing-service-2026": "河南中医附一医学3D打印服务项目成交",
  "xiaogan-medical-center-2026": "孝感数智医学与临床转化中心启动",
  "xiaogan-lung-biopsy-3d-guide-20260915": "个体化3D打印导板辅助肺穿刺活检",
};
export function newsDisplayTitle(item: PublishedNewsItem) {
  return shortTitles[item.id] || item.title;
}
export function filterNews(
  items: PublishedNewsItem[],
  channel: NewsChannel,
  query: string,
) {
  const term = query.trim().toLocaleLowerCase();
  return items.filter(
    (item) =>
      (channel === "全部" || newsChannel(item.category) === channel) &&
      (!term ||
        `${item.title} ${item.summary || ""}`
          .toLocaleLowerCase()
          .includes(term)),
  );
}
