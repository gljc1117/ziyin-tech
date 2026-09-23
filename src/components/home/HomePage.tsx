import Link from "next/link";
import HeroSection from "@/components/hero/HeroSection";
import ProductSection from "@/components/home/ProductSection";
import DeliveryShowcase from "@/components/home/DeliveryShowcase";
import LatestNews from "@/components/home/LatestNews";
import CooperationSection from "@/components/home/CooperationSection";
import TechnicalShowcase from "@/components/home/TechnicalShowcase";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <TechnicalShowcase />
      <ProductSection />
      <DeliveryShowcase />
      <CooperationSection />
      <LatestNews />
      <section className="bg-[#0A2463] py-16">
        <div className="site-container flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              让一个具体需求，成为下一步合作。
            </h2>
            <p className="mt-4 leading-7 text-blue-100">
              告诉我们您的科室、应用场景与目标，一起明确工作范围。
            </p>
          </div>
          <Link
            href="/demo"
            className="shrink-0 rounded-lg bg-cyan-300 px-7 py-3.5 font-semibold text-slate-950"
          >
            联系合作
          </Link>
        </div>
      </section>
    </main>
  );
}
