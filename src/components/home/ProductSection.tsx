import Link from "next/link";

const products = [
  { name: "医疗AI", brand: "CalcAI", text: "CalcAI面向跟骨骨折的三维理解与术前规划参考；盘古影像探索多器官影像分割，KneeAI开展膝关节影像分析与风险评估研究。", action: "预约 CalcAI 演示" },
  { name: "医学3D打印", brand: "医工造物", text: "以医工造物连接影像重建、临床规划、个性化设计与制造，围绕医学模型、手术导板和康复支具组织医工交付。", action: "咨询医工造物" },
  { name: "数智医学中心", brand: "医院与科室协作", text: "与医院共建数智医学与临床转化中心，把AI、3D打印及工程服务融入临床科研协作，持续记录需求、交付与反馈。", action: "沟通中心建设" },
];

export default function ProductSection() {
  return (
    <section id="products" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium text-blue-700">产品与服务</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900">围绕临床需求，组织数字技术与医工交付</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {products.map((item) => (
            <article key={item.name} className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <p className="text-sm font-medium text-blue-700">{item.brand}</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{item.text}</p>
              <Link href="/demo" className="mt-6 font-medium text-blue-700">{item.action} →</Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-slate-500">医疗AI提供影像分析与规划参考，科研探索与具体产品应用分别说明；临床使用范围需结合相应产品信息与医院流程。</p>
        <div className="mt-10 flex flex-col gap-4 rounded-xl bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div><h3 className="font-semibold text-slate-900">了解案例与项目交付</h3><p className="mt-2 text-sm leading-6 text-slate-600">从具体需求、医工过程和交付资料了解合作项目。</p></div>
          <Link href="/cases" className="shrink-0 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white">查看案例与交付</Link>
        </div>
      </div>
    </section>
  );
}
