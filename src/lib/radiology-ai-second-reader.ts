import type { CompanyNewsArticle } from "./company-news";

export const RADIOLOGY_AI_SECOND_READER: CompanyNewsArticle = {
  "id": "radiology-ai-second-reader-3d-model-review-20261104",
  "title": "AI作为第二读者，会怎样改变人的判断？从21项放射学研究看骨折三维模型复核",
  "category": "学术观点",
  "eventDate": "2026-11-04",
  "dateLabel": "2026年11月4日 · 子殷科技 · 研究述评",
  "sourcePublishedAt": "2026-11-04T00:55:09+08:00",
  "status": "approved",
  "numberedReferences": true,
  "summary": "一项骨折读片研究中，AI辅助放射科医生的准确率为97.6%。这能说明人机协作比软件单独判读更准，却不能告诉我们医生看过提示后纠正了几次、又改错了几次。子殷科技结合21项研究的系统综述与跟骨三维重建实践，提出记录双向改判的复核方案。",
  "cover": {
    "url": "/images/news/radiology-ai-second-reader-20261104.svg",
    "width": 1200,
    "height": 630,
    "alt": "图1　Cureus综述纳入的21项研究按比较方式分为三组：仅考察AI独立判读11项，仅考察AI辅助读者6项，两种比较均有4项。子殷科技据文献[1]绘制。"
  },
  "gallery": [],
  "sourceTitle": "AI作为第二读者，会怎样改变人的判断？从21项放射学研究看骨折三维模型复核",
  "sourceAttribution": "子殷科技撰写。本文为研究述评。放射学研究数据引自所列文献，跟骨模型复核方案为作者提出的待验证设计。",
  "sections": [
    {
      "heading": "摘要",
      "paragraphs": [
        "在骨折三维模型复核中，一条AI提示可能使工程师回到CT切片，找出漏分的骨块，也可能让工程师放弃一个原本正确的判断。要知道提示是否值得采用，需要保留人第一次看到了什么、看过提示后改了什么，以及独立评审最终确认了什么。",
        "本文以AI产品库报道为线索，核对Diaz-Perdomo等发表于《Cureus》的系统综述，并回查骨折检测、乳腺影像阅片实验和筛查随机试验。现有证据对部分任务中AI辅助阅片的支持，比对AI独立判读的支持更一致。本文把这一区别用于设计跟骨模型复核研究，分别考察纠正错误、新增错误和人工复核用时。[1][2][3][4][5][6]"
      ]
    },
    {
      "heading": "一、21项研究分别在比较谁",
      "paragraphs": [
        "综述于2026年4月11日检索2019年以来的研究。21项中，11项仅考察AI独立判读，其中2项把专家确定的参考标准用于评价AI，没有另设医生读片组。6项仅比较读者有无AI辅助，4项兼有两类比较。18项研究评价特定任务的图像分析工具，只有3项评价生成式AI。[1]",
        "作者将18项归为回顾性或横断面研究，2项归为前瞻性研究，1项为随机试验。即使只看骨折检测，儿童与成人、普通X线与CT参照、按患者或按影像计数，都会改变数字的含义。作者因此未合并出一个总体准确率。另有23份报告未能获取，PubMed检索又限制了文章类型，一部分符合条件的观察性研究可能被遗漏。[1]"
      ]
    },
    {
      "heading": "二、骨折读片的97.6%，能说明什么",
      "paragraphs": [
        "Crombé等在两家中心纳入969名连续创伤患者，共1049组X线检查。AI辅助放射科医生的骨折判读准确率为97.6%，急诊医生为93.0%，两个软件独立判读分别为92.7%和92.2%。在这个队列中，人机协作的准确率最高。[3]",
        "这个比较缺少一个关键对照，即同一批放射科医生在无提示条件下的表现。用97.6%减去软件的准确率，得到的是医生与软件协作相对于软件独立判读的差值，无法据此估算AI给医生带来的增益。作为参考标准的5名资深肌骨放射科医生还可以看到临床、影像和AI资料，参考判定与受评软件也并非完全独立。[3]",
        "另一个实验直接考察了错误提示。Dratsch等请27名放射科医生判读乳腺X线片，在40个正式测试病例中人为设置12条错误的BI-RADS分类建议。经验丰富组在提示正确与错误的病例上，平均分类正确率分别为82.3%和45.5%。这两个比例对应不同病例，不能解释为同一医生原先答对、后来改错的概率。要测量后者，必须在显示提示前记录初判。[4]"
      ]
    },
    {
      "heading": "三、少读了多少片，与少漏了多少病",
      "paragraphs": [
        "瑞典MASAI随机试验按AI评分将乳腺筛查检查分流至单人或双人阅片。综述引用的2023年安全性分析中，AI组完成46,345次人工阅片，标准双人阅片组完成83,231次，阅片次数减少44.3%。这个指标以一次人工阅片为单位，无法直接换算为每位医生节省的工时。[1][5]",
        "同一试验在2026年1月另行报告了主要终点。AI组与对照组每千名受筛者的间期癌分别为1.55例和1.76例。间期癌指筛查未发现、随后在规定间隔内确诊的乳腺癌。两组比值为0.88，95%置信区间为0.65至1.18，上限低于预设非劣界值1.20，但区间包含1。数据支持该流程在此终点上达到非劣标准，仍不足以认定它降低了间期癌发生率。[6]",
        "综述只纳入这项试验的早期报告。读者若只读综述，容易忽略主要终点已经发表。对三维模型交付也应分别提问：人工少看了多少处，交付时还留下多少关键缺陷？前者以检查部位计数，后者以交付模型计数。"
      ]
    },
    {
      "heading": "四、跟骨模型交付前，怎样验证一次改判",
      "paragraphs": [
        "子殷已公开跟骨骨折模型表面处理的单病例工程研究，其中将处理后的网格与原始CT对照，并报告骨块接触关系的变化。[7] 在此基础上，可以提出一个具体的复核任务：平滑后的两块骨片在模型上看似相连，原始CT是否支持这种连接？这项判断关系到是否退回模型重建。",
        "建议先在离线研究中固定病例、模型版本和判断单位。每名工程师独立查看模型及原始CT，记录指定部位是否存在错误连接、对应切片与理由。随后随机分配第二次复核条件，一组显示AI提示，另一组同样再看一次但不显示提示，以估计仅由第二次查看带来的改变。参考判定由不知分组和提示内容的评审者对照原始CT作出，证据不足时保留“不能判定”。 人工用时从打开影像记至完成复核，计入核查提示、讨论分歧和返工的时间。",
        "对有明确参考判定的二分类判断，前后准确率之差等于“由错改对数减去由对改错数”除以判断总数。分别在两组内计算这个差值，再比较组间差异。报告时列出不能判定及缺失的数量，按病例和复核人员处理重复观察，并单列足以改变交付决定的错误。少量关键漏项可能被大量容易判断的部位掩盖。"
      ]
    },
    {
      "heading": "结语",
      "paragraphs": [
        "如果系统能提示两块跟骨骨片可能发生错误连接，最有解释力的记录是工程师的初判、提示后的判断、作为依据的CT切片，以及独立复核的结论。由此可以说明哪些错误容易被纠正，哪些正确判断容易被动摇，也能决定下一轮验证应优先纳入哪类病例。现有文献提供了设计这种比较的依据。子殷场景中的实际效果仍需用本地数据测量。"
      ]
    }
  ],
  "sectionTables": {
    "四、跟骨模型交付前，怎样验证一次改判": {
      "caption": "表1　拟用于跟骨模型复核研究的配对指标。表中各项为研究设计，未填入实测结果。",
      "columns": [
        "指标",
        "如何计数",
        "回答的问题"
      ],
      "rows": [
        [
          "纠正原有错误",
          "初判错、复核后对 ÷ 初判错误的判断数",
          "原有错误中有多少得到纠正？"
        ],
        [
          "新增错误",
          "初判对、复核后错 ÷ 初判正确的判断数",
          "原有正确判断中有多少被改错？"
        ],
        [
          "错误提示采纳率",
          "采纳错误提示的判断数 ÷ 初判正确且与错误提示冲突的判断数",
          "当人已经看对，哪些提示仍会改变判断？"
        ],
        [
          "关键缺陷与用时",
          "每组分别报告最终仍有关键缺陷的模型数／可评模型数，以及每例总人工用时的中位数",
          "复核是否把错误留给下游，或把工作转移到返工？"
        ]
      ]
    }
  },
  "references": [
    {
      "title": "Diaz-Perdomo S, et al. Artificial Intelligence Versus Human Interpretation in Diagnostic Radiology: A Systematic Review of Diagnostic Accuracy and Operational Efficiency. Cureus. 2026;18:e118954. DOI 10.7759/cureus.118954.",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13724123/",
      "linkLabel": "综述全文",
      "verification": "primary_full_text"
    },
    {
      "title": "AI产品库. 系统综述：AI影像诊断未全面超越放射科医生. 2026年11月2日。",
      "url": "https://aiproducthub.cn/newsflash/cureus-systematic-review-ai-versus-radiologists-diagnostic-radiology-accuracy/",
      "linkLabel": "新闻来源",
      "verification": "primary_full_text"
    },
    {
      "title": "Crombé A, et al. Real-life performance of AI-aided radiologists, emergency physicians and two AI solutions for diagnosing bone fractures in appendicular skeletal trauma. European Journal of Radiology. 2026;194:112469. DOI 10.1016/j.ejrad.2025.112469.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/41108952/",
      "linkLabel": "原始研究摘要",
      "verification": "search_summary"
    },
    {
      "title": "Dratsch T, et al. Automation Bias in Mammography: The Impact of Artificial Intelligence BI-RADS Suggestions on Reader Performance. Radiology. 2023;307:e222176. DOI 10.1148/radiol.222176.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/37129490/",
      "linkLabel": "原始研究摘要",
      "verification": "search_summary"
    },
    {
      "title": "Lång K, et al. MASAI trial: clinical safety analysis of AI-supported screen reading versus standard double reading. Lancet Oncology. 2023;24:936–944. DOI 10.1016/S1470-2045(23)00298-X.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/37541274/",
      "linkLabel": "早期分析摘要",
      "verification": "search_summary"
    },
    {
      "title": "Gommers J, et al. Interval cancer, sensitivity, and specificity comparing AI-supported mammography screening with standard double reading without AI in the MASAI study. Lancet. 2026;407:505–514. DOI 10.1016/S0140-6736(25)02464-X.",
      "url": "https://pubmed.ncbi.nlm.nih.gov/41620232/",
      "linkLabel": "主要终点摘要",
      "verification": "search_summary"
    },
    {
      "title": "子殷科技. CT重建跟骨骨折模型的受限平滑与多层次质量验证. 2026年10月22日。",
      "url": "https://www.chcomct.cn/news/calcai-ct-surface-smoothing-validation-20261022",
      "linkLabel": "子殷工程研究",
      "verification": "primary_full_text"
    }
  ]
};
