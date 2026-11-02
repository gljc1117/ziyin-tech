import type { CompanyNewsArticle } from "./company-news";

export const MEDICAL_3D_MODEL_PRIORITY_REVIEW: CompanyNewsArticle = {
  "id": "medical-3d-model-priority-review-20261103",
  "title": "哪些三维模型应该优先复核——一项胸片分诊研究对医疗 3D 打印的启示",
  "summary": "一项胸片研究中，调整提醒阈值后，77 张应当优先排查的胸片被标出的数量从 64 张降至 46 张。本文结合子殷的跟骨建模场景，讨论如何检验复核顺序、保留打印放行审核，并衡量返修等待与工程师工时。",
  "category": "学术观点",
  "eventDate": "2026-11-03",
  "dateLabel": "2026年11月3日 · 子殷科技 · 研究视点",
  "sourceTitle": "哪些三维模型应该优先复核——一项胸片分诊研究对医疗 3D 打印的启示",
  "sourcePublishedAt": "2026-11-03",
  "status": "approved",
  "numberedReferences": true,
  "sourceAttribution": "作者：子殷科技。本文为研究评论。跟骨模型为说明性场景，优先复核方案尚待本地验证。",
  "cover": {
    "url": "/images/news/medical-3d-model-priority-review-20261103.svg",
    "width": 1200,
    "height": 675,
    "alt": "苏格兰胸片测试集。77 张经专家判为紧急疑似的胸片，两种阈值分别标出 64 张和 46 张。"
  },
  "gallery": [],
  "sections": [
    {
      "heading": "摘要",
      "paragraphs": [
        "在医院的三维打印中心，工程师往往同时收到多份候选模型。最值得先看的，可能是一处几乎被抹平的骨折线。怎样让这样的任务尽早到达有经验的复核者手中？本文从一项苏格兰胸片分诊研究出发，讨论子殷应怎样验证复核优先级。排序可以改变工程师先看哪份模型，每份模型进入制造前仍须专业审核。要衡量排序的价值，就要追踪哪些关键问题没有排到前面，以及复核者实际花了多少时间。"
      ]
    },
    {
      "heading": "一次阈值调整改变了谁先被看到",
      "paragraphs": [
        "2026 年 10 月 31 日，Duncan 等在《Insights into Imaging》发表研究，检验商用胸片算法能否标出放射科医生认为应紧急排查肺癌的影像。论文摘要报告前瞻性收集 2,887 张胸片，另有 983 张回顾性验证胸片。参考标准来自放射科医生独立双读及分歧裁决。研究衡量的是与专家优先处理意见的一致性，未以病理确诊或患者结局作为终点。[1]",
        "作者先让专家选择影像特征，按各自阈值触发提醒，再尝试将特征加权为一个分数，最后用数据筛选特征。最终的四项是实变、结节、结核和空洞。这里的“结核”是软件输出项的名称。它进入组合，只说明这个分数有助于预测专家是否会把胸片列为紧急疑似。[1]",
        "同一四特征模型采用两种阈值时，前瞻性测试集的表现如下。[1]"
      ]
    },
    {
      "heading": "少了哪些提醒",
      "paragraphs": [
        "第二种阈值少标了 107 张胸片，其中 89 张按专家判断无需紧急排查，另有 18 张本应优先。相同阈值在回顾性队列中实际标记了 25.8% 的胸片。“15%”描述的是研究团队在训练集上按当地人力选定的目标，并不能保证另一家医院每天恰好收到这么多提醒。[1]",
        "这个结果有一个重要限制。专家在研究平台上看不到病史和既往影像，一处长期稳定的异常也可能被列为紧急疑似。把同一分数搬进另一家医院之前，需要先弄清当地的医师要做什么决定，又能取得哪些信息。[1]"
      ]
    },
    {
      "heading": "跟骨模型上的一条骨折线",
      "paragraphs": [
        "设想一项跟骨骨折模型任务。医生想看清后关节面与骨折块的关系，工程师却发现，重建表面很光滑，原始 CT 上可见的一条骨折间隙在模型上连成了一片。即使整块跟骨的外形与影像大体一致，这处局部差异也足以改变模型能否回答医生的问题。工程师应把争议切面与模型轮廓叠加显示，请复核者判断是否退回修订。北美放射学会 3D 打印特别兴趣小组也建议将可打印模型的轮廓与源影像核对。[2]",
        "在子殷智能（chcomct SI）的足踝研发测试中，工程师保存修订后重新打开，确认下载的模型能与该版来源逐一对应。这回答的是“拿到的是哪一版”。“这一版是否保留了医生要看的关节面”仍需专业判断。把 SI 连接到打印设备时，队列排名可以决定谁先看。只有审核通过且版本一致的文件，才应进入制造。实物还须按用途完成质检，设备返回“打印完成”只能证明作业结束。"
      ]
    },
    {
      "heading": "怎样验证优先复核确实有用",
      "paragraphs": [
        "可以先选定一种用途，例如用于观察骨折形态的跟骨模型。请两位具备相应经验的复核者在看不到系统排序的情况下，独立判定哪些模型因关键结构缺失、粘连或边界不清而需要优先返修，分歧交第三人裁决。每一例都作判定，未获提醒的模型也要纳入，才能知道队列漏掉了什么。",
        "在此基础上，可把按提交时间复核作为对照，再试行另一种排序，把疑似骨块粘连、且位置恰好落在医生指定观察区域的任务排在前面。后者是否有用，由专家独立复核的结果检验。对已知侧别错误、文件版本不一致之类的问题，则应立即退回纠正，不必等待排序评分。",
        "在开发样本上选定规则后，锁定版本，在另一时段或另一院点连续收集的授权任务中静默运行，保留原审核顺序。逐例与专家判断比较，报告每百份任务有几份被提前、真正需要优先返修的模型漏掉几份，并记录遗漏的结构和原因。按冻结的规则回放既有队列，可以估算等待时间。只有在后续有人值守的对照试运行中，才能测到实际等待时间和工程师复核工时。DECIDE-AI 对真实流程、人机交互和人因的关注，可作为这一步的研究报告参考。[3]",
        "医院最终要追问两个问题。那些确实需要返修的模型，有没有更早被发现？为做到这一点，团队多花了多少复核时间，常规任务又多等了多久？只有同时答出这两个问题，才有依据决定某一院点是否值得采用这套排序。"
      ]
    }
  ],
  "sectionTables": {
    "一次阈值调整改变了谁先被看到": {
      "caption": "前瞻性测试集的两种阈值。¹ 分母为专家判为紧急疑似的胸片数。　² 原研究采用约登指数。数据据原文表 4 整理。",
      "columns": [
        "阈值设定方式",
        "实际标记率",
        "疑似识别数¹",
        "敏感度"
      ],
      "rows": [
        [
          "兼顾敏感度与特异度²",
          "23.8%",
          "64 / 77",
          "83.1%"
        ],
        [
          "训练集目标标记率为 15%",
          "12.5%",
          "46 / 77",
          "59.7%"
        ]
      ]
    }
  },
  "references": [
    {
      "title": "Duncan SF, Dudman K, Odigbo S, et al. Flagging urgent suspicion of lung cancer with AI CXR algorithms: optimising feature selection and performance. Insights Imaging. 2026;17:272.",
      "url": "https://doi.org/10.1186/s13244-026-02438-7",
      "verification": "primary_full_text"
    },
    {
      "title": "Chepelev L, Wake N, Ryan J, et al. Radiological Society of North America (RSNA) 3D printing Special Interest Group (SIG): guidelines for medical 3D printing and appropriateness for clinical scenarios. 3D Print Med. 2018;4:11.",
      "url": "https://doi.org/10.1186/s41205-018-0030-y",
      "verification": "primary_full_text"
    },
    {
      "title": "Vasey B, Nagendran M, Campbell B, et al. Reporting guideline for the early-stage clinical evaluation of decision support systems driven by artificial intelligence: DECIDE-AI. Nat Med. 2022;28:924–933.",
      "url": "https://doi.org/10.1038/s41591-022-01772-9",
      "verification": "primary_full_text"
    },
    {
      "title": "生物通（2026年11月2日）. 基于AI胸部X光算法标记肺癌紧急疑似：特征选择与性能优化的回归建模研究",
      "url": "https://www.ebiotrade.com/newsf/2026-11/20261101215456818.htm",
      "verification": "primary_full_text"
    }
  ]
};
