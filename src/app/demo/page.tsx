import { pageMetadata } from "@/lib/site";
import DemoRequestForm from "@/components/forms/DemoRequestForm";
export const metadata = pageMetadata(
  "联系合作",
  "沟通产品演示、工程服务、科研协作与中心共建需求。",
  "/demo",
);
export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  return (
    <main className="min-h-screen bg-[#f4f7fb] pb-20 pt-28">
      <div className="site-container grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div className="lg:pt-8">
          <p className="eyebrow">从具体需求开始</p>
          <h1 className="mt-4 text-4xl font-semibold leading-snug text-slate-900">
            一起明确
            <br />
            下一步合作。
          </h1>
          <p className="mt-6 max-w-md leading-8 text-slate-600">
            无论是一个科室的技术需求，还是一个中心的建设计划，都可以从一次具体的沟通开始。
          </p>
          <div className="mt-8 max-w-sm border-t border-slate-300 pt-6">
            <h2 className="font-semibold text-slate-900">提交后会发生什么？</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              团队根据您的需求安排联系，沟通应用场景、现有条件与工作范围，再确定演示或项目方案。
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-9">
          <DemoRequestForm
            key={product || "general"}
            initialProduct={product}
          />
        </div>
      </div>
    </main>
  );
}
