import type { CompanyNewsArticle } from "./company-news";

export const QWEN_LSA_RTX4090: CompanyNewsArticle = {
  "id": "qwen-lsa-rtx4090-20261104",
  "title": "单层加速能缩短整次问答吗？Qwen3.8-27B 稀疏注意力在单张 RTX 4090 上的分层实测",
  "summary": "在一张 RTX 4090 上，LSA 将 128K 历史下的单层解码从 0.6344 毫秒缩短至 0.2580 毫秒。换到 32K 的整模型问答，启用 LSA 后生成相同答案却多用 3.22 秒。两组对照揭示了局部算子提速与读者实际等待时间之间的差别。",
  "category": "学术观点",
  "eventDate": "2026-11-04",
  "dateLabel": "2026年11月4日 · 子殷科技 · 工程研究报告",
  "sourcePublishedAt": "2026-11-04",
  "sourceTitle": "单层加速能缩短整次问答吗？Qwen3.8-27B 稀疏注意力在单张 RTX 4090 上的分层实测",
  "status": "approved",
  "sourceAttribution": "子殷科技原创工程研究报告，未经期刊同行评议。实验仅使用合成张量和公开技术文档。",
  "numberedReferences": true,
  "cover": {
    "url": "/images/news/qwen-lsa-rtx4090-20261104.svg",
    "width": 1200,
    "height": 630,
    "alt": "同一份 32K 输入下，原生全注意力在 11.51 秒给出首个 token、15.44 秒完成回答。LSA 解码图重放分别用时 14.77 秒和 18.66 秒。"
  },
  "gallery": [],
  "sections": [
    {
      "heading": "摘要",
      "paragraphs": [
        "长文档问答要经历两个阶段：模型先读入材料，随后逐个生成输出 token。为检验稀疏注意力能否缩短本地问答的等待时间，我们在同一张 RTX 4090 上，分别测量单个全局注意力层和完整量化模型。在已建好索引的单层解码中，上下文从 32K 增至 128K，加速比从 1.04 倍升至 2.46 倍。在完整模型读取 32,768 个 token 并回答一个跨文档问题时，生成相同答案的中位耗时从 15.44 秒增至 18.66 秒。对于这台设备上的这项任务，原生全注意力更快。"
      ]
    },
    {
      "heading": "研究问题与对照条件",
      "paragraphs": [
        "Kubicek 等提出的潜在稀疏注意力（Latent Sparse Attention，LSA）把历史键向量聚成桶。生成下一个 token 时，查询先对桶中心打分，再读取入选桶及邻近窗口中的位置。作者在 1,000 万 token 下报告，Qwen 的一个全局注意力层相对全注意力，预填充快 72.4 倍、解码快 42.5 倍。采用 8 张 H200 和 SGLang 时，完整模型的首 token 加速比为 9.21。本文考察单张消费级显卡和较短输入，硬件、后端与测量长度均另行列明。[1]",
        "我们使用作者发布的蒸馏索引投影，采用扁平桶搜索（D-LSA Flat）。第一组实验固定历史长度，以合成查询、键和值测量一次单层解码。全注意力与稀疏路径均使用 BF16 和 CUDA Graph 重放。稀疏侧每步计入查询投影、桶打分、选取位置、读取键值及注意力计算；计时开始时历史索引已就绪。三个长度各测三轮，每轮交替测两条路径各 24 次，先取轮内中位数，再取三轮中位数。[2]",
        "第二组实验将索引接入 llama.cpp 的 Qwen3.8-27B Q4_K_M 量化模型。模型共 64 层，全部 16 个全局注意力层参与对照，键值缓存均为 FP16。基线采用原生 Flash Attention。稀疏版本前 4,096 个位置沿用全注意力，之后按索引读取远程位置并保留近端窗口和开头位置。我们又单独测试了用 CUDA Graph 重放稀疏解码的版本。三组均关闭整模型图重放。[2][3]"
      ]
    },
    {
      "heading": "单层解码随上下文变长而加速",
      "paragraphs": [
        "在 32K 历史下，每次查询只节省约 0.008 毫秒。到 128K，全注意力需读取四倍于 32K 的历史，稀疏侧仍读取 4,612 个位置，每步节省约 0.376 毫秒。96 个合成查询中，GPU 索引选中的位置集合与作者的 CPU 参考实现全部一致。一次近似平分改变了返回顺序，复算该例时，转为 BF16 后的输出逐元素一致。这个对照检验了索引实现。模型能否据此找到所需证据，还须用完整任务检验。"
      ]
    },
    {
      "heading": "32K 整模问答的额外等待出现在首个 token 之前",
      "paragraphs": [
        "材料取自公开的 Python 增强提案（PEP），三份含答案的文档分别从第 2,457、14,745、27,852 个 token 偏移处开始。测试要求找出 Python 3.13.0 的正式发布日期、支持年限、Python 3.14 发布负责人，并判断材料是否给出了全职测试工程师的预算人数。每组使用完全相同的输入。预热后清空序列状态，每个稀疏版本各与基线做两轮对照，第二轮对调执行次序。[4][5][6]",
        "8 次正式请求均自然结束，生成 126 个可见 token，回答文字逐一一致。三处引文和提案编号均可回查：发布日期为 2024 年 10 月 7 日，常规维护两年、随后安全修复三年，发布负责人为 Hugo van Kemenade。对于预算人数，模型回答材料未说明。",
        "首 token 时间从引擎开始消费输入计到首次选出输出 token。总耗时计至结束标记。两者均不含模型装载、分词或网络传输。日志确认，每次 LSA 请求中，16 个全局层各执行了 112 次稀疏预填充和 126 次稀疏解码。图重放版本每次请求实际重放 2,016 次。逐次计时随文提供。[7]"
      ]
    },
    {
      "heading": "从计时结果能判断什么",
      "paragraphs": [
        "使用图重放后，稀疏版本的生成速度为每秒 32.39 个 token，与基线的 32.14 接近。但模型给出第一个 token 时，读者已经多等了约 3.26 秒。到回答结束，差距仍有 3.22 秒，约占基线总时长的 21%。因此，在这份材料和这段答案长度下，即使恢复了解码速度，也不足以抵消读入材料阶段的额外等待。",
        "单层测试从已建好的索引开始，而且只计一次解码。整模测试还要读完整份文档、建立和维护索引，并执行其他网络层。两组计时覆盖的工作不同。现有日志能定位等待时间主要增加在哪个阶段，但未分别量出聚类、数据搬运和内核调度的贡献。"
      ]
    },
    {
      "heading": "适用范围与下一项验证",
      "paragraphs": [
        "本研究使用一种量化模型、一张显卡和一个四项问答。8 次请求是同一题目的重复测量。答案一致只能说明两条路径在本题上保留了所需证据，无法估计在其他文档上的准确率。64K 和 128K 已测到的收益限于单层解码，整模型在这些长度上的首 token 时间、总耗时和证据召回仍待测量。",
        "就当前 32K 本地文档核对任务，子殷保留原生全注意力。下一项有区分度的实验是在 64K 和 128K 加入多份独立文档，分别改变证据所在位置与答案长度，同时报告首 token 时间、整次耗时、引文命中和缺失信息误报。这样才能判断在什么负载下，读者能实际获得单层优化带来的时间收益。"
      ]
    }
  ],
  "sectionTables": {
    "单层解码随上下文变长而加速": {
      "caption": "表 1　预建索引后的单层单步解码。耗时单位为毫秒，加速比为全注意力耗时除以稀疏耗时。",
      "columns": [
        "历史 token 数",
        "全注意力（ms）",
        "D-LSA（ms）",
        "加速比"
      ],
      "rows": [
        [
          "32,768",
          "0.1923",
          "0.1846",
          "1.04×"
        ],
        [
          "65,536",
          "0.3491",
          "0.2223",
          "1.57×"
        ],
        [
          "131,072",
          "0.6344",
          "0.2580",
          "2.46×"
        ]
      ]
    },
    "32K 整模问答的额外等待出现在首个 token 之前": {
      "caption": "表 2　相同 32,768-token 输入与 126-token 回答，各路径正式请求的中位数。",
      "columns": [
        "整模推理方式",
        "请求数",
        "首 token（秒）",
        "解码（token/秒）",
        "总耗时（秒）"
      ],
      "rows": [
        [
          "原生全注意力",
          "4",
          "11.51",
          "32.14",
          "15.44"
        ],
        [
          "D-LSA 即时执行",
          "2",
          "14.70",
          "26.70",
          "19.42"
        ],
        [
          "D-LSA 解码图重放",
          "2",
          "14.77",
          "32.39",
          "18.66"
        ]
      ]
    }
  },
  "references": [
    {
      "title": "Kubicek A, Caciolai A, Peng L, et al. Latent Sparse Attention: Towards Subquadratic Ultra-Long Context Attention. arXiv:2610.42147 (2026). 见图 6、表 3。",
      "url": "https://arxiv.org/html/2610.42147v1",
      "verification": "primary_full_text"
    },
    {
      "title": "Prefrontal AI. Latent Sparse Attention，实验使用版本 97b82d6；索引投影取自 d-lsa-weights-v1。",
      "url": "https://github.com/Prefrontal-AI/latent-sparse-attention/tree/97b82d695b74ca341965a16bbc2a951c8b0c567a",
      "verification": "primary_full_text"
    },
    {
      "title": "ggml-org. llama.cpp，实验使用版本 20a51f2。",
      "url": "https://github.com/ggml-org/llama.cpp/tree/20a51f24a8523b290dcc1fc4fe9ce8fbdef9de13",
      "verification": "primary_full_text"
    },
    {
      "title": "Python PEP 719 — Python 3.13 Release Schedule.",
      "url": "https://peps.python.org/pep-0719/",
      "verification": "primary_full_text"
    },
    {
      "title": "Python PEP 602 — Annual Release Cycle for Python.",
      "url": "https://peps.python.org/pep-0602/",
      "verification": "primary_full_text"
    },
    {
      "title": "Python PEP 745 — Python 3.14 Release Schedule.",
      "url": "https://peps.python.org/pep-0745/",
      "verification": "primary_full_text"
    },
    {
      "title": "子殷科技 · 补充数据：32K 整模型实验 8 次正式请求的逐次计时（CSV）。",
      "url": "https://www.chcomct.cn/papers/qwen-lsa-rtx4090-20261104-timings.csv",
      "verification": "primary_full_text"
    }
  ]
};
