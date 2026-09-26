import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";
import { QUALIFICATIONS, QUALIFICATION_CATEGORIES } from "@/lib/qualifications";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("资质与注册证", "了解子殷医疗器械注册、备案、生产经营许可、质量体系与知识产权信息。", "/qualifications");
export default function QualificationsPage() {
  return <main className="bg-white text-slate-900">
    <PageIntro eyebrow="资质与注册证" title="产品有资质，使用有边界。" description="按产品和资质类别了解登记信息、适用范围与使用限制。医疗器械注册、产品备案、质量体系和知识产权分别展示，便于医院采购与技术团队核对。" />
    <div className="site-container py-10 sm:py-14">
      <nav aria-label="资质分类" className="flex flex-wrap gap-3">{QUALIFICATION_CATEGORIES.map((category, index) => <a key={category} href={`#category-${index}`} className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-blue-800">{category}</a>)}</nav>
      {QUALIFICATION_CATEGORIES.map((category, index) => <section key={category} id={`category-${index}`} className="mt-12 scroll-mt-28">
        <h2 className="text-2xl font-semibold">{category}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">{QUALIFICATIONS.filter(item => item.category === category).map(item => <article key={item.id} className="flex flex-col rounded-2xl border border-slate-200 p-6 sm:p-7">
          <p className="text-sm font-medium text-blue-800 break-all">{item.number}</p>
          <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.scope}</p>
          {item.expires && <p className="mt-4 text-xs text-slate-500">证载有效期至 {item.expires}</p>}
          <Link href={`/qualifications/${item.id}`} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-blue-800">查看资质与适用说明 →</Link>
        </article>)}</div>
      </section>)}
      <aside className="mt-12 rounded-xl bg-slate-50 p-6 text-sm leading-7 text-slate-600">以下信息根据公司持有的资质文件整理，更新日期为2026年9月26日。证载有效期与当前有效状态并非同一概念，采购及使用前请结合监管、认证机构记录和最新产品说明书核验。需要检测报告、完整型号清单或其他采购材料，可通过<Link href="/support#documents" className="text-blue-800 underline">服务与支持</Link>联系资料窗口。</aside>
    </div>
  </main>;
}
