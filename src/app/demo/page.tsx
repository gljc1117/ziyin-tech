import { pageMetadata } from "@/lib/site";
import DemoRequestForm from "@/components/forms/DemoRequestForm";
import WechatQR from "@/components/contact/WechatQR";
import { COMPANY_CONTACT } from "@/lib/contact";
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
            从软件建模、模型与导板打印，到科研项目申报、协同研发和技术成果转化，都可以从一次具体的沟通开始。
          </p>
          <div className="mt-7 grid max-w-md gap-3">
            <a href={COMPANY_CONTACT.phoneHref} className="rounded-xl border border-slate-200 bg-white p-5"><span className="block text-xs text-slate-500">公司电话</span><span className="mt-1 block text-2xl font-semibold text-blue-900">{COMPANY_CONTACT.phone}</span></a>
            <a href={COMPANY_CONTACT.emailHref} className="rounded-xl border border-slate-200 bg-white p-5"><span className="block text-xs text-slate-500">官方邮箱</span><span className="mt-1 block text-lg font-medium text-blue-900">{COMPANY_CONTACT.email}</span></a>
            <div className="pt-2 text-blue-800"><WechatQR /></div>
          </div>
          <div className="mt-8 max-w-sm border-t border-slate-300 pt-6">
            <h2 className="font-semibold text-slate-900">提交后会发生什么？</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              团队根据您的需求安排联系，沟通应用场景、现有条件与工作范围，再确定演示或项目方案。
            </p>
          </div>
        </div>
        <div id="request-form" className="self-start rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:p-9">
          <DemoRequestForm
            key={product || "general"}
            initialProduct={product}
          />
        </div>
      </div>
    </main>
  );
}
