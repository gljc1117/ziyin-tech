import Link from "next/link";
export default function TrustSummary() {
  return <section className="border-y border-slate-200 bg-[#f4f7fb] py-9 sm:py-12" aria-labelledby="trust-title">
    <div className="site-container"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">资质与使用范围</p><h2 id="trust-title" className="mt-3 text-2xl font-semibold text-slate-900">了解产品，也了解它的适用边界。</h2></div><Link href="/qualifications" className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-800">查看资质信息 →</Link></div>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[["4 项", "第二类医疗器械注册", "/qualifications#category-0"], ["4 项", "第一类医疗器械备案", "/qualifications#category-1"], ["ISO 13485", "质量管理体系及覆盖范围", "/qualifications/iso13485"], ["生产 · 经营", "许可与备案信息", "/qualifications#category-2"]].map(([value,label,href])=><Link key={href} href={href} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"><span className="text-xl font-semibold text-blue-900">{value}</span><span className="mt-2 block text-xs leading-6 text-slate-600 sm:text-sm">{label} →</span></Link>)}
      </div>
    </div>
  </section>;
}
