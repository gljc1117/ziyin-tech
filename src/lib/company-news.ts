import { RSI_COMMENTARY } from "./rsi-commentary";
import { FLY_CONNECTOME_REVIEW } from "./fly-connectome-review";
import { AI_WORKFORCE_COMMENTARY } from "./ai-workforce-commentary";
import { getEditorialArticles, type EditorialArticle, type EditorialImage } from "./editorial-content";

import { PHYSICAL_EXAM_COMMENTARY } from "./physical-exam-commentary";

// Company reporting can be published as news without creating a clinical case.
export type CompanyNewsArticle = Omit<EditorialArticle, "caseProfile"> & {
  sourceAttribution?: string;
  numberedReferences?: boolean;
  sectionTables?: Record<string, { caption: string; columns: string[]; rows: string[][] }>;
  sectionImages?: Record<string, EditorialImage>;
  officialVideo?: {
    publisher: string;
    title: string;
    url: string;
  };
};

export const COMPANY_NEWS_ARTICLES: CompanyNewsArticle[] = [
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
  "summary": "2026年9月11日，子殷科技总经理李冬冬代表公司，首次在上海市第六人民医院国家骨科医学中心足踝联盟大会上作项目汇报，介绍CalcAI跟骨骨折智能复位辅助系统的研发进展，圆满完成本次演讲。",
  "category": "学术动态",
  "eventDate": "2026-09-11",
  "dateLabel": "2026年9月11日",
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
    "让医生在屏幕上看清骨块并比较方案": {
      "url": "/images/news/calcai-alliance-20260911/bone-fragments.jpg",
      "alt": "现场展示骨块独立呈现与多方向观察功能",
      "width": 2048,
      "height": 1536
    },
    "把复核落实到具体骨块和接触位置": {
      "url": "/images/news/calcai-alliance-20260911/local-review.jpg",
      "alt": "021病例展示从整体定位到局部放大检查的复核过程",
      "width": 2048,
      "height": 1536
    },
    "与联盟同道共同推进病例研究和应用反馈": {
      "url": "/images/news/calcai-alliance-20260911/research-collaboration.jpg",
      "alt": "汇报结束时邀请联盟同道参与病例验证与应用反馈",
      "width": 2048,
      "height": 1536
    },
    "在足踝联盟大会汇报项目进展": {
      "url": "/images/news/calcai-alliance-20260911/conference-report.jpg",
      "alt": "李冬冬在大会现场介绍子殷科技及CalcAI研发方向",
      "width": 2048,
      "height": 1536
    }
  },
  "references": [],
  "sections": [
    {
      "heading": "在足踝联盟大会汇报项目进展",
      "paragraphs": [
        "围绕“跟骨骨折复位智能体模型开发和验证”这一主题，本次汇报结合软件界面与病例展示，向参会同道介绍了系统如何辅助观察骨块、比较复位方案，以及支持医生开展局部复核。",
        "从医学三维打印到医疗AI研发，子殷科技始终关注一个具体问题：怎样把临床老师的需求，转化为能够实际操作、便于讨论和检查的数字医学工具。CalcAI正是围绕这一目标展开的科研探索。"
      ]
    },
    {
      "heading": "让医生在屏幕上看清骨块并比较方案",
      "paragraphs": [
        "复杂跟骨骨折的复位规划，需要关注各个骨块的位置、相互关系和整体形态。CalcAI希望把这些需要反复推敲的空间关系，放到可操作的三维模型中，为医生提供直观的方案讨论与复核工具。",
        "本次展示的研究版以已经分割好的三维骨块模型为起点。导入模型后，医生可以通过颜色和标签定位骨块，旋转、放大模型，从不同方向观察结构。病例讨论时，参与者可以围绕同一个模型，明确指出需要关注的位置。",
        "在此基础上，系统结合骨块关系与接触约束计算复位候选方案，供医生与复位前的状态进行比较。研发团队希望先提供一个可以检查的复位参考，再由医生结合具体情况判断哪些位置仍需调整。"
      ]
    },
    {
      "heading": "把复核落实到具体骨块和接触位置",
      "paragraphs": [
        "以本次展示的021病例为例，模型保留了14个骨块。医生可以先从不同方向检查整体轮廓，再定位关注的骨块，沿同一方向放大，进一步观察边界、接触和遮挡情况。",
        "软件还提供形态偏差、骨块重叠等量化信息，用于提示需要重点复核的位置。图像与量化结果共同构成讨论依据，具体复位方案仍需由医生审阅判断。",
        "这些功能的研发，来自临床与工程团队的持续配合。六院临床团队指导复位目标与评价标准的确定，子殷科技承担软件开发，并协助数据验证。研发过程先明确临床问题，再把骨块关系转化为计算规则，通过病例检查和医生反馈发现不足，继续改进算法。",
        "目前，CalcAI处于科研研发与验证阶段，重点服务病例研究、方案比较和医生复核。其在规划效率、结果一致性及临床应用方面的实际价值，还需要通过后续研究进一步检验。"
      ]
    },
    {
      "heading": "与联盟同道共同推进病例研究和应用反馈",
      "paragraphs": [
        "本次大会为项目提供了与联盟医院交流的机会。下一步，子殷科技希望结合六院团队的临床评价经验，与有意参与的医院共同讨论病例、完善评价方法，并收集不同临床场景下的使用需求。",
        "多中心协作的价值，在于让研发接受更多类型病例和不同医院工作流程的检验。对参与医院而言，这也是共同讨论复位评价、反馈软件需求、参与科研设计的机会。后续研究将结合各中心的伦理审批与数据使用要求推进。",
        "子殷科技围绕医疗AI、医学3D打印与医工转化开展工作。随着CalcAI研发和验证的推进，团队还将探索复位参考与置钉规划、生物力学评价、个体化导板及三维打印的衔接。",
        "感谢上海六院专家团队的指导与支持，感谢足踝联盟提供的交流平台，也感谢每一位参与研发与病例工作的伙伴。首次大会汇报为这段研发历程留下了记录。我们将继续把临床反馈落实到产品中，把每一次改进做得更扎实。"
      ]
    }
  ]
}
];

export function getNewsArticles(preview = process.env.WEBSITE_CONTENT_PREVIEW === "1"): (EditorialArticle | CompanyNewsArticle)[] {
  return [...getEditorialArticles(preview), ...COMPANY_NEWS_ARTICLES.filter((item) =>
    item.status === "approved" || (preview && item.status === "candidate"))];
}

export function getNewsArticle(id: string, preview = process.env.WEBSITE_CONTENT_PREVIEW === "1") {
  return getNewsArticles(preview).find((item) => item.id === id);
}