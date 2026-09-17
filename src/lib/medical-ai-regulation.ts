import type { CompanyNewsArticle } from "./company-news";

export const MEDICAL_AI_REGULATION: CompanyNewsArticle = {
  "id": "medical-ai-regulation-nmpa-fda-20260917",
  "title": "从 NMPA 到 FDA：医疗 AI 正在进入规范化监管与临床落地新阶段",
  "summary": "医疗AI走向临床，需要清晰的产品边界、可复核的专业流程与持续验证的证据。结合中美监管文件，观察医学影像AI的产品化方向。",
  "category": "学术观点",
  "eventDate": "2026-09-17",
  "dateLabel": "2026年9月17日 · 监管观察",
  "sourcePublishedAt": "2026-09-17T02:41:32+00:00",
  "sourceTitle": "从 NMPA 到 FDA：医疗 AI 正在进入规范化监管与临床落地新阶段",
  "sourceAttribution": "子殷科技监管观察。本文依据以下官方文件与页面整理，核对截至2026年9月17日；工作流程与研发方向部分为子殷科技的分析与规划。",
  "status": "approved",
  "numberedReferences": true,
  "cover": {
    "url": "/images/news/medical-ai-regulation-20260917.png",
    "width": 1200,
    "height": 630,
    "alt": "医疗 AI 的产品化方向：明确产品边界，建立专业复核流程，并将使用与更新纳入全生命周期治理。"
  },
  "gallery": [],
  "references": [
    {
      "title": "国家药品监督管理局｜人工智能医用软件产品分类界定指导原则。2021年第47号通告附件；2021年7月。",
      "url": "https://www.nmpa.gov.cn/directory/web/nmpa/images/1625713895408075422.docx",
      "verification": "primary_full_text"
    },
    {
      "title": "国家药监局医疗器械技术审评检查长三角分中心｜关于公开征求人工智能医疗器械注册审查指导原则 2026年修订版 征求意见稿意见的通知。官网刊载日期2026年9月14日。",
      "url": "https://www.ydcmdei.org.cn/article/975",
      "verification": "primary_full_text"
    },
    {
      "title": "国家药品监督管理局医疗器械技术审评中心｜人工智能医疗器械注册审查指导原则 2026年修订版 征求意见稿。重点参阅第二至四部分及第五部分第十三项“大模型”。",
      "url": "https://www.cmde.org.cn/directory/web/cmde/images/1789373150546047406.docx",
      "verification": "primary_full_text"
    },
    {
      "title": "FDA｜Product Classification — QIH。页面更新日期2026年9月14日。",
      "url": "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfPCD/classification.cfm?id=QIH",
      "verification": "primary_full_text"
    },
    {
      "title": "FDA｜FDA Seeks Public Feedback to Inform Regulatory Approach for Generative AI-Enabled Medical Devices。新闻稿；2026年8月18日。",
      "url": "https://www.fda.gov/news-events/press-announcements/fda-seeks-public-feedback-inform-regulatory-approach-generative-ai-enabled-medical-devices",
      "verification": "primary_full_text"
    },
    {
      "title": "FDA｜Considerations for the Regulation of Generative AI-Enabled Medical Devices: Discussion Paper and Request for Feedback。讨论文件说明页；正文参阅第四至七部分。",
      "url": "https://www.fda.gov/medical-devices/digital-health-center-excellence/considerations-regulation-generative-ai-enabled-medical-devices-discussion-paper-and-request",
      "verification": "primary_full_text"
    }
  ],
  "sections": [
    {
      "heading": "导读：从医学影像处理的产品边界，到生成式 AI 的全生命周期治理",
      "paragraphs": [
        "当 AI 能够完成影像分割、三维重建和定量测量，医疗机构接下来关心的，是这些能力能否稳定地进入真实工作流程：输入是否合格，结果由谁复核，异常如何处置，模型更新后能否保持可靠。",
        "结合中国人工智能医用软件监管文件、美国 FDA 影像处理软件分类，以及生成式 AI 医疗器械讨论文件，我们的判断是：医疗 AI 正在更明确地走向产品化。模型性能需要与预期用途、临床流程和质量管理共同构成可验证的产品体系。",
        "理解这一趋势，首先要区分文件性质：已有分类规则、正在征求意见的修订稿，以及探索未来监管方法的讨论文件，承担着不同作用。"
      ]
    },
    {
      "heading": "01 中国监管 以预期用途界定产品边界",
      "paragraphs": [
        "国家药监局2021年发布的《人工智能医用软件产品分类界定指导原则》，以预期用途为基础，结合处理对象和核心功能，判断软件的管理属性。对医疗器械数据进行处理、测量、模型计算或分析，并用于医疗用途的软件，需要按相应原则判断其医疗器械属性。[1]",
        "管理类别还需结合算法在医疗应用中的成熟度等因素判断。该原则对成熟度较低的软件，区分了提供诊疗建议的辅助决策用途与提供临床参考信息的非辅助决策用途；成熟度较高的软件则按现行分类目录和分类界定文件执行。[1]",
        "这提示研发团队：名称中写有“影像处理”“辅助”或“AI”，都不能单独决定产品类别。需要说明软件实际处理什么、输出什么，以及这些输出如何影响医疗决策。人工复核是工作流程中的重要环节，也不能据此直接推定产品风险较低或必然属于第二类。",
        "2026年9月14日，国家药监局医疗器械技术审评检查长三角分中心官网刊载了《人工智能医疗器械注册审查指导原则（2026年修订版）（征求意见稿）》的征求意见通知。该稿仍处于征求意见阶段，不能作为已经正式发布实施的新版本表述。[2]",
        "从征求意见稿原文看，其关注范围覆盖数据质量、算法泛化能力、风险管理，以及贯穿产品生命周期的验证、确认与更新控制。稿件还讨论了通用大模型接口调用、基于通用大模型开发医疗智能体等情形，并提出对幻觉、偏见等风险进行管理的思路。[3]",
        "对企业而言，这些内容提供了研发准备的方向：围绕明确用途组织数据、算法、软件和评价资料，逐步形成完整证据。具体申报仍需依据届时适用的法规、分类规则及正式文件。"
      ]
    },
    {
      "heading": "02 FDA QIH 为影像处理软件提供边界参照",
      "paragraphs": [
        "FDA 产品分类数据库中，Automated Radiological Image Processing Software（自动放射影像处理软件）的分类信息如下。[4]",
        "其定义包括自动放射影像处理和分析工具，涵盖使用临床数据和／或人工生成数据训练的非自适应机器学习 AI；自适应 AI 算法不在该产品代码范围内。[4]",
        "这一既有分类可作为医学影像处理、AI 分割、三维重建与定量分析产品研究的国际参照。具体产品是否适用，仍需核对其预期用途、功能及监管要求。",
        "FDA 的 Class II 不能直接换算为中国 NMPA 的第二类。QIH 的存在，也不代表所有医学影像 AI 或某个平台的全部功能都自动适用该分类。"
      ]
    },
    {
      "heading": "03 生成式 AI 让评价延伸至整个系统",
      "paragraphs": [
        "2026年8月18日，FDA 发布 Considerations for the Regulation of Generative AI-Enabled Medical Devices: Discussion Paper and Request for Feedback，围绕生成式 AI 医疗器械监管征求反馈。[5]",
        "该文件讨论风险评估、上市前评价、上市后监测，并涉及基础模型和 Agentic AI。后者能够规划和执行多步骤任务、使用外部工具，其评价问题也延伸到行动过程中的可靠性与人工监督。[5][6]",
        "这是一份 Discussion Paper（讨论文件），不是 FDA 正式或草案指导原则；文件明确表示，其目的不是提出或实施监管政策变更。[6]",
        "从研发角度理解，这一讨论提醒我们：当 AI 从生成内容进一步走向调用工具和执行任务，评价对象需要覆盖完整系统。除了回答是否准确，还要检查任务是否越界、工具调用是否正确、关键步骤能否由专业人员确认，以及出错后能否停止并恢复。"
      ]
    },
    {
      "heading": "04 从算法结果到可复核的临床工作流程",
      "paragraphs": [
        "综合上述文件，我们认为，医疗 AI 的产品化需要把算法能力落实为一条连贯的证据链：先明确预期用途和适用范围，再规范输入，由 AI 生成候选结果，经专业人员复核、临床确认后形成可追溯输出，并将使用反馈纳入持续治理。",
        "在医学影像场景中，这意味着要将验证落实到具体环节。影像进入系统时，需要识别检查与序列，检查目标解剖范围、图像质量及处理条件。AI 处理完成后，需要保留源影像与结果的对应关系，使专业人员能够查看、修订或否决候选结果。",
        "例如，一项三维重建结果若遗漏关键结构，即使表面显示平滑，也需要回到原始影像核查；一次定量测量若无法定位参考点、说明几何定义和单位，就难以被有效复核。出现数据不完整、适用范围不匹配或处理失败时，系统应明确提示，并转入相应的人工处理流程。",
        "专业复核需要能够看到证据、具备修订入口并留下确认记录。将这些要求落实到工作台，才能让人工确认具有实际意义。",
        "同样，模型和软件更新后，需要评估变化对结果及使用流程的影响。研发评价也应结合实际任务，观察测量误差、复核时间、修订负担和异常识别情况，使算法指标与使用价值建立联系。"
      ]
    },
    {
      "heading": "05 子殷的产品化方向 让专业协作进入工作台",
      "paragraphs": [
        "围绕医院真实场景，子殷科技正在建设 MEDIFORGE 医学影像智能处理与临床数字化工作平台，逐步衔接影像输入、AI 辅助处理、专业复核与标准化交付。",
        "拟逐步形成的工作流程为：",
        "DICOM／医学影像输入 → 数据准入 → AI 辅助处理 → 三维重建／定量分析 → 工程师专业复核 → 医生确认 → 标准化输出",
        "全过程追溯贯穿上述环节，将源影像、处理版本、候选结果、人工修订和确认记录关联起来。工程师在职责范围内完成建模与技术复核，医生结合临床信息进行专业判断；具体分工应与产品用途及医疗机构的工作要求一致。",
        "其中，AI 的作用是提供可检查、可修改的候选结果，让专业人员集中处理需要经验和判断的部分。研发重点也随之从单项算法输出，延伸至输入准入、影像与三维联动、异常处置和交付记录。",
        "这一表述代表 MEDIFORGE 正在推进的研发与产品化方向。科研验证、临床评价和正式部署需要分别管理；相关功能是否可用于临床，应以实际验证结果、适用监管要求及获准的用途范围为依据。"
      ]
    },
    {
      "heading": "结语 将能力转化为可验证的产品",
      "paragraphs": [
        "中美监管文件处于不同层级和发展阶段，不能简单等同。结合这些文件观察，医疗 AI 的持续发展需要更清晰的产品定义、更完整的评价证据，以及贯穿使用和更新过程的质量管理。",
        "医疗 AI 下一阶段竞争的不只是模型精度，而是能否成为边界清晰、风险可控、专业人员可复核、全过程可验证和可追溯的临床产品。",
        "对子殷而言，这意味着从一项具体需求、一条完整工作流程出发，让每一次处理、复核与交付都有依据，逐步积累医疗机构能够检验的产品能力。"
      ]
    }
  ],
  "sectionTables": {
    "02 FDA QIH 为影像处理软件提供边界参照": {
      "caption": "FDA QIH 产品分类信息（官方页面更新于2026年9月14日）",
      "columns": [
        "项目",
        "FDA 页面所列信息"
      ],
      "rows": [
        [
          "产品代码",
          "QIH"
        ],
        [
          "法规编号",
          "21 CFR 892.2050"
        ],
        [
          "器械类别",
          "Class II"
        ],
        [
          "申报类型",
          "510(k)"
        ]
      ]
    }
  }
};
