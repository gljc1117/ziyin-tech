import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, productInquiryHref } from "@/lib/products";
import { pageMetadata } from "@/lib/site";
export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PRODUCTS.find((item) => item.slug === slug);
  return p
    ? pageMetadata(`${p.name} · ${p.title}`, p.summary, `/products/${slug}`)
    : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PRODUCTS.find((item) => item.slug === slug);
  if (!p) notFound();
  return (
    <main className="bg-white pb-20 pt-28 text-slate-900">
      <div className="site-container">
        <Link href="/products" className="text-sm text-blue-700">
          返回产品与服务
        </Link>
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{p.kind}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {p.name}
            </h1>
            <p className="mt-4 text-2xl font-medium">{p.title}</p>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              {p.summary}
            </p>
            <Link href={productInquiryHref(p)} className="primary-button mt-8">
              咨询
              {p.kind === "科研合作"
                ? "科研合作"
                : p.kind === "中心共建"
                  ? "中心建设"
                  : "产品与服务"}
            </Link>
          </div>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50">
              <Image
                src={p.image}
                alt={p.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-6 text-slate-500">
              {p.imageAlt}
            </figcaption>
          </figure>
        </div>
        {slug === "chcomct-sm" && (
          <section className="mt-12 border-y border-slate-200 py-7">
            <h2 className="text-lg font-semibold">产品注册信息</h2>
            <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["注册人", "内蒙古子殷科技有限公司"],
                ["型号及发布版本", "Chcomct SM 2.0"],
                ["注册证编号", "内械注准20262210005"],
                ["批准日期", "2026年9月9日"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="mt-2 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <section>
            <h2 className="text-2xl font-semibold">适用场景与工作内容</h2>
            <p className="mt-4 text-slate-600">{p.audience}</p>
            <ul className="mt-6 divide-y divide-slate-200">
              {p.capabilities.map((item, i) => (
                <li className="flex gap-5 py-4 leading-7" key={item}>
                  <span className="font-mono text-sm text-blue-700">
                    0{i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="self-start rounded-2xl bg-slate-50 p-7">
            <h2 className="text-xl font-semibold">合作内容</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-slate-600">
              {p.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h3 className="mt-8 font-semibold">相关资料</h3>
            <div className="mt-3 space-y-3">
              {p.sources.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block leading-6 text-blue-700 underline underline-offset-4"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </section>
        </div>
        <section className="mt-12 border-t border-slate-200 pt-7">
          <h2 className="font-semibold">使用与合作说明</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
            {p.boundary}
          </p>
        </section>
      </div>
    </main>
  );
}
