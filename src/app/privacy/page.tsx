import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";
import { COMPANY_CONTACT } from "@/lib/contact";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("隐私与数据安全说明", "了解官网咨询、公开评论与员工登录的信息处理方式，以及联系、更正和删除信息的途径。", "/privacy");
export default function PrivacyPage() {
  return <main className="bg-white text-slate-900"><PageIntro eyebrow="隐私与数据安全" title="了解您在官网留下的信息。" description="本说明适用于子殷官网的浏览、合作咨询、文章评论和员工登录，不替代医疗产品或医院项目单独约定的数据处理规则。更新日期：2026年9月26日。" />
    <div className="site-container py-12"><div className="max-w-4xl space-y-10">
      <section><h2 className="text-2xl font-semibold">联系与信息处理窗口</h2><p className="mt-4 leading-8 text-slate-600">子殷科技官网的咨询及信息权利请求，可联系内蒙古子殷科技有限公司：<a href={COMPANY_CONTACT.emailHref} className="text-blue-800 underline">{COMPANY_CONTACT.email}</a>，电话 <a href={COMPANY_CONTACT.phoneHref} className="text-blue-800 underline">{COMPANY_CONTACT.phone}</a>。产品注册、生产经营等主体信息见<Link href="/qualifications" className="text-blue-800 underline">资质中心</Link>。</p></section>
      <section><h2 className="text-2xl font-semibold">不同功能如何处理信息</h2><div className="mt-5 space-y-4">{[
        ["合作咨询","您主动提交的姓名、机构、手机号、科室、关注服务及选填需求、月手术量，用于联系您、安排演示和沟通合作。提交后由获授权的团队成员在后台跟进，不作为公开留言展示。"],
        ["文章评论","评论功能收集昵称、评论正文、关联文章、提交时间和用于防重复提交的标识。评论经审核后，昵称、正文、时间及官方回复会在文章页面公开，请勿填写真实患者信息或私人联系方式。"],
        ["员工登录","员工账号和会话信息用于身份验证及后台访问控制。登录功能使用维持会话所需的浏览器存储或 Cookie，普通访客无需员工账号即可浏览公开内容。"],
        ["网站运行","网站托管、数据库和身份验证依赖 Vercel、Supabase 等服务。服务运行可能产生网络请求、设备与安全日志，供页面交付、排错和安全防护使用。官网咨询的云端处理与医疗产品本地运行属于不同场景。"]
      ].map(([title,body])=><div key={title} className="rounded-xl bg-slate-50 p-5"><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{body}</p></div>)}</div></section>
      <section><h2 className="text-2xl font-semibold">保存、访问与删除</h2><p className="mt-4 leading-8 text-slate-600">信息的必要保存期限根据咨询是否仍需跟进、合作事项是否完成、评论是否继续公开，以及适用的记录保存要求确定。处理目的完成且无继续保存必要时，应删除或匿名化处理。咨询内容与后台数据仅向工作所需的获授权人员开放。</p><p className="mt-4 leading-8 text-slate-600">如需查阅、复制、更正、删除您的信息，撤回咨询联系意愿，或申请撤下评论，请通过上述邮箱说明提交时间、相关页面和请求事项。团队在核实身份及记录后处理；请先提供足以定位记录的最少信息，无需主动发送身份证件。</p></section>
      <section><h2 className="text-2xl font-semibold">患者资料与医院项目</h2><p className="mt-4 leading-8 text-slate-600">官网咨询表单和公开评论不用于接收患者健康数据。请勿提交病历、原始影像、身份证号等敏感资料。涉及医院数据的合作，应在项目开始前另行确认处理主体、授权依据、存储地点、访问权限、接收渠道、保存与删除要求；不能从官网技术展示推断项目的数据部署方式。</p></section>
      <section><h2 className="text-2xl font-semibold">外部链接与说明更新</h2><p className="mt-4 leading-8 text-slate-600">打开外部论文、医院、服务商或其他网站后，相关信息处理由其页面规则说明。本说明随官网功能和处理方式调整而更新；涉及新的信息用途时，将在相应收集入口作出提示。</p><Link href="/medical-disclaimer" className="mt-4 inline-flex min-h-11 items-center text-blue-800">查看医疗信息与使用说明 →</Link></section>
    </div></div></main>;
}
