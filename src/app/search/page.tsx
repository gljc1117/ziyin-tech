import Link from "next/link";
import PageIntro from "@/components/content/PageIntro";
import { PRODUCTS } from "@/lib/products";
import { QUALIFICATIONS } from "@/lib/qualifications";
import { getEditorialArticles } from "@/lib/editorial-content";
import { getPublishedNews } from "@/lib/published-news";
import { pageMetadata } from "@/lib/site";
export const metadata = { ...pageMetadata("站内搜索", "搜索子殷官网产品、注册证、医院案例、新闻和服务资料。", "/search"), robots: { index: false, follow: true } };
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams; const query = (typeof params.q === "string" ? params.q : "").trim().slice(0,120);
  const entries = [
    ...PRODUCTS.map(p=>({ title: p.name + " · " + p.title, summary: p.summary, category: "产品与服务", href: "/products/" + p.slug })),
    ...QUALIFICATIONS.map(q=>({ title: q.title, summary: q.number + " · " + q.scope, category: "资质与注册证", href: "/qualifications/" + q.id })),
    ...getEditorialArticles(false).map(a=>({ title:a.caseProfile.title, summary:a.summary, category:"医院案例", href:"/cases/"+a.id })),
    ...(query ? await getPublishedNews() : []).map(n=>({ title:n.title, summary:n.summary ?? "", category:"动态与洞察", href:"/news/"+n.id })),
    ...[{title:"医院解决方案",summary:"科室影像处理、模型导板打印、数智医学中心共建与临床科研",href:"/solutions"},
      {title:"服务与支持",summary:"产品说明书、检测报告、售后、技术支持和采购资料",href:"/support"},
      {title:"科研与成果转化",summary:"研发创新、项目申报、协同研发与验证",href:"/research"},
      {title:"关于子殷",summary:"公司介绍、团队协作、发展历程与中心实景",href:"/about"},
      {title:"加入我们",summary:"招聘、人才与团队交流",href:"/careers"},
      {title:"隐私与数据安全说明",summary:"咨询、评论、患者数据、信息更正与删除",href:"/privacy"}].map(e=>({...e,category:"官网服务"}))
  ];
  const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const results = query ? entries.filter(e=>words.every(w=>(e.title+" "+e.summary+" "+e.category).toLocaleLowerCase().includes(w))) : [];
  return <main className="bg-white pb-16 text-slate-900"><PageIntro eyebrow="站内搜索" title="查找产品、资质与服务资料。" description="输入产品名称、注册证编号、医院名称或服务关键词。" />
    <div className="site-container py-10"><form action="/search" role="search" className="flex max-w-3xl gap-3"><label htmlFor="site-search" className="sr-only">搜索关键词</label><input id="site-search" type="search" name="q" defaultValue={query} maxLength={120} placeholder="例如：截骨导板、注册证、孝感" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 text-base" /><button type="submit" className="primary-button shrink-0">搜索</button></form>
      {!query ? <div className="mt-7"><p className="text-sm text-slate-500">常用搜索</p><div className="mt-3 flex flex-wrap gap-3">{["Chcomct SM","截骨导板","骨模型","孝感","技术支持"].map(q=><Link href={"/search?q="+encodeURIComponent(q)} key={q} className="rounded-full bg-slate-100 px-4 py-2.5 text-sm text-blue-800">{q}</Link>)}</div></div> : <section className="mt-9 max-w-4xl" aria-labelledby="search-results"><h2 id="search-results" className="text-lg font-semibold">“{query}”的搜索结果 · {results.length} 项</h2>
        {results.length ? <ul className="mt-5 divide-y divide-slate-200">{results.map(r=><li key={r.href} className="py-6"><p className="text-xs font-medium text-blue-800">{r.category}</p><Link href={r.href} className="mt-2 inline-block text-xl font-semibold text-slate-900 hover:text-blue-800">{r.title} →</Link><p className="mt-3 text-sm leading-7 text-slate-600">{r.summary}</p></li>)}</ul> : <div className="mt-5 rounded-xl bg-slate-50 p-6 leading-7 text-slate-600">暂未找到相关内容。可尝试更短的关键词，或前往<Link href="/support" className="text-blue-800 underline">服务与支持</Link>联系资料窗口。</div>}
      </section>}
    </div></main>;
}
