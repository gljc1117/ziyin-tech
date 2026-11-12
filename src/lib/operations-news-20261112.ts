import type { CompanyNewsArticle } from "./company-news";
import type { EditorialArticle, EditorialImage } from "./editorial-content";

const brandCover: EditorialImage = {
  url: "/og-image.png",
  alt: "子殷科技品牌图",
  width: 1200,
  height: 630,
};

export const HENAN_TCM_CENTER_UPDATE: CompanyNewsArticle = {
  id: "henan-tcm-center-operation-20261112",
  title: "河南中医药大学第一附属医院数智医学与临床转化中心投入使用",
  summary: "子殷科技已进场开展医学3D打印服务，院内数智医学与临床转化中心已投入使用并开始承接业务。",
  category: "合作动态",
  eventDate: "2026-11-12",
  dateLabel: "运营进展 · 2026年11月12日",
  sourcePublishedAt: null,
  sourceTitle: "河南中医药大学第一附属医院中心运营进展",
  sourceAttribution: "作者 瑜秀瞳芯。内容据子殷科技项目运营反馈及现场照片整理。",
  status: "approved",
  relatedCaseId: "henan-tcm-3d-printing-service-2026",
  cover: {
    url: "/images/editorial/henan-tcm-center-collaboration-20261112.jpg",
    alt: "河南中医药大学第一附属医院数智医学与临床转化中心医工协作区",
    width: 1600,
    height: 900,
  },
  gallery: [
    {
      url: "/images/editorial/henan-tcm-center-exhibition-20261112.webp",
      alt: "河南一附院中心的医学模型及临床技术展示区",
      width: 1320,
      height: 990,
    },
    {
      url: "/images/editorial/henan-tcm-center-quality-20261112.webp",
      alt: "河南一附院中心的3D打印设备与质量控制工作区",
      width: 1320,
      height: 990,
    },
  ],
  references: [
    {
      title: "河南中医药大学第一附属医院3D打印服务采购项目成交公告",
      url: "https://www.hnhxzx.com/index.php?a=index&aid=11107&c=View&m=home",
      verification: "primary_full_text",
    },
    {
      title: "河南中医药大学第一附属医院3D打印工作专项协调会",
      url: "/news/henan-tcm-3d-printing-coordination-20260928",
      verification: "primary_full_text",
    },
  ],
  sections: [
    {
      heading: "从项目成交到进场运营",
      paragraphs: [
        "2026年6月9日，项目采购成交公告发布。9月28日，医院召开3D打印工作专项协调会，介绍科室应用及服务对接流程。截至11月12日，子殷科技团队已进场，中心已投入使用并开始承接院内业务。",
      ],
    },
    {
      heading: "中心现场",
      paragraphs: [
        "中心设置医工协作、医学模型展示和3D打印工作区域。现场展示了影像接收、设计沟通、医生确认、打印和质量检查等工作环节。具体服务按医院项目流程开展。",
      ],
    },
  ],
};

export const TIANJIN_HOSPITAL_OPERATION: EditorialArticle = {
  id: "tianjin-hospital-3d-printing-operation-20261112",
  title: "天津市天津医院医学3D打印项目运营进展",
  summary: "天津市天津医院医学3D打印项目自2026年7月投入运营，截至11月已运行约4个月。据子殷科技项目运营反馈，业务量较启动阶段增长。",
  category: "合作动态",
  eventDate: "2026-11-12",
  dateLabel: "运营进展 · 2026年11月12日",
  sourcePublishedAt: null,
  sourceTitle: "天津市天津医院医学3D打印项目运营进展",
  sourceAttribution: "作者 瑜秀瞳芯。内容据子殷科技项目运营反馈整理。",
  status: "approved",
  cover: brandCover,
  hideCover: true,
  gallery: [],
  references: [],
  sections: [
    {
      heading: "项目运行",
      paragraphs: [
        "项目于2026年7月投入运营。截至2026年11月12日，项目已持续运行约4个月。子殷科技的运营反馈显示，业务量较项目启动阶段有所增长。",
      ],
    },
    {
      heading: "项目合作分工",
      paragraphs: [
        "子殷科技作为生产厂家参与该项目，栩昕垚（北京）科技发展有限公司为项目经销商。",
      ],
    },
  ],
  caseProfile: {
    title: "天津市天津医院医学3D打印服务项目",
    category: "service_project",
    phase: "运营中",
    hospital: "天津市天津医院",
    department: "医学3D打印服务",
    need: "围绕天津市天津医院的医学3D打印业务需求开展项目合作。",
    work: "子殷科技作为生产厂家参与项目，栩昕垚（北京）科技发展有限公司为项目经销商。",
    result: "项目自2026年7月投入运营，截至11月已运行约4个月。业务量较启动阶段增长。",
    deliverables: ["医学3D打印项目产品供应与经销协作"],
    boundary: "运营情况据子殷科技项目反馈整理，更新截至2026年11月12日。",
  },
};

export const XINXIANG_COMPANY_NEWS: CompanyNewsArticle = {
  id: "henan-ziyin-xinxiang-3d-printing-park-20261112",
  title: "河南子殷科技有限公司落地新乡3D打印产业园",
  summary: "河南子殷科技有限公司于2026年11月5日成立，注册地址位于河南省新乡市红旗区的新乡3D打印产业园。",
  category: "公司动态",
  eventDate: "2026-11-05",
  dateLabel: "公司成立 · 2026年11月5日",
  sourcePublishedAt: null,
  sourceTitle: "河南子殷科技有限公司登记及落地资料",
  sourceAttribution: "作者 瑜秀瞳芯。公司名称和成立日期据企业登记资料核对。",
  status: "approved",
  cover: brandCover,
  hideCover: true,
  gallery: [],
  references: [],
  sections: [
    {
      heading: "公司落地新乡",
      paragraphs: [
        "河南子殷科技有限公司已在新乡3D打印产业园落地。园区落地为子殷科技在河南推进医院项目运营和医工协作提供了工作基础。",
      ],
    },
    {
      heading: "运营中心建设",
      paragraphs: [
        "新乡场地正推进运营中心建设，规划承担医院项目协调、医学3D打印技术交付支持和人才培养等工作。",
      ],
    },
  ],
};
