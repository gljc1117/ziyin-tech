import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("医院解决方案", "围绕医学影像处理、3D打印服务、中心共建与医工科研，明确医院需求、交付内容和合作流程。", "/solutions");
const solutions = [
  { id: "imaging", title: "科室影像处理与三维建模", audience: "已有 CT、MRI 图像处理需求的医院和科室", need: "整理影像、观察三维结构、开展几何测量，衔接后续医工协作。", delivery: ["Chcomct SM 产品功能与使用范围沟通", "按约定进行安装、使用培训与问题反馈", "在授权范围内组织模型和设计资料"], link: "/products/chcomct-sm", label: "了解医学图像处理软件" },
  { id: "printing", title: "医学3D打印与工程交付", audience: "需要模型、导板等实体制品支持的科室", need: "把医生确认的应用需求，转为可复核的设计、制品和交付记录。", delivery: ["影像与需求资料受理、三维重建及设计", "医生确认后按相应注册或备案产品范围制造", "质量检查、使用说明与交付资料"], link: "/products/medical-3d-printing", label: "了解模型与导板服务" },
  { id: "center", title: "数智医学中心共建", audience: "计划形成持续医工服务能力的医院", need: "统筹场地、设备、人员与协作流程，让多个科室获得持续的技术支持。", delivery: ["需求调研与分阶段建设方案", "经约定的技术操作、设备及运营配套", "需求受理、设计复核、交付及反馈流程"], link: "/cases/xiaogan-medical-center-2026", label: "查看孝感中心共建实践" },
  { id: "research", title: "临床科研与成果转化", audience: "有明确临床问题或研究成果的科室和团队", need: "把研究问题拆解为研发任务、验证计划和可核查的阶段成果。", delivery: ["技术可行性讨论与研发任务界定", "项目申报、协同研发及阶段验证", "按项目确认数据授权、伦理与知识产权安排"], link: "/research", label: "了解科研与转化合作" },
];
export default function SolutionsPage() {
  return <main className="bg-white text-slate-900"><PageIntro eyebrow="医院解决方案" title="围绕医院需求，组织技术与交付。" description="从一个科室的具体任务，到医院持续运行的医工服务能力，先明确适用场景，再确定产品、工作范围和验收方式。" />
    <div className="site-container py-12"><div className="grid gap-6 lg:grid-cols-2">{solutions.map((s,i)=><section key={s.id} id={s.id} className="scroll-mt-28 rounded-2xl border border-slate-200 p-6 sm:p-8"><p className="text-sm font-medium text-blue-800">0{i+1} / {s.audience}</p><h2 className="mt-4 text-2xl font-semibold">{s.title}</h2><p className="mt-4 leading-7 text-slate-600">{s.need}</p><h3 className="mt-6 font-semibold">合作内容</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">{s.delivery.map(d=><li key={d}>{d}</li>)}</ul><Link className="mt-5 inline-flex min-h-11 items-center font-medium text-blue-800" href={s.link}>{s.label} →</Link></section>)}</div>
      <section className="mt-12 rounded-2xl bg-[#0b2252] p-6 text-white sm:p-9"><h2 className="text-2xl font-semibold">从需求确认开始合作</h2><ol className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[["需求沟通","明确科室、应用场景及目标。"],["范围确认","核对注册范围、数据授权及交付要求。"],["实施与复核","按项目组织设计、制造或技术服务。"],["验收与支持","依约验收、交付资料并反馈问题。"]].map(([title,body],i)=><li key={title}><span className="text-sm text-cyan-200">0{i+1}</span><h3 className="mt-2 font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-blue-100">{body}</p></li>)}</ol><Link href="/demo" className="mt-8 inline-flex rounded-lg bg-cyan-300 px-6 py-3 font-semibold text-slate-950">沟通医院需求</Link></section>
      <p className="mt-6 text-sm leading-7 text-slate-500">本页为合作方案概述。产品适用范围以注册、备案资料和说明书为准；临床方案由医院专业人员审核。中心配置、服务周期及科研任务以双方确认的项目方案为准。</p>
    </div></main>;
}
