import Link from "next/link";
export default function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="border-b border-slate-200 bg-[#f4f7fb] pb-10 pt-28 sm:pb-14 sm:pt-32">
    <div className="site-container"><Link href="/" className="text-sm text-blue-800">首页 / {eyebrow}</Link>
      <h1 className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-3xl leading-8 text-slate-600">{description}</p>
    </div>
  </section>;
}
