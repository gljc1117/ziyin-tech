import Link from "next/link";
import WechatQR from "@/components/contact/WechatQR";
import { COMPANY_CONTACT } from "@/lib/contact";
export default function Footer() {
  return (
    <footer id="site-footer" className="mt-auto bg-[#081628] pb-24 pt-12 text-sm text-slate-300">
      <div className="site-container">
        <div className="grid gap-9 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1.1fr_1.2fr]">
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
              <Link href="/products">产品与技术服务</Link>
              <Link href="/research">科研与成果转化</Link>
              <Link href="/cases">案例与交付</Link>
              <Link href="/news">动态与洞察</Link>
              <Link href="/about">关于子殷</Link>
              <Link href="/careers">加入我们</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">直接联系</p>
            <a href={COMPANY_CONTACT.phoneHref} className="mt-3 block py-2 text-lg font-semibold text-white">{COMPANY_CONTACT.phone}</a>
            <a href={COMPANY_CONTACT.emailHref} className="block py-2 text-cyan-200">{COMPANY_CONTACT.email}</a>
            <p className="mt-2 text-xs leading-6">产品与工程服务 · 科研与成果转化</p>
            <Link href="/demo" className="mt-4 inline-block text-cyan-300">
              联系合作 →
            </Link>
          </div>
          <div>
            <p className="mb-4 font-semibold text-white">关注子殷</p>
            <WechatQR thumbnail />
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
