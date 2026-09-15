const visuals: Record<string, {
  eyebrow: string; title: string[]; subtitle: string; note: string;
  steps: { title: string; description: string }[];
}> = {
  "ai-clinical-workforce-20260915": {
    eyebrow: "临床工作与AI", title: ["AI时代", "医生如何工作？"],
    subtitle: "少些重复劳动，多些专业判断",
    note: "三个层级需要分别评价，任务省时不能直接推导减员比例。",
    steps: [
      { title: "单次任务", description: "操作、复核与返工" },
      { title: "每日工作", description: "服务量与时间分配" },
      { title: "岗位需求", description: "分工、培训与新任务" },
    ],
  },
  "physical-examination-medical-ai-value-20260914": {
    eyebrow: "医疗AI的证据与价值", title: ["医疗AI", "如何证明价值？"],
    subtitle: "从技术性能到患者获益",
    note: "分别验证每个层级，不能由技术指标直接推断临床获益。本图为评价框架，非临床研究结果。",
    steps: [
      { title: "技术性能", description: "准确性与可靠性 · 在哪些人群中成立" },
      { title: "决策影响", description: "是否改变合理处理 · 复核与后续工作" },
      { title: "患者获益", description: "结局改善与潜在伤害 · 实际净获益" },
    ],
  },
};

export function hasOpinionVisual(id: string) { return Boolean(visuals[id]); }

export function OpinionCover({ id }: { id: string }) {
  const visual = visuals[id];
  if (!visual) return null;
  return <div className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-xl border border-cyan-300/15 bg-gradient-to-br from-[#12384b] via-[#10283e] to-[#101b34] p-6" style={{ containerType: "inline-size" }}>
    <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full border-[24px] border-cyan-200/[0.06]" />
    <p className="relative text-sm font-medium tracking-widest text-cyan-200">医工观察 · {visual.eyebrow}</p>
    <div className="relative my-5 font-bold leading-[1.3] tracking-tight text-white" style={{ fontSize: "clamp(23px, 9cqw, 38px)" }}>
      {visual.title.map(line => <div key={line}>{line}</div>)}
    </div>
    <p className="relative text-[15px] leading-6 text-slate-200">{visual.subtitle}</p>
  </div>;
}

export function OpinionFramework({ id }: { id: string }) {
  const visual = visuals[id];
  if (!visual) return null;
  return <figure className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
    <p className="text-sm font-medium tracking-wider text-blue-700">医工观察 · 阅读框架</p>
    <h2 className="mt-2 text-xl font-semibold text-slate-900">{visual.subtitle}</h2>
    <ol className="mt-6 grid gap-3 sm:grid-cols-3">
      {visual.steps.map((step, index) => <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-5">
        <span className="text-sm font-semibold text-blue-700">0{index + 1}</span>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
        <p className="mt-2 text-base leading-7 text-slate-700">{step.description}</p>
      </li>)}
    </ol>
    <figcaption className="mt-5 text-sm leading-7 text-slate-600">{visual.note}</figcaption>
  </figure>;
}

export function OpinionThumbnail({ id }: { id: string }) {
  const workforce = id === "ai-clinical-workforce-20260915";
  return <div aria-hidden="true" className="flex aspect-square w-full flex-col justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-3 text-center ring-1 ring-inset ring-blue-100 sm:p-5">
    <span className="text-[11px] font-medium tracking-wider text-blue-700 sm:text-xs">医工观察</span>
    <span className="mt-3 text-lg font-semibold leading-relaxed text-slate-900 sm:text-2xl">{workforce ? <>临床工作<br />与AI</> : <>医疗AI<br />的价值</>}</span>
  </div>;
}
