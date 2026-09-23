import Image from "next/image";
import Link from "next/link";
import { getEditorialArticles } from "@/lib/editorial-content";

export default function DeliveryShowcase() {
  const articles = getEditorialArticles();
  if (!articles.length) return null;
  return <section className="bg-slate-50 py-20">
    <div className="site-container">
      <p className="text-sm font-medium text-blue-700">医工造物 · 项目实践</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">从具体项目，看见医工协作</h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">从医院需求、工程工作到阶段成果，了解每个项目的合作范围与实际进展。</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {articles.map((article) => <Link key={article.id} href={"/cases/" + article.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
            <Image src={article.cover.url} alt={article.cover.alt} fill sizes="(max-width: 768px) 100vw, 33vw"
              className={article.cover.height > article.cover.width ? "object-contain" : "object-cover"} />
          </div>
          <div className="p-6">
            <span className="text-xs font-medium text-blue-700">{article.caseProfile.phase}</span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-blue-700">{article.caseProfile.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{article.caseProfile.need}</p><p className="mt-4 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-500">{article.caseProfile.result}</p>
            <p className="mt-5 text-sm font-medium text-blue-700">了解项目 →</p>
          </div>
        </Link>)}
      </div>
    </div>
  </section>;
}
