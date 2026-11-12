import Image from "next/image";
import Link from "next/link";
import { getEditorialArticles } from "@/lib/editorial-content";

export default function DeliveryShowcase() {
  const articles = getEditorialArticles();
  if (!articles.length) return null;
  return <section className="bg-white py-10 sm:py-16">
    <div className="site-container">
      <p className="text-sm font-medium text-blue-700">医工造物 · 项目实践</p>
      <h2 className="mt-3 text-3xl font-bold text-slate-900">从具体项目，看见医工协作</h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">从医院需求、工程工作到阶段成果，了解每个项目的合作范围与实际进展。</p>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {articles.map((article) => {
          const profile = article.caseProfile;
          const { cover } = profile.update ?? article;
          return <Link key={article.id} href={"/cases/" + article.id} className="group grid grid-cols-[96px_1fr] overflow-hidden rounded-2xl border border-slate-200 bg-white sm:block">
            <div className="relative min-h-32 overflow-hidden bg-slate-100 sm:aspect-[16/10]">
              <Image src={cover.url} alt={cover.alt} fill sizes="(max-width: 639px) 96px, (max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                className={cover.height > cover.width || article.hideCover ? "object-contain" : "object-cover"} />
            </div>
            <div className="p-4 sm:p-6">
              <span className="text-xs font-medium text-blue-700">{profile.phase}</span>
              <h3 className="mt-2 text-base font-semibold text-slate-900 group-hover:text-blue-700 sm:text-lg">{profile.title}</h3>
              <p className="mt-3 hidden text-sm leading-7 text-slate-600 sm:block">{profile.need}</p>
              <p className="mt-4 hidden border-t border-slate-200 pt-4 text-xs leading-6 text-slate-500 sm:block">{profile.result}</p>
              <p className="mt-3 text-sm font-medium text-blue-700">了解项目 →</p>
            </div>
          </Link>;
        })}
      </div>
      <Link href="/cases" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-blue-800">查看全部医院案例 →</Link>
    </div>
  </section>;
}
