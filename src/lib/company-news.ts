import { DEVELOPMENT_VALIDATION } from "./development-validation";
import { UNDERSTANDING_DEEP_LEARNING } from "./understanding-deep-learning";
import { CULTURE_EVERYDAY_WORK } from "./culture-everyday-work";
import { RUNX2_SCAFFOLD_REGENERATION } from "./runx2-scaffold-regeneration";
import { MEDICAL_AI_VALUE_EVALUATION } from "./medical-ai-value-evaluation";
import { CHCOMCT_SM_APPROVAL } from "./chcomct-sm-approval";
import { ORGANIZATIONAL_COGNITION } from "./organizational-cognition";
import { RESPONSIBLE_CLINICAL_AI } from "./responsible-clinical-ai";
import { MEDICAL_AI_REGULATION } from "./medical-ai-regulation";
import { GRANT_DECISION_FRAMEWORK } from "./grant-decision-framework";
import { RECURSIVE_INSTRUMENTS_REVIEW } from "./recursive-instruments-review";
import { XIAOGAN_LUNG_BIOPSY } from "./xiaogan-lung-biopsy";
import { RSI_COMMENTARY } from "./rsi-commentary";
import { FLY_CONNECTOME_REVIEW } from "./fly-connectome-review";
import { AI_WORKFORCE_COMMENTARY } from "./ai-workforce-commentary";
import { getEditorialArticles, type EditorialArticle, type EditorialImage } from "./editorial-content";

import { PHYSICAL_EXAM_COMMENTARY } from "./physical-exam-commentary";

// Company reporting can be published as news without creating a clinical case.
export type CompanyNewsArticle = Omit<EditorialArticle, "caseProfile"> & {
  sourceAttribution?: string;
  numberedReferences?: boolean;
  hideCover?: boolean;
  referenceNote?: string;
  sectionTables?: Record<string, { caption: string; columns: string[]; rows: string[][] }>;
  sectionImages?: Record<string, EditorialImage>;
  officialVideo?: {
    publisher: string;
    title: string;
    url: string;
  };
};

