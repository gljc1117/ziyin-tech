import GrantDecisionFramework from "./GrantDecisionFramework";
import RsiFramework from "./RsiFramework";
import ScientificInstrumentFramework from "./ScientificInstrumentFramework";
import Image from "next/image";
import Link from "next/link";
import type { EditorialArticle, EditorialImage } from "@/lib/editorial-content";
import type { CompanyNewsArticle } from "@/lib/company-news";
import OfficialVideoCard from "./OfficialVideoCard";
import { hasOpinionVisual, OpinionFramework } from "./OpinionVisual";

function Figure({ item }: { item: EditorialImage }) {
  return <figure className="mt-8">
    <div className="overflow-hidden rounded-xl bg-slate-100">
      <Image src={item.url} alt={item.alt} width={item.width} height={item.height}
        sizes="(max-width: 768px) 100vw, 768px" className="mx-auto h-auto max-h-[640px] w-full object-contain" />
    </div>
    <figcaption className="mt-2 text-xs leading-6 opacity-70">{item.alt}</figcaption>
  </figure>;
}

function ReferenceText({ text, article }: { text: string; article: EditorialArticle | CompanyNewsArticle }) {
  if (!("numberedReferences" in article) || !article.numberedReferences) return <>{text}</>;
  return <>{text.split(/(\[\d+\])/g).map((part, index) => {
    const match = part.match(/^\[(\d+)\]$/);
    const number = match ? Number(match[1]) : 0;
    if (!number || number > article.references.length) return part;
    return <sup key={index} className="ml-0.5"><a href={"#reference-" + number} aria-label={"参考文献 " + number} className="text-blue-700 underline underline-offset-2">{part}</a></sup>;
  })}</>;
}

export function EditorialSources({ article }: { article: EditorialArticle | CompanyNewsArticle }) {
  return <aside className="mt-10 border-t border-current/15 pt-5 text-sm leading-7">
    <p>{"sourceAttribution" in article && article.sourceAttribution
      ? article.sourceAttribution
      : <>内容来源：子殷科技提供的《{article.sourceTitle}》。</>}</p>
    {article.references.map((source, index) => <p key={source.url} id={"numberedReferences" in article && article.numberedReferences ? "reference-" + (index + 1) : undefined} className="scroll-mt-24 break-words">{"numberedReferences" in article && article.numberedReferences ? `[${index + 1}] ` : ""}{source.linkLabel && <>{source.title} </>}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.linkLabel || source.title} ↗</a></p>)}
    {"referenceNote" in article && article.referenceNote && <p className="mt-5">{article.referenceNote}</p>}
  </aside>;
}

export default function EditorialArticleBody({ article }: { article: EditorialArticle | CompanyNewsArticle }) {
  return <div className="mt-6 text-slate-700">
    {article.status === "candidate" && <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">候选内容预览 · 尚未发布</p>}
    <p className="mt-6 text-lg leading-8">{article.summary}</p>
    {!("hideCover" in article && article.hideCover) && (article.id === "grant-assistant-calibrated-decisions-20260916" ? <GrantDecisionFramework /> : article.id === "recursive-scientific-instruments-materials-medical-ai-20260916" ? <ScientificInstrumentFramework /> : article.id === "recursive-self-improvement-medical-ai-20260915" ? <RsiFramework /> : hasOpinionVisual(article.id) ? <OpinionFramework id={article.id} /> : <Figure item={article.cover} />)}
    {"officialVideo" in article && article.officialVideo && <OfficialVideoCard video={article.officialVideo} />}
    {article.sections.map((section) => <section key={section.heading} className="mt-10">
      {section.headingLevel === 3
        ? <h3 className="text-lg font-semibold leading-8 text-slate-900">{section.heading}</h3>
        : <h2 className="text-xl font-semibold leading-8 text-slate-900">{section.heading}</h2>}
      {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-[17px] leading-8 text-slate-800"><ReferenceText text={paragraph} article={article} /></p>)}
      {"sectionTables" in article && article.sectionTables?.[section.heading] && <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm leading-7">
          <caption className="px-4 py-3 text-left font-medium text-slate-700">{article.sectionTables[section.heading].caption}</caption>
          <thead className="bg-slate-100 text-slate-900"><tr>{article.sectionTables[section.heading].columns.map((column) => <th key={column} scope="col" className="border-t border-slate-200 px-4 py-3">{column}</th>)}</tr></thead>
          <tbody>{article.sectionTables[section.heading].rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border-t border-slate-200 px-4 py-3 align-top"><ReferenceText text={cell} article={article} /></td>)}</tr>)}</tbody>
        </table>
      </div>}
      {section.items && <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-800">{section.items.map((item) => <li key={item}>{item}</li>)}</ol>}
      {"sectionImages" in article && article.sectionImages?.[section.heading] && <Figure item={article.sectionImages[section.heading]} />}
    </section>)}
    {article.gallery.map((item) => <Figure key={item.url} item={item} />)}
    <EditorialSources article={article} />
    {"caseProfile" in article && <Link href={"/cases/" + article.id} className="mt-6 inline-block rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">查看项目与交付记录 →</Link>}
  </div>;
}

export function EditorialCaseDetail({ article }: { article: EditorialArticle }) {
  const profile = article.caseProfile;
  return <main className="mx-auto max-w-4xl px-6 pb-20 pt-24 text-slate-800">
    <Link href="/cases" className="text-sm text-blue-700">← 返回案例与交付</Link>
    {article.status === "candidate" && <p className="mt-5 text-sm text-amber-800">候选内容预览 · 尚未发布</p>}
    <p className="mt-6 text-sm font-medium text-blue-700">{profile.phase} · {article.dateLabel}</p>
    <h1 className="mt-3 text-3xl font-bold leading-tight">{profile.title}</h1>
    <p className="mt-4 text-sm text-slate-600">{profile.hospital} · {profile.department}</p>
    <Figure item={article.cover} />
    {[
      ["项目需求", profile.need], ["医工过程", profile.work], ["已记录的进展", profile.result],
    ].map(([heading, text]) => <section key={heading} className="mt-8"><h2 className="text-xl font-semibold">{heading}</h2><p className="mt-3 leading-8 text-slate-600">{text}</p></section>)}
    <section className="mt-8"><h2 className="text-xl font-semibold">{profile.phase === "项目成交" ? "约定服务内容" : "项目内容"}</h2><ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">{profile.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <p className="mt-8 rounded-xl bg-blue-50 p-5 text-sm leading-7 text-slate-700">{profile.boundary}</p>
    <EditorialSources article={article} />
    <div className="mt-8 flex flex-wrap gap-4">
      <Link href={"/news/" + article.id} className="rounded-lg border border-slate-300 px-5 py-3 text-sm">阅读完整图文</Link>
      <Link href="/demo" className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white">沟通类似项目需求</Link>
    </div>
  </main>;
}
