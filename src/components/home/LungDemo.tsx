"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/viewer/ModelViewer"), { ssr: false, loading: () => <p role="status" className="p-8 text-sm text-slate-200">正在准备三维演示…</p> });

export default function LungDemo() {
  const [showModel, setShowModel] = useState(false);
  return (
    <article className="overflow-hidden rounded-2xl bg-[#0A1628] text-white">
      <div className="px-6 pt-6"><p className="text-xs text-cyan-200">多专科拓展 · 技术演示</p><h3 className="mt-2 text-xl font-semibold">肺部三维重建</h3></div>
      <div className="relative h-[300px]">
        {showModel ? <ModelViewer manifestUrl="https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/lung-case/manifest.json" previewUrl="/images/demos/lung-preview.png" showControls className="h-full w-full" /> : <Image src="/images/demos/lung-preview.png" alt="五个肺叶与气管的三维演示模型" fill sizes="(max-width: 1024px) 90vw, 440px" className="object-contain" />}
      </div>
      <div className="px-6 pb-6">
        <p className="text-sm leading-7 text-slate-300">观察肺叶与气管的空间关系，交互查看结构的旋转、缩放与显隐。</p>
        <button type="button" onClick={() => setShowModel(!showModel)} className="mt-5 rounded-lg border border-cyan-300/60 px-5 py-3 text-sm font-medium text-cyan-100">{showModel ? "返回静态预览" : "打开肺部交互演示"}</button>
        <Link href="/cases/lung-case" className="ml-4 inline-flex min-h-11 items-center text-sm text-cyan-200">演示说明 →</Link>
        <p className="mt-5 border-t border-white/15 pt-4 text-xs leading-6 text-slate-400">技术展示，不作为临床诊疗结论。</p>
      </div>
    </article>
  );
}
