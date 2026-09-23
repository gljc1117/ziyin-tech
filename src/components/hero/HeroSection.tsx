"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const ModelViewer = dynamic(() => import("@/components/viewer/ModelViewer"), {
  ssr: false,
  loading: () => (
    <p role="status" className="p-8 text-sm text-slate-200">
      正在准备三维演示…
    </p>
  ),
});
export default function HeroSection() {
  const [showModel, setShowModel] = useState(false);
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
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0A1628]">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
              <span className="text-sm text-cyan-200">肺部三维重建</span>
              <span className="text-xs text-slate-300">技术演示</span>
            </div>
            {showModel ? (
              <>
                <div className="h-[320px] sm:h-[400px]">
                  <ModelViewer
                    manifestUrl="https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/lung-case/manifest.json"
                    previewUrl="/images/demos/lung-preview.png"
                    showControls
                    className="h-full w-full"
                  />
                </div>
                <button
                  onClick={() => setShowModel(false)}
                  className="m-4 text-sm text-cyan-200"
                >
                  返回静态预览
                </button>
              </>
            ) : (
              <>
                <div className="relative h-[280px] sm:h-[360px]">
                  <Image
                    src="/images/demos/lung-preview.png"
                    alt="由公开演示模型渲染的五个肺叶与气管静态预览"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 600px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 px-5 pb-5">
                  <p className="text-sm leading-6 text-slate-300">
                    从影像到空间结构
                    <br />
                    <span className="text-xs text-slate-400">
                      静态预览 · 五个肺叶与气管
                    </span>
                  </p>
                  <button
                    onClick={() => setShowModel(true)}
                    className="rounded-lg border border-cyan-300/60 px-4 py-3 text-sm font-medium text-cyan-100"
                  >
                    打开交互演示
                  </button>
                </div>
              </>
            )}
            <p className="border-t border-white/10 px-5 py-3 text-xs leading-6 text-slate-400">
              技术展示，不作为临床诊疗结论。交互视图支持旋转、缩放与结构显隐。
            </p>
          </div>
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
