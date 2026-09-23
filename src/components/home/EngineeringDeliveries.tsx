import Link from "next/link";
import { ENGINEERING_DELIVERIES } from "@/lib/cooperation";

export default function EngineeringDeliveries() {
  return (
    <section aria-labelledby="engineering-deliveries" className="bg-slate-50 py-14 sm:py-16">
      <div className="site-container">
        <p className="eyebrow">从数字资料到实体交付</p>
        <h2 id="engineering-deliveries" className="mt-3 text-3xl font-semibold text-slate-900">按您的任务，了解合作内容</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {ENGINEERING_DELIVERIES.map((item, index) => (
            <article key={item.title} className="flex flex-col border-t-2 border-blue-800 pt-6">
              <p className="font-mono text-sm text-blue-800">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
              <p className="mt-5 flex-1 text-sm leading-7 text-slate-600"><span className="font-semibold text-slate-900">交付内容：</span>{item.outputs}</p>
              <Link href={item.href} className="mt-5 inline-flex min-h-11 items-center font-semibold text-blue-800">{item.link} →</Link>
            </article>
          ))}
        </div>
        <p className="mt-7 text-sm leading-7 text-slate-600">具体制品、材料、用途与交付要求，在合作前结合相应产品范围和医院流程确认。</p>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-slate-300 pt-7">
          <p className="max-w-2xl leading-7 text-slate-700">如果您希望把临床问题进一步形成课题，或推进已有技术成果的工程实现，可以从科研合作开始。</p>
          <Link href="/research" className="inline-flex min-h-11 items-center font-semibold text-blue-800">科研与成果转化 →</Link>
        </div>
      </div>
    </section>
  );
}
