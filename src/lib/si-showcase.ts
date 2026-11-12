export const SI_PATH = "/products/chcomct-si";
export const SI_INQUIRY = "自动建模与打印协同 / Chcomct SI";
export const SI_INQUIRY_HREF = `/demo?product=${encodeURIComponent(SI_INQUIRY)}`;

export const SI_SCREENS = [
  {
    id: "pelvis", title: "三维建模结果", label: "看模型", image: "/images/si/pelvis-workbench.png",
    description: "在骨盆审阅工作台中，分色查看双侧髋骨与骶骨，观察结构及空间关系。自动重建后的候选成果进入专业复核。",
    alt: "Chcomct SI 骨盆三维审阅工作台研发截图，显示分色双髋与骶骨，状态为待工程复核",
  },
  {
    id: "ct", title: "影像与模型对照", label: "看复核", image: "/images/si/pelvis-ct-review.png",
    description: "同一骨盆示例的 CT 与三维模型联动界面。工程人员结合轴位、冠状位和矢状位检查模型边界与结构。",
    alt: "同一骨盆示例的 CT 三平面与三维模型联动审阅研发截图",
  },
  {
    id: "entry", title: "从一个目标开始", label: "看入口", image: "/images/si/si-entry.png",
    description: "SI 以统一入口组织医工任务，集中呈现资料接入、继续任务与待处理事项。",
    alt: "Chcomct SI 子殷数智研发首页，显示目标输入框和接入资料、继续任务、待处理入口",
  },
  {
    id: "review", title: "审核对应的成果版本", label: "看审核", image: "/images/si/technical-review.png",
    description: "技术审核面板将任务状态与提交的结果版本关联。查看成果后，由专业人员确认通过或退回修改。此图为另一演示任务。",
    alt: "SI 技术审核面板研发截图，显示待审核任务、查看已提交结果、审核通过与退回修改入口",
  },
] as const;

export const SI_WORKFLOW = [
  { title: "明确任务", role: "人员确认", text: "明确目标部位、影像资料及交付要求。需要数字模型，还是继续制作实体模型，由任务需求决定。" },
  { title: "自动建模", role: "系统处理", text: "调用相应建模流程生成三维候选成果，进入专科工作台查看。支持范围按具体部位与版本确认。" },
  { title: "专业复核", role: "人员审核", text: "对照源影像检查结构与边界，必要时修订，并确认用于后续交付的成果版本。" },
  { title: "衔接打印", role: "工程协同", text: "按已确认的数字成果进行工艺准备、切片和设备下发，跟踪打印进度。具体自动化环节按演示版本说明。" },
  { title: "检查与交付", role: "实物验收", text: "检查成品外观、结构与任务要求，形成对应交付记录。设备打印完成后仍需进行实物检查。" },
] as const;
