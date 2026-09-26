import Link from "next/link";
const paths = [
  { href: "/products", name: "产品与技术服务", tag: "软件 · 模型 · 导板", description: "了解产品、适用范围与交付内容。" },
  { href: "/solutions", name: "医院解决方案", tag: "科室需求 · 中心共建", description: "从具体任务到持续医工服务能力。" },
  { href: "/research", name: "科研与成果转化", tag: "协同研发 · 阶段验证", description: "围绕临床问题，推进研究与技术转化。" },
];
export default function BusinessPathways() {
  return <section aria-labelledby="business-pathways" className="bg-white py-7 sm:py-12"><div className="site-container">
    <h2 id="business-pathways" className="sr-only">三个核心服务入口</h2>
    <div className="grid gap-3 md:grid-cols-3">{paths.map((p,i)=><Link key={p.href} href={p.href} className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-700 sm:block sm:p-6">
      <div><p className="text-xs font-medium text-blue-800">0{i+1} · {p.tag}</p><h3 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">{p.name}</h3><p className="mt-2 hidden text-sm leading-7 text-slate-600 sm:block">{p.description}</p></div>
      <span aria-hidden="true" className="text-xl text-blue-800 sm:mt-4 sm:inline-block">→</span>
    </Link>)}</div>
  </div></section>;
}
