import Link from "next/link";
import CenterCarousel from "./CenterCarousel";
export default function HeroSection() {
  return <section className="bg-[#0A1628] pb-8 pt-24 text-white sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-32">
    <div className="site-container"><div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div><p className="text-xs font-medium tracking-wider text-cyan-200 sm:text-sm">子殷科技 · 数智医学与医工转化</p>
        <h1 className="mt-4 text-[1.9rem] font-semibold leading-[1.3] tracking-tight sm:mt-6 sm:text-5xl xl:text-[3.5rem]">从临床问题，<br className="hidden lg:block" />到可交付的<br /><span className="text-cyan-300">数智医学方案。</span></h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8">面向医院，提供医学三维建模与3D打印服务，支持临床科研与技术成果转化。</p>
        <div className="mt-8 hidden flex-wrap gap-3 lg:flex"><Link href="/solutions" className="rounded-lg bg-cyan-300 px-6 py-3.5 font-semibold text-slate-950">了解医院解决方案</Link><Link href="/demo" className="rounded-lg border border-slate-500 px-6 py-3.5 font-semibold text-white">沟通合作需求</Link></div>
      </div><div className="hidden lg:block"><CenterCarousel /></div>
    </div>
    <Link href="/qualifications/chcomct-sm" className="mt-10 hidden flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm lg:flex"><span><span className="mr-3 text-cyan-300">产品注册</span>Chcomct SM 医学图像处理软件 · 内械注准20262210005</span><span className="text-cyan-200">了解注册信息 →</span></Link>
    </div>
  </section>;
}
