import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";
import { COMPANY_CONTACT } from "@/lib/contact";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("服务与支持", "产品资料、技术支持、售后问题与医院合作联系入口。", "/support");
export default function SupportPage() {
  return <main className="bg-white text-slate-900"><PageIntro eyebrow="服务与支持" title="找到资料，联系负责的团队。" description="无论是采购资料核对、产品使用问题，还是医院合作需求，都可以从这里开始。请在联系时说明产品名称与具体事项，方便团队安排跟进。" />
    <div className="site-container py-12"><div className="grid gap-6 lg:grid-cols-3">
      <section id="documents" className="scroll-mt-28 rounded-2xl border border-slate-200 p-6"><p className="eyebrow">资料查阅</p><h2 className="mt-3 text-2xl font-semibold">注册与采购资料</h2><p className="mt-4 text-sm leading-7 text-slate-600">注册、备案、生产经营和质量体系信息可在线查阅。需要证件扫描件、变更文件、产品说明书、具体型号的检测报告或采购资料，请说明产品、型号和用途后联系索取。</p><Link href="/qualifications" className="mt-5 inline-flex min-h-11 items-center font-semibold text-blue-800">进入资质中心 →</Link><Link href="/products" className="block py-3 text-sm text-blue-800">查阅产品与适用范围 →</Link></section>
      <section className="rounded-2xl border border-slate-200 p-6"><p className="eyebrow">使用与售后</p><h2 className="mt-3 text-2xl font-semibold">产品技术支持</h2><p className="mt-4 text-sm leading-7 text-slate-600">建议提供产品名称、软件版本或制品批次、使用环境、问题出现的步骤以及脱敏后的截图。团队确认事项后安排沟通，服务范围按采购或合作约定执行。</p><a href={COMPANY_CONTACT.emailHref + "?subject=" + encodeURIComponent("技术支持｜产品名称｜问题描述")} className="mt-5 inline-flex min-h-11 items-center font-semibold text-blue-800">发送技术支持邮件 →</a></section>
      <section className="rounded-2xl bg-[#0b2252] p-6 text-white"><p className="text-sm text-cyan-200">医院与合作伙伴</p><h2 className="mt-3 text-2xl font-semibold">项目与合作咨询</h2><p className="mt-4 text-sm leading-7 text-blue-100">产品演示、中心共建、技术协作与科研转化，请留下工作联系信息，并简要描述科室场景和合作目标。</p><Link href="/demo" className="mt-5 inline-flex min-h-11 items-center font-semibold text-cyan-200">提交合作需求 →</Link><Link href="/solutions" className="block py-3 text-sm text-cyan-200">了解医院解决方案 →</Link></section>
    </div>
    <section className="mt-12 grid gap-6 rounded-2xl bg-slate-50 p-6 sm:grid-cols-2 sm:p-8"><div><h2 className="text-2xl font-semibold">直接联系</h2><a href={COMPANY_CONTACT.phoneHref} className="mt-5 block py-2 text-2xl font-semibold text-blue-900">{COMPANY_CONTACT.phone}</a><a href={COMPANY_CONTACT.emailHref} className="inline-block py-3 text-blue-800">{COMPANY_CONTACT.email}</a></div><div><h3 className="font-semibold">发送资料前，请先脱敏</h3><p className="mt-3 text-sm leading-7 text-slate-600">官网留言和普通咨询邮件请勿包含患者姓名、身份证号、病历、原始医学影像或其他健康数据。项目确需处理医疗数据时，请先由双方确认授权、接收渠道、访问权限与保存要求。</p><Link href="/privacy" className="mt-4 inline-flex min-h-11 items-center text-sm text-blue-800">隐私与数据安全说明 →</Link></div></section>
    <section className="mt-12"><h2 className="text-2xl font-semibold">常见问题</h2><div className="mt-5 divide-y divide-slate-200">{[
      ["如何确认产品可以用于我的场景？","先查阅对应产品的注册或备案文件，再结合型号、材料、使用方式与说明书确认。对适用范围有疑问时，请联系团队核对，不能仅凭网页演示判断。"],
      ["三维演示能否直接用于诊疗？","官网三维模型用于展示交互方式，不作为临床诊疗结论。实际软件和制品应按注册范围、说明书及医院流程使用。"],
      ["可以申请演示或使用培训吗？","可以通过合作咨询提交需求，说明产品、科室及应用场景。演示内容、培训安排和服务方式由团队与您具体沟通。"],
      ["为什么部分检测报告需要联系索取？","检测报告与产品型号、材料、批次及检测目的有关。先确认所需产品和用途，便于提供适用的版本，避免把不匹配的报告用于采购或使用判断。"]
    ].map(([q,a])=><details key={q} className="py-5"><summary className="cursor-pointer font-medium leading-7">{q}</summary><p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">{a}</p></details>)}</div></section>
    </div></main>;
}
