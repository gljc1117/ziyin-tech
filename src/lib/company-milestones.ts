import { getNewsArticles } from "./company-news";

export interface CompanyMilestone {
  sortDate: string;
  date: string;
  text: string;
  source?: "公司资料" | "公众号资料" | "申请受理文件" | "官网动态";
  href?: string;
}

const RECORDED_MILESTONES: CompanyMilestone[] = [
  { sortDate: "2018-06", date: "2018.6", text: "研发团队在上海成立" },
  { sortDate: "2019-01", date: "2019.1", text: "极视AI 3DRston V1.0 研发成功" },
  { sortDate: "2020-01", date: "2020.1", text: "上海子殷科技有限公司正式成立" },
  {
    sortDate: "2020-12",
    date: "2020.12",
    text: "入驻内蒙古和林格尔新区智能制造产业园；Cloud OS 1.0 发布",
  },
  {
    sortDate: "2021-01",
    date: "2021",
    text: "获科技型中小企业认定；自治区首家医学3D打印中心投产；启动NMPA注册申请",
  },
  {
    sortDate: "2023-04",
    date: "2023.4",
    text: "截骨导板获批医疗器械注册证并纳入国家医保编码",
  },
  {
    sortDate: "2023-07",
    date: "2023.7",
    text: "成立创新联合体；骨模型、器官模型获医疗器械注册证",
  },
  {
    sortDate: "2024-04-01",
    date: "2024.4",
    text: "通过CE认证与ISO 13485质量管理体系认证",
    source: "公司资料",
  },
  {
    sortDate: "2024-04-26",
    date: "2024.4.26",
    text: "与内蒙古医科大学第二附属医院关节外科开展个性化截骨导板辅助全膝关节置换实践",
    source: "公众号资料",
  },
  {
    sortDate: "2024-05-23",
    date: "2024.5.23",
    text: "与中国科学院力学研究所团队围绕“数字心脏”研发方向开展交流",
    source: "公众号资料",
  },
  {
    sortDate: "2024-07-16",
    date: "2024.7.16",
    text: "与内蒙古医科大学第二附属医院景尚斐团队完成首项科技成果转化，转化金额30万元",
    source: "公众号资料",
  },
  {
    sortDate: "2024-09-01",
    date: "2024.9",
    text: "与上海市第六人民医院数字化医疗中心建立合作",
    source: "公司资料",
  },
  {
    sortDate: "2024-09-23",
    date: "2024.9.23",
    text: "发布高分子PEEK骨科夹持器，推进产品验证与成果转化",
    source: "公众号资料",
  },
  {
    sortDate: "2024-11-06",
    date: "2024.11.6",
    text: "提供设计与3D打印支持，协助国家骨科医学中心开展微创拇外翻Spear Plate髓内板矫形手术",
    source: "公众号资料",
  },
  {
    sortDate: "2024-11-16",
    date: "2024.11.16",
    text: "参加上海足踝外科医工企创新论坛暨第一届足踝支具辅具创意工坊秀",
    source: "公众号资料",
  },
  {
    sortDate: "2025-02-28",
    date: "2025.2.28",
    text: "在和林格尔新区科技成果转化大会签署PEEK材料智能骨折固位器成果转化协议，并达成数据管理项目合作意向",
    source: "公众号资料",
  },
  {
    sortDate: "2025-03-09",
    date: "2025.3.9",
    text: "与内蒙古工业大学开展守拙工坊数字化医疗与3D打印实践训练，完成为期四周的学生实习",
    source: "公众号资料",
  },
  {
    sortDate: "2025-05-14",
    date: "2025.5.14",
    text: "参加北京大学人民医院第三届科技创新转化月，合作转化的“负压吸引器”项目在创新转化大赛亮相",
    source: "公众号资料",
  },
  {
    sortDate: "2025-06-16",
    date: "2025.6.16",
    text: "参与广元市第一人民医院医学3D打印创新研究中心建设与运行",
    source: "公众号资料",
  },
  {
    sortDate: "2025-09-03",
    date: "2025.9.3",
    text: "与内蒙古医科大学第二附属医院联合研发的高分子PEEK骨科夹持器纳入国家医保信息业务编码标准数据库",
    source: "公众号资料",
  },
  {
    sortDate: "2026-04-09",
    date: "2026.4.9",
    text: "内蒙古子殷科技获内蒙古数据要素综合服务中心医疗健康行业数据服务商认证，数商证书编号NMG2604001（有效期至2027.4.9）",
    source: "公众号资料",
  },
  {
    sortDate: "2026-08-13",
    date: "2026.8.13",
    text: "上海市第六人民医院与上海子殷科技有限公司共同申请的“一种基于多模态数据的跟骨骨折AI复位方法”发明专利获国家知识产权局受理（申请号202611224126.6）",
    source: "申请受理文件",
  },
];

const TIMELINE_NEWS_CATEGORIES = new Set(["合作动态", "学术动态", "技术进展"]);

function formatTimelineDate(eventDate: string) {
  const [year, month, day] = eventDate.split("-");
  return [year, month ? String(Number(month)) : null, day ? String(Number(day)) : null]
    .filter(Boolean)
    .join(".");
}

// Approved website reporting from 2026 onward is merged into the timeline.
// Video watch-entry pages are deliberately excluded by the category allowlist.
const approvedNewsMilestones: CompanyMilestone[] = getNewsArticles()
  .filter(
    (article) =>
      article.eventDate >= "2026-01" && TIMELINE_NEWS_CATEGORIES.has(article.category),
  )
  .map((article) => ({
    sortDate: article.eventDate,
    date: formatTimelineDate(article.eventDate),
    text: article.title,
    source: "官网动态",
    href: `/news/${article.id}`,
  }));

export const COMPANY_MILESTONES = [...RECORDED_MILESTONES, ...approvedNewsMilestones].sort(
  (left, right) => left.sortDate.localeCompare(right.sortDate),
);

export const COMPANY_TIMELINE_UPDATED_LABEL =
  COMPANY_MILESTONES.at(-1)?.date ?? "2026";
