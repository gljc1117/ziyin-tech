export default function GrantDecisionFramework() {
  return <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50" aria-labelledby="grant-framework-caption">
    <div className="border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
      <p className="text-xs font-semibold tracking-widest text-blue-700">RESEARCH WORKFLOW · 科研申报</p>
      <p className="mt-2 text-xl font-semibold leading-8 text-slate-900">每一次判断，都能找到依据</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">指南与材料 → 来源定位、版本确认、关键条款核对</p>
    </div>
    <div className="space-y-4 p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-200 bg-white p-4">
          <p className="text-xs font-semibold text-blue-700">01 · 规则计算</p>
          <p className="mt-2 font-semibold text-slate-900">明确条件，由代码核对</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">日期、金额、比例、附件清单</p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-white p-4">
          <p className="text-xs font-semibold text-blue-700">02 · 语义决策</p>
          <p className="mt-2 font-semibold text-slate-900">分类与匹配，允许不确定</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">通知归类、材料分拣、证据排序</p>
        </div>
      </div>
      <div className="rounded-xl bg-blue-950 px-4 py-4 text-white">
        <p className="font-semibold">按证据状态与任务风险分流 ↓</p>
        <p className="mt-2 text-sm leading-6 text-blue-100">已验证的低风险任务可自动处理；缺项、冲突或未知类型进入补件与复核。</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-blue-700">03 · 生成推理</p>
          <p className="mt-2 font-semibold text-slate-900">有据论证，形成候选稿</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">复杂分析、研究设计、章节撰写</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-semibold text-amber-800">04 · 专业复核</p>
          <p className="mt-2 font-semibold text-slate-900">核对原文，确认关键事项</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">补件、消除冲突、确认最终版本</p>
        </div>
      </div>
      <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">确认后交付：申请书＋依据目录＋未解决事项清单。补件后重新核验相关判断，并保存版本。</p>
    </div>
    <figcaption id="grant-framework-caption" className="border-t border-slate-200 px-5 py-4 text-xs leading-6 text-slate-600 sm:px-7">图1｜本文提出的分层工作流。四个层次按任务协作，不要求所有材料逐层调用模型；关键结论与最终版本由专业人员确认。概念设计，无实测性能数据。</figcaption>
  </figure>;
}
