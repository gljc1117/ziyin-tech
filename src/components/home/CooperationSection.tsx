import Image from "next/image";
import Link from "next/link";
export default function CooperationSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="site-container grid items-center gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src="/images/editorial/xiaogan-center-tour.webp"
            alt="孝感数智医学与临床转化中心实体区域参观"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">中心共建 · 科研协作</p>
          <h2 className="mt-4 text-3xl font-semibold leading-snug text-slate-900">
            让医工协作
            <br />
            成为持续的服务能力
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            围绕医院与科室的具体需求，连接工程人员、数字化工具、制造服务与科研团队，把需求沟通、设计复核、交付与反馈组织起来。
          </p>
          <ol className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-slate-200 py-6 text-sm text-slate-700">
            {[
              "明确需求与合作范围",
              "组织技术与实施方案",
              "审核成果与交付资料",
              "收集反馈与持续改进",
            ].map((t, i) => (
              <li key={t}>
                <span className="mr-3 font-mono text-blue-700">0{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-wrap gap-6">
            <Link
              href="/products/medical-center"
              className="font-semibold text-blue-700"
            >
              了解中心共建 →
            </Link>
            <Link
              href={`/demo?product=${encodeURIComponent("科研合作与成果转化")}`}
              className="font-semibold text-blue-700"
            >
              沟通科研合作 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
