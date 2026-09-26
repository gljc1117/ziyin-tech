"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  { href: "/products", label: "产品与服务" }, { href: "/solutions", label: "医院解决方案" },
  { href: "/research", label: "科研与创新" }, { href: "/cases", label: "案例与交付" },
  { href: "/news", label: "动态与洞察" }, { href: "/about", label: "关于子殷" },
];
const utilities = [{ href: "/qualifications", label: "资质中心" }, { href: "/support", label: "服务支持" }, { href: "/search", label: "搜索" }];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    const onResize = () => { if (window.innerWidth >= 1280) setOpen(false); };
    window.addEventListener("keydown", onKey); window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0b2252] text-white">
    <div className="site-container flex h-16 items-center justify-between gap-4">
      <Link href="/" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2" aria-label="子殷科技首页"><Image src="/logo.png" width={48} height={40} alt="" className="h-10 w-auto" /><span className="text-lg font-semibold">子殷科技</span></Link>
      <nav aria-label="主导航" className="hidden items-center gap-5 xl:flex">{navLinks.map(l=><Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} className={`py-5 text-sm font-medium ${active(l.href) ? "text-cyan-200" : "text-slate-200 hover:text-white"}`}>{l.label}</Link>)}</nav>
      <nav aria-label="服务导航" className="hidden items-center gap-4 xl:flex">{utilities.map(l=><Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} className="py-5 text-xs text-cyan-100 hover:text-white">{l.label}</Link>)}<Link href="/demo" className="rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950">联系合作</Link></nav>
      <div className="flex items-center gap-3 xl:hidden"><Link href="/search" className="inline-flex min-h-11 items-center px-2 text-sm">搜索</Link><button ref={trigger} onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" className="min-h-11 rounded-lg border border-white/30 px-4 text-sm">{open ? "关闭" : "菜单"}</button></div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="手机导航" className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-white/15 px-6 pb-5 xl:hidden">
      <div className="grid grid-cols-2 gap-1 py-3">{[{href:"/",label:"首页"},...navLinks].map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)} aria-current={active(l.href)?"page":undefined} className="rounded-lg px-3 py-3 text-sm text-slate-100 hover:bg-white/10">{l.label}</Link>)}</div>
      <div className="grid grid-cols-2 gap-1 border-t border-white/15 pt-3">{[...utilities,{href:"/careers",label:"加入我们"},{href:"/demo",label:"联系合作"}].map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)} aria-current={active(l.href)?"page":undefined} className="rounded-lg px-3 py-3 text-sm text-cyan-200 hover:bg-white/10">{l.label}</Link>)}</div>
    </nav>}
  </header>;
}
