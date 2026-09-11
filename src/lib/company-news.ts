import { getEditorialArticles, type EditorialArticle, type EditorialImage } from "./editorial-content";

// Company reporting can be published as news without creating a clinical case.
export type CompanyNewsArticle = Omit<EditorialArticle, "caseProfile"> & {
  sectionImages?: Record<string, EditorialImage>;
};

export const COMPANY_NEWS_ARTICLES: CompanyNewsArticle[] = [
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
