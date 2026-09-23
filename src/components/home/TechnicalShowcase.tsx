import Image from "next/image";
import Link from "next/link";
import LungDemo from "./LungDemo";

export default function TechnicalShowcase() {
  return (
    <section id="technology" className="bg-[#f4f7fb] py-16 sm:py-20">
      <div className="site-container">
        <p className="eyebrow">骨科为核心 · 多专科协作</p>
        <h2 className="mt-4 text-3xl font-semibold leading-snug text-slate-900">把骨结构看清楚，<br className="sm:hidden" />把工程方案做具体。</h2>
        <p className="mt-5 max-w-3xl leading-8 text-slate-600">从影像重建、几何测量到模型与导板设计，围绕医生确认的需求，衔接数字化资料与实体交付。</p>
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="grid sm:grid-cols-[1fr_.9fr]">
              <Link href="/cases/xiaogan-knee-guides-2026" aria-label="查看完整骨结构重建与膝关节规划案例" className="relative block min-h-[360px] bg-white sm:min-h-[420px]">
                <Image src="/images/editorial/knee-planning.webp" alt="已发布膝关节项目资料：股骨、胫骨三维重建及个性化规划与导板设计" fill sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 380px" className="object-contain p-4" />
              </Link>
              <div className="p-6 sm:pl-3">
                <p className="text-xs font-medium text-blue-700">骨结构重建与工程设计</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">从影像到<br />骨科数字模型</h3>
                <ol className="mt-6 space-y-5 text-sm leading-6 text-slate-600">
                  <li><span className="block font-semibold text-slate-900">01 · 三维重建</span>呈现股骨、胫骨等骨结构及其空间关系。</li>
                  <li><span className="block font-semibold text-slate-900">02 · 测量与规划</span>组织测量、设计与临床方案复核。</li>
                  <li><span className="block font-semibold text-slate-900">03 · 模型与导板</span>衔接设计资料、制造与交付记录。</li>
                </ol>
              </div>
            </div>
            <div className="border-t border-slate-200 px-6 py-5">
              <Link href="/cases/xiaogan-knee-guides-2026" className="inline-flex min-h-11 items-center font-semibold text-blue-800">查看膝关节重建与导板案例 →</Link>
              <p className="mt-1 text-xs leading-6 text-slate-500">图片来自已发布项目资料，呈现两例早期应用观察。具体临床方案由医院专业人员审核。</p>
              <Link href="/products/calcai" className="mt-3 inline-flex min-h-11 items-center text-sm text-blue-800">科研方向：跟骨骨折复位辅助研发 →</Link>
            </div>
          </article>
          <LungDemo />
        </div>
      </div>
    </section>
  );
}
