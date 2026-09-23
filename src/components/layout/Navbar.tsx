"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  { href: "/", label: "首页" },
  { href: "/products", label: "产品与服务" },
  { href: "/cases", label: "案例与交付" },
  { href: "/news", label: "动态与洞察" },
  { href: "/about", label: "关于子殷" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0b2252] text-white">
      <div className="site-container flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo.png"
            width={48}
            height={40}
            alt=""
            className="h-10 w-auto"
          />
          <span className="text-lg font-semibold">子殷科技</span>
        </Link>
        <nav aria-label="主导航" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className={`py-5 text-sm font-medium ${active(l.href) ? "text-cyan-200" : "text-slate-200 hover:text-white"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/demo"
            className="rounded-lg bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950"
          >
            联系合作
          </Link>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="rounded-lg border border-white/30 px-4 py-2 text-sm lg:hidden"
        >
          {open ? "关闭" : "菜单"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="手机导航"
          className="border-t border-white/15 px-6 pb-5 lg:hidden"
        >
          {[...navLinks, { href: "/demo", label: "联系合作" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={active(l.href) ? "page" : undefined}
              className="block rounded-lg px-3 py-3 text-sm text-slate-100 hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
