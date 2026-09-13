"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { CompanyNewsArticle } from "@/lib/company-news";

type OfficialVideo = NonNullable<CompanyNewsArticle["officialVideo"]>;

export default function OfficialVideoCard({ video }: { video: OfficialVideo }) {
  const [qrCode, setQrCode] = useState<string>();

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(video.url, {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 360,
      color: { dark: "#020617", light: "#ffffff" },
    }).then((result) => {
      if (active) setQrCode(result);
    }).catch(() => {
      if (active) setQrCode(undefined);
    });
    return () => { active = false; };
  }, [video.url]);

  return <section className="mt-8 overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent p-5 sm:p-7">
    <div className="grid items-center gap-6 sm:grid-cols-[1fr_180px]">
      <div>
        <p className="text-sm font-medium text-cyan-300">官方视频号 · 原片入口</p>
        <h2 className="mt-2 text-2xl font-semibold leading-9 text-white">《{video.title}》</h2>
        <p className="mt-3 text-base leading-7 text-slate-300">发布账号：{video.publisher}</p>
        <a href={video.url} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300">
          前往微信观看原片 ↗
        </a>
      </div>
      <div className="mx-auto w-full max-w-[180px] rounded-xl bg-white p-3">
        {qrCode ? <img src={qrCode} alt={`扫码在微信中观看《${video.title}》`} width={360} height={360} className="h-auto w-full" />
          : <div className="aspect-square w-full animate-pulse rounded bg-slate-100" aria-label="二维码正在生成" />}
        <p className="mt-2 text-center text-xs leading-5 text-slate-600">微信扫码观看</p>
      </div>
    </div>
  </section>;
}
