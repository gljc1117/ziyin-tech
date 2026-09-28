import Link from "next/link";
import { EditorialSources } from "./EditorialArticleBody";
import { ORGANIZATIONAL_GOVERNANCE_ARTICLES, ORGANIZATIONAL_GOVERNANCE_BODIES, type OrganizationalGovernanceArticle } from "@/lib/organizational-governance-research";

function PaperText({ text, count }: { text: string; count: number }) {
  return <>{text.split(/(\[\d+\])/g).map((part, index) => {
    const match = part.match(/^\[(\d+)\]$/);
    const number = match ? Number(match[1]) : 0;
    if (!number || number > count) return part;
    return <sup key={index} className="ml-0.5"><a href={`#reference-${number}`} aria-label={`参考文献 ${number}`} className="text-blue-700 underline underline-offset-2">{part}</a></sup>;
  })}</>;
}

export default function OrganizationalGovernancePaper({ article }: { article: OrganizationalGovernanceArticle }) {
  const blocks = ORGANIZATIONAL_GOVERNANCE_BODIES[article.id];
  const text = (value: string) => <PaperText text={value} count={article.references.length} />;
  return <div className="mt-6 text-slate-800">
    <p className="text-lg leading-8 text-slate-600">{article.subtitle}</p>
    <p className="mt-3 text-sm leading-7 text-slate-500">子殷科技 · 组织管理研究与实践 · 概念研究</p>
    <nav aria-label="文章目录" className="mt-7 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
      <p className="font-semibold text-slate-900">文章目录</p>
      <ol className="mt-3 grid gap-x-6 gap-y-2 text-sm leading-6 sm:grid-cols-2">
        {blocks.map((block, index) => block.kind === "heading" && block.level === 2 ? <li key={index}><a href={`#section-${index}`} className="text-blue-700 underline-offset-4 hover:underline">{block.text}</a></li> : null)}
        <li><a href="#paper-references" className="text-blue-700 underline-offset-4 hover:underline">参考文献</a></li>
      </ol>
    </nav>
    {blocks.map((block, index) => {
      if (block.kind === "heading") return block.level === 2
        ? <h2 key={index} id={`section-${index}`} className="mt-10 mb-4 scroll-mt-24 text-xl font-bold leading-8 text-slate-900">{block.text}</h2>
        : <h3 key={index} className="mt-8 mb-3 text-lg font-semibold leading-8 text-slate-900">{block.text}</h3>;
      if (block.kind === "table") return <div key={index} role="region" aria-label={block.caption} tabIndex={0} className="my-6 overflow-x-auto rounded-lg border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm leading-7">
          <caption className="px-4 py-3 text-left font-medium text-slate-700">{block.caption}</caption>
          <thead className="bg-slate-100 text-slate-900"><tr>{block.columns.map(column => <th key={column} scope="col" className="border-t border-slate-200 px-4 py-3">{column}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="border-t border-slate-200 px-4 py-3 align-top">{text(cell)}</td>)}</tr>)}</tbody>
        </table>
      </div>;
      return <p key={index} className="mt-4 text-[17px] leading-8">{text(block.text)}</p>;
    })}
    <h2 id="paper-references" className="mt-10 scroll-mt-24 text-xl font-bold leading-8 text-slate-900">参考文献</h2>
    <EditorialSources article={article} />
    <aside className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-900">延伸阅读</p>
      {ORGANIZATIONAL_GOVERNANCE_ARTICLES.filter(item => item.id !== article.id).map(item => <Link key={item.id} href={`/news/${item.id}`} className="mt-2 block text-sm leading-7 text-blue-700 underline underline-offset-4">{item.title} →</Link>)}
    </aside>
  </div>;
}
