"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import HeroSection from "@/components/hero/HeroSection";
import DemoRequestForm from "@/components/forms/DemoRequestForm";
import HospitalSection from "@/components/home/HospitalSection";

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
    title: "三维重建",
    desc: "CT / MRI DICOM 数据一键重建，亚毫米级精度还原解剖结构，支持多模态融合。",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M6 34l12-12 8 8 16-18" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="4" width="40" height="40" rx="4" />
      </svg>
    ),
  },
  {
    title: "手术规划",
    desc: "AI 辅助截骨线设计、螺钉通道规划、假体匹配，生成术前报告一键打印。",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="24" cy="24" r="18" />
        <path d="M24 12v12l8 8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "有限元分析",
    desc: "骨骼-植入物应力仿真，预测术后力学分布，优化固定方案降低失败率。",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M8 40L24 8l16 32H8z" strokeLinejoin="round" />
        <path d="M16 24h16M20 32h8" strokeLinecap="round" />
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
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
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

      {/* 5. 预约演示 */}
      <section
        id="demo"
        className="py-24"
        style={{ backgroundColor: "#0A2463" }}
      >
        <div className="mx-auto max-w-xl px-6">
          <h2 className="text-center text-3xl font-bold text-white">申请免费演示</h2>
          <p className="mx-auto mt-3 mb-10 max-w-md text-center text-sm text-white/50">
            填写以下信息，我们的团队将在 24 小时内与您联系
          </p>
          <DemoRequestForm />
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-gray-950 py-10 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} 内蒙古子殷科技有限公司 保留所有权利</p>
        <p className="mt-2 text-xs text-gray-600">
          本平台仅供医疗专业人员使用，不构成临床诊疗建议
        </p>
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
