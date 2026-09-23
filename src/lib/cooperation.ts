export const RESEARCH_INQUIRY_HREF = `/demo?product=${encodeURIComponent("科研合作与成果转化")}`;

export const RESEARCH_SERVICES = [
  {
    id: "project",
    number: "01",
    title: "科研项目申报",
    need: "有临床问题，希望形成可实施的研究项目。",
    work: "围绕研究目标与已有基础，协助梳理申报方向、技术路线、任务分工和实施计划。",
    deliverables: ["研究需求与现有基础梳理", "技术路线、任务与阶段目标", "约定范围内的申报材料及修改记录"],
    preparation: "拟解决的问题、已有研究基础、申报指南与时间要求（如有）。",
  },
  {
    id: "development",
    number: "02",
    title: "医工协同研发",
    need: "已有研究方向，需要软件、模型或工程原型支撑。",
    work: "把临床团队提出的需求转成具体研发任务，通过原型演示、工程检查和专业反馈持续修订。",
    deliverables: ["经双方确认的研发需求与验证计划", "约定的软件功能、数字模型或工程原型", "版本说明、阶段记录与反馈清单"],
    preparation: "应用场景、目标功能、现有技术基础及期望形成的成果。",
  },
  {
    id: "transfer",
    number: "03",
    title: "技术成果转化",
    need: "已有技术或研究成果，希望推进工程实现与合作应用。",
    work: "梳理成果现状与应用需求，协助明确工程开发、验证、技术资料整理及合作实施的下一步。",
    deliverables: ["成果现状与待解决问题清单", "工程开发与验证的阶段计划", "约定的技术资料和合作实施方案"],
    preparation: "可公开的成果简介、现有原型或验证情况、权属概况与合作目标。",
  },
] as const;

export const ENGINEERING_DELIVERIES = [
  {
    title: "软件与三维建模",
    description: "了解医学图像处理软件，或沟通具体三维重建任务。",
    outputs: "软件功能与使用资料；建模任务按约定交付数字模型及对应说明。",
    href: "/products/chcomct-sm",
    link: "了解软件能力",
  },
  {
    title: "医学模型打印",
    description: "围绕经确认的数字模型、应用目的和制作要求，沟通实体模型交付。",
    outputs: "约定的实体模型、对应标识与质量交付记录。",
    href: "/products/medical-3d-printing",
    link: "了解模型与制造服务",
  },
  {
    title: "导板设计与打印",
    description: "围绕医生确认的方案，衔接个性化设计、复核、制造和交付。",
    outputs: "经确认的设计资料、适用范围内的导板及对应交付记录。",
    href: "/cases/xiaogan-knee-guides-2026",
    link: "查看导板项目实践",
  },
] as const;
