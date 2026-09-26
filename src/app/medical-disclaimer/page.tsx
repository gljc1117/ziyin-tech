import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("医疗信息与使用说明", "官网产品、科研、案例与三维演示的适用范围说明。", "/medical-disclaimer");
export default function MedicalDisclaimerPage() {
  return <main className="bg-white text-slate-900"><PageIntro eyebrow="医疗信息与使用说明" title="清楚展示技术，明确使用边界。" description="官网用于介绍公司、产品与合作情况。产品注册资料、科研进展、项目案例和技术演示各有不同的适用范围。" /><div className="site-container py-12"><div className="max-w-4xl space-y-8">{[
    ["产品使用","医疗器械的型号、结构组成、适用范围、禁忌及使用要求，以对应注册或备案文件及最新说明书为准。软件或制品应由具备相应条件的专业人员按医院流程使用。"],
    ["临床判断","Chcomct SM 的处理结果仅为医生提供参考意见，无自动诊断功能，不能单独作为临床诊疗决策依据。官网文字、图片、案例与交互模型不构成针对个人的诊断或治疗建议。"],
    ["科研与技术演示","科研项目、研发功能及演示模型不代表已获批的临床功能。不同产品或项目的注册范围不相互延伸；软件著作权、专利和质量体系证书也不替代产品注册批准。"],
    ["医院案例与成效","案例按已公开的项目资料介绍对应阶段。项目成交、中心建成、阶段性应用观察与临床有效性验证含义不同；单个案例不构成普遍疗效保证，也不代表医院对其他产品的背书。"],
    ["需要帮助","产品适用范围、资料版本和技术支持问题，请联系服务窗口。涉及个人健康、诊断与治疗，请咨询具有资质的医疗机构及医务人员。"]
  ].map(([title,body])=><section key={title}><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-4 leading-8 text-slate-600">{body}</p></section>)}<div className="flex flex-wrap gap-6"><Link href="/qualifications" className="primary-button">查看资质与注册证</Link><Link href="/support" className="inline-flex min-h-11 items-center text-blue-800">联系服务与支持 →</Link></div></div></div></main>;
}
