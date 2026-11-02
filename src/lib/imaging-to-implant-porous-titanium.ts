import type { CompanyNewsArticle } from "./company-news";

export const IMAGING_TO_IMPLANT_POROUS_TITANIUM: CompanyNewsArticle = {
  "id": "imaging-to-implant-porous-titanium-20261102",
  "title": "从影像到植入：人工智能驱动的个性化三维打印骨科植入物设计与临床转化路径——以多孔钛脊柱植入物为例",
  "summary": "梳理从医学影像到个性化三维打印骨科植入物的技术与监管路径，并以多孔钛脊柱植入物为例，对照子殷科技已公开的影像、三维重建、导板与模型业务，讨论向植入物延伸所需的条件。涉及植入物的内容为行业分析，不代表子殷已有相关产品或注册。",
  "category": "学术观点",
  "eventDate": "2026-11-02",
  "dateLabel": "2026年11月2日 · 瑜秀瞳芯 · 监管观察与临床转化",
  "sourceTitle": "从影像到植入：人工智能驱动的个性化三维打印骨科植入物设计与临床转化路径——以多孔钛脊柱植入物为例",
  "sourcePublishedAt": "2026-11-02",
  "status": "approved",
  "numberedReferences": true,
  "sourceAttribution": "作者：瑜秀瞳芯｜子殷科技（内蒙古子殷科技有限公司）。本文为企业官网方法论文章，基于公开文献、监管文件与官网可核实信息整理，未经学术期刊同行评审。文中涉及植入物的内容为行业路径讨论，不作为产品有效性或临床获益证明，也不表示子殷已持有植入物注册证或金属增材制造植入物产线资质。通讯：chcomct@163.com｜400-901-4816",
  "referenceNote": "引用编号与正文对应。文献、监管文件、价格通知和企业官网页面按所引公开地址列出；企业新闻稿与媒体报道中的进度和性能描述保留其自述属性。本文不是系统综述，也不把计算研究或个案外推为某一产品已经验证的设计参数。",
  "cover": {
    "url": "/images/news/imaging-to-implant-porous-titanium-20261102.svg",
    "width": 1200,
    "height": 720,
    "alt": "图1 从影像到多孔钛植入物的概念路径：影像分割与三维重建、已验证设计包络、制造与实物验证、标准规格注册在先。原创示意，不表示已验证的因果关系，也不表示子殷科技已持有植入物注册证或相应产线资质。"
  },
  "gallery": [],
  "sections": [
    {
      "heading": "摘要",
      "headingLevel": 2,
      "paragraphs": [
        "目的：梳理从医学影像到个性化三维打印骨科植入物的技术与监管转化路径，并结合子殷科技现有的影像人工智能、三维重建、导板与模型业务，分析其向多孔钛脊柱植入物延伸所需的条件。",
        "方法：基于可核查的文献、监管文件和行业公告，按“影像分割与三维重建—人工智能多孔结构设计—金属增材制造与验证”回顾技术路径；对照 FDA 增材制造指南（2017）、510(k) 与 De Novo 路径及我国 NMPA 定制式医疗器械和增材制造植入物规定分析监管要求；结合2026年省级价格文件讨论支付基础；并以子殷官网已公开的资质、合作与科研进展作为企业侧对照材料。",
        "结果：经典研究提示，孔径约100 μm 为最低要求、300 μm 以上更利于成骨与血管化，SLM 多孔钛约600 μm 孔径早期固定较好。生成式人工智能已用于骨支架设计，但代表性研究 ScaffoldForge 的结果全部为计算结果。我国定制式器械实行企业与医院共同备案，并要求企业已持有同类型标准规格产品注册证；美国椎间融合器属第二类器械，通常经510(k)上市。云南、宁夏中卫已公布医学3D重建、模型和导板打印价格，均不在基本医保支付范围内。子殷科技目前持有医学图像处理软件（Chcomct SM）、截骨导板、骨模型和器官轮廓模型的第二类注册证，尚无植入物注册证；公开业务与合作集中在影像处理、非植入类打印、院内中心共建及跟骨骨折 AI 研发，未见多孔钛植入物注册或金属增材制造植入物产线的公开资质。",
        "结论：较稳妥的路径是先做扎实影像与非植入类业务、积累数据与质量体系，多孔钛植入物作为中长期方向，按标准规格产品注册在先的顺序推进。本文涉及植入物的内容均为行业分析与路径讨论，不代表子殷已有相关产品或已开展相关注册。",
        "关键词：医学影像分割；三维重建；生成式人工智能；多孔钛；增材制造；脊柱植入物；定制式医疗器械；医疗器械监管；医疗服务价格"
      ]
    },
    {
      "heading": "1 引言",
      "headingLevel": 2,
      "paragraphs": [
        "脊柱外科常遇到解剖形态不规则的骨缺损，例如肿瘤切除、严重畸形或骨质破坏之后。标准规格的植入物有时难以与患者骨面贴合，术中往往需要切削骨组织去适配器械。增材制造（俗称三维打印）可以按照患者影像数据成形复杂外形，也可以在植入物内部做出可控的多孔结构，为骨组织长入留出空间。业内文章把这种转变概括为从“削足适履”到“量体裁衣”[22]。",
        "过去几年，金属三维打印脊柱植入物上市明显加快，代表性公开案例有三个。第一，Providence Medical Technology 于2026年10月13日宣布，其采用三维打印多孔钛晶格结构的颈椎后路稳定系统 CORUS PCSS 3D-T 获得 FDA 510(k) 许可[19]；10月29日又宣布完成首批商业手术[20]。第二，3D Systems 披露，法国脊柱植入物企业 NovaSpine 的 DIVA 3D One 颈椎钛合金植入物，从项目启动到首批获批可植入器械交付不到6个月，并完成欧盟医疗器械法规（EU MDR）要求的文件和验证；该产品由 3D Systems 比利时鲁汶 ISO 13485 认证工厂用 Ti Grade 23 钛合金和 DMP Flex 350 Dual 多激光金属打印机生产[18]。3D Systems 同时说明，这一周期只代表标准应用开发的情况，会随器械复杂度、验证要求和反馈轮次而变化[18]。第三，据2026年10月28日国内媒体报道，浙江一家三维打印骨科企业自述已获7张 FDA 上市许可和国内钛合金椎间融合器第三类注册证[21]。这些案例说明，金属打印植入物已经进入规模化商业应用，但“快”建立在已验证的生产体系、成熟的质量管理和已有同类产品这些前提之上。",
        "人工智能正在进入设计环节的上游。2026年10月28日，首都医科大学附属北京康复医院团队在 PLOS ONE 发表 ScaffoldForge，用三维条件扩散模型根据目标骨小梁形态参数生成骨支架结构[1]。作者明确说明，全部结果均为计算结果，物理、生物学、制造和监管验证都留待后续工作[1]。",
        "子殷科技是一家注册于内蒙古的医学三维打印与人工智能企业，面向医院提供医学影像处理、医学3D打印、医疗AI与医工转化服务[30]。按照公司官网公开的资质信息，子殷目前持有第二类医疗器械注册证四张：医学图像处理软件 Chcomct SM（内械注准20262210005，证载有效期至2031-09-08）、定制式3D打印截骨导板（内械注准20232040006，有效期至2028-04-09）、定制式3D打印骨模型（内械注准20232020009，有效期至2028-07-23）和定制式3D打印器官轮廓模型（内械注准20232020010，有效期至2028-07-23）；另有“医学3D数字影像建模软件 V2.0”计算机软件著作权及覆盖导板与模型研发的质量管理体系认证；公司尚无任何植入物注册证[25]。公开合作与科研进展方面：2026年6月9日，内蒙古子殷科技有限公司成为河南中医药大学第一附属医院3D打印服务项目成交供应商，服务期限一年，范围包括影像人工智能分割与三维重建、手术规划与设计、数据脱敏与安全存储，以及非植入类术前模型、手术导板、康复矫形器与支具打印[26]；上海子殷科技有限公司参与孝感市中心医院数智医学与临床转化中心共建[30][31]；广元市第一人民医院设有3D打印创新研究中心并有公开交流记录[32]；CalcAI 跟骨骨折智能复位辅助系统处于科研研发与验证阶段，并在上海市第六人民医院足踝联盟大会作过汇报[33]；2026年10月6日，上海市第六人民医院与上海子殷共同申请的发明专利“一种基于多模态数据的跟骨骨折AI复位方法”获国家知识产权局受理（申请号202611224126.6）[30]。",
        "本文讨论三个问题：从影像到多孔钛脊柱植入物要经过哪些技术环节；中美监管对这条链条有何要求；子殷现有业务与未来可能的植入物方向是什么关系。文中涉及植入物的内容均为行业分析和方向讨论，不代表子殷已有相关产品或已开展相关注册。"
      ]
    },
    {
      "heading": "2 技术路径与方法",
      "headingLevel": 2,
      "paragraphs": []
    },
    {
      "heading": "2.1 影像分割与三维重建",
      "headingLevel": 3,
      "paragraphs": [
        "个性化设计的起点是患者的 CT 或 MRI 数据。传统流程依赖人工逐层勾画或阈值分割，耗时长，结果也因操作者而异。深度学习改变了这一环节。nnU-Net 是一种自配置的分割框架，在23个公开数据集上超过了大多数已有方法[14]。在此基础上训练的 TotalSegmentator 可以在 CT 上分割104个解剖结构，其中包括59块骨骼，测试集 Dice 系数为0.943[15]。脊柱方向的 VerSe 基准包含355名患者的374例 CT 和4505个逐体素标注椎骨[16]。",
        "分割精度直接决定植入物与骨面的贴合。《定制式医疗器械监督管理规定（试行）》要求，数据处理或影像转化软件应经验证和确认，并选取最极端情况测试所有文件转化过程，医工交互平台也应验证以防信息丢失[6]；FDA 指南也把“软件工作流程”列为独立章节[2]。",
        "这是子殷科技目前业务最集中的环节。子殷持有第二类“医学图像处理软件”注册证（产品名 Chcomct SM），证载用途是对符合 DICOM 3.0 标准的 CT、MRI 图像进行导入、处理、显示和保存[25]；另有“医学3D数字影像建模软件 V2.0”计算机软件著作权[25]。官网公开资料说明了证载用途与有效期，但未披露核心算法类型、已验证解剖部位、分割精度等可独立核查的验证指标；本文据此不臆测相关精度或检测报告编号。",
        "三维重建得到的表面模型（如 STL 格式）可以直接用于打印解剖模型和截骨导板。子殷持有的定制式3D打印骨模型和器官轮廓模型注册证，证载用途是显示骨缺损部位和骨骼表面形态、显示器官病灶或受损部位，辅助观察病患部位；截骨导板注册证用于特定病人骨科截骨手术中的定位和导向[25]。官网产品页将上述制品分别表述为截骨导板、骨模型与器官轮廓模型，并说明具体制品、材料、用途与交付要求需按相应产品资料、合作约定及医院流程确认[34]。公开页面未给出统一的打印工艺参数、典型交付周期或可核查的累计病例数，本文亦不编造此类内部运营数据。"
      ]
    },
    {
      "heading": "2.2 人工智能驱动的多孔结构设计",
      "headingLevel": 3,
      "paragraphs": []
    },
    {
      "heading": "2.2.1 多孔结构参数与骨长入的经典证据",
      "headingLevel": 3,
      "paragraphs": [
        "多孔金属植入物的设计目标，是在足够的力学强度和充分的骨长入之间找到平衡。相关经典证据如下。",
        "Bobyn 等（1980）在犬股骨模型中比较了4种孔径范围的多孔表面钴基合金植入物，发现孔径约50～400 μm时，能在最短时间（8周）达到最高的固定强度（约17 MPa）[9]。",
        "Karageorgiou 与 Kaplan（2005）的综述指出，体内实验中更高的孔隙率和更大的孔径会带来更多骨长入，但力学性能会随之下降；孔径的最低要求约为100 μm，推荐大于300 μm，以促进新骨形成和毛细血管形成；小孔易造成缺氧，诱导先软骨后成骨，而血管化良好的大孔则直接成骨[10]。",
        "针对增材制造钛，Taniguchi 等（2016）用选区激光熔化（SLM）制备了设计孔隙率65%、孔径分别为300、600、900 μm 的金刚石晶格多孔钛（实测平均孔径309、632、956 μm），植入兔胫骨和股骨后观察。600 μm 组术后2周的固定能力显著高于其他两组；4周时300 μm 组骨长入少于另两组；作者认为600 μm 的孔结构适合 SLM 制备的骨科植入物[11]。",
        "Van Bael 等（2012）在 SLM 制备的 Ti6Al4V 支架上发现，孔径显著影响人骨膜来源细胞的增殖，细胞分化则同时受孔形和孔径影响[12]。Wang 等（2016）的综述指出，多孔金属的刚度和孔隙率可按需调节，拓扑优化结合增材制造可设计出满足特定力学性能的内部结构[13]。",
        "上述证据形成了一个可操作的设计区间：孔径通常落在数百微米，孔隙率与力学强度此消彼长，而孔形、渗透性和连通性也会影响细胞行为。需要强调的是，这些研究来自不同材料、不同动物模型和不同植入部位，不能直接套用为某一具体产品的设计参数。具体产品仍需以自身的验证数据为依据。我国《3D打印人工椎体注册技术审查指导原则》也明确要求，申请人提供最小单元格的设定依据，以及孔隙率、孔径、丝径、内部连通性、多孔结构厚度和孔隙梯度的选择依据，并说明其对力学性能和骨生成的影响[8]。"
      ]
    },
    {
      "heading": "2.2.2 从参数化设计到生成式设计",
      "headingLevel": 3,
      "paragraphs": [
        "传统多孔结构设计主要依赖参数化单元（如三周期极小曲面、规则晶格、Voronoi 结构）和拓扑优化。ScaffoldForge 的作者指出，拓扑优化每个设计需要100～200次有限元分析，且难以直接纳入渗透性等目标；多目标进化算法收敛慢；而代理模型只能在预定义结构族内预测性能，无法提出新拓扑[1]。",
        "ScaffoldForge 的核心方法可以概括为四点[1]：",
        "1. 条件输入：8个标准化描述符，即 BV/TV、Tb.Th、Tb.Sp、Tb.N、Conn.D、SMI、DA 和渗透率 k。",
        "2. 生成网络：去噪扩散概率模型，三维 U-Net 骨干，经 AdaIN 注入条件，推理时用无分类器引导；1000步扩散，输出64³体素网格。",
        "3. 物理约束损失：对刚度、打印悬垂和最低渗透率施加经验性惩罚，作者明确称其为“物理约束”而非严格的“物理信息”方法。",
        "4. 数据：以程序化生成为主（200个程序化结构加50个真实支架），另有2050个结构的扩展版本做对照。",
        "主要结果如下[1]：",
        "在计算评估中，估计抗压强度为56.6 MPa，比拓扑优化高8.2%（配对 t 检验，p = 0.043，n = 5个随机种子）。",
        "单个设计耗时约12秒，拓扑优化约8400秒，相差约700倍。",
        "演示了从 CT 到支架的个性化生成流程。",
        "程序化数据与真实 micro-CT 的形态学分布在0.5个标准差界值下全部等效，在0.3个标准差严格界值下7个描述符中有5个无法确立等效。",
        "训练集从250扩大到2050个结构后，未见解剖结构上的描述符误差由0.079降至0.058。",
        "作者在局限性部分列出：未打印、未做力学测试和生物学评价；训练集小；依赖程序化数据；代理模型存在偏差风险；64³网格的最小可分辨特征约0.5 mm，粗于天然骨小梁约50 μm的尺度；不涉及制造与监管评估[1]。作者还特别强调，速度优势只体现在设计阶段，不能缩短制造、生物学评价和监管审批所需的时间[1]。",
        "ScaffoldForge 的意义主要在方法层面：它展示了从“功能规格”直接生成“三维结构”的可能，也暴露了真实数据不足、计算与实物存在差距这两个短板。就子殷公开的 AI 方向而言，当前可见的专科研发是 CalcAI 跟骨骨折复位辅助：聚焦骨块空间关系、复位候选方案比较与医生复核，仍处科研研发与验证阶段，并非多孔钛支架生成或植入物设计工具[33]。若未来开展多孔结构设计研究，较自然的切入点是用既有的影像分割与重建能力，为设计模型提供患者缺损区域的几何约束；公开资料未见多孔钛结构设计算法的立项时间表或合作单位声明，本节仅作方向讨论。"
      ]
    },
    {
      "heading": "2.3 金属增材制造与验证",
      "headingLevel": 3,
      "paragraphs": [
        "多孔钛植入物多采用激光或电子束粉末床熔融工艺，材料常用 TC4/TC4 ELI（Ti6Al4V/Ti6Al4V ELI）钛合金。《3D打印人工椎体注册技术审查指导原则》要求覆盖以下方面[8]：",
        "原材料与组织：粉末成分、粒径分布、球形度、流动性、可回收次数与新旧粉末比例；显微组织与打印方向、位置的关系。",
        "缺陷与力学：检测丝径断裂、闭孔、分层和气孔；参照 YY/T 0959、YY/T 0960 等标准做动静态压缩、压缩剪切、扭转和沉陷试验，用有限元选择最差情况并考虑各向异性。",
        "腐蚀、生物学与灭菌：多孔结构比表面积大，需研究耐蚀性与离子析出、生物相容性、热原和细菌内毒素；无菌保证水平需达10⁻⁶。",
        "工艺验证：打印环境与成形参数、打印方向与支撑，以及热等静压、去支撑、残余粉末清洗等后处理。",
        "FDA 指南的结构与此基本对应[2]。第五部分“设计与制造过程考虑”包括整体设计、患者匹配器械设计、软件工作流程、材料控制（起始材料与材料重复使用）、后处理、过程验证与验收（含再验证和测试试样）以及质量数据；第六部分“器械测试考虑”包括器械描述、力学测试、尺寸测量、材料表征、制造残留物去除与灭菌、生物相容性；第七部分为标签。指南还指出，患者匹配器械可以在一个预先确定的设计或性能“包络”内生产，且该包络应在开展患者匹配之前就已确定[2]。这一思路可以直接用于人工智能设计：生成模型的输出必须落在已验证的设计包络之内，否则每一个新结构都相当于一个未经验证的新设计。",
        "荷兰乌得勒支大学医学中心的两例患者特异性三维打印钛脊柱植入物可作个案参考[17]：团队为每个植入物编制了完整技术文件，做了有限元分析、压缩试验和尸体试验，植入物在 ISO 13485 认证工厂用 Ti6Al4V ELI 打印并经热等静压处理；从规划到植入，第一例约6个月，第二例缩短到约6周[17]。可见流程成熟度是决定交付周期的主要因素。",
        "子殷科技目前持有的医疗器械生产许可证范围为第二类“02-15 手术器械—其他器械”和“04-16 关节外科辅助器械”，不涉及植入物[25]。官网公开的生产经营与质量体系信息亦未显示金属增材制造植入物产线或相应洁净车间资质。因此，若讨论多孔钛植入物制造，现阶段只能参照行业通用要求，而不能把子殷表述为已具备该能力的持证生产企业。"
      ]
    },
    {
      "heading": "3 监管与转化分析",
      "headingLevel": 2,
      "paragraphs": []
    },
    {
      "heading": "3.1 我国：定制式与患者匹配两条路径",
      "headingLevel": 3,
      "paragraphs": [
        "国家药监局与国家卫生健康委于2019年6月发布《定制式医疗器械监督管理规定（试行）》（2019年第53号公告），自2020年1月1日起施行[6]。与本文主题直接相关的要点如下：",
        "1. 备案管理：定制式医疗器械实行备案管理，且不得委托生产[6]。",
        "2. 使用范围：仅限出具订单的医疗机构用于指定患者[6]。",
        "3. 共同备案：生产企业与医疗机构共同作为备案人，向生产企业所在地省级药品监督管理部门备案[6]。",
        "4. 生产企业门槛：生产企业须持有相同类型、依据标准规格批量生产的医疗器械注册证及相应生产许可证，并具备相应的生产能力、生产经验和质量管理体系[6]。",
        "5. 转为注册：当临床使用病例数及前期研究能达到上市前审批要求时，应申报注册；符合伦理准则且真实、准确、完整、可溯源的临床使用数据，可作为注册申报的临床评价资料[6]。",
        "6. 与患者匹配器械的区分：定制式医疗器械不包含患者匹配医疗器械；后者应按注册或备案管理，注册或备案的规格型号为所有可能生产的尺寸范围[6]。北京市药监局的解读把定制式器械举例为骨科植入物，把患者匹配器械举例为定制式义齿[28]。",
        "技术审评方面，国家药监局于2019年发布《无源植入性骨、关节及口腔硬组织个性化增材制造医疗器械注册技术审查指导原则》（2019年第70号通告）[7]。器审中心的解读称，这是我国首个针对个性化设计、增材制造医疗器械的技术文件[29]。2020年，国家药监局又通过2020年第36号通告发布了包括《3D打印髋臼杯产品注册技术审查指导原则》和《3D打印人工椎体注册技术审查指导原则》在内的5项指导原则[8]。其中，人工椎体指导原则适用于标准化规格的 TC4、TC4 ELI 钛合金3D打印人工椎体，不适用于定制式产品[8]。",
        "转化规模方面，有业内文章援引不完全统计称，截至2023年10月，我国已获批注册的第三类增材制造植入医疗器械约40个，定制备案的第三类增材制造植入医疗器械超过100个[22]。",
        "对子殷科技而言，第4点是最关键的门槛。按现行规定，企业要备案生产定制式多孔钛脊柱植入物，必须先持有同类型标准规格植入物的注册证和生产许可。这意味着企业向植入物方向延伸时，无法绕过标准规格产品的第三类注册，“先个性化、后标准化”的路线在法规上走不通。公开资料未见子殷已有植入物研发立项或注册规划的声明；此段仅作为路径分析。"
      ]
    },
    {
      "heading": "3.2 美国：510(k)、De Novo 与增材制造指南",
      "headingLevel": 3,
      "paragraphs": [
        "FDA 于2017年12月5日发布《Technical Considerations for Additive Manufactured Medical Devices》最终指南，草案发布于2016年5月10日；该指南属于“leapfrog”指南，代表 FDA 对新兴技术的初步考虑，建议内容可能随信息增加而变化[2]。FDA 在该指南现行版本中补充说明，指南发布时间早于质量管理体系法规（QMSR）的生效日期（2026年2月2日），并建议制造商按现行 QMSR 核对合规要求[2]。",
        "510(k) 要求证明与合法上市的对比器械“实质等同”：预期用途相同，且技术特征相同，或虽不同但不引发新的安全有效性问题；FDA 通常在90天内作出判定[3]。按照 21 CFR 888.3080，含植骨材料的椎间融合器属于第二类（特殊控制）器械；含治疗性生物制品（如骨形态发生蛋白）的属于第三类，须经上市前批准（PMA）[5]。Providence 的 CORUS PCSS 3D-T 即通过510(k)上市，公司称其保留了前代产品的核心设计、适应证和手术技术，在此基础上增加了三维打印多孔钛结构[19]。这是以已上市产品为对比引入增材制造的典型用法。",
        "De Novo 适用于无对比器械、但一般控制或加特殊控制即可保证安全有效的新型中低风险器械；获批后建立新的分类法规，并可作为后续510(k)的对比器械；MDUFA IV 下 FDA 的目标是150个审评日内作出决定，并建议先做预提交（Pre-Submission）[4]。",
        "需要明确：子殷科技目前没有开展 FDA 注册。本节内容是对国际监管框架的研究，以及对企业未来出海可能路径的参考。若将来有人工智能设计的多孔钛椎间融合器进入美国，原则上可以考虑以已上市的三维打印钛融合器为对比器械申请510(k)；而人工智能设计软件本身是否构成独立的器械软件、需要哪类审评，本文未检索到可直接适用的公开先例，不作推断。"
      ]
    },
    {
      "heading": "3.3 两套框架的共同要求",
      "headingLevel": 3,
      "paragraphs": [
        "两套框架都把软件流程、材料控制、后处理和过程验证纳入质量体系[2][6][8]，都关注残留粉末、清洗灭菌和腐蚀等多孔结构特有风险[2][8]，也都要求个性化器械在预先验证的范围内生产：FDA 称之为设计或性能包络，我国患者匹配器械要求注册覆盖“所有可能生产的尺寸范围”[2][6]。最后一点对人工智能设计最关键。生成模型擅长快速探索设计空间，监管则要求设计空间有边界、可验证。两者的衔接方式是：先用实物试验验证一个设计包络，再让人工智能在包络内工作，并对每个输出做规则化校核。"
      ]
    },
    {
      "heading": "3.4 支付侧：医学3D重建、模型与导板打印的价格立项",
      "headingLevel": 3,
      "paragraphs": [
        "临床转化不仅要过监管，还要解决支付问题。2026年1月，国家医保局发布《手术和治疗辅助操作类医疗服务价格项目立项指南（试行）》，把3D打印分为“建模”与“打印”两个维度，设立了医学3D模型重建、医学3D模型打印和医学3D导板打印等价格项目，并单独设立了组织、血管和器官的生物3D打印项目[23]。",
        "各地据此公布了具体价格，表1列出两地文件中与子殷现有业务直接相关的三个项目。"
      ]
    },
    {
      "heading": "对表1的说明",
      "headingLevel": 3,
      "paragraphs": [
        "注：两地文件均规定，开展医学3D重建辅助操作，未上传医疗数据和设备运行记录的，减收100元[24][27]。云南文件规定，甲类、乙类纳入基本医疗保险支付范围，丙类不纳入[24]。中卫文件规定，医保属性为“否”的项目，基本医疗保险统筹基金不予支付[27]。中卫市人民医院等执行B类标准，部分县级医院执行C类标准[27]。两地文件均注明，口腔种植类按相应“口腔”项目收费；中卫文件还规定，收取模型、导板打印费时不得同时收取手术规划辅助器具、导板、导航材料等相关耗材费用[27]。",
        "表1说明三点：一是重建、模型和导板打印已有明确收费依据，这正是子殷现有业务所在环节；二是两地这三项都不在基本医保支付范围内，会影响可及性和医院开展意愿；三是“未上传数据减收100元”使数据保存与上传能力成为收费合规的一部分，与子殷在河南项目中承担的数据脱敏与安全存储服务直接相关[26]。",
        "子殷科技的重点区域是内蒙古。本文未能获取自治区执行价原文，故不列出内蒙古价格。"
      ]
    },
    {
      "heading": "4 讨论",
      "headingLevel": 2,
      "paragraphs": []
    },
    {
      "heading": "4.1 人工智能在链条中的真实位置",
      "headingLevel": 3,
      "paragraphs": [
        "人工智能在链条上的作用并不均衡。影像分割已有大规模公开数据和成熟框架[14][15][16]；结构生成仍处于计算验证阶段，ScaffoldForge 的生成结果仍带有可检测的程序化生成器特征，在未见解剖结构上误差明显升高[1]；制造与验证则主要依靠实物试验。因此，“人工智能驱动”更准确的含义是缩短影像处理和设计探索的时间，而非替代实物验证[1]。"
      ]
    },
    {
      "heading": "4.2 “快速上市”需要什么前提",
      "headingLevel": 3,
      "paragraphs": [
        "NovaSpine 不到6个月完成首批获批器械交付，Providence 在已上市产品基础上引入多孔钛后通过510(k)，乌得勒支团队第二例只用约6周[17][18][19]。共同前提是已验证的工艺、认证工厂、成熟的质量体系和可对比的已上市产品，而不只是设计算得快。对一家尚无植入物注册证的企业来说，时间主要会花在质量体系扩展、工艺验证和标准规格产品注册上，而这些环节都无法用算法压缩。"
      ]
    },
    {
      "heading": "4.3 子殷科技的现实路径",
      "headingLevel": 3,
      "paragraphs": [
        "结合资质现状[25]、法规门槛[6]、支付环境[24][27]以及官网已公开的合作与科研进展[26][30][31][32][33]，本文认为可以分三个层次理解当前路径。",
        "近期：做扎实现有业务。影像分割、三维重建、截骨导板和解剖模型已有注册证、生产许可和价格项目覆盖；河南中医附一一年期服务、孝感中心共建与广元中心现场服务，说明非植入类医工交付已进入可公开核验的合作场景[26][31][32]。公开页面未给出统一的分割精度、导板定位精度或累计病例等质量指标，后续若要形成可对外引用的证据，仍需以可核查的检测、验收或研究记录为准。",
        "中期：积累数据与验证能力。河南项目已涵盖影像分割、手术规划和数据安全存储[26]；CalcAI 与上海六院的协作则展示了从临床问题到软件原型、病例复核与发明专利受理的专科研发路径[30][33]。在合规授权与伦理审批前提下沉淀影像、设计方案与术后随访的对应关系，可形成植入物设计所需的真实世界数据基础，这正对应 ScaffoldForge 指出的真实数据不足问题[1]。具体的数据治理制度与伦理安排以各合作机构实际审批为准，本文不作未公开内部安排的推断。",
        "远期：植入物方向。如果进入多孔钛脊柱植入物领域，按我国法规，应先取得同类型标准规格植入物的第三类注册证和生产许可，再考虑定制式备案[6]；设计上，以经典孔径、孔隙率证据和实物验证确定设计包络，再引入人工智能做包络内优化[2][10][11]。是否、何时进入这一领域，取决于企业的战略和资源；公开资料未见自主研发、合作持证或明确暂缓等战略声明，本文不作判断。"
      ]
    },
    {
      "heading": "4.4 本文局限",
      "headingLevel": 3,
      "paragraphs": [
        "本文基于公开资料，不含子殷科技的实验或临床数据；行业案例来自企业新闻稿或媒体报道，性能描述属企业自述；价格仅比较了云南和宁夏中卫两地原文，未能获取内蒙古自治区执行价原文；人工智能设计软件的监管属性未检索到可直接适用的公开先例；CalcAI 等专科研发成果仍处验证阶段，不能外推为多孔钛植入物能力。"
      ]
    },
    {
      "heading": "5 结论与展望",
      "headingLevel": 2,
      "paragraphs": [
        "本文的主要结论有四点：",
        "1. 多孔钛骨长入的经典证据给出了数百微米孔径、孔隙率与强度此消彼长的设计区间，但具体产品必须以自身验证数据为准[9][10][11][12]。",
        "2. 生成式人工智能已能把功能规格映射为三维多孔结构，但代表性研究目前仍停留在计算阶段[1]。",
        "3. 我国对定制式植入物设置了“先有同类标准规格产品注册证”的门槛[6]；美国椎间融合器通常经510(k)上市，新型器械可走 De Novo[3][4][5]。",
        "4. 医学3D重建、模型打印和导板打印已在多地有明确价格，但目前不在基本医保支付范围内[24][27]。",
        "子殷科技现阶段的核心能力在影像人工智能、三维重建和非植入类打印，并以院内中心共建与专科 AI 研发形成可公开核验的协作记录。下一步可关注三件事：把验证与服务数据做成可公开核查的证据；在合规框架下积累影像—设计—随访数据；对多孔钛植入物方向做可行性论证，明确标准规格产品注册在先的路径。公开资料未见未来1～3年植入物注册的具体规划文本，上述内容仅为基于法规与公开事实的路径建议。"
      ]
    }
  ],
  "sectionTables": {
    "3.4 支付侧：医学3D重建、模型与导板打印的价格立项": {
      "caption": "表1 两地医学3D重建、模型打印、导板打印项目价格（元）",
      "columns": [
        "地区及文件",
        "价格类别",
        "医学3D重建辅助操作费（次）",
        "医学3D模型打印辅助操作费（件）",
        "医学3D导板打印辅助操作费（件）",
        "医保支付",
        "执行时间"
      ],
      "rows": [
        [
          "云南省（省级基准价，即昆明地区省级公立医疗机构最高限价）[24]",
          "一类价 / 二类价 / 三类价",
          "280 / 266 / 238",
          "460 / 437 / 391",
          "1350 / 1283 / 1148",
          "丙类",
          "2026年12月12日零时起"
        ],
        [
          "宁夏中卫市[27]",
          "B类 / C类",
          "207.9 / 187.1",
          "402.3 / 362.1",
          "1195.2 / 1075.7",
          "医保属性“否”",
          "2026年10月15日起"
        ]
      ]
    }
  },
  "references": [
    {
      "title": "Zhang Y, Zhang H, Yang H. ScaffoldForge: Bioinspired generative design of 3D-printed bone scaffolds via conditional diffusion for large segmental bone defect reconstruction. PLoS One. 2026;21(10):e0361041. doi:10.1371/journal.pone.0361041.",
      "url": "https://doi.org/10.1371/journal.pone.0361041",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "U.S. Food and Drug Administration. Technical Considerations for Additive Manufactured Medical Devices: Guidance for Industry and Food and Drug Administration Staff. Issued December 5, 2017. PDF：https://www.fda.gov/files/medical%20devices/published/Technical-Considerations-for-Additive-Manufactured-Medical-Devices---Guidance-for-Industry-and-Food-and-Drug-Administration-Staff.pdf ；联邦公报公告 82 FR 57462：https://www.federalregister.gov/documents/2017/12/05/2017-26196/technical-considerations-for-additive-manufactured-medical-devices-guidance-for-industry-and-food",
      "url": "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/technical-considerations-additive-manufactured-medical-devices",
      "verification": "primary_full_text",
      "linkLabel": "FDA指南页面"
    },
    {
      "title": "U.S. Food and Drug Administration. Premarket Notification 510(k).",
      "url": "https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/premarket-notification-510k",
      "verification": "primary_full_text",
      "linkLabel": "FDA 510(k)说明"
    },
    {
      "title": "U.S. Food and Drug Administration. De Novo Classification Request.",
      "url": "https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/de-novo-classification-request",
      "verification": "primary_full_text",
      "linkLabel": "FDA De Novo说明"
    },
    {
      "title": "21 CFR 888.3080 Intervertebral body fusion device.",
      "url": "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-H/part-888/subpart-D/section-888.3080",
      "verification": "primary_full_text",
      "linkLabel": "联邦法规条文"
    },
    {
      "title": "国家药品监督管理局，国家卫生健康委员会. 关于发布定制式医疗器械监督管理规定（试行）的公告（2019年第53号）. 2019-06-26.",
      "url": "https://www.gov.cn/gongbao/content/2019/content_5442291.htm",
      "verification": "primary_full_text",
      "linkLabel": "国务院公报"
    },
    {
      "title": "国家药品监督管理局. 关于发布无源植入性骨、关节及口腔硬组织个性化增材制造医疗器械注册技术审查指导原则的通告（2019年第70号）. 转载：中国医疗器械行业协会.",
      "url": "http://www.camdi.cn/news/8451",
      "verification": "search_summary",
      "linkLabel": "行业协会转载"
    },
    {
      "title": "国家药品监督管理局. 关于发布肌腱韧带固定系统等5项注册技术审查指导原则的通告（2020年第36号），附件《3D打印人工椎体注册技术审查指导原则》. 转载：中国医疗器械行业协会. 新闻：中国食品药品网，2020-06-06. https://www.cnpharm.com/c/2020-06-06/734552.shtml",
      "url": "http://www.camdi.cn/news/9098",
      "verification": "search_summary",
      "linkLabel": "行业协会转载"
    },
    {
      "title": "Bobyn JD, Pilliar RM, Cameron HU, Weatherly GC. The optimum pore size for the fixation of porous-surfaced metal implants by the ingrowth of bone. Clin Orthop Relat Res. 1980;(150):263-270. doi:10.1097/00003086-198007000-00045.",
      "url": "https://doi.org/10.1097/00003086-198007000-00045",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Karageorgiou V, Kaplan D. Porosity of 3D biomaterial scaffolds and osteogenesis. Biomaterials. 2005;26(27):5474-5491. doi:10.1016/j.biomaterials.2005.02.002.",
      "url": "https://doi.org/10.1016/j.biomaterials.2005.02.002",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Taniguchi N, Fujibayashi S, Takemoto M, et al. Effect of pore size on bone ingrowth into porous titanium implants fabricated by additive manufacturing: An in vivo experiment. Mater Sci Eng C Mater Biol Appl. 2016;59:690-701. doi:10.1016/j.msec.2015.10.069.",
      "url": "https://doi.org/10.1016/j.msec.2015.10.069",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Van Bael S, Chai YC, Truscello S, et al. The effect of pore geometry on the in vitro biological behavior of human periosteum-derived cells seeded on selective laser-melted Ti6Al4V bone scaffolds. Acta Biomater. 2012;8(7):2824-2834. doi:10.1016/j.actbio.2012.04.001.",
      "url": "https://doi.org/10.1016/j.actbio.2012.04.001",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Wang X, Xu S, Zhou S, et al. Topological design and additive manufacturing of porous metals for bone scaffolds and orthopaedic implants: A review. Biomaterials. 2016;83:127-141. doi:10.1016/j.biomaterials.2016.01.012.",
      "url": "https://doi.org/10.1016/j.biomaterials.2016.01.012",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Isensee F, Jaeger PF, Kohl SAA, Petersen J, Maier-Hein KH. nnU-Net: a self-configuring method for deep learning-based biomedical image segmentation. Nat Methods. 2021;18(2):203-211. doi:10.1038/s41592-020-01008-z.",
      "url": "https://doi.org/10.1038/s41592-020-01008-z",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Wasserthal J, Breit HC, Meyer MT, et al. TotalSegmentator: Robust Segmentation of 104 Anatomic Structures in CT Images. Radiol Artif Intell. 2023;5(5):e230024. doi:10.1148/ryai.230024.",
      "url": "https://doi.org/10.1148/ryai.230024",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Sekuboyina A, Husseini ME, Bayat A, et al. VerSe: A Vertebrae labelling and segmentation benchmark for multi-detector CT images. Med Image Anal. 2021;73:102166. doi:10.1016/j.media.2021.102166.",
      "url": "https://doi.org/10.1016/j.media.2021.102166",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "Willemsen K, Nizak R, Noordmans HJ, Castelein RM, Weinans H, Kruyt MC. Challenges in the design and regulatory approval of 3D-printed surgical implants: a two-case series. Lancet Digit Health. 2019;1(4):e163-e171. doi:10.1016/S2589-7500(19)30067-6.",
      "url": "https://doi.org/10.1016/S2589-7500(19)30067-6",
      "verification": "search_summary",
      "linkLabel": "期刊论文"
    },
    {
      "title": "3D Systems. NovaSpine Accelerates Concept-to-Market with 3D Systems Metal 3D Printing（客户案例）. 日文新闻稿（2026-10-29）：https://prtimes.jp/main/html/rd/p/000000016.000102537.html",
      "url": "https://www.3dsystems.com/customer-stories/novaspine",
      "verification": "search_summary",
      "linkLabel": "企业客户案例"
    },
    {
      "title": "Providence Medical Technology. Providence Medical Technology Receives FDA 510(k) Clearance for CORUS PCSS 3D-T（PRNewswire 新闻稿，2026-10-13，Ortho Spine News 转载）.",
      "url": "https://orthospinenews.com/2026/10/13/providence-medical-technology-receives-fda-510k-clearance-for-corus-pcss-3d-t-bringing-3d-printed-porous-titanium-to-its-total-segmental-fusion-platform/",
      "verification": "search_summary",
      "linkLabel": "新闻稿转载"
    },
    {
      "title": "Providence Medical Technology. Providence Medical Technology Announces First Commercial Cases Using Next-Generation, 3D-Printed CORUS Posterior Cervical Stabilization System (PCSS 3D-T). PRNewswire, 2026-10-29.",
      "url": "https://www.prnewswire.com/news-releases/providence-medical-technology-announces-first-commercial-cases-using-next-generation-3d-printed-corus-posterior-cervical-stabilization-system-pcss-3d-t-302923039.html",
      "verification": "search_summary",
      "linkLabel": "企业新闻稿"
    },
    {
      "title": "朱葭苇. 人体206块骨骼都能精准“打印”. 嘉兴日报，2026-10-28（新浪财经转载）.",
      "url": "https://finance.sina.com.cn/jjxw/2026-10-28/doc-iniwtpke6678920.shtml",
      "verification": "search_summary",
      "linkLabel": "媒体报道"
    },
    {
      "title": "我国医用增材制造监管体系建设思考.",
      "url": "https://www.ydcmdei.org.cn/article/281",
      "verification": "search_summary",
      "linkLabel": "行业文章"
    },
    {
      "title": "国家医疗保障局. 价格立项促进手术和治疗辅助操作精准化、个性化、智能化. 2026-01-21.",
      "url": "https://www.nhsa.gov.cn/art/2026/1/21/art_14_19437.html",
      "verification": "primary_full_text",
      "linkLabel": "国家医保局"
    },
    {
      "title": "云南省医疗保障局，云南省卫生健康委员会. 关于规范耳鼻喉科类等医疗服务价格项目及医保支付类别的通知（2026-08-21印发，2026-09-08发布）. 附件8《手术和治疗辅助操作类医疗服务项目价格及医保支付类别》：https://ylbz.yn.gov.cn/zfxxgk/zcwj/qtwj/202609/P020261019557635176317.pdf",
      "url": "https://ylbz.yn.gov.cn/zfxxgk/zcwj/qtwj/202609/t20260908_4345047.html",
      "verification": "primary_full_text",
      "linkLabel": "云南省医保局通知"
    },
    {
      "title": "子殷科技. 资质与注册证.",
      "url": "https://www.chcomct.cn/qualifications",
      "verification": "primary_full_text",
      "linkLabel": "官网资质页"
    },
    {
      "title": "子殷科技. 子殷科技成为河南中医药大学第一附属医院3D打印服务项目成交供应商. 2026-06-09.",
      "url": "https://www.chcomct.cn/news/henan-tcm-3d-printing-service-2026",
      "verification": "primary_full_text",
      "linkLabel": "官网新闻"
    },
    {
      "title": "中卫市医疗保障局，中卫市卫生健康委员会. 关于执行口腔等8类新版医疗服务价格项目及医保支付类别暨落实年度价格动态调整工作的通知. 2026-10-10. 附件4《手术和治疗辅助操作类医疗服务价格项目表（试行）》：https://www.nxzw.gov.cn/zwgk/bmxxgkml/sylbzj/fdzdgknr_50128/wsyl_50144/202610/P020261010568702629016.pdf",
      "url": "https://www.nxzw.gov.cn/zwgk/bmxxgkml/sylbzj/fdzdgknr_50128/wsyl_50144/202610/t20261010_5368289.html",
      "verification": "primary_full_text",
      "linkLabel": "中卫市通知"
    },
    {
      "title": "北京市药品监督管理局. 定制式医疗器械备案咨询问答专栏.",
      "url": "https://yjj.beijing.gov.cn/yjj/ztzl48/ylqxjgfwzn/zxwdzl68/10929463/index.html",
      "verification": "primary_full_text",
      "linkLabel": "北京市药监局"
    },
    {
      "title": "国家药监局医疗器械技术审评中心. 《无源植入性骨、关节及口腔硬组织个性化增材制造医疗器械注册技术审查指导原则》导读. 中国食品药品网，2021-06-18.",
      "url": "https://m.cnpharm.com/c/2021-06-18/793597.shtml",
      "verification": "search_summary",
      "linkLabel": "审评导读"
    },
    {
      "title": "子殷科技. 关于我们.",
      "url": "https://www.chcomct.cn/about",
      "verification": "primary_full_text",
      "linkLabel": "官网关于我们"
    },
    {
      "title": "子殷科技. 孝感市中心医院数智医学与临床转化中心正式揭牌启动. 2026-06-04.",
      "url": "https://www.chcomct.cn/news/xiaogan-medical-center-2026",
      "verification": "primary_full_text",
      "linkLabel": "官网新闻"
    },
    {
      "title": "子殷科技. 朝天区人民医院专家到广元市第一人民医院3D打印创新研究中心参观调研. 2026-09-29.",
      "url": "https://www.chcomct.cn/news/guangyuan-chaotian-3d-printing-center-visit-20260929",
      "verification": "primary_full_text",
      "linkLabel": "官网新闻"
    },
    {
      "title": "子殷科技. 子殷科技亮相上海六院足踝联盟大会，汇报CalcAI跟骨骨折智能复位科研进展. 2026-09-11.",
      "url": "https://www.chcomct.cn/news/calcai-shanghai-sixth-foot-ankle-alliance-2026",
      "verification": "primary_full_text",
      "linkLabel": "官网新闻"
    },
    {
      "title": "子殷科技. 产品与技术服务.",
      "url": "https://www.chcomct.cn/products",
      "verification": "primary_full_text",
      "linkLabel": "官网产品页"
    }
  ]
};
