import type { CompanyNewsArticle } from "./company-news";

export const PELVIC_PLANNING_ADDED_VALUE: CompanyNewsArticle = {
  "id": "pelvic-surgical-planning-3d-printing-digital-twin-20261104",
  "title": "3D打印为手术规划增加了什么？从复杂骨盆骨折看数字孪生的验证条件",
  "category": "学术观点",
  "eventDate": "2026-11-04",
  "dateLabel": "2026年11月4日 · 子殷科技 · 研究述评",
  "sourcePublishedAt": "2026-11-04T00:35:00+08:00",
  "sourceTitle": "3D打印为手术规划增加了什么？从复杂骨盆骨折看数字孪生的验证条件",
  "sourceAttribution": "作者为子殷科技。本文为叙述性研究述评。选题源于 Foro3D 关于个体化手术规划的链接，撰稿时该页面已提示撤下。文献数据均引自下列可核验来源。孝感部分仅使用已公开的病例报道，分组比较与验证指标为本文提出的研究设计。",
  "status": "approved",
  "numberedReferences": true,
  "summary": "医生已经能在屏幕上旋转患者的骨盆，为什么还要打印一份？对孝感市中心医院的两例复杂骨盆骨折，答案落在术前的几项具体工作上：推演骨块复位、讨论钢板塑形、核对置钉方向。本文从这两例手术出发，比较虚拟规划、实体预演和患者数字孪生各自需要的证据，并提出一套检验打印增量价值的研究设计。",
  "cover": {
    "url": "/images/news/pelvic-planning-added-value-20261104.svg",
    "width": 1200,
    "height": 630,
    "alt": "图1　20名医生评估15例双柱髋臼骨折。在两轮均可比较入路的233次判断中，增加虚拟三维重建后，86次改变入路建议，147次维持原建议。图据文献[2]表2绘制。"
  },
  "gallery": [],
  "sections": [
    {
      "heading": "摘要",
      "paragraphs": [
        "术前规划有三个容易混在一起的问题。模型是否准确呈现损伤？医生拿到模型后，是否作出了有依据的不同决定？这个决定又是否改善了患者结局？本文选择直接比较规划方式的原始研究、髋臼骨折随机试验的荟萃分析，以及对子殷共建中心的公开报道，按各自能回答的问题解读证据。材料用于叙述性比较，未作系统检索或新的效应量合并。[1][2][3][4]",
        "现有资料支持三维信息可以改变部分医生的入路选择，也提示实体模型有助于具体的器械操作预演。打印对不同病例的额外贡献仍需设置相同数字模型作为对照。若进一步主张模型能随患者状态更新并预测下一步，则还须验证更新是否及时、预测是否准确，以及医生在哪些情况下应停止依赖模型。[2][3][6]"
      ]
    },
    {
      "heading": "一、从孝感病例看，一份骨盆模型交付了什么",
      "paragraphs": [
        "孝感市中心医院收治的两名患者分别因交通事故和高处坠落受伤。依托医院与子殷科技共建的数智医学与临床转化中心，子殷工程团队根据患者各自的CT重建骨盆，按实际大小打印模型，并为术前模拟复位提供技术支持。骨科团队在模型上推演复位、钢板塑形和置钉方案，随后由医生实施复位与内固定。公开报道记载两例术后影像复查显示复位良好，内固定位置符合预期。[1]",
        "同一处骨折，在屏幕上可以隐藏遮挡视线的骨块、旋转视角、比较拟复位前后的位置。在实体模型上，医生则能把钢板与骨面相对照，换一个方向观察贴合情况，也能把模型交给同事，指出正在讨论的那一小段骨面。这是两种可以分别观察和计时的工作。孝感报道说明二者怎样参与了手术准备，未提供仅做数字规划的对照、统一的偏差测量或长期功能随访。[1]"
      ]
    },
    {
      "heading": "二、额外信息改变了选择，是否也改善了结果",
      "paragraphs": [
        "Leemhuis等让20名骨盆创伤外科医生评价15例双柱髋臼骨折。对于两轮均选定可比较手术入路的233次判断，补充虚拟三维重建后有86次更改了入路建议，约占37%。医生间对入路选择的一致性仍低，κ从0.05变为0.13。这里改变的是医生对病例的判断，研究没有把这86次改变逐一与真实手术获益相配对。它也说明，屏幕上的重建本身就可能影响决策，研究打印时应把这个作用单独计入。[2]",
        "爱尔兰的一项前瞻性观察研究纳入20例骨盆或髋臼骨折，10例打印模型，另10例按骨折分类、性别和年龄匹配。医生认为实体模型补充了对骨折形态的认识，但原先基于CT制订的入路和术式没有改变。手术时间、出血量及复位质量等指标也未观察到显著改善。样本量限制了排除差异的能力，但这个结果解释了一个临床上很合理的情形：模型让团队更容易讲清方案，方案本身仍然成立。[3]",
        "在另一尺度上，Liu等汇总19项髋臼骨折随机试验，共1046名患者。汇报Matta影像复位优良率的11项研究显示，3D打印辅助组相对于常规组的风险比为1.17（95%置信区间1.09～1.25）。仅3项研究汇报Harris髋关节评分优良率，合并风险比为1.22（95%置信区间0.83～1.79），功能差异仍不确定。各研究报告的手术时间差异也有很高的异质性。这组证据支持继续研究适用病例，但无法据此给孝感的两位患者推算节省了多少分钟，或把整套辅助流程的效应单独归给打印件。[4]",
        "选择比较对象还取决于交付物。2026年10月，Fernandez-Calderon等报告4例复杂下肢重建，其中有截骨导板、用于同种异体跟骨塑形的三维建模，也有胫骨间隔物的建模。截骨导板传递的是一个切面，解剖模型传递的是形态和接触关系。即使两者都源自同一台打印机，也需要不同的准确性检验。该病例系列展示了实施方式，评价中包含医生问卷，无法单独估计某一工具的疗效。[5]"
      ]
    },
    {
      "heading": "三、打印件保存一个时点，数字孪生还要说明怎样更新",
      "paragraphs": [
        "为便于核验，本文采用美国国家科学院、工程院和医学院报告中的动态定义。数字模型与具体物理对象相联系，后者发生变化时，观测能更新模型，模型输出又能支持下一步行动。对于骨折，术前CT代表扫描时的几何状态，数字复位代表团队拟实现的位置，打印件则把选定版本固定下来。这三者都值得保留。数字复位图必须能与原始受伤状态区分，才不会把术前目标读成术中事实。[6]",
        "以一枚骨块为例，术前可以先记录它相对骨盆稳定区域的目标位置。若术中出现可用的新影像，研究者要说明怎样辨认同一骨块、怎样处理视角与坐标的差异、更新后的误差有多大，以及模型在哪个决策时点之前可供医生复核。如果只在手术结束后对照一次，得到的是术前计划与术后结果的一致性证据。要研究动态决策支持，还需要前瞻记录更新后的输出，并用当时未用于更新的观测检验它。[6]",
        "模型必须允许给出“当前资料不足以判断”。例如，局部骨面被遮挡，或配准的误差已接近两种备选方案之间的距离，勉强输出精确到毫米的位置会掩盖不确定性。对于进一步预测受力、稳定性等问题的物理模型，可借鉴FDA患者专属建模工具的思路，把预测用途和验证资料配对。该工具面向基于物理或生理方程的模型，其证据要求不能直接套用于纯数据驱动模型。[7]"
      ]
    },
    {
      "heading": "四、共建中心可以怎样检验打印的增量价值",
      "paragraphs": [
        "建议先开展离线、多阅片者的配对病例研究，问题限定为：在医生已经获得同一份经核对的三维重建后，增加等比例实物，能否提高预先指定任务的完成质量？可优先选择确实需要比较钢板贴合或复位顺序的病例。常规影像组保留医院日常可获得的CT重建视图，数字规划组在此基础上增加可交互的骨块模型，实体组再增加同版本打印件。三组均保留原始影像，记录额外讨论时间，避免把更多准备时间误认为打印效果。",
        "每个病例由不同医生在不同条件下独立判读。病例与条件按平衡顺序分配，使同一医生在不同病例中经历各条件，同时避免重复看同一病例造成记忆偏倚。预先选定一个主要任务，例如判断拟用钢板在哪一预定义骨面区段需要调整。由独立评审者在不知道分组的情况下对照统一的参考资料评分。存在多个合理方案时记录为可接受集合，资料不足时单列。主要比较为实体组与数字规划组的差值，并报告置信区间。统计分析同时考虑病例和医生造成的相关性。",
        "下表给出从工作台到随访的记录项目。方案变更、维持原方案、有理由放弃模型均须入册。报告时保留交付失败、模型返工和未按时交付的病例。下一阶段若要评价患者获益，再另行设计前瞻性临床比较，预先确定主要结局、随访窗口和样本量，并履行相应伦理与数据授权程序。"
      ]
    },
    {
      "heading": "五、结论",
      "paragraphs": [
        "对今天的院内共建中心，最有辨识度的一条记录是：医生在看过原始影像和虚拟骨盆之后，拿到实体模型时，又确认、修改或放弃了哪一个具体判断？把这个判断与独立复核、工程工时和实际手术对应起来，才有依据决定哪些病例值得打印。孝感两例提供了提出这个问题的临床场景。能否在新观测到来时更新判断、预测下一步并经独立验证，则是数字孪生研究还要完成的另一项工作。"
      ]
    }
  ],
  "sectionTables": {
    "四、共建中心可以怎样检验打印的增量价值": {
      "caption": "表1　拟议评价项目。不同层次使用不同分母，避免把模型交付数当作患者获益数。",
      "columns": [
        "评价对象",
        "拟记录的观测量",
        "比较或解释方式"
      ],
      "rows": [
        [
          "模型交付",
          "入组数、按时交付数、返工原因、工程师工时",
          "以全部符合条件病例为分母，报告等待时间和失败"
        ],
        [
          "规划判断",
          "指定任务的独立评分、方案修改或维持及其理由",
          "先比较同一数字模型有无实体打印，再比较常规影像与数字规划"
        ],
        [
          "计划执行",
          "预设骨性标志偏差、术中调整及原因",
          "利用临床已有且可判读的资料。分列主动改良方案、模型误差和无法评估"
        ],
        [
          "患者结局",
          "按骨折类型预先选择功能或生活质量指标，记录失访",
          "在前瞻性临床研究中比较，另报手术时间与影像复位结果"
        ]
      ]
    }
  },
  "references": [
    {
      "title": "子殷科技. 孝感市中心医院完成两例复杂骨盆骨折手术，子殷科技参与术前复位规划与3D打印. 2026年11月4日。",
      "url": "https://www.chcomct.cn/news/xiaogan-pelvic-fractures-3d-printing-20261104",
      "linkLabel": "查看来源",
      "verification": "primary_full_text"
    },
    {
      "title": "Leemhuis JF, Assink N, Reininga IHF, et al. Both-Column Acetabular Fractures: Does Surgical Approach Vary Based on Using Virtual 3D Reconstructions? Diagnostics. 2023, 13(9), 1629.",
      "url": "https://www.mdpi.com/2075-4418/13/9/1629",
      "linkLabel": "查看来源",
      "verification": "primary_full_text"
    },
    {
      "title": "Downey C, McCarrick C, Fenelon C, et al. A novel approach using 3-D printing in the Irish National Centre for pelvic and acetabular surgery. Irish Journal of Medical Science. 2020, 189, 219–228.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/31280418/",
      "linkLabel": "查看研究摘要",
      "verification": "search_summary"
    },
    {
      "title": "Liu W, Zhang C, Liu J, et al. Efficacy and safety of three-dimensional printing technology assisted open reduction and internal fixation versus conventional surgery in the treatment of acetabular fractures: a meta-analysis of randomized controlled trials. Journal of Orthopaedic Surgery and Research. 2025, 20, 518.",
      "url": "https://link.springer.com/article/10.1186/s13018-025-05940-8",
      "linkLabel": "查看来源",
      "verification": "primary_full_text"
    },
    {
      "title": "Fernandez-Calderon IM, Pérez-Cualtán CE, Torres-Gómez D, et al. Integration of 3D technologies in preoperative planning for complex lower extremity reconstructions: a descriptive case series study. 3D Printing in Medicine. 2026年10月8日在线发表。",
      "url": "https://link.springer.com/article/10.1186/s41205-026-00349-3",
      "linkLabel": "查看来源",
      "verification": "primary_full_text"
    },
    {
      "title": "National Academies of Sciences, Engineering, and Medicine. Foundational Research Gaps and Future Directions for Digital Twins. National Academies Press, 2024. DOI 10.17226/26894.",
      "url": "https://www.ncbi.nlm.nih.gov/books/NBK605515/",
      "linkLabel": "查看来源",
      "verification": "primary_full_text"
    },
    {
      "title": "美国食品药品监督管理局（FDA）. Workflow for Assessing the Credibility of Patient-Specific Modeling in Medical Device Software. RST24CM01.01, 2024.",
      "url": "https://www.fda.gov/medical-devices/regulatory-science-tools-catalog/workflow-assessing-credibility-patient-specific-modeling-medical-device-software",
      "linkLabel": "查看来源",
      "verification": "primary_full_text"
    }
  ]
};
