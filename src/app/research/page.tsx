import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { RESEARCH_INQUIRY_HREF, RESEARCH_SERVICES } from "@/lib/cooperation";

export const metadata = pageMetadata(
  "科研与成果转化",
  "围绕医院临床问题，了解子殷科技的科研项目申报协作、医工协同研发与技术成果转化服务，查看公开项目进展与合作方式。",
  "/research",
);

export default function ResearchPage() {
  return (
    <main className="text-slate-900">
      <section className="bg-[#0A1628] pb-16 pt-28 text-white sm:pt-36">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-medium text-cyan-200">科研与成果转化</p>
            <h1 className="mt-5 text-4xl font-semibold leading-snug sm:text-5xl">从临床问题出发，<br />共同推进研究与转化。</h1>
            <p className="mt-6 max-w-xl leading-8 text-slate-300">依托软件、三维建模与医学3D打印能力，协助医院团队梳理研究方向、组织技术研发，把已有成果向可验证的工程实现推进。</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={RESEARCH_INQUIRY_HREF} className="rounded-lg bg-cyan-300 px-6 py-3.5 font-semibold text-slate-950">沟通科研与转化需求</Link>
              <Link href="#project-progress" className="rounded-lg border border-slate-500 px-6 py-3.5 font-semibold">查看公开项目进展</Link>
            </div>
          </div>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-800">
              <Image src="/images/company/xiaogan-center.jpg" alt="孝感数智医学与临床转化中心实景及医学模型展示" fill priority sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-sm leading-6 text-slate-300">孝感数智医学与临床转化中心 · 医工协作场景</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="research-services">
        <div className="site-container">
          <p className="eyebrow">按项目当前阶段开始合作</p>
          <h2 id="research-services" className="mt-3 text-3xl font-semibold">三类能力，明确工作与交付</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">可以从单项任务开始，也可以按项目需要衔接推进。合作前共同确认工作范围、人员分工、阶段成果与验收方式。</p>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {RESEARCH_SERVICES.map((service) => (
              <article key={service.id} id={service.id} className="flex scroll-mt-24 flex-col border-t-2 border-blue-800 pt-6">
                <p className="font-mono text-sm text-blue-800">{service.number}</p>
                <h3 className="mt-3 text-2xl font-semibold">{service.title}</h3>
                <p className="mt-4 font-medium leading-7">{service.need}</p>
                <p className="mt-4 leading-7 text-slate-600">{service.work}</p>
                <div className="mt-6 flex-1 rounded-xl bg-slate-50 p-5">
                  <h4 className="font-semibold">可约定的交付内容</h4>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600"><span className="font-semibold text-slate-900">初次沟通可准备：</span>{service.preparation}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="project-progress" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20" aria-labelledby="project-progress-title">
        <div className="site-container">
          <p className="eyebrow">以公开资料说明实际进展</p>
          <h2 id="project-progress-title" className="mt-3 text-3xl font-semibold">从项目中，看见子殷承担的工作</h2>
          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[16/9] bg-slate-100">
                <Image src="/images/news/calcai-alliance-20260911/local-review.jpg" alt="已公开的CalcAI研究版三维骨块与局部复核展示" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-contain" />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-sm font-medium text-blue-800">协同研发 · 科研研发与验证阶段</p>
                <h3 className="mt-3 text-2xl font-semibold">CalcAI跟骨骨折复位辅助研发</h3>
                <dl className="mt-5 space-y-4 text-sm leading-7">
                  <div><dt className="font-semibold">研究问题</dt><dd className="text-slate-600">围绕三维骨块关系、复位候选方案与局部复核，形成可讨论、可检查的研究工具。</dd></div>
                  <div><dt className="font-semibold">子殷承担</dt><dd className="text-slate-600">软件开发并协助数据验证，结合临床团队提出的目标与评价标准持续修订。</dd></div>
                  <div><dt className="font-semibold">公开进展</dt><dd className="text-slate-600">2026年9月在上海六院足踝联盟大会汇报研究版功能与科研进展；当前成果处于研发与验证阶段。</dd></div>
                </dl>
                <Link href="/news/calcai-shanghai-sixth-foot-ankle-alliance-2026" className="mt-5 inline-flex min-h-11 items-center font-semibold text-blue-800">查看项目报告与演示图片 →</Link>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[16/9] bg-white">
                <Image src="/images/editorial/knee-planning.webp" alt="已公开的膝关节三维规划与个性化导板设计资料" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-contain" />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-sm font-medium text-blue-800">工程交付 · 两例早期应用观察</p>
                <h3 className="mt-3 text-2xl font-semibold">膝关节规划与个性化导板</h3>
                <dl className="mt-5 space-y-4 text-sm leading-7">
                  <div><dt className="font-semibold">具体需求</dt><dd className="text-slate-600">将医生确认的个性化规划衔接到导板设计与实体制品。</dd></div>
                  <div><dt className="font-semibold">工程工作</dt><dd className="text-slate-600">影像整理、骨结构重建、规划复核、导板设计制造与交付资料衔接。</dd></div>
                  <div><dt className="font-semibold">公开进展</dt><dd className="text-slate-600">孝感中心记录TKA与UKA两例早期应用观察，呈现设计到交付的过程，不据此作普遍疗效结论。</dd></div>
                </dl>
                <Link href="/cases/xiaogan-knee-guides-2026" className="mt-5 inline-flex min-h-11 items-center font-semibold text-blue-800">查看需求、工程工作与阶段成果 →</Link>
              </div>
            </article>
          </div>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-sm font-medium text-blue-800">技术成果转化 · 已公开公司发展记录</p>
            <h3 className="mt-3 text-xl font-semibold">与医院团队推进成果转化合作</h3>
            <p className="mt-4 max-w-4xl leading-8 text-slate-600">官网发展历程记载：2024年7月与内蒙古医科大学第二附属医院团队完成首项科技成果转化；2025年2月签署PEEK材料智能骨折固位器成果转化协议。两项记录分别呈现当时已完成的转化事项与协议签署进展。</p>
            <Link href="/about#milestones" className="mt-4 inline-flex min-h-11 items-center font-semibold text-blue-800">查看公司发展历程及资料说明 →</Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="cooperation-steps">
        <div className="site-container grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="eyebrow">先明确任务，再推进实施</p>
            <h2 id="cooperation-steps" className="mt-3 text-3xl font-semibold">一次具体的沟通，就是合作起点。</h2>
            <ol className="mt-7 divide-y divide-slate-200">
              {[
                ["沟通问题与基础", "说明希望解决的问题、现有条件与合作目标。"],
                ["确认范围与分工", "明确医院与子殷各自承担的任务、资料使用范围和阶段目标。"],
                ["形成方案与交付约定", "沟通实施路径、时间安排、交付材料及验收方式。"],
                ["按阶段复核与推进", "用阶段成果和反馈决定后续研发或转化工作。"],
              ].map(([title, description], index) => (
                <li key={title} className="flex gap-5 py-5"><span className="font-mono text-blue-800">0{index + 1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{description}</p></div></li>
              ))}
            </ol>
          </div>
          <aside className="self-start rounded-2xl bg-[#f4f7fb] p-7 sm:p-8">
            <h2 className="text-2xl font-semibold">告诉我们项目到了哪一步</h2>
            <p className="mt-4 leading-8 text-slate-600">您可以从研究设想、正在申报的课题，或已有技术成果开始。先提供非敏感的项目概况，便于安排进一步沟通。</p>
            <Link href={RESEARCH_INQUIRY_HREF} className="primary-button mt-6">填写科研与转化需求</Link>
            <p className="mt-5 text-sm leading-7 text-slate-600">首次咨询无需提交患者资料或未公开的技术细节。</p>
            <div className="mt-6 border-t border-slate-300 pt-6 text-sm leading-7 text-slate-600">
              <h3 className="font-semibold text-slate-900">合作说明</h3>
              <p className="mt-3">申报是否获批及成果能否进入后续应用，取决于相应评审、验证与实施条件。科研演示、已注册产品和技术服务分别按其实际范围开展。</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
