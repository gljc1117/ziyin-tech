"use client";
import { useEffect, useRef, useState } from "react";
import ModelViewer from "./ModelViewer";
import SharePopover from "./SharePopover";
import { getPublicDemo } from "@/lib/public-demos";

interface ViewerModalProps { caseId: string; title: string; department?: string; onClose: () => void; }

export default function ViewerModal({ caseId, title, department, onClose }: ViewerModalProps) {
  const [showShare, setShowShare] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const demo = getPublicDemo(caseId);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { element?.close(); document.body.style.overflow = previous; };
  }, []);
  return (
    <dialog ref={dialog} onCancel={(event) => { event.preventDefault(); if (showShare) setShowShare(false); else onClose(); }} aria-labelledby="viewer-title"
      className="m-auto h-[90dvh] max-h-none w-[94vw] max-w-6xl rounded-2xl bg-slate-950 p-0 text-white backdrop:bg-black/80">
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div><h2 id="viewer-title" className="text-sm font-semibold">{title}</h2>{department && <p className="mt-1 text-xs text-slate-400">{department} · 技术演示</p>}</div>
          <div className="flex gap-3">{demo && <button onClick={() => setShowShare(true)} className="rounded-lg border border-white/20 px-4 py-2 text-sm">分享</button>}<button autoFocus onClick={onClose} className="rounded-lg bg-white/10 px-4 py-2 text-sm">关闭</button></div>
        </div>
        {demo ? <ModelViewer manifestUrl={"https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/" + demo.id + "/manifest.json"} showControls lightMode="light" className="min-h-0 flex-1" /> : <p className="p-8">该演示暂未公开。</p>}
        <p className="px-4 py-3 text-center text-xs text-slate-400">技术展示内容不作为临床诊疗结论。</p>
        {showShare && demo && <SharePopover caseId={demo.id} onClose={() => setShowShare(false)} />}
      </div>
    </dialog>
  );
}
