import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
export default function ProductSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Title = standalone ? "h1" : "h2";
  return (
    <section id="products" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="site-container">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">产品与技术服务</p>
            <Title className="mt-3 text-3xl font-semibold leading-snug text-slate-900 sm:text-4xl">
              软件建模、模型与导板，明确每一项交付
            </Title>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">
              了解软件功能、三维建模、模型与导板制造，以及中心共建和专科研发的实际范围。
            </p>
          </div>
          {!standalone && (
            <Link
              href="/products"
              className="text-sm font-medium text-blue-700"
            >
              查看全部产品与服务 →
            </Link>
          )}
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {PRODUCTS.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col border-t-2 border-blue-800 py-7"
            >
              <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                {p.kind}
              </span>
              <h3 className="mt-5 text-2xl font-semibold text-slate-900">
                {p.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {p.title}
              </p>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                {p.summary}
              </p>
              <Link
                href={`/products/${p.slug}`}
                className="mt-6 text-sm font-semibold text-blue-700"
              >
                了解{p.name} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
