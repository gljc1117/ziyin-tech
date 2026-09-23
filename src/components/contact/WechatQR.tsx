"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import { COMPANY_CONTACT } from "@/lib/contact";

export default function WechatQR({ thumbnail = false }: { thumbnail?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-haspopup="dialog"
        className={thumbnail ? "block max-w-[290px] rounded-lg text-left" : "rounded-lg border border-current/25 px-4 py-3 text-sm font-medium"}
      >
        {thumbnail ? (
          <>
            <Image src={COMPANY_CONTACT.wechatImage} alt="子殷科技官方公众号二维码，点击放大" width={622} height={302} unoptimized className="h-auto w-full rounded-lg bg-white" />
            <span className="mt-2 block text-xs">官方公众号 · 点击放大</span>
          </>
        ) : "关注官方公众号"}
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="media-dialog m-auto w-[calc(100%-32px)] max-w-xl rounded-2xl bg-white p-5 text-slate-900 shadow-2xl sm:p-7"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold">子殷科技官方公众号</h2>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm">关闭</button>
        </div>
        <Image src={COMPANY_CONTACT.wechatImage} alt="微信扫描此二维码，关注子殷科技官方公众号" width={622} height={302} unoptimized className="mt-5 h-auto w-full" />
        <p className="mt-4 text-sm leading-7 text-slate-600">使用微信扫一扫。手机浏览时，可保存图片后在微信中识别二维码。</p>
        <a href={COMPANY_CONTACT.wechatImage} download="子殷科技官方公众号.png" className="mt-4 inline-flex min-h-11 items-center font-semibold text-blue-800">保存二维码图片 ↓</a>
      </dialog>
    </>
  );
}
