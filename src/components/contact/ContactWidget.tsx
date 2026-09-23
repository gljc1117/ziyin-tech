"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY_CONTACT } from "@/lib/contact";
import WechatQR from "./WechatQR";

export default function ContactWidget() {
  const pathname = usePathname();
  return pathname.startsWith("/staff") || pathname.startsWith("/viewer") ? null : <ContactPanel key={pathname} />;
}

function ContactPanel() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !root.current?.querySelector("dialog[open]")) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);
  return (
    <div ref={root} className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end sm:bottom-6 sm:right-6">
      {open && (
        <section id="quick-contact" aria-label="联系子殷科技" className="mb-3 max-h-[calc(100dvh-160px)] w-[min(340px,calc(100vw-32px))] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">联系子殷科技</h2>
            <button ref={closeButton} type="button" onClick={() => { setOpen(false); trigger.current?.focus(); }} className="min-h-11 px-2 text-sm text-slate-600">关闭</button>
          </div>
          <p className="mt-1 text-sm text-slate-600">产品演示、工程服务与中心共建</p>
          <a href={COMPANY_CONTACT.phoneHref} className="mt-5 block rounded-lg bg-blue-50 p-4"><span className="block text-xs text-slate-600">公司电话</span><span className="mt-1 block text-xl font-semibold text-blue-900">{COMPANY_CONTACT.phone}</span></a>
          <a href={COMPANY_CONTACT.emailHref} className="mt-2 block rounded-lg border border-slate-200 p-4"><span className="block text-xs text-slate-600">官方邮箱</span><span className="mt-1 block font-medium text-blue-900">{COMPANY_CONTACT.email}</span></a>
          <div className="mt-4 text-blue-800"><WechatQR /></div>
          <Link href="/demo#request-form" className="primary-button mt-4 w-full" onClick={() => setOpen(false)}>填写合作需求</Link>
        </section>
      )}
      <button ref={trigger} type="button" aria-expanded={open} aria-controls="quick-contact" onClick={() => setOpen(!open)} className="flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-[#173e87] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#0b2252]">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-3 3V11.5A7.5 7.5 0 0 1 9.5 4h3a7.5 7.5 0 0 1 7.5 7.5Z" /><path d="M7 10h8M7 14h5" /></svg>
        {open ? "收起咨询" : "联系咨询"}
      </button>
    </div>
  );
}
