import Link from "next/link";
import { notFound } from "next/navigation";
import { QUALIFICATIONS } from "@/lib/qualifications";
import { pageMetadata } from "@/lib/site";
export function generateStaticParams() { return QUALIFICATIONS.map(({ id }) => ({ id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const item = QUALIFICATIONS.find(q => q.id === id);
  return item ? pageMetadata(item.title + " · 资质信息", item.number + "。" + item.scope, "/qualifications/" + id) : {};
}
export default async function QualificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const item = QUALIFICATIONS.find(q => q.id === id); if (!item) notFound();
  return <main className="bg-white pb-16 pt-28 text-slate-900"><div className="site-container">
    <Link href="/qualifications" className="text-sm text-blue-800">← 全部资质与注册证</Link>
    <p className="mt-8 eyebrow">{item.category}</p><h1 className="mt-3 text-3xl font-semibold leading-snug sm:text-4xl">{item.title}</h1>
    <dl className="mt-8 grid gap-5 rounded-2xl bg-slate-50 p-6 text-sm sm:grid-cols-2">
      {[[item.category === "质量体系与知识产权" ? "证书 / 登记编号" : "注册 / 备案 / 许可编号", item.number], ["持有人 / 登记主体", item.holder], ["发证 / 登记日期", item.issued], ["证载有效期至", item.expires]].filter(([,value])=>value).map(([label,value])=><div key={label}><dt className="text-slate-500">{label}</dt><dd className="mt-2 break-words font-medium">{value}</dd></div>)}
    </dl>
    <section className="mt-8 max-w-4xl"><h2 className="text-xl font-semibold">适用范围与说明</h2><p className="mt-4 leading-8 text-slate-700">{item.scope}</p><p className="mt-4 rounded-xl border-l-4 border-blue-700 bg-blue-50 p-5 text-sm leading-7 text-blue-950">{item.note}</p></section>
    <div className="mt-6 flex flex-wrap gap-5">{item.productSlug && <Link href={`/products/${item.productSlug}`} className="inline-flex min-h-11 items-center font-medium text-blue-800">查看对应产品 →</Link>}<Link href="/support#documents" className="inline-flex min-h-11 items-center font-medium text-blue-800">联系资料与技术支持 →</Link></div>
    <section className="mt-10 max-w-4xl rounded-xl border border-slate-200 p-6"><h2 className="text-xl font-semibold">采购与合作核验</h2><p className="mt-3 text-sm leading-7 text-slate-600">本页展示资质信息摘要。医院采购、合作核验或产品使用需要查阅证件、变更文件及说明书时，可联系资料窗口，按具体产品和用途提供适用材料。</p><Link href="/support#documents" className="mt-4 inline-flex min-h-11 items-center font-medium text-blue-800">联系资料窗口 →</Link></section>
  </div></main>;
}
