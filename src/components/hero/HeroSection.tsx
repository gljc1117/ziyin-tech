import Link from "next/link";
import CenterCarousel from "./CenterCarousel";
export default function HeroSection() {
  return (
    <section className="bg-[#0A1628] pb-12 pt-28 text-white sm:pt-36 lg:pb-16">
      <div className="site-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="text-sm font-medium tracking-wider text-cyan-200">
              子殷科技 · 数智医学与医工转化
            </p>
            <h1 className="mt-6 text-[2.25rem] font-semibold leading-[1.3] tracking-tight sm:text-5xl xl:text-[3.5rem]">
              从临床问题，
              <br />
              到可交付的
              <br />
              <span className="text-cyan-300">数智医学方案。</span>
            </h1>
            <p className="mt-6 max-w-lg leading-8 text-slate-300">
              围绕医学影像处理、医学3D打印与医疗AI研发，为医院和科室提供技术服务、科研协作及中心共建支持。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-lg bg-cyan-300 px-6 py-3.5 font-semibold text-slate-950"
              >
                了解产品与服务
              </Link>
              <Link
                href="/cases"
                className="rounded-lg border border-slate-500 px-6 py-3.5 font-semibold text-white"
              >
                查看项目实践
              </Link>
            </div>
          </div>
          <CenterCarousel />
        </div>
        <Link
          href="/products/chcomct-sm"
          className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/20 pt-6 text-sm"
        >
          <span>
            <span className="mr-3 text-cyan-300">产品进展</span>Chcomct SM
            医学图像处理软件获第二类医疗器械注册证
          </span>
          <span className="text-cyan-200">了解产品 →</span>
        </Link>
      </div>
    </section>
  );
}
