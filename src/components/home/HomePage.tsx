import Link from "next/link";
import HeroSection from "@/components/hero/HeroSection";
import ProductSection from "@/components/home/ProductSection";
import DeliveryShowcase from "@/components/home/DeliveryShowcase";
import LatestNews from "@/components/home/LatestNews";
import CaseShowcase from "@/components/home/CaseShowcase";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />
      <ProductSection />
      <DeliveryShowcase />

      {/* 2. 案例与交付展示 */}
      <CaseShowcase />

      {/* 5. 最新动态 */}
      <LatestNews />

      {/* 6. CTA */}
      <section
        id="demo"
        className="bg-[#0A2463] py-24"
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">让具体需求进入下一步沟通</h2>
          <p className="mx-auto mt-3 mb-8 max-w-md text-sm text-white/50">
            告诉我们您的应用场景与合作需求，共同明确演示与项目交付范围
          </p>
          <a
            href="/demo"
            className="inline-flex items-center rounded-lg bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          >
            预约演示与合作咨询
          </a>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-gray-950 py-12 text-sm text-gray-500">
        <div className="mx-auto max-w-6xl px-6">
          {/* 主内容行 */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="font-semibold text-white/80">上海子殷科技有限公司</p>
              <p className="mt-1 text-sm text-gray-400">数字技术守护每一次精准手术</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="transition-colors hover:text-white/70">首页</Link>
              <Link href="/cases" className="transition-colors hover:text-white/70">案例与交付</Link>
              <Link href="/news" className="transition-colors hover:text-white/70">新闻动态</Link>
              <Link href="/about" className="transition-colors hover:text-white/70">关于我们</Link>
              <Link href="/demo" className="transition-colors hover:text-white/70">申请演示</Link>
            </nav>
          </div>

          {/* 版权行 */}
          <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 md:flex-row">
            <p className="text-xs text-gray-600">
              &copy; 2024-2026 上海子殷科技有限公司 保留所有权利
            </p>
            <a
              href="https://beian.miit.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 transition-colors hover:text-gray-400"
            >
              蒙ICP备2025030436号-1
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

