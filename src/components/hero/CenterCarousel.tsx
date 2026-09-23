"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { image: "/images/company/xiaogan-center.jpg", title: "孝感数智医学与临床转化中心", label: "医院场景 · 中心共建", description: "让影像重建、医学3D打印与医工协作走进科室。", href: "/cases/xiaogan-medical-center-2026", cta: "查看共建项目", position: "50% 50%" },
  { image: "/images/company/guangyuan-center.jpg", title: "广元3D打印创新研究中心", label: "项目实景 · 医学3D打印", description: "从数字化设计到实体模型，呈现可触达的工程成果。", href: "/about#centers", cta: "查看中心实景", position: "50% 62%" },
  { image: "/images/company/ziyin-brand.jpg", title: "子殷科技", label: "科技 · 医疗 · 服务", description: "连接临床需求与工程实施，把合作落实到具体交付。", href: "/about", cta: "了解子殷", position: "50% 43%" },
];

export default function CenterCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const rotationControl = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!playing || hovered) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!preference.matches && !document.hidden && region.current && region.current.getBoundingClientRect().bottom > 0 && (!region.current.contains(document.activeElement) || document.activeElement === rotationControl.current)) {
        setIndex((value) => (value + 1) % slides.length);
      }
    }, 6500);
    return () => window.clearInterval(timer);
  }, [playing, hovered]);
  const select = (value: number) => { setPlaying(false); setIndex((value + slides.length) % slides.length); };
  const current = slides[index];
  return (
    <div ref={region} role="region" aria-roledescription="轮播" aria-label="子殷科技与中心实景" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={(event) => { if (event.target !== rotationControl.current) setPlaying(false); }} className="overflow-hidden rounded-2xl border border-white/20 bg-[#102139]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800 sm:aspect-[16/11]">
        {slides.map((slide, position) => (
          <div key={slide.image} aria-hidden={index !== position} className={`absolute inset-0 transition-opacity duration-700 ${index === position ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            <Image src={slide.image} alt={slide.title + "实景照片"} fill priority={position === 0} sizes="(max-width: 1024px) 95vw, 640px" style={{ objectPosition: slide.position }} className="object-cover" />
          </div>
        ))}
        <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-2 text-xs text-white">{current.label}</span>
      </div>
      <div className="px-5 pb-5 pt-5 sm:px-6">
        <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <h2 className="text-lg font-semibold text-white sm:text-xl">{current.title}</h2>
          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-300">{current.description}</p>
          <Link href={current.href} className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-cyan-200">{current.cta} →</Link>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/15 pt-3">
          <div className="flex items-center gap-1">
            {slides.map((slide, position) => <button key={slide.image} type="button" aria-label={`查看第${position + 1}张：${slide.title}`} aria-pressed={position === index} onClick={() => select(position)} className="flex h-11 w-9 items-center justify-center"><span className={`h-1.5 rounded-full ${position === index ? "w-7 bg-cyan-300" : "w-3 bg-slate-500"}`} /></button>)}
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-200">
            <button type="button" onClick={() => select(index - 1)} aria-label="上一张实景照片" className="h-11 w-10 rounded-lg hover:bg-white/10">←</button>
            <button type="button" onClick={() => select(index + 1)} aria-label="下一张实景照片" className="h-11 w-10 rounded-lg hover:bg-white/10">→</button>
            <button ref={rotationControl} type="button" onClick={() => setPlaying(!playing)} className="min-h-11 rounded-lg px-3 text-xs hover:bg-white/10">{playing ? "暂停轮播" : "自动轮播"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
