import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { COMPANY_CONTACT, TALENT_EMAIL_HREF } from "@/lib/contact";

export const metadata = pageMetadata("加入我们", "与子殷科技交流医学影像建模、工程服务、研发及运营协作等职业发展方向。", "/careers");

const directions = [
  { name: "医学影像与工程服务", detail: "关注三维建模、数字化设计与医学3D打印，把工程工作落实到具体交付。" },
  { name: "软件与医疗AI研发", detail: "围绕医学影像工具、专业工作台和人机协作，参与研发与工程验证。" },
  { name: "中心运营与项目协作", detail: "连接医院需求、团队安排与交付进度，让跨专业协作持续运转。" },
  { name: "科研协作与成果转化", detail: "参与资料整理、科研项目协作与成果转化沟通，连接研究与实际需求。" },
];

export default function CareersPage() {
  return (
    <main className="bg-[#f4f7fb] pb-20 pt-28">
      <div className="site-container">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">加入子殷 · 人才交流</p>
            <h1 className="mt-4 text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl">把专业，带进<br />真实的医工现场。</h1>
            <p className="mt-6 max-w-lg leading-8 text-slate-600">我们关注临床需求，也关注把事情做成的过程。欢迎对医学影像、工程技术与医疗服务感兴趣的伙伴，与子殷交流职业发展意向。</p>
            <a href={TALENT_EMAIL_HREF} className="primary-button mt-7">发送简历／交流意向</a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src="/images/company/ziyin-brand.jpg" alt="子殷科技品牌展示墙" fill priority sizes="(max-width: 1024px) 95vw, 640px" className="object-cover" /></div>
        </section>
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-slate-900">可以与我们交流的专业方向</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">以下为人才交流方向。具体在招岗位、工作地点与任职要求，以团队沟通确认为准。</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {directions.map((direction, index) => <article key={direction.name} className="rounded-xl border border-slate-200 bg-white p-7"><p className="font-mono text-sm text-blue-700">0{index + 1}</p><h3 className="mt-3 text-lg font-semibold text-slate-900">{direction.name}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{direction.detail}</p></article>)}
          </div>
        </section>
        <section className="mt-10 rounded-2xl bg-[#0b2252] p-7 text-white sm:p-10">
          <h2 className="text-2xl font-semibold">从一份简历与一个意向开始</h2>
          <p className="mt-4 leading-8 text-blue-100">请在邮件中附上简历、意向方向、期望工作地点和联系方式；也欢迎提供可公开的作品或项目经历。</p>
          <a href={TALENT_EMAIL_HREF} className="mt-5 inline-flex min-h-11 items-center text-lg font-semibold text-cyan-200">{COMPANY_CONTACT.email} →</a>
          <p className="mt-2 text-sm leading-7 text-blue-100">邮件主题建议：人才交流｜姓名｜意向方向</p>
          <p className="mt-2 text-xs leading-6 text-slate-300">请勿在作品材料中附带患者信息或未经授权的项目资料。</p>
        </section>
        <Link href="/about" className="mt-8 inline-flex min-h-11 items-center font-medium text-blue-800">进一步了解子殷 →</Link>
      </div>
    </main>
  );
}