export const COMPANY_NEWS_ARTICLES: CompanyNewsArticle[] = [
DEVELOPMENT_VALIDATION,
UNDERSTANDING_DEEP_LEARNING,
CULTURE_EVERYDAY_WORK,
RUNX2_SCAFFOLD_REGENERATION,
MEDICAL_AI_VALUE_EVALUATION,
CHCOMCT_SM_APPROVAL,
ORGANIZATIONAL_COGNITION,
RESPONSIBLE_CLINICAL_AI,
MEDICAL_AI_REGULATION,
GRANT_DECISION_FRAMEWORK,
RECURSIVE_INSTRUMENTS_REVIEW,
XIAOGAN_LUNG_BIOPSY,
RSI_COMMENTARY,
FLY_CONNECTOME_REVIEW,
AI_WORKFORCE_COMMENTARY,
PHYSICAL_EXAM_COMMENTARY,
{
  "id": "xiaogan-smart-medicine-research-20260820",
  "title": "调研赋能医工融合，聚力数智医学发展",
  "summary": "2026年8月20日上午，孝感市卫生健康委员会主任蔡凤珍、孝感市中心医院副院长张海燕、科研办主任包佩玲一行，来到孝感市中心医院数智医学与临床转化中心参观调研，了解中心建设成果、临床转化案例与医学3D打印技术应用。",
  "category": "合作动态",
  "eventDate": "2026-08-20",
  "dateLabel": "2026年8月20日",
  "sourceTitle": "调研赋能医工融合 聚力数智医学发展",
  "sourceAttribution": "内容依据《调研赋能医工融合 聚力数智医学发展》原始图文稿整理。",
  "sourcePublishedAt": "2026-08-20T00:00:00+08:00",
  "status": "approved",
  "cover": {
    "url": "/images/news/xiaogan-smart-medicine-research-20260820/research-tour.png",
    "alt": "调研组在数智医学与临床转化中心参观交流",
    "width": 1080,
    "height": 796
  },
  "gallery": [],
  "sectionImages": {
    "建设医学实践教学阵地": {
      "url": "/images/news/xiaogan-smart-medicine-research-20260820/research-exchange.jpg",
      "alt": "调研组听取中心工作介绍并交流建设建议",
      "width": 1080,
      "height": 991
    }
  },
  "references": [],
  "sections": [
    {
      "heading": "调研组走进数智医学与临床转化中心",
      "paragraphs": [
        "为进一步推动医工交叉成果落地，拓宽3D打印医学技术临床服务覆盖面，赋能医学人才培养，孝感市卫生健康委员会主任蔡凤珍、孝感市中心医院副院长张海燕、科研办主任包佩玲一行来到中心参观调研。",
        "中心工作人员肖子豪、李婉、张玉桂全程陪同接待，结合成果展示与现场交流，介绍中心建设进展和前沿技术应用。"
      ]
    },
    {
      "heading": "从数字化建模到临床转化",
      "paragraphs": [
        "调研组参观了中心成果展示区，听取中心在技术研发、临床转化案例等方面的工作汇报。中心工程设计师肖子豪重点讲解3D打印技术在骨科领域的临床应用，围绕骨科三维重建与复位、膝关节置换手术导板、术前手术规划等特色业务作了介绍。",
        "结合现场实物展品，中心展示了数字化建模、个性化手术导板制备、康复矫形辅具定制等工作从设计到落地应用的流程，直观呈现数智医学技术在精准外科与康复诊疗中的应用方式。"
      ]
    },
    {
      "heading": "建设医学实践教学阵地",
      "paragraphs": [
        "现场交流过程中，蔡凤珍主任、张海燕副院长、包佩玲主任对中心“医工造物、数智转化、临床转化”的建设定位与现阶段工作成果给予肯定，并对中心后续发展提出指导意见。",
        "蔡凤珍主任指出，中心拥有良好的实践教学资源，可进一步建设医学实践教学阵地，支持相关专业学生实地参观学习，近距离了解数智医学技术，促进理论学习与临床实践衔接，助力培养复合型医工交叉人才。"
      ]
    },
    {
      "heading": "加强科普，让更多人客观认识数智医学",
      "paragraphs": [
        "蔡凤珍主任特别强调，当前大众乃至部分患者对数智医学仍存在认知信息差。数智医学技术属于临床诊疗辅助手段，可为部分存在个性化诊疗、康复干预需求的人群提供新的方案参考，但许多具有潜在应用需求的群众对此并不了解。",
        "中心后续要持续加强科普宣传，拓宽传播渠道，引导群众客观认识数智医学的适用范围，更好服务有相应需求的人群。"
      ]
    },
    {
      "heading": "逐项落实调研建议",
      "paragraphs": [
        "此次调研指导既是对中心前期工作的肯定，也为后续建设明确了方向。下一步，数智医学与临床转化中心将结合本次调研建议，有序推进以下工作："
      ],
      "items": [
        "积极搭建医学生实践教学平台，发挥科普育人职能；",
        "持续深耕骨科三维重建、手术导板、康复矫形、术前规划等精准医疗相关业务；",
        "深化医工产学研协同创新，有序推进数智医学成果向临床转化，为有需要的人群提供更加优质、个性化的智慧医疗服务。"
      ]
    }
  ]
},
{
  "id": "xiaogan-orthopedics-3d-printing-video-2026",
  "title": "孝感市中心医院发布《骨科黑科技，3D打印深度科普》科普视频",
  "summary": "湖北省孝感市中心医院通过官方视频号发布《骨科黑科技，3D打印深度科普》。子殷科技官网现提供官方观看入口，方便关注医学3D打印的读者查看原片。",
  "category": "视频科普",
  "eventDate": "2026-09-13",
  "dateLabel": "2026年9月13日",
  "sourceTitle": "骨科黑科技，3D打印深度科普",
  "sourceAttribution": "内容来源：湖北省孝感市中心医院官方视频号《骨科黑科技，3D打印深度科普》。",
  "sourcePublishedAt": "2026-09-13T00:00:00+08:00",
  "status": "approved",
  "cover": {
    "url": "/images/news/xiaogan-orthopedics-video-2026/watch-entry.svg",
    "alt": "孝感市中心医院骨科3D打印科普视频官方观看入口",
    "width": 1600,
    "height": 900
  },
  "gallery": [],
  "officialVideo": {
    "publisher": "湖北省孝感市中心医院",
    "title": "骨科黑科技，3D打印深度科普",
    "url": "https://weixin.qq.com/sph/AFyQ0Vs2EV"
  },
  "references": [
    {
      "title": "湖北省孝感市中心医院官方视频号观看入口",
      "url": "https://weixin.qq.com/sph/AFyQ0Vs2EV",
      "verification": "search_summary"
    }
  ],
  "sections": [
    {
      "heading": "医院官方视频",
      "paragraphs": [
        "该视频由湖北省孝感市中心医院发布，主题为骨科3D打印科普。点击页面中的观看按钮，或使用微信扫描二维码，即可前往医院官方视频号查看原片。"
      ]
    },
    {
      "heading": "内容以医院原片为准",
      "paragraphs": [
        "本页现阶段作为官方视频观看入口，不对采访观点作二次转述。后续如取得经授权的原始视频文件，将在完成内容核对后更新站内播放与采访摘要。"
      ]
    }
  ]
},
{
  "id": "calcai-shanghai-sixth-foot-ankle-alliance-2026",
  "title": "子殷科技亮相上海六院足踝联盟大会，汇报CalcAI跟骨骨折智能复位科研进展",
  "summary": "2026年9月11日，子殷科技总经理李冬冬代表公司，在上海市第六人民医院国家骨科医学中心足踝联盟大会上作项目汇报，介绍CalcAI跟骨骨折智能复位辅助系统的科研进展，并结合软件界面与病例展示，交流复杂跟骨骨折的三维观察、复位方案比较与局部复核方法。",
  "category": "学术动态",
  "eventDate": "2026-09-11",
  "dateLabel": "大会日期 · 2026年9月11日",
  "sourceTitle": "子殷科技亮相上海六院足踝联盟大会，汇报CalcAI跟骨骨折智能复位科研进展",
  "sourcePublishedAt": "2026-09-11T00:00:00+08:00",
  "status": "approved",
  "cover": {
    "url": "/images/news/calcai-alliance-20260911/conference-group.jpg",
    "alt": "足踝联盟大会参会同道合影",
    "width": 1440,
    "height": 959
  },
  "gallery": [],
  "sectionImages": {
    "聚焦复杂跟骨骨折，展示医工协同研发进展": {
      "url": "/images/news/calcai-alliance-20260911/conference-report.jpg",
      "alt": "李冬冬在大会现场介绍子殷科技及CalcAI研发方向",
      "width": 2048,
      "height": 1536
    },
    "从三维观察到复位候选方案比较": {
      "url": "/images/news/calcai-alliance-20260911/bone-fragments.jpg",
      "alt": "现场展示骨块独立呈现与多方向观察功能",
      "width": 2048,
      "height": 1536
    },
    "以021病例展示整体检查与局部复核": {
      "url": "/images/news/calcai-alliance-20260911/local-review.jpg",
      "alt": "021病例展示从整体定位到局部放大检查的复核过程",
      "width": 2048,
      "height": 1536
    },
    "面向联盟协作，推进病例研究与应用反馈": {
      "url": "/images/news/calcai-alliance-20260911/research-collaboration.jpg",
      "alt": "汇报结束时邀请联盟同道参与病例验证与应用反馈",
      "width": 2048,
      "height": 1536
    }
  },
  "references": [],
  "sections": [
    {
      "heading": "聚焦复杂跟骨骨折，展示医工协同研发进展",
      "paragraphs": [
        "本次足踝外科专科联盟第三次会议暨足踝联盟学术研讨会在上海举行。李冬冬围绕“跟骨骨折复位智能体模型开发和验证”进行汇报，介绍子殷科技与六院临床团队围绕CalcAI开展的研发工作。这也是子殷科技首次在该联盟大会上作项目汇报。",
        "CalcAI聚焦复杂跟骨骨折中的骨块空间关系与复位参考问题，探索将临床需求转化为可操作、可比较、可复核的数字医学工具。六院临床团队指导复位目标与评价标准的确定，子殷科技承担软件开发，并协助开展数据验证。"
      ]
    },
    {
      "heading": "从三维观察到复位候选方案比较",
      "paragraphs": [
        "本次展示的研究版以已分割的三维骨块模型为起点。导入模型后，使用者可通过颜色与标签定位骨块，并通过旋转、放大和多方向观察，检查骨块位置及相互关系，为病例讨论提供直观的三维参照。",
        "在此基础上，系统结合骨块关系与接触约束计算复位候选方案，支持与复位前状态进行比较。候选方案作为可供检查的研究参考，由医生结合具体病例审阅，判断仍需调整的位置。"
      ]
    },
    {
      "heading": "以021病例展示整体检查与局部复核",
      "paragraphs": [
        "汇报以保留14个骨块的021病例展示复核过程：先从不同方向观察整体轮廓，再定位关注骨块，沿同一方向放大，进一步检查边界、接触与遮挡情况。",
        "软件同时提供形态偏差、骨块重叠等量化信息，提示需要重点检查的位置。三维图像与量化结果共同构成讨论依据，具体复位方案仍需由医生审阅判断。"
      ]
    },
    {
      "heading": "以病例验证和临床反馈推动持续改进",
      "paragraphs": [
        "项目围绕“明确临床问题—形成计算规则—开展病例检查—收集医生反馈”的路径推进。研发团队通过临床与工程协作，将复位目标逐步转化为软件功能和评价方法，并依据病例复核结果持续改进。",
        "目前，CalcAI处于科研研发与验证阶段，重点用于病例研究、方案比较和医生复核。系统在规划效率、结果一致性及临床应用方面的实际价值，仍需通过后续研究进一步检验。"
      ]
    },
    {
      "heading": "面向联盟协作，推进病例研究与应用反馈",
      "paragraphs": [
        "此次大会为项目与联盟医院开展交流提供了平台。下一步，子殷科技计划在六院临床团队指导下，与有意参与的医院共同讨论病例、完善评价方法，收集不同临床场景下的使用需求，并结合各中心的伦理审批与数据使用要求推进后续研究。",
        "随着研发和验证工作的深入，团队还将探索复位参考与置钉规划、生物力学评价、个体化导板及三维打印的衔接，逐步积累支撑后续转化的研究依据。"
      ]
    },
    {
      "heading": "关于子殷科技",
      "paragraphs": [
        "子殷科技围绕医疗AI、医学3D打印与临床转化中心共建开展研发、生产和技术服务，连接医学影像处理、数字化设计、模型与导板制造及医工科研协作。公司将继续以具体临床问题为起点，把医生反馈落实到工具改进与科研验证中。"
      ]
    }
  ],
  "sourceAttribution": "根据子殷科技提供的大会汇报图文材料整理。图片为大会现场记录；本文于2026年9月24日更新。"
}
];

export function getNewsArticles(preview = process.env.WEBSITE_CONTENT_PREVIEW === "1"): (EditorialArticle | CompanyNewsArticle)[] {
  return [...getEditorialArticles(preview), ...COMPANY_NEWS_ARTICLES.filter((item) =>
    item.status === "approved" || (preview && item.status === "candidate"))];
}

export function getNewsArticle(id: string, preview = process.env.WEBSITE_CONTENT_PREVIEW === "1") {
  return getNewsArticles(preview).find((item) => item.id === id);
}
