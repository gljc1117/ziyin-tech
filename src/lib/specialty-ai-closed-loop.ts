import type { CompanyNewsArticle } from "./company-news";

export const SPECIALTY_AI_CLOSED_LOOP: CompanyNewsArticle = {
  id: "specialty-ai-closed-loop-productization-20260920",
  title: "从“大平台”到“专科闭环”：医疗人工智能进入证据驱动与医工协同的产品化阶段",
  summary: "医疗人工智能的竞争重点正在从算法性能和平台规模，转向临床任务、真实工作流、人机责任、版本治理和可验证证据。对子殷而言，更可执行的路径是先形成多个可独立部署、验证和交付的专科产品，再让MEDIFORGE从经过真实任务检验的共同需求中生长。",
  category: "学术观点",
  eventDate: "2026-09-20",
  dateLabel: "2026年9月20日 · 产品战略研究",
  sourcePublishedAt: "2026-09-20T00:00:00+08:00",
  sourceTitle: "从“大平台”到“专科闭环”：医疗人工智能进入证据驱动与医工协同的产品化阶段",
  sourceAttribution: "本文依据中国工业和信息化部、国家卫生健康委、国家药监局相关政策文件，FDA与IMDRF官方文件及医学AI临床研究报告规范撰写。政策与监管事实核对截至2026年9月20日。本文为产品战略与监管方法研究，不构成具体产品注册、临床使用或项目申报结论。",
  status: "approved",
  numberedReferences: true,
  cover: {
    url: "/images/news/specialty-ai-closed-loop-20260920.svg",
    width: 1440,
    height: 900,
    alt: "专科AI产品化路径图：从模型、专科产品、临床证据、多中心复制和产品矩阵，逐步形成医院级平台",
  },
  gallery: [],
  references: [
    {
      title: "工业和信息化部办公厅，国家卫生健康委办公厅，国家药监局综合和规划财务司. 关于开展2026年高端医疗装备推广应用项目申报工作的通知. 工信厅联通装函〔2026〕429号. 2026-09-10.",
      url: "https://www.miit.gov.cn/zwgk/zcwj/wjfb/tz/art/2026/art_a71dece5351c40268b0ae98b42f2c0b4.html",
      verification: "primary_full_text",
    },
    {
      title: "U.S. Food and Drug Administration. Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations. Draft Guidance for Industry and FDA Staff. January 2025.",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing",
      verification: "primary_full_text",
    },
    {
      title: "U.S. Food and Drug Administration. Marketing Submission Recommendations for a Predetermined Change Control Plan for Artificial Intelligence-Enabled Device Software Functions. Final Guidance. 2024; page updated 2025.",
      url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/marketing-submission-recommendations-predetermined-change-control-plan-artificial-intelligence",
      verification: "primary_full_text",
    },
    {
      title: "International Medical Device Regulators Forum. Good Machine Learning Practice for Medical Device Development: Guiding Principles. IMDRF/AIML WG/N88 FINAL:2025.",
      url: "https://www.imdrf.org/documents/good-machine-learning-practice-medical-device-development-guiding-principles",
      verification: "primary_full_text",
    },
    {
      title: "U.S. Food and Drug Administration, Health Canada, Medicines and Healthcare products Regulatory Agency. Transparency for Machine Learning-Enabled Medical Devices: Guiding Principles. 2024.",
      url: "https://www.fda.gov/medical-devices/software-medical-device-samd/transparency-machine-learning-enabled-medical-devices-guiding-principles",
      verification: "primary_full_text",
    },
    {
      title: "Shenoy T, Sanchez-Almanzar D, Leaf DE. Closing the evidence gap when randomised trials are not feasible. BMJ. 2026;394:e100509. doi:10.1136/bmj-2026-100509.",
      url: "https://pubmed.ncbi.nlm.nih.gov/42562421/",
      verification: "search_summary",
    },
    {
      title: "Vasey B, Nagendran M, Campbell B, et al. Reporting guideline for the early-stage clinical evaluation of decision support systems driven by artificial intelligence: DECIDE-AI. Nature Medicine. 2022;28:924-933.",
      url: "https://www.nature.com/articles/s41591-022-01772-9",
      verification: "primary_full_text",
    },
    {
      title: "Rivera SC, Liu X, Chan AW, et al. Guidelines for clinical trial protocols for interventions involving artificial intelligence: the SPIRIT-AI Extension. BMJ. 2020;370:m3210.",
      url: "https://www.bmj.com/content/370/bmj.m3210",
      verification: "primary_full_text",
    },
    {
      title: "Liu X, Rivera SC, Moher D, Calvert MJ, Denniston AK. Reporting guidelines for clinical trial reports for interventions involving artificial intelligence: the CONSORT-AI Extension. BMJ. 2020;370:m3164.",
      url: "https://www.bmj.com/content/370/bmj.m3164",
      verification: "primary_full_text",
    },
    {
      title: "Collins GS, Moons KGM, Dhiman P, et al. TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods. BMJ. 2024;385:e078378.",
      url: "https://www.bmj.com/content/385/bmj-2023-078378",
      verification: "primary_full_text",
    },
  ],
  sections: [
    {
      heading: "摘要",
      paragraphs: [
        "医疗人工智能的竞争重点正在从算法性能和平台规模，转向临床任务、真实工作流、人机责任、版本治理和可验证证据。输入准入、失败阻断、人工复核、最终审核和输出追踪形成稳定流程，模型才可能成为临床产品。",
        "本文结合中国高端医疗装备推广政策、FDA人工智能医疗器械文件、IMDRF良好机器学习实践原则及医学AI临床评价规范，提出“专科AI产品工厂”框架。其基本单元是“一个专科、一个明确临床任务、一个模型或模型组、一套人工复核机制、一个标准化输出和一条证据链”。各产品保持任务和验证相对独立，底层共享影像、三维、推理、病例、权限、审核、报告、审计和版本治理。MEDIFORGE现阶段应定位为公共基础设施，并随成熟产品逐步成长为医院级平台。",
        "本文所述项目均处于研发或产品化路径，不表示已取得医疗器械注册、完成临床有效性验证或获得正式临床使用资格。",
        "关键词：医疗人工智能；医工协同；专科产品；临床证据；人机协同；MEDIFORGE",
      ],
    },
    {
      heading: "一、背景：算法指标不能替代临床产品",
      paragraphs: [
        "Dice、灵敏度、特异度或测量一致性只回答部分技术性能。临床使用还涉及输入质量、异常识别、输出理解、修改留痕、最终审核和版本适用性。医学影像任务跨越导入、分割、重建、规划、质控、审核和报告，任一环节失效都可能使模型无法稳定完成任务。",
        "“先建设覆盖全院的大平台，再寻找场景”的路线因此面临边界不清、验证对象过宽和版本影响难控制等问题。不同专科的临床目的、参考标准和风险不同，统一界面不能替代专科工作流。更可执行的顺序，是先把单一临床问题做成可独立部署、验证和交付的产品，再把多个成熟产品沉淀出的共同能力汇聚为平台。",
      ],
    },
    {
      heading: "二、政策与监管环境",
      paragraphs: [
        "工业和信息化部办公厅、国家卫生健康委办公厅、国家药监局综合和规划财务司于2026年9月10日发布《关于开展2026年高端医疗装备推广应用项目申报工作的通知》。通知提出，项目应对医工协同创新、中试验证、临床研究、迭代升级与推广应用发挥引领作用；申报主体原则上由医疗装备生产企业、医疗机构及相关参与单位组成医工联合体；重点产品类项目和典型场景中的核心产品须取得中华人民共和国医疗器械注册证；地方推荐截止时间为2026年10月15日，项目实施周期一般不超过三年。[1]",
        "同时必须严格区分政策方向与具体申报资格。附件1所列人工智能辅助诊疗产品只有细胞遗传疾病染色体影像数据采集与核型辅助诊断系统、妇产科用智能超声诊断系统两项。骨科双下肢规划、跟骨复位或肺部三维重建不能据此推定为2026年度该专项的申报产品。对子殷而言，这份文件首先证明了“注册产品加医工联合加临床研究加推广验证”的转化方法，而不构成现有研发项目已经符合专项目录的依据。",
        "FDA于2025年发布《人工智能赋能器械软件功能：全生命周期管理与上市申报建议》草案。该文件截至本文撰写时仍标注为“草案，不用于实施”，不能表述为已经生效的最终规则；但它展示了监管评价重点。FDA区分AI模型、AI器械软件功能和完整器械，要求围绕预期用途、目标人群、使用环境、工作流、风险、数据管理、验证和上市后监测等提供证据。[2]",
        "草案特别指出，性能验证需要证明产品在目标人群和预期用途下能够可预测、可靠地运行；对于有人参与决策的产品，评价对象可能既包括模型独立性能，也包括“人和器械组成的团队”是否优于或不劣于既有工作方式。人因与可用性评价用于确认预期用户能否安全、正确地接收、理解和应用系统信息。软件版本历史还应说明测试版本与发布版本之间的差异及其对安全有效性的潜在影响。[2]这说明“谁使用、如何使用、何时接管、怎样审核、依据哪个版本输出”已经成为产品证据的一部分。",
        "FDA关于人工智能器械预定变更控制计划的最终指导文件要求，计划内模型修改应预先说明范围、验证方法和影响评估。[3]IMDRF于2025年发布的最终版良好机器学习实践原则强调全生命周期、代表性数据、独立测试、人机团队性能和部署后监测。[4]美、加、英监管机构共同发布的透明度原则，则要求开发者持续考虑用户需要、性能边界和信息可理解性。[5]",
        "这些文件并不要求所有产品采用完全相同的研究设计，但共同否定了“模型准确率等于临床产品成熟度”的简单逻辑。监管对象是具备用途、用户、界面、工作流、风险控制和变更机制的完整产品。",
      ],
    },
    {
      heading: "三、临床证据从单次测试转向持续基础设施",
      paragraphs: [
        "随机对照试验仍是评价干预效果的重要方法，但并非所有临床问题都能及时、经济或合乎伦理地开展随机试验。Shenoy等在BMJ 2026年的评论中讨论了随机试验不可行时如何缩小证据缺口，并强调大规模多中心观察性研究的价值与方法学要求。[6]这一观点不能被理解为观察性证据可以自动替代随机试验；更准确的含义是，研究设计、数据质量、混杂控制、结局定义和可追溯性决定了真实世界数据能否转化为可信证据。",
        "医学AI临床研究规范也在完善。DECIDE-AI关注早期现场评价，SPIRIT-AI与CONSORT-AI分别规范试验方案和报告，TRIPOD+AI规范预测模型研究报告。[7][8][9][10]这些规范共同要求临床数据能够回答：什么版本、用于什么患者、由谁使用、发生了什么修改、产生了什么结果。",
      ],
    },
    {
      heading: "四、专科AI产品与“专科AI产品工厂”",
      paragraphs: [
        "本文将专科AI产品定义为：围绕一个边界清楚的临床任务，把影像输入、算法处理、人工复核、最终审核、标准输出和全过程证据组织为可重复执行的工作流。其基本单元可以表达为：一个专科 × 一个明确临床任务 × 一个模型或模型组 × 一套人工复核机制 × 一个标准化输出 × 一条证据链。",
        "重点不在模型数量，而在责任和证据是否闭合。产品应明确预期与非预期用途、输入标准、模型输出、异常阻断、医工职责、输出格式，以及病例、版本、修改和审核的对应关系。",
        "“闭环”不等于全自动。AI生成可编辑初稿并定位疑点，工程师负责结构与几何质控，医生负责临床判断和最终确认。成熟度取决于人工介入能否被标准化、记录并纳入验证。",
        "专科AI产品工厂不是单一软件，而是一套重复生产专科产品的技术和治理方法，可分为临床产品层与公共基础设施层。临床产品层面，每个产品拥有独立的用途说明、输入规则、任务流程、质控点、报告模板、评价指标和版本发布标准。医生看到的是符合本专科语言与操作习惯的工作台，而不是包含大量无关功能的统一门户。",
        "公共基础设施层面，各产品复用DICOM接收、序列识别、任务队列、GPU调度、三维渲染、CT与MPR联动、病例权限、操作日志、报告生成、模型登记、版本发布和证据归档。共享的是稳定基础能力，而不是把不同临床逻辑压缩成同一流程。",
        "共享模块需要提供明确接口和版本兼容策略；专科团队保留决定输入准入、测量定义、失败规则和审核路径的权力。只有经过多个专科重复验证、语义稳定的能力，才应进入MEDIFORGE公共层。",
      ],
    },
    {
      heading: "五、三类专科产品模式",
      paragraphs: [
        "关节外科双下肢智能规划产品的拟定工作流为：DICOM导入、输入准入、AI三维重建、解剖结构识别、自动测量、工程师复核与修订、医生审核、报告输出和全过程留痕。其验证对象不能只包括骨结构分割，还应包括长轴、关节线和测量点定义，二维投影与三维坐标之间的关系，左右侧识别，截断扫描和金属伪影处理，以及人工修订后报告数值是否同步更新。该产品当前应按科研与工程研发管理，每例独立复核，输出不替代医生诊断或手术决策。",
        "跟骨与足踝智能重建及复位产品的拟定工作流为：影像输入、骨折块分割、骨块身份与邻接关系确认、AI复位候选、工程师修订、医生确认、三维模型或规划输出，以及修订数据回流。关键不是生成视觉上完整的骨模型，而是避免遗漏具有临床意义的骨折块，并记录每一块骨片从初始分割到最终确认的变化。评价应区分分割质量、复位几何误差、临床可接受性和效率；Dice不能单独代表骨块识别或复位质量。",
        "肺部三维重建与术前规划产品的拟定工作流为：DICOM输入、肺叶和肺段及支气管与动静脉自动分割、三维重建、CT与MPR联动、工程师质控、医生审核和手术规划输出。此类产品的主要风险之一是结构命名或对应关系错误，因此需要把解剖标签、疑点定位、影像层面和三维对象绑定，并允许审核者从三维结构快速回到原始影像。颜色和透明度只能改善观察，不能替代对重影、重复结构、错误连通和漏分支的质控。",
        "以上三类产品目前均属于研发与产品化路径示例。本文不据此主张其已完成多中心临床验证、获得注册批准或可直接用于正式临床诊疗。",
      ],
    },
    {
      heading: "六、五级临床证据体系",
      paragraphs: [
        "专科产品应从开发第一天建立证据结构，而不是在准备论文或注册时追补数据。第一级是数据与任务定义：记录病例来源、纳排标准、扫描协议、标注规则、参考标准和数据划分，防止训练集、验证集与测试集混用。",
        "第二级是模型技术验证：用独立数据集评价分割、识别、测量或复位性能，报告置信区间、失败分布和亚组，并单列严重失败、空标签、错侧、截断和异常解剖。",
        "第三级是工作流与人机团队验证：评价用户能否发现错误、完成修订并正确理解输出，指标包括完成时间、修订比例、未发现的关键错误、观察者一致性、医工分歧及阻断后的处置结果。DECIDE-AI可为早期现场评价提供报告框架。[7]",
        "第四级是临床影响评价：根据风险与用途，采用前瞻性队列、读片者研究、对照研究或随机试验，评价规划质量、决策变化、相关临床结果和资源使用，并参考适用的AI研究规范。[8][9]",
        "第五级是部署后监测与真实世界证据：持续观察数据漂移、性能变化、修订模式、异常事件和版本升级影响。每次更新应说明原因、验证范围、适用版本和回滚条件。真实世界数据只有在任务定义、数据质量和分析方法充分时，才能支持有效性或安全性判断。",
        "最小证据链应包括病例与输入版本、AI输出、质控信息、人工修改、审核意见、最终结果、模型与软件版本、输出时间，以及研究允许时获得的随访或参照结果。患者信息按授权和最小必要原则处理，科研数据与临床生产数据保持边界。",
      ],
    },
    {
      heading: "七、MEDIFORGE的阶段定位",
      paragraphs: [
        "MEDIFORGE现阶段应为专科产品提供可复用的技术与治理基础设施，而不是要求所有科室进入庞大的统一前台。优先稳定影像与三维、AI推理与任务编排、病例权限、审核报告与审计、模型登记和版本监测等公共能力。",
        "专科产品则围绕科室任务形成独立入口、独立配置和独立证据包。关节外科不需要看到肺段命名工具，胸外科也不需要继承骨科测量流程。平台通过统一病例标识、接口、审计和版本治理连接这些产品，而不抹平它们的临床差异。",
        "当产品用途稳定、工作流可重复、证据能够支持风险与效益判断，且公共模块经多产品复用仍保持一致时，医院级平台才具备真实基础。MEDIFORGE由此成为成熟产品在基础设施和治理层面的汇聚。",
      ],
    },
    {
      heading: "八、实施路径",
      paragraphs: [
        "第一阶段冻结产品边界，为每个产品形成用途说明、责任矩阵、输入标准、关键失败清单、人工接管规则、输出模板和版本规则，并建立可追踪输入、模型、修改、审核和输出的最小证据数据模型。",
        "第二阶段完成工程闭环和单中心评价，确认流程稳定、严重错误可阻断、修订完整留痕、报告准确反映最终结果，指标同时覆盖算法、工作流、人因和效率。",
        "第三阶段进入前瞻性和多中心验证。各中心使用统一任务定义和最小数据集，预先规定主要终点、亚组和版本锁定。研究期间若模型变化，应按变更计划判断是否重新验证，不能直接合并多个版本结果。",
        "第四阶段再推进规模复制和平台汇聚，成熟产品共享部署、权限、运维、培训和质量体系。新专科仍须从清晰任务开始，不能因已有平台而跳过用途定义和独立验证。",
        "由此形成的产品化路径是：模型、专科产品、临床证据、多中心复制、产品矩阵和医院级平台。每一步都有独立的完成标准，上一阶段的技术成绩不能自动替代下一阶段的临床或监管证据。",
      ],
    },
    {
      heading: "九、讨论",
      paragraphs: [
        "专科闭环路线能够降低验证复杂度。明确用户、输入、输出和责任，使团队识别真正影响安全与效率的环节，也让商业交付与证据建设针对同一工作流，而不是与临床脱节的算法演示。",
        "代价是前台产品可能重复建设或形成技术孤岛。因此，产品团队负责临床任务和证据，平台团队负责基础服务、接口、权限、审计和版本治理，二者通过产品契约连接。",
        "“修订数据回流”也不等于自动持续学习。数据必须经过质控、用途授权、版本标记和训练准入；模型更新后仍需独立验证和受控发布。学习闭环首先是治理闭环。",
      ],
    },
    {
      heading: "十、局限性",
      paragraphs: [
        "本文是一项产品战略与监管方法研究，不是针对具体器械的注册路径判定，也未对某一产品开展系统综述、临床试验或卫生经济学评价。不同专科产品的风险分类、临床评价要求和注册资料应根据预期用途、输出对临床决策的影响及适用法规逐项确定。",
        "文中引用的FDA人工智能器械全生命周期文件仍为草案，其内容可能在最终发布时调整。2026年高端医疗装备推广应用项目具有明确年度目录，本文提出的方法论不能替代对申报指南、注册证范围和地方推荐要求的逐条核查。真实世界证据也不能普遍替代随机试验，研究设计应与具体临床问题和风险水平相匹配。",
      ],
    },
    {
      heading: "十一、结论",
      paragraphs: [
        "医疗AI下一阶段的竞争单位，不应只看模型，也不宜简单看平台规模，而应看能否围绕一个具体临床问题形成可使用、可审核、可追溯和可验证的专科产品。一个有效的产品需要同时交付算法结果、人工复核机制、标准化输出和连续证据链。",
        "对子殷而言，近期应把既有算法、三维重建、临床工程和医院协作能力逐个产品化：双下肢、跟骨与足踝、肺部三维重建分别形成关节外科、足踝外科和胸外科产品。各产品完成工程闭环、临床评价和受控迭代，再共享MEDIFORGE基础设施。",
        "这一路线并非放弃平台，而是改变平台形成的顺序。先让专科产品在真实任务中成熟，再让平台从已被验证的共同需求中生长。最终形成的MEDIFORGE，才可能成为由临床产品、证据和治理共同支撑的医院级临床操作平台。",
      ],
    },
  ],
  sectionTables: {
    "四、专科AI产品与“专科AI产品工厂”": {
      caption: "表1　专科AI产品工厂的两层结构",
      columns: ["层级", "保持独立或共享的内容", "产品原则"],
      rows: [
        ["临床产品层", "专科任务、输入准入、测量定义、失败规则、复核路径、报告与评价指标", "产品可独立部署、验证和交付"],
        ["公共基础设施层", "DICOM、三维渲染、AI推理、任务队列、病例权限、审核、报告、审计与版本治理", "只沉淀经多产品复用且语义稳定的能力"],
      ],
    },
    "六、五级临床证据体系": {
      caption: "表2　从模型到持续证据的五级评价路径",
      columns: ["证据层级", "主要问题", "典型评价对象"],
      rows: [
        ["1 数据与任务", "数据与任务是否定义清楚", "来源、纳排、扫描协议、标注、参考标准、数据划分"],
        ["2 技术验证", "模型是否在独立数据中稳定工作", "性能、置信区间、失败分布、亚组和严重失败"],
        ["3 人机工作流", "用户能否发现、修订并正确理解错误", "完成时间、修订、关键漏检、一致性与阻断处置"],
        ["4 临床影响", "产品是否改善任务、决策或相关结局", "前瞻性队列、读片者研究、对照研究或随机试验"],
        ["5 部署后证据", "真实使用中是否持续安全有效", "漂移、修订模式、异常事件、版本升级与回滚"],
      ],
    },
  },
};
