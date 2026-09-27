import { RESEARCH_PAPER_BODIES } from "@/lib/research-papers-05-06";

function PaperText({ text, reference = false }: { text: string; reference?: boolean }) {
  return <>{text.split(/(https?:\/\/\S+|\[\d+(?:-\d+)?\])/g).map((part, index) => {
    if (/^https?:\/\//.test(part)) return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-blue-700 underline underline-offset-4">{part}</a>;
    const citation = part.match(/^\[(\d+)(?:-\d+)?\]$/);
    if (!reference && citation) return <sup key={index}><a href={`#reference-${citation[1]}`} aria-label={`参考文献 ${part}`} className="text-blue-700 underline underline-offset-2">{part}</a></sup>;
    return part;
  })}</>;
}

export default function ResearchPaperBody({ articleId }: { articleId: string }) {
  const blocks = RESEARCH_PAPER_BODIES[articleId];
  if (!blocks) return null;
  return <div className="mt-6 text-slate-800">
    {blocks.map((block, index) => {
      if (block.kind === "heading") return block.level === 2
        ? <h2 key={index} className="mt-10 mb-4 text-xl font-bold leading-8 text-slate-900">{block.text}</h2>
        : <h3 key={index} className="mt-8 mb-3 text-lg font-semibold leading-8 text-slate-900">{block.text}</h3>;
      if (block.kind === "table") return <div key={index} className="my-6 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm leading-7">
          <caption className="px-4 py-3 text-left font-medium text-slate-700">{block.caption}</caption>
          <thead className="bg-slate-100 text-slate-900"><tr>{block.columns.map((column) => <th key={column} scope="col" className="border-t border-slate-200 px-4 py-3">{column}</th>)}</tr></thead>
          <tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border-t border-slate-200 px-4 py-3 align-top"><PaperText text={cell} /></td>)}</tr>)}</tbody>
        </table>
      </div>;
      const reference = block.text.match(/^\[(\d+)\]/);
      return <p key={index} id={reference ? `reference-${reference[1]}` : undefined} className={reference ? "mt-4 scroll-mt-24 break-words text-sm leading-7" : "mt-4 text-[17px] leading-8"}><PaperText text={block.text} reference={!!reference} /></p>;
    })}
  </div>;
}
