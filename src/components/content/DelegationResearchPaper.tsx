import Image from "next/image";
import Link from "next/link";
import blocks from "@/lib/delegation-research-paper.json";
import { DELEGATION_RESEARCH } from "@/lib/delegation-research";

function CitedText({ text }: { text: string }) {
  return <>{text.split(/(\[\d+\])/g).map((part, index) => {
    const match = part.match(/^\[(\d+)\]$/);
    return match ? <sup key={index} className="ml-0.5"><a href={`#reference-${match[1]}`} aria-label={`参考文献 ${match[1]}`} className="text-blue-700 underline underline-offset-2">{part}</a></sup> : part;
  })}</>;
}

export default function DelegationResearchPaper() {
  const contents = blocks.filter(block => block.type === "heading" && block.level === 2);
  const cover = DELEGATION_RESEARCH.cover;
  return <div className="mt-6 text-slate-800">
    <div className="border-y border-slate-200 py-5 text-sm leading-7 text-slate-600">
      <p>发布机构：子殷科技 · 公开版 V1.0</p>
      <p className="mt-2">本文为情境驱动的概念研究与研究设计，未经期刊同行评审。案例采用概括情境，未使用业务日志验证因果关系；候选授权方案不代表公司已实施的制度。</p>
    </div>
    <nav aria-label="文章目录" className="my-8 rounded-xl bg-slate-50 p-5 sm:p-6">
      <h2 className="font-semibold text-slate-900">全文目录</h2>
      <ol className="mt-3 grid gap-x-5 gap-y-1 sm:grid-cols-2">
        {contents.map(item => <li key={item.id}><a href={`#${item.id}`} className="block py-2 text-sm leading-6 text-blue-800 underline-offset-4 hover:underline">{item.text}</a></li>)}
      </ol>
    </nav>
    {blocks.map((block, index) => {
      if (block.type === "heading") return block.level === 2
        ? <h2 key={index} id={block.id} className="mt-12 scroll-mt-28 border-t border-slate-200 pt-7 text-2xl font-semibold leading-9 text-slate-900">{block.text}</h2>
        : <h3 key={index} id={block.id} className="mt-8 scroll-mt-28 text-lg font-semibold leading-8 text-slate-900">{block.text}</h3>;
      if (block.type === "table") return <div key={index} className="my-7">
        <p className="mb-2 text-xs text-slate-500 sm:hidden">表格可左右滑动查看</p>
        <div tabIndex={0} role="region" aria-label={block.caption} className="overflow-x-auto rounded-lg border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
          <table className="w-full min-w-[660px] border-collapse text-left text-sm leading-7">
            <caption className="px-4 py-3 text-left font-medium text-slate-700">{block.caption}</caption>
            <thead className="bg-slate-100"><tr>{block.columns?.map((column, j) => <th key={j} scope="col" className="border-y border-slate-200 px-4 py-3 font-semibold">{column}</th>)}</tr></thead>
            <tbody>{block.rows?.map((row, j) => <tr key={j} className="even:bg-slate-50">{row.map((cell, k) => <td key={k} className="border-b border-slate-200 px-4 py-3 align-top"><CitedText text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>;
      if (block.type === "figure") return <figure key={index} className="my-8">
        <a href={cover.url} target="_blank" rel="noopener noreferrer" aria-label="打开分级授权框架大图">
          <Image src={cover.url} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full rounded-lg border border-slate-200" />
        </a>
        <figcaption className="mt-3 text-center text-sm leading-6 text-slate-600">图1 分级授权的处理路径与共同要求 · 点击查看大图</figcaption>
      </figure>;
      if (block.type === "reference") return <p key={index} id={block.id} className="mt-5 scroll-mt-28 break-words text-sm leading-7">{block.text} <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-4">原始出版页面 ↗</a></p>;
      return <p key={index} className="mt-5 break-words text-[17px] leading-8"><CitedText text={block.text ?? ""} /></p>;
    })}
    <aside className="mt-10 border-t border-slate-200 pt-6 text-sm leading-7">
      <p className="font-semibold text-slate-900">延伸阅读</p>
      <Link href="/news/development-validation-speed-mismatch-20260926" className="mt-2 inline-block text-blue-700 underline underline-offset-4">从研发瓶颈到验证瓶颈：医疗AI的人机协同验证 →</Link>
      <p className="mt-4"><a href="#section-1" className="text-slate-600 underline underline-offset-4">返回摘要 ↑</a></p>
    </aside>
  </div>;
}
