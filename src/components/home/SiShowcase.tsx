import Image from "next/image";
import Link from "next/link";
import { SI_PATH, SI_INQUIRY_HREF } from "@/lib/si-showcase";

export default function SiShowcase() {
  return <section aria-labelledby="home-si" className="border-b border-slate-200 bg-[#f0f6f9] py-14 sm:py-20">
    <div className="site-container grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr]">
      <div><p className="eyebrow">Chcomct SI · 自动建模与打印协同</p><h2 id="home-si" className="mt-4 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-4xl">从医学影像，<br />走向三维与实体模型。</h2><p className="mt-5 max-w-xl leading-8 text-slate-600">走进子殷数智工作台，查看自动重建后的骨盆模型，了解专业复核与后续打印如何衔接。</p><div className="mt-7 flex flex-wrap items-center gap-4"><Link href={SI_PATH} className="primary-button">查看 SI 展示 →</Link><Link href={SI_INQUIRY_HREF} className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-800">预约实机演示</Link></div></div>
      <figure><Link href={SI_PATH + "#workbench"} className="relative block aspect-[2/1] overflow-hidden rounded-xl border border-slate-300 bg-[#07151d] shadow-lg"><Image src="/images/si/pelvis-workbench.png" alt="SI 骨盆三维审阅工作台真实研发截图，显示双髋与骶骨模型" fill sizes="(max-width: 1024px) 94vw, 700px" className="object-contain" /></Link><figcaption className="mt-3 text-xs leading-6 text-slate-500">骨盆三维审阅研发界面 · 取自2026年11月路演资料 · 模型需专业复核</figcaption></figure>
    </div>
  </section>;
}
