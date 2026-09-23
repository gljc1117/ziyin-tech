import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { getPublishedNews } from "@/lib/published-news";
import NewsListClient from "@/components/news/NewsListClient";
import { NEWS_CHANNELS, type NewsChannel } from "@/lib/news-presentation";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "动态与洞察",
  "子殷科技的产品成果、项目实践与医工观察。",
  "/news",
);
export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ channel?: string }>;
}) {
  const [news, params] = await Promise.all([getPublishedNews(), searchParams]);
  const channel: NewsChannel = NEWS_CHANNELS.includes(
    params.channel as NewsChannel,
  )
    ? (params.channel as NewsChannel)
    : "全部";
  return (
    <main className="min-h-screen bg-[#f4f7fb] pb-20 pt-28">
      <div className="site-container">
        <div className="mb-10 border-b border-slate-200 pb-9">
          <p className="eyebrow">ZIYIN · 进展与思考</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">
            动态与洞察
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            记录产品与项目的进展，分享医学技术、医工协作与临床转化的思考。
          </p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section aria-label="文章列表">
            <NewsListClient
              key={channel}
              initialNews={news}
              initialChannel={channel}
            />
          </section>
          <aside
            aria-label="精选成果与合作"
            className="space-y-8 lg:sticky lg:top-24"
          >
            <section className="rounded-xl bg-[#0b2252] p-6 text-white">
              <p className="text-xs font-medium tracking-wider text-cyan-200">
                产品成果
              </p>
              <h2 className="mt-4 text-2xl font-semibold">Chcomct SM</h2>
              <p className="mt-2 text-sm">医学图像处理软件</p>
              <p className="mt-4 text-sm leading-7 text-blue-100">
                第二类医疗器械注册证
                <br />
                内械注准20262210005
              </p>
              <Link
                href="/products/chcomct-sm"
                className="mt-6 inline-block text-sm font-semibold text-cyan-200"
              >
                查看产品与适用范围 →
              </Link>
            </section>
            <section className="border-t border-slate-300 pt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                从实践了解子殷
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                查看中心共建、技术服务与医学3D打印应用记录。
              </p>
              <Link
                href="/cases"
                className="mt-4 inline-block text-sm font-medium text-blue-700"
              >
                案例与交付 →
              </Link>
            </section>
            <section className="border-t border-slate-300 pt-6">
              <h2 className="text-lg font-semibold text-slate-900">
                聊聊您的具体需求
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                产品演示、工程服务、科研协作与中心建设。
              </p>
              <Link href="/demo" className="primary-button mt-5 w-full text-sm">
                联系合作
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
