import type { CompanyNewsArticle } from "./company-news";

const common = {
  category: "学术观点",
  eventDate: "2026-11-07",
  dateLabel: "2026年11月7日 · 子殷科技 · 研究述评与方法探索",
  sourcePublishedAt: "2026-11-07",
  status: "approved" as const,
  numberedReferences: true,
  sourceAttribution: "子殷科技原创研究述评与方法探索。本文未经学术期刊同行评审，不报告新增临床试验或本公司产品性能验证结果。文中拟议研究与实施建议需另行完成验证。",
  referenceNote: "资料核验截至2026年11月7日。企业及机构公告用于确认事件与所述技术路径，不能替代独立比较研究；本公司公开材料仅作业务背景。ChatGPT参与资料检索、文字与原创方法图整理。",
  gallery: [],
};

export const NEWS_RESEARCH_20261107: CompanyNewsArticle[] = [
  {
    ...common,
    id: "medical-ai-clearance-payment-gap-20261107",
    title: "获批不是终点：医疗人工智能的审评加速与支付断层",
    sourceTitle: "获批不是终点：医疗人工智能的审评加速与支付断层",
    summary: "2026年11月第一周，美国监管端接连出现三则可对照阅读的消息：AI血管内超声平台获FDA 510(k)许可、皮肤病理AI获FDA突破性医疗器械认定、一项行业报道盘点了近600个获批放射AI项目多数没有医保覆盖的支付困局。本文以洞见与分析为出发点，提出审评门、证据门、支付门的三门框架：审评正在加速，证据在逐步积累，而支付才是决定采用率的实际闸门；并讨论这一结构对国内医学影像AI与医学3D打印收费立项的映射意义。",
    cover: {
      url: "/images/news/medical-ai-clearance-payment-gap-20261107.svg",
      width: 1200, height: 630,
      alt: "原创三门框架示意：医疗AI产品依次面对审评门、证据门与支付门；前两道门正在加速通过，多数产品卡在支付门。图示为本文分析框架。",
    },
    sections: [
      { heading: "摘要", paragraphs: [
        "目的：从同期出现的三则美国监管与支付消息出发，分析医疗人工智能产品从获批走向临床采用之间的结构性断点，并讨论其对中国同类产品的可迁移启示。方法：定向核对2026年11月4日至6日企业公告与专业媒体报道原文，区分许可、认定与支付三类不同性质的制度事件，再以统一框架对照其所处阶段。本研究属于叙述性述评与方法构建，未开展系统综述或新增试验。",
        "框架产出：本文提出审评门、证据门、支付门三道门。血管内超声个案显示AI的进入点正从诊断端移向术中导航；皮肤病理个案显示监管路径本身已成为可设计的竞争变量；而近600个获批放射AI项目多数无保险覆盖的报道提示，采用率的实际闸门在支付端。上述判断为分析框架与可检验假设，不构成对任一产品临床成效的证明。",
        "关键词：医疗人工智能；FDA 510(k)；突破性医疗器械；血管内超声；数字病理；医保支付；收费立项"
      ] },
      { heading: "1 三则消息，一条主线", paragraphs: [
        "第一则：2026年11月4日，美国加州圣何塞的Evident Vascular公司宣布，其血管内超声引导系统与外周成像导管获美国食品药品监督管理局（FDA）510(k)许可，用于外周血管介入手术中对血管内病变的超声检查。企业将卖点概括为高保真成像、专门打造的人工智能与简化工作流的结合；公告同时明确，该系统与导管目前尚未在美国或其他地区上市销售。[1][2]",
        "第二则：法国Primaa公司的皮肤癌人工智能辅助诊断工具Cleo Skin，于2026年10月21日获FDA突破性医疗器械认定（FDA编号Q262799），11月6日对外报道。它由此成为皮肤病理领域第一个同时持有欧洲CE-IVDR认证（2026年3月获得）与FDA突破性认定的AI工具。需要校准的是：突破性认定不是上市许可，它提供的是与FDA优先沟通的通道，正式上市仍须另行提交审评。[3][4]",
        "第三则：美国全国广播公司康涅狄格频道11月6日的报道指出，过去五年FDA已批准近600个放射科人工智能项目，但其中大多数没有保险覆盖；有的产品拿到FDA批准和美国医学会的临时计费代码，报销仍未跟上；也有乳腺癌AI筛查项目靠患者自付维持运行。三则消息放在一起看，主线很清楚：审评在加速，支付在迟到。[5]"
      ] },
      { heading: "2 洞见一：AI的进入点正从诊室移向术中", paragraphs: [
        "Evident个案的技术构成值得拆解。据企业公告，其平台把宽频带成像与增强型换能器设计、自研的动态频率控制技术、基于英伟达加速计算的实时图像处理、自研AI工作站，以及免冲洗即插即用导管、免手持语音控制等工作流设计打包在一起。这不是一个单机算法，而是一套进入导管室的成像系统：AI的竞争单元，正在从单个模型变成硬件、算法与流程的组合。[1][2]",
        "路径选择同样说明问题。510(k)是实质等同路径，前提是市场上已有可对照的谓词器械；一家初创公司能以此路径获批，说明血管内超声这一赛道的器械谱系已经成熟到可以锚定比较。结合近期心腔内超声AI导航等同类动态，可以看到一个共同方向：AI正从体外影像的读片环节，向血管内、心脏内的术中实时导航环节延伸，竞争随之加速。对身处影像与三维重建行业的企业而言，值得追踪的不是某个单品，而是术中场景对成像质量、工作流延迟和证据形式提出的新要求。",
        "同时也要保留一分冷静：企业在公告中明确产品尚不可售。许可解决的是能不能卖的资格问题，渠道、装机与临床培训等商业化环节仍在门外。把获批等同于上市，是解读这类消息时最常见的误读。"
      ] },
      { heading: "3 洞见二：监管路径本身已成为可设计的竞争变量", paragraphs: [
        "Primaa的路径顺序颇具设计感：先在欧洲完成CE-IVDR认证并在多家病理实验室落地，再携多中心研究数据赴美取得突破性认定，最后才进入美国上市审评的正式提交。顺序不是偶然的：欧洲认证与真实世界使用在先，既积累证据，也为与FDA的优先沟通准备了筹码。监管路径由此从被动合规，变成可以主动规划次序的竞争变量。[3][4]",
        "其证据形态同样值得注意。据报道，SkinPerf2026多中心研究纳入法国11家机构的16名病理医生、313张全切片图像，使用Cleo Skin后黑色素瘤检出敏感度由83.8%提高到88.6%；在美国与PathPresenter合作的探索性评估中，7名病理医生复核75张全切片图像，分析时间减少20%，其中年轻病理医生的诊断敏感度提高17%。样本规模有限、属探索性评估，这些数字不能外推为普遍结论；但年轻医生获益更明显的方向性提示耐人寻味：AI在病理这类经验密集型工作中的早期价值，可能首先体现在拉平经验曲线，而非替代资深判断。[3][4]",
        "还要给突破性认定祛魅：它的含金量在于沟通优先级与审评互动密度，不在于疗效背书。把它写成获批，不只是概念错误，也会误判产品离临床收入的真实距离。路径可以设计，证据不能跳过，这是这一则消息留下的分寸。"
      ] },
      { heading: "4 洞见三：决定采用率的实际闸门在支付端", paragraphs: [
        "第三则报道给出了一个刺眼的对照：五年近600个放射AI项目获批，多数却没有保险覆盖。两个样本呈现了支付断层的两种形态：Avenda Health的前列腺癌筛查工具已获FDA批准并取得美国医学会临时计费代码，却仍卡在报销落地的慢通道上，属于有代码、无支付；RadNet的乳腺癌AI筛查靠患者自付跑通了使用量，却把可及性的门槛留给了患者，属于有使用、无覆盖。[5]",
        "编码与支付方的谨慎也有其理由：报道提到，医学协会与监管方对为AI项目设立报销代码持审慎态度，主要顾虑是与传统筛查方法相比的比较有效性数据仍不充分，且逐个产品设码的复杂度本身就是障碍。换句话说，支付门的钥匙恰恰在证据门手里：审评回答的是安全与有效的基本问题，支付方追问的是相对现有方案多花的钱换来了什么。只过审评、不过证据，支付门很难打开。[5]",
        "值得注意的是，立法层面已有回应动作：美国参议院卫生、教育、劳工和养老金委员会主席于2026年10月29日公布了扩大医疗AI可及性的讨论稿，支付与采用问题正在进入规则制定的议程。审评与支付两套规则如何衔接，将决定这一批已获批产品是停留在展厅里，还是进入日常临床。[5][6]"
      ] },
      { heading: "5 三门框架：同一周的三个位置", paragraphs: [
        "把三个个案放进同一框架，可以看得更清楚。审评门回答能不能卖，近年明显在提速：510(k)路径成熟、突破性计划扩容，都在缩短产品与市场之间的距离。证据门回答值不值得用，正在积累但分布不均：头部产品已有多中心数据，多数获批项目仍只有注册研究级别的证据。支付门回答谁来买单，是目前通过率最低的一道：编码、覆盖与价格三件事彼此牵制，任何一件缺位，采用率都会打折。",
        "这一框架的用处在于定位：讨论任何一个医疗AI产品时，先问它卡在哪道门，再决定该补什么。卡在审评门的补注册策略，卡在证据门的补比较研究，卡在支付门的补价值论证与编码路径。用同一套话术应对三道门，是许多产品获批后停滞的共同原因。"
      ] },
      { heading: "6 映射到国内：注册、立项、支付是三件独立的事", paragraphs: [
        "中国的制度语言不同，但三门结构同样存在：医疗器械注册证对应审评门，临床证据与卫生技术评估对应证据门，医疗服务价格立项与医保支付对应支付门。三者由不同部门、按不同节奏推进，任何一门的通过都不自动带动另外两门。以医学3D打印为例，国家医保局立项指南将医学3D重建、模型打印与导板打印列为手术和治疗辅助操作类项目后，各省正陆续出台定价与支付规则；这一进程本质上就是本土版的支付门正在逐省打开，其进度直接决定医院开展相关服务的意愿。[7]",
        "对国内厂商，本文提出三点可执行建议。其一，证据前置：在注册研究阶段就按支付方的提问方式设计终点，预留与现有方案比较的维度，而不是获批后补作业。其二，价值可测量：把节省的医生时间、减少的重复检查、缩短的决策路径等工作流收益做成可核查的指标，支付谈判桌上，含糊的先进性不如具体的账。其三，路径分开排期：把注册、立项、支付当作三条独立的时间线管理，分别设定负责人与里程碑，避免用一张证规划全部市场动作。以上为本文建议，不代表任何机构的既定政策。",
        "也需说明移植的边界：美国的编码体系、商业保险结构与中国医保制度差异显著，三门框架可迁移的是问题结构，不是具体答案。国内支付门的特殊性在于价格立项先行、医保支付类别随后跟进，地方执行节奏不一，这要求厂商的市场开发必须以省为单位做功课——这正是子殷在医学3D打印收费政策跟踪中持续记录的内容。[7]"
      ] },
      { heading: "7 讨论与结论", paragraphs: [
        "本文的局限在于：核心素材以企业公告与专业媒体报道为主，未做系统文献检索，也未独立复核各产品的原始研究数据；美国制度环境与中国差异较大，框架迁移需结合本地规则再验证。Evident平台尚无公开的独立比较研究，Primaa的美国评估为小样本探索性研究，其敏感度与时间收益的置信范围未在报道中给出，引用时应保留这一限定。",
        "结论回到标题：对医疗人工智能而言，获批只是第一道门的通行证。术中导航等新场景会持续抬高审评与证据的门槛，而最终决定技术能否抵达患者的，是支付门能否以与审评相称的速度打开。审评加速与支付迟到之间的这段落差，既是这一批先行产品的困局，也是后来者可以提前布局的窗口：谁先按支付的语言准备好证据，谁就先走完最后一道门。"
      ] },
    ],
    sectionTables: {
      "5 三门框架：同一周的三个位置": {
        caption: "表1　三个个案在三门框架中的位置（本文依据公开报道的定位分析，截至2026年11月7日）",
        columns: ["个案", "审评门", "证据门", "支付门"],
        rows: [
          ["Evident Vascular 血管内超声平台", "510(k)已通过（2026-11-04）", "企业自述成像与工作流设计；独立比较证据未见公开", "尚未开始：企业声明产品尚不可售"],
          ["Primaa Cleo Skin 皮肤病理AI", "突破性认定（2026-10-21），非上市许可；CE-IVDR已获（2026-03）", "多中心研究敏感度83.8%→88.6%；美国小样本探索性评估", "未进入：美国上市审评尚未正式提交"],
          ["美国放射AI（行业整体）", "五年近600个项目获批", "比较有效性数据被支付相关方视为不足", "多数无保险覆盖；个案靠临时代码或患者自付"],
        ],
      },
    },
    references: [
      { title: "Evident Vascular, Inc. Evident Vascular Receives FDA Clearance for High-Fidelity AI Powered IVUS Imaging Platform. Business Wire, 2026-11-04（企业公告）", url: "https://www.businesswire.com/news/home/20261104930166/en/Evident-Vascular-Receives-FDA-Clearance-for-High-Fidelity-AI-Powered-IVUS-Imaging-Platform", verification: "primary_full_text" },
      { title: "Diagnostic and Interventional Cardiology. FDA Clears High-Fidelity AI Powered IVUS Imaging Platform. 2026-11-04（专业媒体报道）", url: "http://www.dicardiology.com/content/fda-clears-high-fidelity-ai-powered-ivus-imaging-platform", verification: "primary_full_text" },
      { title: "Clinical Lab Products. FDA Grants Breakthrough Device Status to Cleo Skin AI Pathology Tool. 2026-11-06（专业媒体报道）", url: "https://clpmag.com/disease-states/cancer/melanoma/fda-breakthrough-designation-cleo-skin-ai-dermatopathology/", verification: "primary_full_text" },
      { title: "Medical Laboratory Observer. Primaa's Cleo Skin receives FDA Breakthrough Device Designation. 2026-11-06（专业媒体报道，含FDA编号Q262799与认定日期）", url: "https://www.mlo-online.com/diagnostics/pathology/news/55417210/primaas-cleo-skin-receives-fda-breakthrough-device-designation", verification: "primary_full_text" },
      { title: "NBC Connecticut. AI Cancer Screening Programs on the Rise, But You May Need to Cover the Costs. 2026-11-06（媒体报道，含近600个获批项目与支付现状）", url: "https://ub.edu.pl/ai-cancer-screening-programs-on-the-rise-but-you-may-need-to-cover-the-costs-nbc-connecticut.html", verification: "primary_full_text" },
      { title: "U.S. Senate HELP Committee. Chairman Cassidy Unveils Discussion Draft to Expand Access to AI in Health Care, Improve Care for Patients. 2026-10-29（官方公告；本文未逐条核验草案全文）", url: "https://www.help.senate.gov/rep/newsroom/press/chairman-cassidy-unveils-discussion-draft-to-expand-access-to-ai-in-health-care-improve-care-for-patients", verification: "primary_full_text" },
      { title: "子殷科技. 医学3D打印收费立项落地盘点：十六省发文、三项定价与支付规则观察. 2026-11-02（业务背景）", url: "https://www.chcomct.cn/news/medical-3d-printing-pricing-policies-20261102", verification: "primary_full_text" },
    ],
  },
];
