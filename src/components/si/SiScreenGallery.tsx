"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SI_SCREENS } from "@/lib/si-showcase";

export default function SiScreenGallery() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const screen = SI_SCREENS[selected];
  return <div>
    <div className="flex flex-wrap gap-2" aria-label="选择工作台截图">
      {SI_SCREENS.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-11 rounded-lg border px-5 py-3 text-sm font-semibold ${selected === index ? "border-cyan-300 bg-cyan-300 text-slate-950" : "border-white/20 text-slate-200 hover:bg-white/10"}`}>{item.label}</button>)}
    </div>
    <figure className="mt-5">
      <button type="button" onClick={() => dialog.current?.showModal()} className="relative block aspect-[2/1] w-full overflow-hidden rounded-xl border border-white/15 bg-[#0a1822]" aria-label={`放大查看：${screen.title}`}>
        <Image src={screen.image} alt={screen.alt} fill sizes="(max-width: 1280px) 95vw, 1240px" className="object-contain" />
        <span className="absolute bottom-3 right-3 rounded-md bg-slate-950/90 px-3 py-2 text-xs text-white">放大查看 ↗</span>
      </button>
      <figcaption className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between" aria-live="polite">
        <div><h3 className="text-xl font-semibold text-white">{screen.title}</h3><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">{screen.description}</p></div>
        <span className="shrink-0 text-xs leading-7 text-cyan-200">真实研发界面 · 静态截图</span>
      </figcaption>
    </figure>
    <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-6 text-slate-400">截图取自2026年11月路演资料；骨盆界面保留2026年10月28日的版本记录与待复核状态。两张骨盆图为同一示例，入口与审核面板来自其他演示视图。这里展示界面与流程，具体功能及适用范围以演示版本和项目确认结果为准。</p>
    <dialog ref={dialog} className="media-dialog m-auto w-[calc(100%-24px)] max-w-[1600px] rounded-xl border border-white/20 bg-[#091723] p-3 text-white sm:p-5" aria-label={screen.title}>
      <div className="mb-4 flex items-center justify-between gap-4"><p className="font-semibold">{screen.title}</p><button type="button" onClick={() => dialog.current?.close()} className="min-h-11 rounded-lg border border-white/30 px-5">关闭</button></div>
      <div className="overflow-x-auto rounded-lg bg-[#061018]"><div className="relative aspect-[2/1] min-w-[960px]"><Image src={screen.image} alt={screen.alt} fill sizes="1600px" className="object-contain" /></div></div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{screen.description}</p><p className="mt-2 text-xs text-slate-400">手机端可横向滑动查看大图。</p>
    </dialog>
  </div>;
}
