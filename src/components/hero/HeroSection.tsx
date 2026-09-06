"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("@/components/viewer/ModelViewer"), {
  ssr: false,
  loading: () => <p className="p-8 text-sm text-slate-300">正在准备三维演示…</p>,
});

export default function HeroSection() {
  const [showModel, setShowModel] = useState(false);
  return (
    <section className="bg-[#0A1628] px-6 pb-20 pt-32 text-white lg:px-12 lg:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium tracking-widest text-cyan-300">子殷科技 · 医工协作</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            医疗AI<br />医学3D打印<br /><span className="text-cyan-300">数智医学中心</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
            从临床需求出发，连接数字技术、医工造物与项目交付。了解 CalcAI，探索面向医院与科室的合作方式。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demo" className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950">预约演示与合作咨询</Link>
            <Link href="#products" className="rounded-lg border border-white/30 px-6 py-3 font-semibold">了解产品与服务</Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-900">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <span className="text-sm text-cyan-300">三维技术演示</span>
            <span className="text-xs text-slate-400">模型交互展示</span>
          </div>
          {showModel ? (
            <div className="h-[360px] sm:h-[420px]">
              <ModelViewer manifestUrl="https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/lung-case/manifest.json" showControls className="h-full w-full" />
            </div>
          ) : (
            <div className="flex min-h-[360px] flex-col justify-center p-7 sm:min-h-[420px] sm:p-10">
              <p className="text-sm text-slate-400">从影像到空间结构</p>
              <h2 className="mt-3 text-2xl font-semibold">肺部三维重建演示</h2>
              <p className="mt-4 leading-7 text-slate-300">旋转、缩放、分色查看与结构显隐，让医工沟通更直观。</p>
              <button onClick={() => setShowModel(true)} className="mt-7 self-start rounded-lg border border-cyan-400/50 px-5 py-3 text-sm text-cyan-200">加载交互模型</button>
              <p className="mt-4 text-xs leading-6 text-slate-400">点击后加载三维资源。技术展示内容不作为临床诊疗结论。</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
