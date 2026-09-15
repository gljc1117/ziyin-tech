const steps = [
  ["01", "定义问题", "选择表示、变量与适用条件"],
  ["02", "建立仪器", "生成程序并检查数值行为"],
  ["03", "执行实验", "记录预测、结果与失败历史"],
  ["04", "独立验证", "用新设计、独立实现或实测检验"],
];

export default function ScientificInstrumentFramework() {
  return <figure className="mt-8 overflow-hidden rounded-xl border border-blue-200 bg-white">
    <div className="border-b border-blue-100 bg-blue-50 px-5 py-5 sm:px-6">
      <p className="text-sm font-medium text-blue-800">研究框架 · 概念示意</p>
      <h2 className="mt-2 text-xl font-semibold leading-8 text-slate-900">让每一轮研究留下可检验的工具</h2>
    </div>
    <ol className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-2">
      {steps.map(([number, title, detail]) => <li key={number} className="bg-white px-5 py-5 sm:px-6">
        <span className="text-sm font-semibold text-blue-700">{number}</span>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-base leading-7 text-slate-700">{detail}</p>
      </li>)}
    </ol>
    <div className="border-t border-blue-100 bg-blue-50 px-5 py-4 sm:px-6">
      <p className="font-semibold leading-7 text-blue-900">反馈到下一轮：保留有效工具，修正假设与适用范围</p>
      <p className="mt-1 text-sm leading-7 text-slate-700">用新任务和公平对照检验继承收益，失败记录一并保留。</p>
    </div>
    <figcaption className="px-5 py-4 text-sm leading-7 text-slate-600 sm:px-6">图1｜本文提出的研究循环。顺序表示研究关系，不表示系统已自动完成所有环节；不含实验数据。</figcaption>
  </figure>;
}
