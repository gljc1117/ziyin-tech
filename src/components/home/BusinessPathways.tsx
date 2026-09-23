import Link from "next/link";

export default function BusinessPathways() {
  return (
    <section aria-labelledby="business-pathways" className="bg-white py-14 sm:py-16">
      <div className="site-container">
        <p className="eyebrow">从您的需求出发</p>
        <h2 id="business-pathways" className="mt-3 text-3xl font-semibold text-slate-900">技术交付与科研转化，都有明确的合作起点。</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link href="/products" className="group rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-colors hover:border-blue-700 sm:p-8">
            <p className="text-sm font-medium text-blue-800">软件建模 · 模型打印 · 导板打印</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">产品与技术服务</h3>
            <p className="mt-4 max-w-lg leading-7 text-slate-600">已有具体应用需求，了解软件功能、数字模型与实体制品的工作范围和交付内容。</p>
            <span className="mt-6 inline-flex min-h-11 items-center font-semibold text-blue-800 group-hover:underline">查看产品与交付内容 →</span>
          </Link>
          <Link href="/research" className="group rounded-2xl border border-blue-900 bg-[#0b2252] p-7 text-white transition-colors hover:bg-[#173e87] sm:p-8">
            <p className="text-sm font-medium text-cyan-200">项目申报 · 协同研发 · 成果转化</p>
            <h3 className="mt-4 text-2xl font-semibold">科研与成果转化</h3>
            <p className="mt-4 max-w-lg leading-7 text-blue-100">从临床问题、研究设想到已有成果，共同明确技术路线、研发任务与下一阶段的实施计划。</p>
            <span className="mt-6 inline-flex min-h-11 items-center font-semibold text-cyan-200 group-hover:underline">了解科研与转化合作 →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
