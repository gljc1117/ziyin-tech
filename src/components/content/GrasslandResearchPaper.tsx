import Link from "next/link";
import paperData from "@/lib/grassland-papers.json";
import { GRASSLAND_RESEARCH_ARTICLES } from "@/lib/grassland-research";

type Block = {
  type: string;
  text?: string;
  level?: number;
  id?: string;
  caption?: string;
  columns?: string[];
  rows?: string[][];
  urls?: string[];
  prefix?: string;
  numerator?: string;
  denominator?: string;
};
type Paper = {
  number: number;
  version: string;
  authors: string[];
  organization: string;
  blocks: Block[];
};
const papers: Record<string, Paper> = paperData;

export function getGrasslandPaper(id: string) {
  return papers[id];
}

function CitedText({ text }: { text: string }) {
  return <>{text.split(/(\[\d+(?:[-–,]\d+)*\])/g).map((part, index) => {
    const match = part.match(/^\[(\d+)(?:[-–,]\d+)*\]$/);
    return match ? <sup key={index} className="ml-0.5"><a href={`#reference-${match[1]}`} aria-label={`参考文献 ${part}`} className="text-blue-700 underline underline-offset-2">{part}</a></sup> : part;
  })}</>;
}

export default function GrasslandResearchPaper({ paper }: { paper: Paper }) {
  const contents = paper.blocks.filter(block => block.type === "heading" && block.level === 2);
  return <div className="mt-6 text-slate-800">
    <div className="border-y border-slate-200 py-5 text-sm leading-7 text-slate-600">
      <p>数字医学3D打印研究系列 · 第{String(paper.number).padStart(2, "0")}篇 · {paper.version}</p>
      {paper.authors.length > 0 ? <p className="mt-2">作者：{paper.authors.join("、")}</p> : null}
      <p className="mt-2">{paper.organization}</p>
    </div>
    <nav aria-label="文章目录" className="my-8 rounded-xl bg-slate-50 p-5 sm:p-6">
      <h2 className="font-semibold text-slate-900">全文目录</h2>
      <ol className="mt-3 grid gap-x-5 gap-y-1 sm:grid-cols-2">
        {contents.map(item => <li key={item.id}><a href={`#${item.id}`} className="block py-2 text-sm leading-6 text-blue-800 underline-offset-4 hover:underline">{item.text}</a></li>)}
      </ol>
    </nav>
    <div data-research-body>
      {paper.blocks.map((block, index) => {
        if (block.type === "heading") return block.level === 2
          ? <h2 key={index} id={block.id} className="mt-12 scroll-mt-28 border-t border-slate-200 pt-7 text-2xl font-semibold leading-9 text-slate-900">{block.text}</h2>
          : <h3 key={index} id={block.id} className="mt-8 scroll-mt-28 text-lg font-semibold leading-8 text-slate-900">{block.text}</h3>;
        if (block.type === "table") return <div key={index} className="my-7">
          <p className="mb-2 text-xs text-slate-500 sm:hidden">表格可左右滑动查看</p>
          <div tabIndex={0} role="region" aria-label={block.caption} className="overflow-x-auto rounded-lg border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
            <table className="w-full min-w-[660px] border-collapse text-left text-sm leading-7">
              <caption className="px-4 py-3 text-left font-medium text-slate-700">{block.caption}</caption>
              <thead className="bg-slate-100"><tr>{block.columns?.map((column, j) => <th key={j} scope="col" className="border-y border-slate-200 px-4 py-3 font-semibold">{column}</th>)}</tr></thead>
              <tbody>{block.rows?.map((row, j) => <tr key={j} className="even:bg-slate-50">{row.map((cell, k) => <td key={k} className="whitespace-pre-line border-b border-slate-200 px-4 py-3 align-top"><CitedText text={cell} /></td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>;
        if (block.type === "equation") return <div key={index} className="my-7 overflow-x-auto py-3 text-center font-serif text-xl" role="math" aria-label={block.text}>
          {block.numerator ? <span className="inline-flex items-center gap-3 whitespace-nowrap" aria-hidden="true"><span>{block.prefix}</span><span className="inline-flex flex-col text-center"><span className="border-b border-slate-700 px-3 pb-1">{block.numerator}</span><span className="px-3 pt-1">{block.denominator}</span></span></span> : <span className="whitespace-nowrap">{block.text}</span>}
        </div>;
        if (block.type === "reference") return <div key={index} id={block.id} className="mt-5 scroll-mt-28 break-words text-sm leading-7">
          <p>{block.text}</p>
          {block.urls?.map((url, j) => <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="mr-4 inline-block text-blue-700 underline underline-offset-4">{block.urls!.length > 1 ? `来源 ${j + 1}` : "查看来源"} ↗</a>)}
        </div>;
        return <p key={index} className="mt-5 break-words text-[17px] leading-8"><CitedText text={block.text ?? ""} /></p>;
      })}
    </div>
    <nav aria-label="同系列研究" className="mt-12 border-t border-slate-200 pt-6 text-sm leading-7">
      <h2 className="font-semibold text-slate-900">同系列研究</h2>
      <ul className="mt-3 space-y-3">
        {GRASSLAND_RESEARCH_ARTICLES.filter(article => papers[article.id]?.number !== paper.number).map(article => <li key={article.id}><Link href={`/news/${article.id}`} className="text-blue-700 underline underline-offset-4">{article.title}</Link></li>)}
      </ul>
      <p className="mt-5"><a href="#section-1" className="text-slate-600 underline underline-offset-4">返回摘要 ↑</a></p>
    </nav>
  </div>;
}
