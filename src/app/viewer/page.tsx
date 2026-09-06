"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getPublicDemo } from "@/lib/public-demos";

const ModelViewer = dynamic(() => import("@/components/viewer/ModelViewer"), { ssr: false });
const SharePopover = dynamic(() => import("@/components/viewer/SharePopover"), { ssr: false });

function ViewerContent() {
  const caseId = useSearchParams().get("case") || "";
  const demo = getPublicDemo(caseId);
  const [showShare, setShowShare] = useState(false);
  if (!demo) return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950 p-6 text-white">
      <h1 className="text-xl">该演示暂未公开或链接不完整</h1>
      <Link href="/cases?category=ai_reconstruction" className="text-cyan-300">查看可用三维演示</Link>
    </main>
  );
  return (
    <main className="flex min-h-dvh flex-col bg-slate-950 pt-16 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div><Link href="/cases?category=ai_reconstruction" className="text-xs text-cyan-300">返回三维演示</Link><h1 className="mt-1 font-semibold">{demo.title}</h1></div>
        <button onClick={() => setShowShare(true)} className="rounded-lg border border-white/20 px-4 py-2 text-sm">分享</button>
      </div>
      <ModelViewer manifestUrl={"https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/" + demo.id + "/manifest.json"} showControls lightMode="light" className="min-h-[420px] flex-1" />
      <p className="p-4 text-center text-xs leading-6 text-slate-400">技术展示内容不作为临床诊疗结论。</p>
      {showShare && <SharePopover caseId={demo.id} onClose={() => setShowShare(false)} />}
    </main>
  );
}
export default function ViewerPage() {
  return <Suspense fallback={<p className="p-24">正在准备演示…</p>}><ViewerContent /></Suspense>;
}
