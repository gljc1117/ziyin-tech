import Image from "next/image";
import blocks from "@/lib/development-validation-paper.json";
import { DEVELOPMENT_VALIDATION } from "@/lib/development-validation";

const pdf = "/papers/development-validation-speed-mismatch-20260926.pdf";

function CitedText({ text }: { text: string }) {
  return <>{text.split(/(\[\d+(?:[-,]\d+)*\])/g).map((part, i) => {
    const match = part.match(/^\[(\d+)(?:[-,]\d+)*\]$/);
    return match ? <a key={i} href={`#reference-${match[1]}`} aria-label={`参考文献 ${part}`} className="ml-0.5 text-sm text-blue-700 underline underline-offset-2">{part}</a> : part;
  })}</>;
}

function LinkedReference({ text }: { text: string }) {
  return <>{text.split(/(https?:\/\/[^\s（）]+)/g).map((part, i) => part.startsWith("https://")
    ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-4">{part}</a>
    : part)}</>;
}

export default function DevelopmentValidationPaper() {
  const contents = blocks.filter(block => block.type === "heading" && block.level === 2);
  return <div className="mt-6 text-slate-800">
    <div className="border-y border-slate-200 py-5">
      <p className="text-sm leading-7 text-slate-600">发布机构：子殷科技 · 公开版 V1.0</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">本文为方法学框架与研究方案，未经期刊同行评审。案例限于固定版本的工程记录，效率与质量效应仍需前瞻性研究验证。</p>
      <a href={pdf} download className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">下载完整论文 PDF（15页） ↓</a>
    </div>
    <nav aria-label="论文目录" className="my-8 rounded-xl bg-slate-50 p-5 sm:p-6">
      <h2 className="font-semibold text-slate-900">全文目录</h2>
      <ol className="mt-3 grid gap-x-5 gap-y-1 sm:grid-cols-2">
        {contents.map(item => <li key={item.id}><a href={`#${item.id}`} className="block py-2 text-sm leading-6 text-blue-800 underline-offset-4 hover:underline">{item.text}</a></li>)}
      </ol>
    </nav>
    {blocks.map((block, index) => {
      if (block.type === "subtitle") return <p key={index} lang="en" className="my-7 text-base leading-7 text-slate-600">{block.text}</p>;
      if (block.type === "heading") return block.level === 2
        ? <h2 id={block.id} key={index} className="mt-12 scroll-mt-28 border-t border-slate-200 pt-7 text-2xl font-semibold leading-9 text-slate-900">{block.text}</h2>
        : <h3 id={block.id} key={index} className="mt-8 scroll-mt-28 text-lg font-semibold leading-8 text-slate-900">{block.text}</h3>;
      if (block.type === "table") return <div key={index} className="my-7">
        <p className="mb-2 text-xs text-slate-500 sm:hidden">表格可左右滑动查看</p>
        <div tabIndex={0} role="region" aria-label={`论文表格 ${block.columns?.[0]}`} className="overflow-x-auto rounded-lg border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700">
          <table className="w-full min-w-[660px] border-collapse text-left text-sm leading-7">
            <thead className="bg-slate-100"> <tr>{block.columns?.map((column, j) => <th key={j} scope="col" className="border-b border-slate-200 px-4 py-3 font-semibold">{column}</th>)}</tr></thead>
            <tbody>{block.rows?.map((row, j) => <tr key={j} className="even:bg-slate-50">{row.map((cell, k) => <td key={k} className="border-b border-slate-200 px-4 py-3 align-top"><CitedText text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>;
      if (block.type === "equation") return <div key={index} className="my-7 overflow-x-auto rounded-lg bg-slate-50 px-4 py-5 text-center font-serif text-xl leading-9" role="math" aria-label={block.name === "backlog" ? "下一期未结存量等于本期未结存量加新增加重开减通过减其他结项" : "阶段负荷等于访问到达率乘平均所需工时除以实际可用工时"}>
        {block.name === "backlog" ? <span className="whitespace-nowrap">B<sub>t+1</sub> = B<sub>t</sub> + A<sub>t</sub> + O<sub>t</sub> − P<sub>t</sub> − X<sub>t</sub></span>
          : <span>ρ<sub>j</sub> = (λ<sub>j</sub> × s<sub>j</sub>) / H<sub>j</sub></span>}
      </div>;
      if (block.type === "figure") return <figure key={index} className="my-8">
        <a href={DEVELOPMENT_VALIDATION.cover.url} target="_blank" rel="noopener noreferrer" aria-label="打开三级验证责任与受控知识回流框架大图">
          <Image {...{src: DEVELOPMENT_VALIDATION.cover.url, alt: DEVELOPMENT_VALIDATION.cover.alt, width: 1944, height: 1152}} sizes="(max-width: 768px) 100vw, 720px" className="h-auto w-full rounded-lg border border-slate-200" />
        </a>
        <figcaption className="mt-3 text-center text-sm leading-6 text-slate-600">图1 三级验证责任与受控知识回流 · 点击查看大图</figcaption>
      </figure>;
      if (block.type === "hash") return <p key={index} className="my-4 whitespace-pre-line break-all rounded-lg bg-slate-50 p-4 font-mono text-xs leading-6 text-slate-600">{block.text}</p>;
      if (block.type === "reference") return <p key={index} id={block.id} className="mt-5 scroll-mt-28 break-words text-sm leading-7"><LinkedReference text={block.text ?? ""} /></p>;
      return <p key={index} className="mt-5 break-words text-[17px] leading-8"><CitedText text={block.text ?? ""} /></p>;
    })}
    <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-slate-200 pt-6 text-sm">
      <a href={pdf} download className="font-semibold text-blue-700 underline underline-offset-4">下载完整论文 PDF</a>
      <a href="#section-1" className="text-slate-600 underline underline-offset-4">返回摘要 ↑</a>
    </div>
  </div>;
}
