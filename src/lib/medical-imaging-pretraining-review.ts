import type { CompanyNewsArticle } from "./company-news";

export const MEDICAL_IMAGING_PRETRAINING_REVIEW: CompanyNewsArticle = {
  "id": "medical-imaging-pretraining-specialty-review-20261021",
  "title": "医学影像预训练如何进入三维建模闭环：24篇论文的证据与子殷研发路线",
  "summary": "从三维自监督、图文对齐到交互分割，24篇论文分别能为子殷解决什么问题？本文逐篇核对原文，区分二维与三维、候选与交付、分割与打印质量，提出以专科目标、工程师修订、独立评价和SI流程为核心的研发顺序。",
  "category": "学术观点",
  "eventDate": "2026-10-21",
  "dateLabel": "2026年10月21日 · 瑜秀瞳芯 · 文献研究与研发方法分析",
  "sourceTitle": "24篇医学影像预训练与分割论文的原文研读",
  "sourcePublishedAt": "2026-10-21T17:38:02+08:00",
  "status": "approved",
  "numberedReferences": true,
  "sourceAttribution": "作者：瑜秀瞳芯。本文为定向叙述性文献研究与方法分析，未经期刊同行评审，未开展新的病例实验或模型性能复现。论文发现、子殷公开事实与本文应用推断分别表述。",
  "referenceNote": "文献1—24与逐篇研读对应；25—28为子殷公开资料。核对日期：2026年10月21日。不同版本、模态与任务的性能数值不作跨论文排名；链接公开可访问不等于已完成代码、权重、数据许可和本地部署核查。",
  "cover": {
    "url": "/images/news/medical-imaging-pretraining-specialty-review-20261021.svg",
    "width": 1500,
    "height": 900,
    "alt": "图1 从论文证据到专科交付：影像表征、语义关联、交互修订与独立评价共同服务于可审阅的数字成果；实体制造按任务要求继续。原创方法示意，非实验结果。"
  },
  "gallery": [],
  "references": [
    {
      "title": "Disruptive Autoencoders: Leveraging Low-level features for 3D Medical Image Pre-training. MIDL 2024；会议全文.",
      "url": "https://proceedings.mlr.press/v250/valanarasu24a.html",
      "verification": "primary_full_text"
    },
    {
      "title": "Generalized Radiograph Representation Learning via Cross-supervision between Images and Free-text Radiology Reports. Nature Machine Intelligence 2022；作者存档全文.",
      "url": "https://www.nature.com/articles/s42256-021-00425-9",
      "verification": "primary_full_text"
    },
    {
      "title": "UNetFormer: A Unified Vision Transformer Model and Pre-Training Framework for 3D Medical Image Segmentation. arXiv 2022；2204.00631v2.",
      "url": "https://arxiv.org/abs/2204.00631v2",
      "verification": "primary_full_text"
    },
    {
      "title": "Self-Supervised Pre-Training of Swin Transformers for 3D Medical Image Analysis. CVPR 2022；作者全文.",
      "url": "https://openaccess.thecvf.com/content/CVPR2022/html/Tang_Self-Supervised_Pre-Training_of_Swin_Transformers_for_3D_Medical_Image_Analysis_CVPR_2022_paper.html",
      "verification": "primary_full_text"
    },
    {
      "title": "AbdomenAtlas: A Large-Scale, Detailed-Annotated, & Multi-Center Dataset for Efficient Transfer Learning and Open Algorithmic Benchmarking. Medical Image Analysis；作者存档2407.16697v2.",
      "url": "https://arxiv.org/abs/2407.16697v2",
      "verification": "primary_full_text"
    },
    {
      "title": "Medical Image Understanding with Pretrained Vision Language Models: A Comprehensive Study. ICLR 2023；2209.15517v2.",
      "url": "https://arxiv.org/abs/2209.15517v2",
      "verification": "primary_full_text"
    },
    {
      "title": "Large-Scale 3D Medical Image Pre-training with Geometric Context Priors. arXiv 2024；2410.09890v1.",
      "url": "https://arxiv.org/abs/2410.09890v1",
      "verification": "primary_full_text"
    },
    {
      "title": "Multi-modal Understanding and Generation for Medical Images and Text via Vision-Language Pre-Training. IEEE研究论文；作者存档2105.11333v3.",
      "url": "https://arxiv.org/abs/2105.11333v3",
      "verification": "primary_full_text"
    },
    {
      "title": "Pseudo-Prompt Generating in Pre-trained Vision-Language Models for Multi-Label Medical Image Classification. PRCV 2024；作者存档2405.06468.",
      "url": "https://arxiv.org/abs/2405.06468",
      "verification": "primary_full_text"
    },
    {
      "title": "Pick the Best Pre-trained Model: Towards Transferability Estimation for Medical Image Segmentation. MICCAI 2023；2307.11958.",
      "url": "https://arxiv.org/abs/2307.11958",
      "verification": "primary_full_text"
    },
    {
      "title": "Segment anything in medical images. Nature Communications 2024；2304.12306v3.",
      "url": "https://www.nature.com/articles/s41467-024-44824-z",
      "verification": "primary_full_text"
    },
    {
      "title": "I-MedSAM: Implicit Medical Image Segmentation with Segment Anything. ECCV 2024；会议全文.",
      "url": "https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/01503.pdf",
      "verification": "primary_full_text"
    },
    {
      "title": "DB-SAM: Delving into High Quality Universal Medical Image Segmentation. MICCAI 2024；会议全文.",
      "url": "https://papers.miccai.org/miccai-2024/191-Paper1489.html",
      "verification": "primary_full_text"
    },
    {
      "title": "MedCLIP-SAM: Bridging Text and Image Towards Universal Medical Image Segmentation. MICCAI 2024；会议全文.",
      "url": "https://papers.miccai.org/miccai-2024/498-Paper2311.html",
      "verification": "primary_full_text"
    },
    {
      "title": "MedCLIP-SAMv2: Towards Universal Text-Driven Medical Image Segmentation. 作者存档2409.19483v4；后续MedIA论文.",
      "url": "https://arxiv.org/abs/2409.19483v4",
      "verification": "primary_full_text"
    },
    {
      "title": "BiomedCLIP: a multimodal biomedical foundation model pretrained from fifteen million scientific image-text pairs. 作者存档2303.00915v3；2025年修订.",
      "url": "https://arxiv.org/abs/2303.00915v3",
      "verification": "primary_full_text"
    },
    {
      "title": "Learning to Exploit Temporal Structure for Biomedical Vision-Language Processing. CVPR 2023；2301.04558.",
      "url": "https://arxiv.org/abs/2301.04558",
      "verification": "primary_full_text"
    },
    {
      "title": "TempA-VLP: Temporal-Aware Vision-Language Pretraining for Longitudinal Exploration in Chest X-ray Image. WACV 2025；会议全文.",
      "url": "https://openaccess.thecvf.com/content/WACV2025/html/Yang_TempA-VLP_Temporal-Aware_Vision-Language_Pretraining_for_Longitudinal_Exploration_in_Chest_X-ray_WACV_2025_paper.html",
      "verification": "primary_full_text"
    },
    {
      "title": "Knowledge-enhanced visual-language pre-training on chest radiology images. Nature Communications 2023；作者全文.",
      "url": "https://www.nature.com/articles/s41467-023-40260-7",
      "verification": "primary_full_text"
    },
    {
      "title": "Revisiting MAE pre-training for 3D medical image segmentation. CVPR 2025；2410.23132v3.",
      "url": "https://openaccess.thecvf.com/content/CVPR2025/html/Wald_Revisiting_MAE_Pre-training_for_3D_Medical_Image_Segmentation_CVPR_2025_paper.html",
      "verification": "primary_full_text"
    },
    {
      "title": "AMAES: Augmented Masked Autoencoder Pretraining on Public Brain MRI Data for 3D-Native Segmentation. ADSMI/MICCAI 2024；2408.00640v2.",
      "url": "https://arxiv.org/abs/2408.00640v2",
      "verification": "primary_full_text"
    },
    {
      "title": "D2MAE: Diffusional Deblurring MAE for Ultrasound Image Pre-training. MICCAI 2025；会议全文.",
      "url": "https://papers.miccai.org/miccai-2025/paper/0490_paper.pdf",
      "verification": "primary_full_text"
    },
    {
      "title": "M4oE: A Foundation Model for Medical Multimodal Image Segmentation with Mixture of Experts. MICCAI 2024；会议全文.",
      "url": "https://papers.miccai.org/miccai-2024/485-Paper1472.html",
      "verification": "primary_full_text"
    },
    {
      "title": "An approach to building foundation models for brain image analysis. MICCAI 2024；Davood Karimi会议全文.",
      "url": "https://papers.miccai.org/miccai-2024/065-Paper3820.html",
      "verification": "primary_full_text"
    },
    {
      "title": "子殷科技：Chcomct SM 2.0获第二类医疗器械注册证；产品适用范围说明。",
      "url": "https://www.chcomct.cn/news/chcomct-sm-medical-imaging-approval-20260922",
      "verification": "primary_full_text"
    },
    {
      "title": "子殷科技：从“大平台”到“专科闭环”的研发方法讨论。",
      "url": "https://www.chcomct.cn/news/specialty-ai-closed-loop-productization-20260920",
      "verification": "primary_full_text"
    },
    {
      "title": "子殷科技：医学三维建模三路线比较与评价方法。",
      "url": "https://www.chcomct.cn/news/medical-modeling-three-route-evaluation-20261017",
      "verification": "primary_full_text"
    },
    {
      "title": "子殷科技：医学三维重建中的表面阶梯效应与几何保真。",
      "url": "https://www.chcomct.cn/news/medical-3d-surface-fidelity-20261006",
      "verification": "primary_full_text"
    }
  ],
  "sections": [
    {
      "heading": "摘要",
      "paragraphs": [
        "目的：分析医学影像预训练、视觉语言学习与交互分割如何服务于专科三维建模，形成适合子殷科技的候选研究路线。方法：以24篇指定文献为起点，逐一取得作者存档、会议开放全文或期刊论文，核对方法、数据、评价任务与限制，再与子殷公开的医学图像处理和医工服务流程建立对应。",
        "主要观点：预训练可能降低特定任务的标注或适配成本，但收益取决于成像模态、输出维度、任务定义和评价设计。对子殷，优先级应是明确交付目标、建立强基线、验证专科分割与交互修订，再连接审核和按需打印。论文中的平均分、通用模型称谓或生成文字，均不能单独证明骨折碎片完整性与三维几何质量。",
        "关键词：医学影像预训练；三维分割；视觉语言模型；人机协作；专科审阅；医学3D打印；子殷科技"
      ]
    },
    {
      "heading": "1 研究范围与证据使用方法",
      "paragraphs": [
        "本文为定向叙述性文献研究与研发方法分析，资料核对截至2026年10月21日。24篇全文均已取得，共393页，页数包含部分补充材料与参考文献；研读重点为方法、实验设置、结果及限制。本组文献由既有资料清单指定，不是通过预注册数据库检索形成的系统综述，不能据此宣称覆盖全部最新研究。",
        "每篇文献按“研究做了什么—在哪些任务验证—对子殷有什么启示—哪些结论不能迁移”记录。作者存档与正式出版版本可能存在差异，逐篇条目注明核对版本；不跨论文汇总Dice、AUROC、F1等不同指标，不将同一数据来源上的多篇论文当作独立临床重复试验。代码与权重线索仅用于后续核查，本文未运行模型训练、病例推理或受控性能复现。",
        "下文引用的论文发现属于原研究；“建议”“可以研究”等判断属于本文提出的应用推断。子殷情况依据已经公开的产品与研发文章，仅用来说明问题和用途，没有公开内部病例、患者影像、商业金额或设备访问细节。[25][26][27][28]"
      ]
    },
    {
      "heading": "2 先确定交付物，再选择预训练技术",
      "paragraphs": [
        "对于医学三维服务，临床需求可能是观察结构、进行术前沟通、完成量化测量，或者继续制造实体模型。算法输出必须与这些任务对应：标签属于哪个结构、是否保留独立骨块、包含哪些解剖范围、使用什么坐标与单位，以及由谁确认。病例进入专科审阅界面后，数字成果可以独立交付；只有医嘱与任务包含实体制造时，才继续进入打印链路。[26][27]",
        "子殷公开资料记载Chcomct SM 2.0获得第二类医疗器械注册证，其适用范围为相关CT/MRI图像的导入、处理、显示、保存，并明确结果仅供医生参考。该产品事实不能自动扩展为本文讨论的全部AI算法已经获批或具备自动诊断能力。本文中的新模型与新功能均作为研发候选理解。[25]",
        "因此，预训练是否值得采用，要看它能否在同一质量要求下减少修订、提高适用覆盖、缩短人员有效操作时间，并保留失败处理能力。仅让自动流程调用成功，尚不能回答目标结构是否完整、测量是否正确或报告是否可交付。[27]"
      ]
    },
    {
      "heading": "3 从24篇论文提炼四条技术主线",
      "paragraphs": [
        "第一条是体积表征与数据建设。DAE、UNetFormer、Swin UNETR和VoCo从影像自身构造监督；AbdomenAtlas强调专家修订与规模化标注；Revisiting MAE、AMAES和脑影像基础模型研究强调三维数据、合理骨干与独立任务评价。[1][3][4][5][7][20][21][24]",
        "第二条是图文、知识与时间关系。REFERS、MedViLL、PsPG、BiomedCLIP及KAD说明报告、概念和图像可形成共同表征；MIU-VL研究提示描述的作用，BioViL-T与TempA-VLP处理前后检查的变化语义。它们对子殷的直接启示主要在资料关联、检索和任务定义，不能整体替代体积几何处理。[2][6][8][9][16][17][18][19]",
        "第三条是可交互的候选分割。MedSAM及相关适配方法提供框选、提示与局部边界修订的研究路线。第四条是选择与资源配置：CC-FV帮助筛选迁移候选，M⁴oE研究模型内部专家机制，D²MAE提醒扰动设计需要符合成像特点。[10][11][12][13][14][15][22][23]"
      ]
    },
    {
      "heading": "4 逐篇研读：原文证据与子殷应用判断",
      "paragraphs": [
        "以下顺序与原资料清单保持一致。每篇给出三个层次：原研究证据、应用启示和适用边界。它们共同构成路线分析的依据；尚未完成的工程复现不会写为已实现能力。"
      ]
    },
    {
      "heading": "4.01 DAE：先学习局部细节",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：DAE用局部通道遮蔽、噪声和降采样构造重建任务，促使编码器学习局部影像特征；论文在CT/MRI预训练后评价腹部器官、肿瘤等下游分割，并提供扰动策略消融。[1]",
        "子殷应用判断：对子殷的价值在于提出可检验问题：预训练能否改善薄骨皮质、低对比边界与小结构的初始分割？应与相同网络从头训练、相同后处理的结果比较。",
        "适用边界：论文没有验证子殷的跟骨碎片或全骨盆任务。重建低层影像细节不等于恢复扫描中不存在的解剖信息，也不能证明打印表面质量改善。"
      ]
    },
    {
      "heading": "4.02 REFERS：利用检查与报告之间的对应关系",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：REFERS把同次检查的多视图影像与自由文本报告关联，以报告生成及检查—报告表征一致性学习视觉特征；下游在NIH ChestX-ray、VinBigData、Shenzhen与COVID-19胸片数据上进行有监督微调评价。[2]",
        "子殷应用判断：启示是把影像、需求和最终审核报告按检查关联，减少结构化标注负担。子殷可先规范病例—序列—目标结构—报告的对应关系，再研究报告弱监督。",
        "适用边界：这是胸片表征与迁移学习研究；预训练不依赖结构化疾病标签，不代表下游完全无标签。报告中的推测、否定和既往描述需要保留，不能直接当作三维分割真值。"
      ]
    },
    {
      "heading": "4.03 UNetFormer：比较编码器、解码器与计算代价",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：UNetFormer采用3D Swin编码器，比较CNN与Transformer解码器，并用遮蔽体积信息进行自监督预训练。论文在MSD肝脏/肝肿瘤及BraTS21脑肿瘤任务中同时报告分割表现与计算量。[3]",
        "子殷应用判断：子殷应比较“编码器＋解码器＋预处理”完整组合。较复杂的解码器未必在有限显存和小样本下更合适，模型选择需要把精度、推理时间和修订时间一起考虑。",
        "适用边界：肝脏和脑肿瘤任务的表现不能外推到骨折。该论文与Swin UNETR存在技术与训练资源关联，不能将两篇报道当作完全独立的重复验证。"
      ]
    },
    {
      "heading": "4.04 Swin UNETR：三维自监督的可复用基线",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：论文在约5050例CT体数据上，以遮蔽体积修复、旋转预测和对比学习预训练3D编码器，再在BTCV与MSD任务评价。原文同时使用Dice和HD95，关注区域重叠与表面差异。[4]",
        "子殷应用判断：它适合作为子殷体积影像编码器的候选对照：固定目标标签与输出空间后，比较预训练、从头训练及现有流程，保留每例失败和人工修订量。",
        "适用边界：5050对应三维影像/受试者数据规模，不能写成5050张切片。原论文的榜单成绩具有当时的数据集和版本条件，不构成今天的通用最优结论。"
      ]
    },
    {
      "heading": "4.05 AbdomenAtlas：修订闭环首先是数据工程",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：核对版本报告20460个三维CT体积、112家医院及约67.3万个解剖掩膜；先由专家标注5246个体积中的22种结构，再通过AI预测、专家修订和再训练扩大标注。[5]",
        "子殷应用判断：对子殷最直接的启发是把工程师修改转化为可审核的数据增量：保留原预测、修订区域、修改原因、复核状态和算法版本，分开管理训练与独立评价病例。",
        "适用边界：腹部器官标注不是骨折碎片实例标注。原文还明确讨论肿瘤伪标注的局限；AI生成标签与经专家确认标签应有不同状态，不能只因数量大就合并为金标准。"
      ]
    },
    {
      "heading": "4.06 MIU-VL：提示描述能改善迁移，但有模态边界",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：研究以GLIP为基础，在13个医学影像数据集上考察医学属性提示与自动提示生成，主要评价定位/检测的迁移；自然外观更接近的图像与放射影像呈现不同迁移条件。[6]",
        "子殷应用判断：子殷可借鉴其术语组织方法，把“部位、侧别、目标、排除对象、输出用途”写成结构化任务描述，减少一句“帮我建模”带来的歧义。",
        "适用边界：文本提示不能补足模型未学习的视觉概念。检测框、分类或少样本迁移结果，也不能直接证明三维分割和测量正确。"
      ]
    },
    {
      "heading": "4.07 VoCo：几何上下文是三维预训练的监督信号",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：VoCo通过不同空间裁剪之间的对比关系学习体积内的几何上下文。本文核对的2024年存档版本使用PreCT-160K，并报告覆盖分割、分类、配准与视觉语言的48项任务。[7]",
        "子殷应用判断：骨盆、脊柱和足踝任务可研究空间上下文是否减少结构混淆。先检查现有权重的输入间距、覆盖范围、特征层和本地推理依赖，再决定是否值得适配。",
        "适用边界：学习正常或常见解剖关系不等于理解移位骨折。本文的48项任务属于所引版本，不能与后续期刊扩展版本的任务数混写；也不据此主张子殷从零复现16万例预训练。"
      ]
    },
    {
      "heading": "4.08 MedViLL：理解、检索与生成共享表征",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：MedViLL以BERT式多模态结构和注意力遮蔽组织影像与报告，在MIMIC-CXR、Open-I、VQA-RAD相关的分类、图文检索、问答及报告生成任务中评价。[8]",
        "子殷应用判断：对子殷可迁移的是成果组织思路：报告字段与实际模型、测量和审核记录关联，检索与文字生成调用同一份已确认事实，减少不同页面之间的信息断裂。",
        "适用边界：生成接近原报告的文字，不代表每项影像结论均正确。该研究没有验证“从报告文字直接得到可打印骨盆模型”，不能把语言能力当作几何能力。"
      ]
    },
    {
      "heading": "4.09 PsPG：自动提示面向多标签识别",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：PsPG使用自回归生成的类别伪提示，结合空间信息和类别共现约束。论文在胸片多标签分类中评价已见与未见类别，包含CheXpert、PadChest、VinDr-CXR和受限的Private-CXR数据。[9]",
        "子殷应用判断：它启发子殷为“同时存在多个目标或异常”的任务保留独立标签与关系，而非强迫需求只能选择一个类别；可研究需求理解或影像分类的辅助候选。",
        "适用边界：共现关系具有数据集依赖性，罕见组合尤其需要核对。论文不提供骨折碎片实例分割证据，包含受限数据的实验也不能被描述为全部公开可复现。"
      ]
    },
    {
      "heading": "4.10 CC-FV：先估计迁移价值，再投入训练",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：CC-FV结合类别一致性与特征多样性，估计候选分割模型微调后的相对表现，以降低逐个训练的成本。“Source-free”指选择时不需要源训练数据；原方法使用含分割真值的目标任务数据。[10]",
        "子殷应用判断：子殷可先用获准、经复核的小型目标集筛选候选，再对排名靠前者进行配对实验。这更符合有限算力下逐个专科推进的资源条件。",
        "适用边界：迁移评分是筛选代理指标，不是临床质量证明；无需源数据也不等于无需目标标注。最终决定仍需实际推理、必要的适配及独立留出评价。"
      ]
    },
    {
      "heading": "4.11 MedSAM：把交互分割放在工程师手边",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：MedSAM基于1570263个影像—掩膜对开发，覆盖10种成像模态；论文评价86项内部与60项外部任务，并讨论框提示、模型推理和人工细化的协作。[11]",
        "子殷应用判断：对子殷更合适的入口是专科审阅界面的局部修订工具：工程师指定区域，模型提供候选，修订和最终确认分别留痕，并与现有人工工具比较耗时。",
        "适用边界：原版MedSAM的二维提示分割不能直接等同完整三维重建。其数据规模和通用性并未单独证明对骨折小碎片、金属伪影或特定骨皮质边界可靠。"
      ]
    },
    {
      "heading": "4.12 I-MedSAM：连续输出不等于三维几何真值",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：I-MedSAM结合频率适配器、隐式神经表示和不确定性引导采样，研究二维息肉与多器官分割及域迁移。论文二分类设置约160万可训练参数，多类别设置的参数量不同。[12]",
        "子殷应用判断：其价值是提供边界细化与高分辨率输出的研究思路。子殷可以检查局部边界是否改善，同时核对邻层连续性、小结构召回与实际修订负担。",
        "适用边界：连续坐标表示不保证恢复真实解剖，也不等同STL平滑算法。“160万”不能当作完整模型体积或所有任务统一规模；本文也不将其二维实验表述为原生三维验证。"
      ]
    },
    {
      "heading": "4.13 DB-SAM：双分支适配仍需核对输入维度",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：DB-SAM把ViT与卷积分支融合，以适应医学图像特征，评价多种二维及来自三维影像的分割任务。方法部分明确将CT/MRI沿轴向拆成二维切片，并统一输入尺寸。[13]",
        "子殷应用判断：对子殷可作为局部交互或二维切片修订的候选。若用于体积模型，应额外评价跨层一致性、结构连续性、目标遗漏与导出后的几何变化。",
        "适用边界：“在三维影像任务上评价”不等于“网络原生处理三维体积”。其相对某基线的平均增益依赖具体任务与提示设置，不能改写为子殷骨盆精度提高相同幅度。"
      ]
    },
    {
      "heading": "4.14 MedCLIP-SAM：文本先变为视觉提示",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：该框架用DHN-NCE微调BiomedCLIP，以gScoreCAM和后处理生成视觉提示，再调用SAM；在乳腺超声、脑肿瘤MRI及肺部X线的零样本与弱监督分割中评价。[14]",
        "子殷应用判断：它展示了“任务语义—候选区域—可编辑掩膜”的连接方式，可用于子殷交互流程研究。应保留显著性图、提示和掩膜，方便定位错误发生在哪一环。",
        "适用边界：显著性区域只是提示来源，不能替代解剖确认。零样本设置与经过伪标签训练的弱监督设置需要分开报告；未见目标的可用性必须逐项验证。"
      ]
    },
    {
      "heading": "4.15 MedCLIP-SAMv2：增强提示与伪标签利用",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：v2引入多模态信息瓶颈生成视觉提示，并研究伪标签和模型集成等弱监督策略，评价范围增加肺部CT，涉及四类分割任务。[15]",
        "子殷应用判断：对子殷可研究其提示生成是否减少反复框选，并分别保留零样本、弱监督和人工修订结果，观察提示质量与实际人员节省之间的关系。",
        "适用边界：“v2”是该研究框架版本名称，不能仅凭名称推断已经采用SAM 2或支持三维视频传播。新增CT实验也不直接证明骨盆或骨折碎片建模可用。"
      ]
    },
    {
      "heading": "4.16 BiomedCLIP：图文检索底座的范围",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：PMC-15M从约440万篇科研文章中提取约1500万图像—文本对，包含放射图像、病理、示意图、统计图等多种内容；BiomedCLIP在检索、分类和视觉问答等任务中评价。[16]",
        "子殷应用判断：子殷可将其作为文献图像检索、资料归类或图文匹配候选，先检查中文术语、专业语义和本地资料的实际检索质量。",
        "适用边界：1500万不是论文篇数，更不是1500万名患者或三维CT。科研图表与临床DICOM存在域差异，图文相似度不等于临床结论正确，也不提供三维几何精度证明。"
      ]
    },
    {
      "heading": "4.17 BioViL-T：报告中的变化需要既往影像",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：BioViL-T联合当前与既往胸片学习时序视觉语言表征，并发布MS-CXR-T评价疾病变化与时间语义。论文展示了只用当前影像对齐含“改善”等时间描述时的歧义。[17]",
        "子殷应用判断：子殷的术前—术后评价和随访系统可借鉴其检查配对原则：明确时间点、侧别、序列与测量定义，保留“缺少既往影像”的状态。",
        "适用边界：胸片病变进展与骨科术后几何评价是不同任务。采集体位、投照差异和配准误差可能表现为变化，需要对照处理；不能把两个时间点的差异都解释为疾病或治疗效果。"
      ]
    },
    {
      "heading": "4.18 TempA-VLP：把静态描述与时间描述分开",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：TempA-VLP用跨检查编码器整合前后影像，并从Chest ImaGenome场景图中分离静态与时序描述，在进展分类和动态短语定位等任务中评价。[18]",
        "子殷应用判断：对子殷的启发是将“此刻是什么”与“相对上次变化什么”分开存储。术后评价报告可分别关联当前测量值、基线值、差值及其定义。",
        "适用边界：该证据来自胸片和对应场景图，未验证骨道、关节轴线或矫形器疗效；若研究骨科迁移，需要同患者分组、时间配对与稳定的测量参考。"
      ]
    },
    {
      "heading": "4.19 KAD：知识进入表征之前先统一概念",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：KAD以UMLS医学概念、同义词及关系学习知识表征，再提取胸片报告实体指导图文学习；在多个外部胸片数据集上评价零样本与微调表现。[19]",
        "子殷应用判断：子殷可先建立部位、侧别、结构、测量名称和交付用途的词表，把术语与标签版本关联。知识检索与结构化约束可先落地，再研究是否需要知识增强训练。",
        "适用边界：其“知识增强”是具体训练方法，并非任意接入RAG即可复现。限定病种的读片比较不能外推为全面超过医生，更不能成为自动诊断宣传。"
      ]
    },
    {
      "heading": "4.20 Revisiting MAE：强基线与独立评价比架构名称重要",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：该研究用约3.9万个脑MRI体积预训练Residual Encoder U-Net，在5个开发数据集做设计选择、8个未触碰测试数据集上评价，并与较强的nnU-Net基线比较。[20]",
        "子殷应用判断：对子殷最重要的启示是分离“预训练收益”和“换了骨干/预处理的收益”。在同一专科目标下冻结病例分组与后处理，再比较算法，避免只与弱基线比较。",
        "适用边界：论文报告的平均Dice收益限于其脑MRI任务与实验条件。脑MRI结果不能作为骨盆CT的预期收益，也不能以平均分提升掩盖小碎片遗漏或失败病例。"
      ]
    },
    {
      "heading": "4.21 AMAES：在资源约束下研究三维原生预训练",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：AMAES汇集44756个脑MRI体积构成BRAINS-45K，使用遮蔽建模、轻量解码器和强度增强反转，在U-Net与MedNeXt上研究单序列、低标注量及域外泛化。[21]",
        "子殷应用判断：子殷可借鉴其算力—效果比较方式，记录显存、训练时间、推理时间和人工工作量。只有可用质量达到相同要求，节省资源的比较才有意义。",
        "适用边界：研究主要评价每个下游任务不超过20例训练样本的设置，并非覆盖所有数据规模和多序列输入。公开汇集数据仍需分别遵循来源要求；脑MRI权重也需CT任务验证。"
      ]
    },
    {
      "heading": "4.22 D²MAE：去模糊目标服务于超声表征",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：D²MAE把扩散式去模糊和遮蔽重建结合，微调时搜索适合的模糊程度；在GE4K甲状腺、LEPset胰腺和MMOTU卵巢等超声分类任务评价F1、准确率与AUROC。[22]",
        "子殷应用判断：它提示预训练扰动应适配成像机制。若子殷未来开展超声相关科研，可把设备和图像风格差异作为独立因素研究。",
        "适用边界：本文不把它列为当前骨盆CT重建的直接组件。超声去模糊表征、CT分割表面阶梯和实体打印层纹的成因不同，不能按“都不够平滑”互相替代。"
      ]
    },
    {
      "heading": "4.23 M⁴oE：网络内部专家与SI工具调度有区别",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：M⁴oE在SwinUNet的MLP部分引入模态专家及可学习门控，评价FLARE22、AMOS2022和ATLAS2023等不同数据任务，研究专家专门化与共享表示。[23]",
        "子殷应用判断：它为子殷“共有底座＋专科能力”提供研究参照。当前SI仍可通过明确的任务条件选择已验证模型，记录所用算法和版本，先保证调用结果可解释。",
        "适用边界：神经网络内部的加权专家，并不等同业务系统按部位调用工具；一个是需要训练的模型结构，一个是工程调度机制。不能借用MoE论文直接证明SI调度有效。"
      ]
    },
    {
      "heading": "4.24 脑影像基础模型：通用性需要跨任务证明",
      "headingLevel": 3,
      "paragraphs": [
        "研究与证据：研究通过分块生成学习脑结构，并使用随机卷积核编码高频信息；在10个公开数据集预训练后，使用5个独立数据集评价分割、病灶检测、去噪和脑年龄估计。[24]",
        "子殷应用判断：对子殷的方法启示是把不同任务的证据分别列出：模型即使能分割，也不能因此假定会测量、复位或判断打印完整性；每项能力需要自己的评价。",
        "适用边界：这是一项脑影像研究，不能因名称含“基础模型”就覆盖全身CT。本文将其作为跨任务验证的参考，并不主张直接接入当前骨盆生产流程。"
      ]
    },
    {
      "heading": "5 骨盆与跟骨：完整性、边界、表面分别评价",
      "paragraphs": [
        "全骨盆任务首先需要定义目标集合，例如双侧髋骨、骶骨是否完整覆盖，是否按需求包含股骨近端或其他结构；骨折任务还需说明哪些独立碎片应保留。目标范围必须在评价前明确，不能把成功输出一个主体结构当作全目标完成。",
        "分割层评价结构识别与遗漏，关注Dice之外的小结构召回、错误合并、表面距离和局部关键区域。网格层评价单位、坐标、连通分量、孔洞和处理前后变化。制造层再评价切片参数、方向、材料与实物尺寸。三层证据可以关联，但不能互相替代。[4][11][28]",
        "子殷既有表面质量文章已经区分相对基线的几何变化与真实解剖误差，并报告仅限特定对象的工程验证。本文沿用这一边界：预训练的二维边界更细、网页着色更柔和或STL更平滑，都不能直接证明解剖更准确；打印层纹还涉及制造过程，需要独立核查。[28]",
        "据此，骨盆与跟骨的候选研究宜优先比较真正处理三维上下文的现有模型及可靠基线，再研究交互修订工具；不把来源于脑MRI、超声分类或胸片检索的成绩作为该专科的验收值。"
      ]
    },
    {
      "heading": "6 人工修订怎样成为可靠的学习资料",
      "paragraphs": [
        "AbdomenAtlas提供的重要经验，是把模型预测与专家修订组织为可迭代过程。对子殷，最小可用记录包括原影像的获准引用、算法初稿、修订版本、修改部位及原因、人员与审核状态、处理参数和最终交付关联。未审核修订应保留为候选资料，避免把一次手工操作自动升级为真值。[5]",
        "同一患者的影像、切片、原稿和派生网格必须归入同一数据分组。用于参数选择、提示模板修改或错误分析的病例属于开发材料；最终独立评价集应冻结，并覆盖困难、失败与不适用输入。人工救援的结果可以用于质量分析，但不能不加说明地计入纯自动成功。",
        "记录还应能解释为何修改：目标定义错误、侧别错误、小骨块遗漏、粘连、边界偏差、导出转换或显示问题。不同错误对应不同修复路径；对导出标签遗漏反复训练网络，或对显示法线问题重新标注影像，都可能增加成本而不解决原因。[27][28]"
      ]
    },
    {
      "heading": "7 chcomct SI连接模型、审阅与按需制造",
      "paragraphs": [
        "SI可承担任务组织：读取明确的部位、侧别、目标、用途与交付要求，选择适配范围内的算法，保存版本和产物，打开对应专科界面，等待必要的审核，再根据医嘱衔接数字报告或实体制造。这个流程是本文提出的实施框架，其每个环节的可靠性仍须分别验证。[26][27]",
        "视觉语言模型可辅助整理需求、检索资料和生成报告草稿；三维分割与测量工具负责各自的数值计算；工程师和相应专业人员确认目标及结果。报告中的重要数值应取自可追溯的计算记录，不能由语言模型补全。",
        "M⁴oE的可学习门控属于网络内部结构，SI按任务调用专科模型属于系统调度。二者可以相互启发，却需要不同数据与测试。当前阶段宜把“调用哪个版本、输入是什么、返回哪些产物、失败如何处理”做清楚，再判断是否值得增加学习式路由。[23]",
        "涉及医院离线环境时，应另行验证权重、推理依赖、资料检索和文件导出是否能在无外网条件下完成；模型公开可下载并不自动证明整条软件链可离线运行。本文未对医院环境开展部署测试。"
      ]
    },
    {
      "heading": "8 建议的研发顺序与验收证据",
      "paragraphs": [
        "先选择一个边界清楚的骨盆或跟骨目标任务，使用获准数据建立人工流程和现有自动流程基线。冻结输入、结构集合、坐标单位、后处理与评价方法，再选择少量已有预训练候选比较。CC-FV之类的迁移估计可以作为筛选步骤，不能省去实际验证。[10][20]",
        "随后在同一专科审阅界面评价交互修订：记录初稿质量、需要的框选或操作、有效修订时间、最终质量和失败救援。比较应同时报告计算时间与人员时间，并以达到相同质量要求为前提；是否节省工时由记录决定。[11][27]",
        "只有专科分割和审阅结果稳定后，才研究图文任务、更广范围的预训练适配或学习式专家机制。模型代码、权重、数据来源和本地依赖分别核对，保留模型及数据版本。本文提出相对顺序，不预设任意成功率、毫米阈值或固定样本量；具体指标应由用途与临床/工程评价共同确定。"
      ]
    },
    {
      "heading": "9 可验证的研究命题与局限",
      "paragraphs": [
        "命题一：在相同网络、后处理和数据划分下，医学影像预训练可能减少专科小样本任务的初稿错误。命题二：在达到相同最终质量要求时，交互候选可能减少人员有效修订时间。命题三：关联需求、版本、审核与产物的流程可能降低交接遗漏。上述命题尚待子殷通过对应试验检验。",
        "研究应保留全部纳入任务及失败结果，分别报告自动初稿、人工修订与最终交付；以病例为主要统计单位，避免把切片或碎片当作大量独立患者。数据量与样本结构不足时，先报告可重复的工程现象和不确定性，不能用漂亮案例替代总体结论。",
        "本研究的局限包括指定文献清单带来的选择偏倚、论文间评价不可直接比较、部分方法共享数据或模型，以及尚无子殷本地受控复现。模型与数据版本可能更新；本文不构成临床效能、经济收益、注册适用范围扩展或商业许可结论。"
      ]
    },
    {
      "heading": "10 结论",
      "paragraphs": [
        "这些文献支持把预训练理解为改善表征与迁移的工具，其价值需要落在具体专科任务的证据上。对子殷，值得优先建设的是任务定义、可靠基线、专科分割与修订、独立审核以及数字成果和按需制造的衔接；在这些环节形成记录后，再决定哪些预训练或多模态能力值得继续投入。",
        "工程师的经验可以通过被确认的修改、错误原因和复核过程逐步沉淀，SI则把已验证的方法组织成可调用流程。两者连接起来，才能检验技术是否既改善交付，也减少重复劳动。"
      ]
    },
    {
      "heading": "作者、AI辅助与资料说明",
      "paragraphs": [
        "作者：瑜秀瞳芯。作者与子殷科技相关研发存在利益关系。本文为官网发表的文献研究与方法分析，未经学术期刊同行评审，不是新的临床研究报告。ChatGPT参与公开文献检索核对、证据整理、文字和原创图表制作；AI辅助不替代原研究作者的工作，也不替代后续专业评价。",
        "原始资料清单用于定位文献；正文为重新核对原文后的独立分析，不转载飞书文档的完整内容、论文PDF或论文图表。图示为原创的拟议工作流程，不包含病例影像。公开代码和权重链接仅提供核查线索，未宣称已完成安装、许可审查或本地性能复现。"
      ]
    }
  ],
  "sectionTables": {
    "3 从24篇论文提炼四条技术主线": {
      "caption": "表1 技术证据与候选用途；用途为本文推断",
      "columns": [
        "主线",
        "对应文献",
        "对子殷的候选用途"
      ],
      "rows": [
        [
          "体积表征与数据",
          "1、3、4、5、7、20、21、24",
          "建立三维分割对照；改善标注与评价"
        ],
        [
          "图文、知识与时间",
          "2、6、8、9、16、17、18、19",
          "规范需求与报告关联；检索及配对评价"
        ],
        [
          "交互分割",
          "11、12、13、14、15",
          "在专科审阅界面生成可编辑候选"
        ],
        [
          "选择与特定机制",
          "10、22、23",
          "筛选迁移候选；保留模态和路由研究"
        ]
      ]
    },
    "5 骨盆与跟骨：完整性、边界、表面分别评价": {
      "caption": "表2 三个层次需要各自的证据",
      "columns": [
        "层次",
        "需要检查",
        "不能由此单独推出"
      ],
      "rows": [
        [
          "分割",
          "结构集合、小碎片、错误粘连、局部边界",
          "网格处理无误或实物尺寸合格"
        ],
        [
          "网格与显示",
          "坐标单位、连通分量、处理前后变化、法线",
          "相对真实解剖的误差已经减小"
        ],
        [
          "实体制造",
          "切片方向、工艺参数、材料及尺寸核对",
          "前面的结构识别和测量必然正确"
        ]
      ]
    },
    "8 建议的研发顺序与验收证据": {
      "caption": "表3 候选研究的相对顺序；并非已完成进度",
      "columns": [
        "次序",
        "工作内容",
        "应获得的证据"
      ],
      "rows": [
        [
          "1 统一任务与基线",
          "固定专科目标、病例分组、输入输出与后处理",
          "目标定义及可重复基线；失败纳入记录"
        ],
        [
          "2 比较预训练候选",
          "少量既有模型与从头训练/现有流程对照",
          "初稿质量、结构遗漏、计算资源与适用范围"
        ],
        [
          "3 评价交互与交付",
          "在同一审阅界面修订，按医嘱分流",
          "最终质量、人员有效时间、救援率、产物关联"
        ],
        [
          "4 扩展多模态与学习",
          "检索、时序、知识与专家机制逐项研究",
          "独立任务效果；增量收益及可维护性"
        ]
      ]
    }
  },
  "sectionImages": {
    "5 骨盆与跟骨：完整性、边界、表面分别评价": {
      "url": "/images/news/medical-imaging-pretraining-specialty-review-20261021-quality.svg",
      "width": 1500,
      "height": 820,
      "alt": "图2 分割、网格和制造的检查对象不同；相邻环节的证据关联保存，不能以外观平滑代替完整性和几何评价。原创方法示意。"
    },
    "7 chcomct SI连接模型、审阅与按需制造": {
      "url": "/images/news/medical-imaging-pretraining-specialty-review-20261021-workflow.svg",
      "width": 1500,
      "height": 1020,
      "alt": "图3 拟议的SI工作流程：任务定义后进入算法初稿和专科审阅，审核后分流到数字交付或按需制造；经确认的修改进入独立的数据管理过程。图中无实际病例和运行数值。"
    }
  }
};
