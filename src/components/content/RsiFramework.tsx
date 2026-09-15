const levels = [
  ["L1", "执行改进", "按预定流程实施更新"],
  ["L2", "选择策略", "自主决定怎样改进"],
  ["L3", "获取经验", "决定下一轮需要学习什么"],
  ["L4", "环境适应", "将运行反馈转为持久更新"],
  ["L5", "递归元改进", "修改并继承后续改进机制"],
];

export default function RsiFramework() {
  return <figure className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
    <div className="px-4 py-5 sm:px-6">
      <h2 className="text-xl font-semibold text-slate-900">L1—L5：AI负责哪些改进决策？</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">研究团队提出的自主性分级，等级不直接代表效果、安全性或临床成熟度。</p>
    </div>
    <table className="w-full table-fixed border-collapse text-left text-sm sm:text-base">
      <caption className="sr-only">递归自我改进五级框架</caption>
      <thead className="bg-blue-50 text-slate-900"><tr>
        <th scope="col" className="w-14 px-3 py-3 sm:w-20 sm:px-6">级别</th>
        <th scope="col" className="w-28 px-2 py-3 sm:w-36">决策范围</th>
        <th scope="col" className="px-3 py-3 sm:px-6">核心含义</th>
      </tr></thead>
      <tbody>{levels.map(([level, name, meaning]) => <tr key={level} className="border-t border-slate-200 bg-white text-slate-800">
        <th scope="row" className="px-3 py-4 align-top font-semibold text-blue-700 sm:px-6">{level}</th>
        <td className="px-2 py-4 align-top font-medium">{name}</td>
        <td className="px-3 py-4 align-top leading-7 sm:px-6">{meaning}</td>
      </tr>)}</tbody>
    </table>
    <figcaption className="px-4 py-4 text-sm leading-7 text-slate-600 sm:px-6">据Duan等的框架概括。<a href="#reference-1" className="text-blue-700 underline underline-offset-2">[1]</a> 本表用于解释概念，不是对子殷产品的能力评级。</figcaption>
  </figure>;
}
