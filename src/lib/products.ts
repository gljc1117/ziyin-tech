export interface Product {
  slug: string;
  name: string;
  title: string;
  kind: string;
  summary: string;
  audience: string;
  capabilities: string[];
  deliverables: string[];
  boundary: string;
  image: string;
  imageAlt: string;
  inquiry: string;
  sources: { title: string; href: string }[];
}
// Grounded in the existing, approved public articles; research is separate from registered scope.
export const PRODUCTS: Product[] = [
  {
    slug: "chcomct-sm",
    name: "Chcomct SM",
    title: "医学图像处理软件",
    kind: "已注册产品",
    summary: "从CT、MRI图像处理，到三维重建、几何测量与工程保存。",
    audience: "医疗机构的CT、MRI图像处理工作。",
    capabilities: [
      "符合DICOM 3.0标准的CT、MRI图像导入、处理、显示与保存",
      "阈值分割、区域增长、单层与多层编辑",
      "网格重建、平滑、消减和细分处理",
      "距离、角度与直径测量，二维及三维注释",
      "PC端本地离线运行，PLY网格导出与工程保存、恢复",
    ],
    deliverables: [
      "Chcomct SM 2.0软件产品",
      "产品资料与功能演示",
      "根据合作约定安排安装及使用沟通",
    ],
    boundary:
      "本软件结果仅为医生提供参考意见，不具有自动诊断功能，不能单独用作临床诊疗决策依据。产品适用范围以注册资料为准。",
    image: "/images/news/chcomct-sm-approval-20260922/hero.webp",
    imageAlt: "Chcomct SM品牌概念示意图，非软件操作界面",
    inquiry: "医学图像处理 / Chcomct SM",
    sources: [
      {
        title: "产品获批与注册信息",
        href: "/news/chcomct-sm-medical-imaging-approval-20260922",
      },
    ],
  },
  {
    slug: "medical-3d-printing",
    name: "医工造物",
    title: "医学3D打印与工程服务",
    kind: "技术服务",
    summary: "连接影像重建、个性化设计、模型与导板制造，支持医工协作。",
    audience: "需要三维建模、个性化设计与实体制品支持的医院及科室。",
    capabilities: [
      "医学影像整理与三维重建",
      "围绕医生确认的需求进行模型和导板设计",
      "医学模型、手术导板及康复支具相关制造服务",
      "设计复核、质量检查与交付资料衔接",
    ],
    deliverables: [
      "约定范围内的数字模型与设计资料",
      "适用产品范围内的实体模型、导板或支具",
      "与具体任务对应的质量及交付记录",
    ],
    boundary:
      "具体制品、材料、使用范围和交付要求，按相应产品资料、合作约定及医院流程确认。临床方案由医院专业人员审核。",
    image: "/images/editorial/knee-planning.webp",
    imageAlt: "孝感膝关节项目的规划与导板设计资料",
    inquiry: "医学3D打印 / 医工造物",
    sources: [
      { title: "膝关节导板应用观察", href: "/cases/xiaogan-knee-guides-2026" },
      {
        title: "医院医学3D打印服务项目",
        href: "/cases/henan-tcm-3d-printing-service-2026",
      },
    ],
  },
  {
    slug: "calcai",
    name: "CalcAI",
    title: "跟骨骨折医工协作研发",
    kind: "科研合作",
    summary: "围绕跟骨骨折三维理解与复位辅助开展研发，积累专科验证与反馈。",
    audience: "足踝、创伤骨科及相关科研团队。",
    capabilities: [
      "骨块与关键结构的三维观察",
      "跟骨骨折复位辅助的研发与验证",
      "围绕工程修订和医生反馈推进专科协作",
    ],
    deliverables: [
      "现阶段科研功能演示",
      "经双方约定的研发及验证计划",
      "按项目安排形成阶段性研究资料",
    ],
    boundary:
      "本页介绍科研研发方向，不代表已获批临床功能。CalcAI与Chcomct SM为不同项目，产品注册范围不相互延伸。",
    image: "/images/news/calcai-alliance-20260911/local-review.jpg",
    imageAlt: "CalcAI科研协作现场资料",
    inquiry: "医疗AI / CalcAI",
    sources: [
      {
        title: "上海六院足踝联盟大会科研进展",
        href: "/news/calcai-shanghai-sixth-foot-ankle-alliance-2026",
      },
    ],
  },
  {
    slug: "medical-center",
    name: "数智医学中心",
    title: "中心共建与持续服务",
    kind: "中心共建",
    summary: "把工程人员、数字化工具与制造服务，组织为医院持续可用的协作流程。",
    audience: "计划建设医学3D打印、数智医学与临床转化服务能力的医院。",
    capabilities: [
      "围绕科室需求沟通中心建设范围",
      "衔接场地、设备、技术操作与运营配套",
      "组织需求受理、设计复核、制造交付与反馈",
      "支持临床应用交流与科研合作",
    ],
    deliverables: [
      "经双方确认的中心建设及服务方案",
      "约定范围内的技术操作与运营支持",
      "具体服务任务对应的阶段记录",
    ],
    boundary:
      "建设范围、人员安排、设备配置和验收方式需在项目方案中明确，具体成果以实际实施记录为依据。",
    image: "/images/editorial/xiaogan-center-tour.webp",
    imageAlt: "孝感数智医学与临床转化中心实体区域参观",
    inquiry: "数智医学中心",
    sources: [
      { title: "孝感中心共建项目", href: "/cases/xiaogan-medical-center-2026" },
    ],
  },
];
export const productInquiryHref = (product: Product) =>
  `/demo?product=${encodeURIComponent(product.inquiry)}`;
