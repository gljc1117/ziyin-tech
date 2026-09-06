import type { CaseCategory, ClinicalCase } from "./types";

export interface EditorialImage { url: string; alt: string; width: number; height: number; }
export interface EditorialArticle {
  id: string; title: string; summary: string; category: string;
  eventDate: string; dateLabel: string; sourceTitle: string;
  sourcePublishedAt: string | null; status: "candidate" | "approved" | "withdrawn";
  cover: EditorialImage; gallery: EditorialImage[];
  references: { title: string; url: string; verification: "primary_full_text" | "search_summary" }[];
  sections: { heading: string; paragraphs: string[]; items?: string[] }[];
  caseProfile: {
    title: string; category: CaseCategory; phase: string; hospital: string; department: string;
    need: string; work: string; result: string; deliverables: string[]; boundary: string;
  };
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    "caseProfile": {
      "boundary": "以上为采购服务范围，不能视为所有项目已经完成交付或验收。",
      "category": "service_project",
      "deliverables": [
        "医学影像处理与三维规划服务",
        "非植入模型、手术导板及康复支具打印服务",
        "技术操作、运维与中心运营配套"
      ],
      "department": "医学3D打印服务",
      "hospital": "河南中医药大学第一附属医院",
      "need": "面向医院影像处理、术前规划、模型与导板打印及康复支具等服务需求。",
      "phase": "项目成交",
      "result": "采购公告已确认成交供应商和一年服务期限；履约交付资料后续补充。",
      "title": "河南中医药大学第一附属医院医学3D打印服务项目",
      "work": "通过影像、设计、打印、技术操作与设备运维等环节组织一体化服务。"
    },
    "category": "合作动态",
    "cover": {
      "alt": "河南中医药大学第一附属医院院区，原文配图",
      "height": 261,
      "url": "/images/editorial/henan-hospital.png",
      "width": 555
    },
    "dateLabel": "成交公告 · 2026年6月9日",
    "eventDate": "2026-06-09",
    "gallery": [],
    "id": "henan-tcm-3d-printing-service-2026",
    "references": [
      {
        "title": "采购代理机构成交公告",
        "url": "https://www.hnhxzx.com/index.php?a=index&aid=11107&c=View&m=home",
        "verification": "primary_full_text"
      }
    ],
    "sections": [
      {
        "heading": "项目成交，服务进入实施准备",
        "paragraphs": [
          "2026年6月9日，恒信咨询管理有限公司发布河南中医药大学第一附属医院3D打印服务采购项目成交公告，成交供应商为内蒙古子殷科技有限公司，服务期限为一年。",
          "此次合作将医学影像处理、数字化设计与增材制造服务引入医院的临床、教学和科研场景。"
        ]
      },
      {
        "heading": "从影像到实物的服务范围",
        "paragraphs": [
          "公告列明的采购范围涵盖影像AI分割与三维重建、手术规划与设计、数据脱敏及安全存储调用，以及非植入类术前模型、手术导板、康复矫形器与支具打印等内容。",
          "项目还包含技术操作、设备运维、设计服务和中心运营场地基础配套装修。各项服务按具体采购需求与实际履约安排实施。"
        ]
      },
      {
        "heading": "持续服务与质量协作",
        "paragraphs": [
          "结合医院需求，子殷科技将组织数据处理、设计、制造与质量检查的协作流程，支持项目实施与后续服务。",
          "本页记录项目成交和约定服务范围。实际交付数量、验收结果及应用成效，将依据后续项目资料更新。"
        ]
      }
    ],
    "sourcePublishedAt": null,
    "sourceTitle": "喜报丨携手国家中医医学中心丨子殷科技中标河南中医一附院3D打印服务项目",
    "status": "approved",
    "summary": "围绕影像处理、三维规划、模型与导板打印、康复支具及运营配套，开展为期一年的医学3D打印服务项目。",
    "title": "子殷科技成为河南中医药大学第一附属医院3D打印服务项目成交供应商"
  },
  {
    "caseProfile": {
      "boundary": "具体服务功能、交付批次与应用成效应结合中心实际运行记录，不能仅以揭牌活动推定。",
      "category": "medical_center",
      "deliverables": [
        "数智医学与临床转化中心共建平台",
        "需求沟通、数字化设计与制造服务协作",
        "临床应用与学术交流"
      ],
      "department": "数智医学与临床转化中心",
      "hospital": "孝感市中心医院",
      "need": "为医院提供持续的数字化设计、医学3D打印与临床科研协作支持。",
      "phase": "中心揭牌",
      "result": "已举行中心揭牌启动、合作签约及实体区域参观活动。",
      "title": "孝感数智医学与临床转化中心共建",
      "work": "通过中心共建连接医院需求、工程人员、数字化工具和制造服务，并组织临床与学术交流。"
    },
    "category": "合作动态",
    "cover": {
      "alt": "孝感市中心医院数智医学与临床转化中心揭牌启动活动",
      "height": 778,
      "url": "/images/editorial/xiaogan-opening.webp",
      "width": 1080
    },
    "dateLabel": "活动日期 · 2026年6月4日",
    "eventDate": "2026-06-04",
    "gallery": [
      {
        "alt": "孝感中心相关合作签约现场，原文配图",
        "height": 540,
        "url": "/images/editorial/xiaogan-signing.webp",
        "width": 1080
      },
      {
        "alt": "参会人员参观孝感中心实体区域，原文配图",
        "height": 809,
        "url": "/images/editorial/xiaogan-center-tour.webp",
        "width": 1080
      }
    ],
    "id": "xiaogan-medical-center-2026",
    "references": [
      {
        "title": "荆楚网揭牌活动报道",
        "url": "https://www.cnhubei.com/content/2026-06/08/content_20022377.html",
        "verification": "search_summary"
      }
    ],
    "sections": [
      {
        "heading": "以中心共建连接临床与工程",
        "paragraphs": [
          "2026年6月4日，孝感市中心医院举行数智医学与临床转化中心揭牌启动仪式暨合作签约活动。医院与上海子殷科技有限公司签署中心共建合作协议。",
          "同场活动还包括医院与上海交通大学医学院附属第六人民医院的专科联盟合作。专科联盟与子殷参与的中心共建分别承担临床协作和医工转化的不同角色。"
        ]
      },
      {
        "heading": "医工造物的共建方式",
        "paragraphs": [
          "以临床需求为起点，中心把医学影像三维重建、数字化设计、3D打印与临床科研协作连接起来，让医院获得持续的医工支持。",
          "子殷科技以“医工造物”呈现共建服务，围绕需求沟通、设计复核、制造交付与后续反馈组织工作。临床方案由医院专业人员判断和确认。"
        ]
      },
      {
        "heading": "从活动启动到持续运行",
        "paragraphs": [
          "启动活动包含中心建设规划、足踝外科数智诊疗、医学增材制造及相关临床应用交流，并安排参观中心实体区域。",
          "中心后续将围绕具体应用场景持续积累交付记录与反馈。揭牌反映共建平台启动，各项功能和项目成效以实际实施记录为依据。"
        ]
      }
    ],
    "sourcePublishedAt": null,
    "sourceTitle": "孝感数智医学与临床转化中心正式揭牌启动",
    "status": "approved",
    "summary": "医院与子殷科技围绕数智医学与临床转化共建中心，将数据采集、数字化设计、增材制造和临床协作组织为持续服务流程。",
    "title": "孝感市中心医院数智医学与临床转化中心正式揭牌启动"
  },
  {
    "caseProfile": {
      "boundary": "图片为原文规划与导板示意；两例早期观察不构成疗效验证，尚无可用于宣传的统一计时、精度或对照结果。",
      "category": "surgical_guide",
      "deliverables": [
        "骨结构三维重建与术前规划资料",
        "个性化导板设计与制造",
        "交付对应关系及应用反馈记录"
      ],
      "department": "骨科",
      "hospital": "孝感市中心医院",
      "need": "将个性化膝关节术前规划转化为可供术中应用的导板设计与实体制品。",
      "phase": "两例早期观察",
      "result": "原文记录同一应用日的TKA与UKA两例导板应用；本页保留早期观察属性。",
      "title": "孝感膝关节置换个性化导板应用观察",
      "work": "影像整理、骨结构重建、临床规划复核、导板设计制造与术中应用相互衔接。"
    },
    "category": "技术进展",
    "cover": {
      "alt": "个性化膝关节术前规划与导板设计示意，原文配图",
      "height": 1439,
      "url": "/images/editorial/knee-planning.webp",
      "width": 1080
    },
    "dateLabel": "应用观察 · 2026年6月",
    "eventDate": "2026-06",
    "gallery": [],
    "id": "xiaogan-knee-guides-2026",
    "references": [],
    "sections": [
      {
        "heading": "围绕一块导板，组织完整医工流程",
        "paragraphs": [
          "据子殷科技提供的文章，2026年6月，孝感市中心医院数智医学与临床转化中心的一个临床应用日完成全膝关节置换（TKA）与单髁置换（UKA）两例个性化3D打印导板应用。",
          "本页以这两例早期观察为线索，说明数字化方案如何经过设计、制造与临床复核转化为实体工具。"
        ]
      },
      {
        "heading": "从影像到术中应用",
        "items": [
          "影像采集与数据整理",
          "骨结构三维重建",
          "术前规划与临床复核",
          "导板设计、3D打印与质量检查",
          "术中应用及反馈记录"
        ],
        "paragraphs": [
          "影像采集后进行脱敏与三维重建，在模型上开展术前规划。围绕经确认的方案设计导板，经过制造、质量检查和交付，再进入术中应用。",
          "医工协作中，模型、规划方案、导板设计与交付记录需要相互对应；工程支持与术者复核共同构成这条工作链。"
        ]
      },
      {
        "heading": "记录观察，保留评价边界",
        "paragraphs": [
          "原文记录了术者对手术时间、截骨与对线的积极反馈，但未提供可核对的统一计时、精度测量或对照数据。",
          "两例属于单中心早期应用观察，不构成普遍疗效结论。本页不据此给出时间缩短比例、准确率或适用所有患者的承诺。"
        ]
      },
      {
        "heading": "交付的价值在于可追溯",
        "paragraphs": [
          "对中心建设而言，案例的价值还在于沉淀需求、方案、制品与反馈之间的联系，为后续批次的服务和工程复核提供可追溯记录。",
          "具体导板及相关工具的使用，应结合相应产品范围、医院流程和专业人员判断。"
        ]
      }
    ],
    "sourcePublishedAt": null,
    "sourceTitle": "从影像到刀锋：个性化3D打印截骨导板在膝关节置换中的临床转化",
    "status": "approved",
    "summary": "以孝感中心TKA与UKA两例早期应用观察为线索，呈现影像采集、三维重建、术前规划、导板设计制造与术中应用流程。",
    "title": "从影像到刀锋：膝关节置换个性化3D打印导板的医工协作"
  }
];

export function getEditorialArticles(preview = process.env.WEBSITE_CONTENT_PREVIEW === "1") {
  return EDITORIAL_ARTICLES.filter((item) => item.status === "approved" || (preview && item.status === "candidate"));
}
export function getEditorialArticle(id: string, preview = process.env.WEBSITE_CONTENT_PREVIEW === "1") {
  return getEditorialArticles(preview).find((item) => item.id === id);
}
export function getEditorialCases(preview = process.env.WEBSITE_CONTENT_PREVIEW === "1"): ClinicalCase[] {
  return getEditorialArticles(preview).map((item) => ({
    id: item.id, slug: item.id, title: item.caseProfile.title, category: item.caseProfile.category,
    hospital: item.caseProfile.hospital, department: item.caseProfile.department, doctor_name: "",
    summary: item.caseProfile.result, cover_image_url: item.cover.url,
    images: item.gallery.map((image) => image.url), model_ids: [],
    tags: [item.caseProfile.phase, "医工造物"], is_published: item.status === "approved",
    created_at: "", updated_at: "",
  }));
}
