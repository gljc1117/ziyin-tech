import Link from "next/link";
import HeroSection from "@/components/hero/HeroSection";
import ProductSection from "@/components/home/ProductSection";
import DeliveryShowcase from "@/components/home/DeliveryShowcase";
import LatestNews from "@/components/home/LatestNews";
import CooperationSection from "@/components/home/CooperationSection";
import TechnicalShowcase from "@/components/home/TechnicalShowcase";
import BusinessPathways from "@/components/home/BusinessPathways";
import TrustSummary from "@/components/home/TrustSummary";
import { COMPANY_CONTACT } from "@/lib/contact";
export default function Home() {
  return <main><HeroSection /><BusinessPathways /><TrustSummary /><DeliveryShowcase />
    <section className="bg-[#0A2463] py-10 sm:py-14" aria-labelledby="home-contact"><div className="site-container flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <div><h2 id="home-contact" className="text-2xl font-semibold text-white sm:text-3xl">让一个具体需求，成为下一步合作。</h2><p className="mt-3 text-sm leading-7 text-blue-100">产品资料、技术支持与医院合作，都可以直接联系我们。</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2"><a href={COMPANY_CONTACT.phoneHref} className="py-2 text-lg font-semibold text-white">{COMPANY_CONTACT.phone}</a><a href={COMPANY_CONTACT.emailHref} className="py-2 text-cyan-200">{COMPANY_CONTACT.email}</a></div></div>
      <div className="flex shrink-0 flex-wrap items-center gap-5"><Link href="/demo" className="rounded-lg bg-cyan-300 px-6 py-3.5 font-semibold text-slate-950">联系合作</Link><Link href="/support" className="inline-flex min-h-11 items-center text-sm text-cyan-200">服务与支持 →</Link></div>
    </div></section>
    <LatestNews /><ProductSection /><TechnicalShowcase /><CooperationSection />
  </main>;
}
