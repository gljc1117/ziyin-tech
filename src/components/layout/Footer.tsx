import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-auto bg-[#081628] py-12 text-sm text-slate-300">
      <div className="site-container">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-xl font-semibold text-white">子殷科技</p>
            <p className="mt-3 leading-7">
              面向医院的数智医学产品
              <br />
              与医工转化服务商
            </p>
          </div>
          <div>
            <p className="font-semibold text-white">了解子殷</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/products">产品与服务</Link>
              <Link href="/cases">案例与交付</Link>
              <Link href="/news">动态与洞察</Link>
              <Link href="/about">关于子殷</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">从具体需求开始</p>
            <p className="mt-4 leading-7">
              产品演示 · 工程服务
              <br />
              科研协作 · 中心共建
            </p>
            <Link href="/demo" className="mt-4 inline-block text-cyan-300">
              联系合作 →
            </Link>
          </div>
        </div>
        <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-5 text-xs text-slate-400">
          <p>© 2024–2026 上海子殷科技有限公司</p>
          <Link href="/staff/login" className="hover:text-white">员工入口</Link>
          <a
            href="https://beian.miit.gov.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            蒙ICP备2025030436号-1
          </a>
        </div>
      </div>
    </footer>
  );
}
