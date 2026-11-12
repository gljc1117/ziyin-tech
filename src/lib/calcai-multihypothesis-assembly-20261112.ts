import type { CompanyNewsArticle } from "./company-news";

export const CALCAI_MULTIHYPOTHESIS_ASSEMBLY: CompanyNewsArticle = {
  "id": "calcai-multihypothesis-assembly-20261112",
  "title": "跟骨骨折虚拟复位的多假设断面匹配与整体装配——CalcAI 单例对照与失效分析",
  "sourceTitle": "跟骨骨折虚拟复位的多假设断面匹配与整体装配——CalcAI 单例对照与失效分析",
  "summary": "CalcAI 在一例跟骨骨折开发病例上对照三种候选流程。整体几何误差未低于原基线。冻结后核查发现，14 条可核验的既有关系中有 6 条在人工参考位姿下未通过匹配规则，一条后关节面相关关系的局部最优候选出现约 173° 的相对旋转偏差。",
  "category": "学术观点",
  "eventDate": "2026-11-12",
  "sourcePublishedAt": "2026-11-12",
  "dateLabel": "2026年11月12日 · 瑜秀瞳芯 · 单例工程研究",
  "status": "approved",
  "numberedReferences": true,
  "sourceAttribution": "作者　瑜秀瞳芯。本文为子殷科技 CalcAI 单例工程研究，未经学术期刊同行评审。公开证据为数值汇总与原创统计图。代码包的 44 项算法与评估测试已复跑通过，覆盖刚体变换、候选筛选、冲突降权和评估完整性等工程约定。真实病例数值源自本轮冻结输出和后验报告。作者所属的子殷科技参与 CalcAI 研发。ChatGPT 协助文献核对、文字编辑和统计图制作。",
  "cover": {
    "url": "/images/news/calcai-multihypothesis-assembly-20261112.png",
    "originalUrl": "/images/news/calcai-multihypothesis-assembly-20261112.png",
    "width": 1200,
    "height": 682,
    "alt": "图 1　四种流程与同一人工参考的几何点差。左为后关节面相关骨块 P95，右为 15 个非固定骨块各自 P95 的平均值。"
  },
  "gallery": [],
  "sections": [
    {
      "heading": "摘要",
      "paragraphs": [
        "目的　检验多假设断面匹配、整体装配搜索和冲突关系降权，能否使跟骨骨折虚拟复位更接近人工参考，并定位误差出现在哪个环节。",
        "方法　以一例既有开发病例的 18 个 CT 重建骨块为输入。对候选断面生成多个刚体位姿，以固定参考骨块为起点进行束搜索，并在联合优化中降低冲突关系的权重。以原 CalcAI 输出为基线，对照沿用旧对应、重新匹配断面、多假设装配并增补候选关系三种流程。各组结果冻结后，才读取人工复位参考，计算后关节面相关骨块的对应点差 P95，以及 15 个非固定骨块各自 P95 的平均值。",
        "结果　原基线的两项指标分别为 23.288 mm 和 7.106 mm。三种候选流程的整体误差均上升，多假设组分别增至 39.470 mm 和 9.614 mm。冻结后核查发现，14 条可核验的既有关系中，6 条在人工相对位姿下未通过当前匹配规则。一条涉及后关节面的关系中，局部得分最优的候选与人工参考的相对旋转差达 172.70°。",
        "结论　三种候选流程的整体误差均高于原基线。候选池回查表明，接近人工参考的位姿可能未进入候选池，而方向偏差很大的候选仍可能获得优先评分。后续应分别验证骨折面身份、对接伙伴、位姿候选覆盖与排序，再检验整体求解的收益。",
        "关键词　跟骨骨折、虚拟复位、断面匹配、刚体配准、束搜索、可切换约束"
      ]
    },
    {
      "heading": "1　研究背景",
      "paragraphs": [
        "跟骨骨折的 CT 虚拟复位已有研究基础。[1] 对多骨块装配而言，一处断面的局部贴合可能对应多种相对位姿。有限面片上的距离和法向满足筛选条件时，其余骨面仍可能处于错误方向。几何重组研究已将断面提取、两两匹配与多碎片整体对齐分阶段处理。[2][3] 胫骨远端粉碎性骨折的重建研究也表明，骨折断面、关节面与其余骨外表面可以作为不同对象进行识别。[4]",
        "本研究承接子殷此前提出的骨面语义识别与联合复位方法学框架[6]。对于存在局部断面配对歧义的病例，我们比较保留多个候选、联合检查装配并降低冲突边权重后，所得位姿与人工参考的差异是否小于原基线。"
      ]
    },
    {
      "heading": "2　材料与方法",
      "paragraphs": [
        ""
      ]
    },
    {
      "heading": "2.1　数据与参考",
      "paragraphs": [
        "使用一例曾参与 CalcAI 研发的跟骨骨折数据。三种候选流程共用 18 个骨块的源网格，仅估计旋转和平移。以一个后结节骨块为固定参照，消除整体平移和旋转自由度。人工复位模型包含全部 18 个骨块，其中 16 个通过严格刚体对应核验，包括固定骨块。其余 2 个保留在装配与碰撞检查中，其误差未计入严格对应统计。"
      ],
      "headingLevel": 3
    },
    {
      "heading": "2.2　多假设断面匹配",
      "paragraphs": [
        "对候选面片采用基于主成分方向的多起点刚体配准。局部配准后，用双向距离、覆盖率、互为近邻的支持点对和法向相向程度筛选，并对相近位姿去重，每条关系最多保留三个不同候选。17 条既有关系均产生了候选。另筛查 136 个新伙伴组合，21 个通过初筛，按预设互选规则纳入 4 条候选关系。新增关系的搜索面片取自既有候选面片的合并区域，其解剖身份待确认。"
      ],
      "headingLevel": 3
    },
    {
      "heading": "2.3　整体装配搜索与冲突关系降权",
      "paragraphs": [
        "以固定骨块为起点，逐步加入骨块和相对位姿，每一步保留多个排名靠前的部分装配。放置新骨块时检查其与已放置骨块的几何碰撞。证据不足时允许沿用初始位姿，作为回退状态记录。",
        "联合求解把骨块视为位姿图的节点，把面片对接假设视为边。每条边的局部残差由带容差区间的双向点到面距离和法向关系构成。设该边残差均方值为 z，权重开关为 s（取值 0 至 1），关闭代价系数为 λ。边能量写为 s²z + λ(1 − s)²，给定位姿时可解析得到 s = λ/(λ + z)。高残差边因此降低影响，同时保留偏离完全启用状态的代价。整体目标还包含碰撞与位姿偏移约束。该设计借鉴位姿图优化中的可切换约束。[5]"
      ],
      "headingLevel": 3
    },
    {
      "heading": "2.4　对照与评价",
      "paragraphs": [
        "除冻结的原 CalcAI 基线外，第一组沿用原有对应与基线初值，使用新求解器。第二组保持基线初值，更换为重新匹配的对应。第三组使用束搜索生成初始装配，加入新的候选关系后联合优化。第三组还改变了部分归一化及搜索范围，因此四组结果用于比较流程表现，单个模块的因果贡献需另做消融试验。",
        "三组自动结果全部冻结后才读取本例人工参考。对通过严格对应核验的骨块，在同一固定参照下计算对应表面点的欧氏距离，再取第 95 百分位数（P95）。整体指标等权平均 15 个非固定骨块的 P95。两项指标衡量与人工参考的几何差异，单位均为毫米。临床关节面台阶、骨折间隙和复位可接受性需另行测量与判定。各候选流程对 18 块骨的全部 153 个骨块对进行最终几何碰撞检查。"
      ],
      "headingLevel": 3
    },
    {
      "heading": "3　结果",
      "paragraphs": [
        "重新匹配组的后关节面相关骨块点差比原基线低约 0.03 mm，同时整体平均 P95 增加约 0.71 mm。多假设组在进入联合优化前，两项误差已为 40.413 mm 和 9.728 mm，优化后降至 39.470 mm 和 9.614 mm，仍高于原基线。三组均达到预设的 40 次目标函数评价预算，数值收敛有待确认。",
        "多假设组最终只有 12/21 条关系通过几何支持检查，新增的 4 条均未通过。该组同时具有三组中最低的最大碰撞深度代理值，约 1.620 mm，且与人工参考的整体偏差最大。三组的有效几何支持图均未将全部骨块连接到固定参照。图上的有效连接用于诊断定位约束是否充足，骨块的实际接触状态仍需解剖复核。"
      ]
    },
    {
      "heading": "4　失效分析",
      "paragraphs": [
        ""
      ]
    },
    {
      "heading": "4.1　当前匹配规则会拒绝一部分人工参考位姿",
      "paragraphs": [
        "17 条原有关系中，14 条的两端骨块均具备严格对应，可计算人工相对位姿。其中 6 条在该位姿下未通过当前局部匹配规则。另有 4 条新增关系，在人工相对位姿下的候选面片覆盖率均为零。候选面片范围、伙伴选择、法向和筛选阈值都可能影响结果。人工复位也存在参考不确定性，需要逐条核对来源。"
      ],
      "headingLevel": 3
    },
    {
      "heading": "4.2　局部评分最优的候选可能严重偏转",
      "paragraphs": [
        "一条涉及后关节面的关系中，排名第一的局部假设与人工参考的相对旋转差为 172.70°。在该关系保留的三个假设中，后验对应点差最小的一个仍有 5.226 mm 的相对点差 P95，旋转差为 44.55°。这里比较的是一对骨块的相对变换，表 1 则在固定参照下评价整块骨的位姿。两种量应分别解读。人工参考仅在冻结后用于核查，原候选顺序与自动输出均以冻结记录为准。"
      ],
      "headingLevel": 3
    },
    {
      "heading": "4.3　候选生成与候选排序都需要检验",
      "paragraphs": [
        "正确方向若在面片识别或局部筛选阶段被排除，扩大整体搜索只能探索剩下的候选。即使候选池含有较接近参考的位姿，排序仍可能优先保留局部贴合较好、整体方向较差的组合。工程上需要分别记录真实伙伴是否被纳入、接近参考的位姿是否出现在候选池，以及最终选解是否保留了这类候选。多假设框架使这三个问题可以沿同一流程逐项检查。"
      ],
      "headingLevel": 3
    },
    {
      "heading": "5　局限与下一轮验证",
      "paragraphs": [
        "本研究使用单一既有开发病例，人工复位是工程几何参照，仍需专业复核。骨块和候选关系来自同一病例，统计推断以患者为独立单位。本轮结果适用于该例的失效排查。三组均受计算预算限制，多假设组又同时改变多项因素，因此算法泛化、各模块净效应及临床可接受性均待独立验证。",
        "下一轮拟先在源 CT 与网格上核对真实骨折面、关节面和其余骨外表面，明确可对接面片及容易误配的反例，保留待确认区域。随后在同一候选池下对比不同排序规则，并使用术前资料确认的关系和自动关系分别驱动同一个求解器，控制初值、搜索预算与选解方式。正式评价应在按患者隔离的新病例中预先定义，分别报告候选召回、配对与选解表现、关键区域几何误差、人工复核分歧及修正时间。"
      ]
    },
    {
      "heading": "6　结论",
      "paragraphs": [
        "本轮验证支持将多假设装配、冲突关系降权和几何支持检查保留为研究工具。实测结果未达到纳入 CalcAI 正式版本的要求。下一轮优先校准断面、伙伴与匹配评分，再验证整体求解。"
      ]
    }
  ],
  "sectionTables": {
    "3　结果": {
      "caption": "表 1　与同一人工复位参考比较的几何误差",
      "columns": [
        "流程",
        "后关节面相关骨块点差 P95（mm）",
        "整体平均 P95（mm）",
        "最终几何支持关系"
      ],
      "rows": [
        [
          "原 CalcAI 基线",
          "23.288",
          "7.106",
          "—"
        ],
        [
          "旧对应＋新求解器",
          "23.440",
          "7.662",
          "16/17"
        ],
        [
          "重新匹配断面＋新求解器",
          "23.255",
          "7.812",
          "16/17"
        ],
        [
          "多假设装配＋增补候选关系",
          "39.470",
          "9.614",
          "12/21"
        ]
      ]
    }
  },
  "references": [
    {
      "title": "Xia S, Fu B, Wang B, et al. Computed Tomography Imaging-Based Preoperative Virtual Simulation for Calcaneal Fractures Reduction. J Foot Ankle Surg. 2019;58(2):248–252.",
      "url": "https://doi.org/10.1053/j.jfas.2018.08.054",
      "linkLabel": "DOI 10.1053/j.jfas.2018.08.054",
      "verification": "search_summary"
    },
    {
      "title": "Huang QX, Flöry S, Gelfand N, Hofer M, Pottmann H. Reassembling fractured objects by geometric matching. ACM Trans Graph. 2006;25(3):569–578.",
      "url": "https://doi.org/10.1145/1141911.1141925",
      "linkLabel": "DOI 10.1145/1141911.1141925",
      "verification": "search_summary"
    },
    {
      "title": "Lu J, Sun Y, Huang Q. Jigsaw: Learning to Assemble Multiple Fractured Objects. Advances in Neural Information Processing Systems. 2023;36.",
      "url": "https://papers.nips.cc/paper_files/paper/2023/hash/30ae2af8612ac74357363e8ae877d80c-Abstract-Conference.html",
      "linkLabel": "NeurIPS 论文",
      "verification": "search_summary"
    },
    {
      "title": "Liu P, Hewitt N, Shadid W, Willis A. A system for 3D reconstruction of comminuted tibial plafond bone fractures. Comput Med Imaging Graph. 2021;89:101884.",
      "url": "https://doi.org/10.1016/j.compmedimag.2021.101884",
      "linkLabel": "DOI 10.1016/j.compmedimag.2021.101884",
      "verification": "search_summary"
    },
    {
      "title": "Sünderhauf N, Protzel P. Switchable Constraints for Robust Pose Graph SLAM. IEEE/RSJ International Conference on Intelligent Robots and Systems. 2012.",
      "url": "https://nikosuenderhauf.github.io/assets/papers/IROS12-switchableConstraints.pdf",
      "linkLabel": "作者存档",
      "verification": "search_summary"
    },
    {
      "title": "瑜秀瞳芯. 面向跟骨骨折虚拟复位的骨面语义识别与多骨块联合求解. 子殷科技. 2026.",
      "url": "https://www.chcomct.cn/news/calcai-surface-semantics-joint-reduction-20261111",
      "linkLabel": "前序方法学论文",
      "verification": "primary_full_text"
    }
  ]
};
