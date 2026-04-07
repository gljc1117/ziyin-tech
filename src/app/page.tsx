"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import HeroSection from "@/components/hero/HeroSection";
import HospitalSection from "@/components/home/HospitalSection";
import LatestNews from "@/components/home/LatestNews";

/* ============================================================
   数字滚动组件
   ============================================================ */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ============================================================
   产品特性 icon（inline SVG）
   ============================================================ */
const features = [
  {
    title: "3D 重建",
    desc: "CT / MRI DICOM 数据一键重建，亚毫米级精度还原解剖结构，支持多模态融合。",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 34l12-12 8 8 16-18" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="4" width="40" height="40" rx="4" />
      </svg>
    ),
  },
  {
    title: "术前规划",
    desc: "AI 辅助截骨线设计、螺钉通道规划、假体匹配，生成术前报告一键打印。",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12v12l8 8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI 辅助测量",
    desc: "自动识别解剖标志点，智能测量角度、长度、对位关系，量化评估手术方案。",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M8 40L24 8l16 32H8z" strokeLinejoin="round" />
        <path d="M16 24h16M20 32h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "手术导航",
    desc: "术中实时 3D 导航，引导器械精确定位，可视化手术路径，缩短手术时间。",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M24 4v40M4 24h40" strokeLinecap="round" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="16" />
      </svg>
    ),
  },
];

/* ============================================================
   首页
   ============================================================ */
export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. 统计数字 */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-3">
          {[
            { target: 2000, suffix: "+", label: "重建病例" },
            { target: 50, suffix: "+", label: "合作医院" },
            { target: 0.5, suffix: "mm", label: "手术精度" },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 py-10"
            >
              <span className="text-4xl font-extrabold text-blue-900">
                {item.label === "手术精度" ? (
                  <PrecisionNumber />
                ) : (
                  <AnimatedNumber target={item.target} suffix={item.suffix} />
                )}
              </span>
              <span className="mt-2 text-sm text-gray-500">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. 合作医院 */}
      <HospitalSection />

      {/* 4. 产品特性 */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">核心产品模块</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-gray-500">
            从影像到手术室，全链路数字化方案
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md"
              >
                <div className="text-blue-600">{f.icon}</div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 最新动态 */}
      <LatestNews />

      {/* 6. CTA */}
      <section
        id="demo"
        className="bg-[#0A2463] py-24"
      >
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">开始数字化手术规划</h2>
          <p className="mx-auto mt-3 mb-8 max-w-md text-sm text-white/50">
            填写信息申请免费演示，我们的团队将在 24 小时内与您联系
          </p>
          <a
            href="/demo"
            className="inline-flex items-center rounded-lg bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          >
            申请免费演示
          </a>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-gray-950 py-12 text-sm text-gray-500">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="text-center md:text-left">
              <p className="font-semibold text-white/80">内蒙古子殷科技有限公司</p>
              <p className="mt-1 text-xs text-gray-600">二类医疗器械注册证持有企业</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="transition-colors hover:text-white/70">首页</Link>
              <Link href="/cases" className="transition-colors hover:text-white/70">临床案例</Link>
              <Link href="/news" className="transition-colors hover:text-white/70">新闻动态</Link>
              <Link href="/demo" className="transition-colors hover:text-white/70">申请演示</Link>
            </nav>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 items-end">
              <div className="text-center md:col-span-2">
                <p>© {new Date().getFullYear()} 内蒙古子殷科技有限公司 保留所有权利</p>
                <p className="mt-1 text-xs text-gray-600">
                  本平台仅供医疗专业人员使用，不构成临床诊疗建议
                </p>
              </div>
              <div className="mt-4 text-center md:mt-0">
                <a
                  href="https://beian.miit.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icp-link"
                  style={{ fontSize: 12, color: "#94a3b8" }}
                >
                  蒙ICP备2025030436号-1
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ---------- 0.5mm 特殊处理（带小数动画） ---------- */
function PrecisionNumber() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(parseFloat((eased * 0.5).toFixed(1)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}mm
    </span>
  );
}
