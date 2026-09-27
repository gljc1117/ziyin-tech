import Link from "next/link";
import paperData from "@/lib/grassland-research-papers.json";
import { GRASSLAND_RESEARCH_ARTICLES, type GrasslandResearchArticle } from "@/lib/grassland-additional-research";

type PaperBlock =
  | { type: "heading"; id: string; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "reference"; id: string; text: string; url?: string };

const papers = paperData as Record<string, PaperBlock[]>;

function CitedText({ text }: { text: string }) {
  return <>{text.split(/(\[\d+\])/g).map((part, index) => {
    const match = part.match(/^\[(\d+)\]$/);
    return match ? <sup key={index} className="ml-0.5"><a href={`#reference-${match[1]}`} aria-label={`参考文献 ${match[1]}`} className="text-blue-700 underline underline-offset-2">{part}</a></sup> : part;
  })}</>;
}

export default function GrasslandAdditionalResearchPaper({ article }: { article: GrasslandResearchArticle }) {
  const blocks = papers[article.id];
  const contents = blocks.filter(block => block.type === "heading" && block.level === 2);
  return <div className="mt-6 text-slate-800">
    <div className="border-y border-slate-200 py-5 text-sm leading-7 text-slate-600">
      <p className="font-medium text-slate-900">作者：{article.authors.join("、")}</p>
      <p>单位：{article.affiliation}</p>
      <p>草原英才项目系列研究 · 第{article.number}篇 · {article.version}</p>
      <p className="mt-3">本文为框架与体系设计研究，作为官网研究文章公开，未经期刊同行评审。具体研究方法、证据范围与局限详见正文。</p>
      <a href={article.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-blue-800 hover:bg-slate-50">阅读／下载完整 PDF（6页） ↗</a>
    </div>
    <nav aria-label="文章目录" className="my-8 rounded-xl bg-slate-50 p-5 sm:p-6">
      <h2 className="font-semibold text-slate-900">全文目录</h2>
      <ol className="mt-3 grid gap-x-5 gap-y-1 sm:grid-cols-2">
        {contents.map(item => item.type === "heading" ? <li key={item.id}><a href={`#${item.id}`} className="block py-2 text-sm leading-6 text-blue-800 underline-offset-4 hover:underline">{item.text}</a></li> : null)}
      </ol>
    </nav>
    {blocks.map((block, index) => {
      if (block.type === "heading") return block.level === 2
        ? <h2 key={block.id} id={block.id} className="mt-12 scroll-mt-28 border-t border-slate-200 pt-7 text-2xl font-semibold leading-9 text-slate-900">{block.text}</h2>
        : <h3 key={block.id} id={block.id} className="mt-8 scroll-mt-28 text-lg font-semibold leading-8 text-slate-900">{block.text}</h3>;
      if (block.type === "table") return <div key={index} className="my-7">
        <p className="mb-2 text-xs text-slate-500 sm:hidden">表格可左右滑动查看</p>
        <div tabIndex={0} role="region" aria-label={block.caption} className="overflow-x-auto rounded-lg border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
          <table className="w-full min-w-[660px] border-collapse text-left text-sm leading-7">
            <caption className="px-4 py-3 text-left font-medium text-slate-700">{block.caption}</caption>
            <thead className="bg-slate-100"><tr>{block.columns.map((column, j) => <th key={j} scope="col" className="border-y border-slate-200 px-4 py-3 font-semibold">{column}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, j) => <tr key={j} className="even:bg-slate-50">{row.map((cell, k) => <td key={k} className="border-b border-slate-200 px-4 py-3 align-top"><CitedText text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>;
      if (block.type === "reference") return <p key={block.id} id={block.id} className="mt-5 scroll-mt-28 break-words text-sm leading-7">{block.text}{block.url ? <> <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-4">原始来源 ↗</a></> : null}</p>;
      return <p key={index} className="mt-5 break-words text-[17px] leading-8"><CitedText text={block.text} /></p>;
    })}
    <aside className="mt-10 border-t border-slate-200 pt-6 text-sm leading-7" aria-label="本批系列研究">
      <p className="font-semibold text-slate-900">本批系列研究 · 第7—10篇</p>
      <ul className="mt-3 space-y-2">
        {GRASSLAND_RESEARCH_ARTICLES.filter(item => item.id !== article.id).map(item => <li key={item.id}><Link href={`/news/${item.id}`} className="text-blue-700 underline underline-offset-4">第{item.number}篇：{item.shortTitle}</Link></li>)}
      </ul>
      <p className="mt-5"><a href="#section-1" className="text-slate-600 underline underline-offset-4">返回摘要 ↑</a></p>
    </aside>
  </div>;
}
