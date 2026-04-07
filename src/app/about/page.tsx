"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ============================================================
   SEO metadata (exported from a separate file for client component)
   ============================================================ */

/* ============================================================
   数字滚动组件
   ============================================================ */
function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
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
   发展历程数据
   ============================================================ */
const milestones = [
  { date: "2018.6", text: "研发团队在上海成立" },
  { date: "2019.1", text: "极视AI 3DRston V1.0 研发成功" },
  { date: "2020.1", text: "上海子殷科技有限公司正式成立" },
  {
    date: "2020.12",
    text: "入驻内蒙古和林格尔新区智能制造产业园；Cloud OS 1.0 发布",
  },
  {
    date: "2021",
    text: "科技型中小企业认定；自治区首家医学3D打印中心投产；NMPA注册申请启动",
  },
  {
    date: "2023.4",
    text: "截骨导板获批医疗器械注册证（填补自治区空白）；纳入国家医保编码",
  },
  {
    date: "2023.7",
    text: "创新联合体成立；骨模型/器官模型获注册证",
  },
  { date: "2024.4", text: "通过 CE 认证 + ISO 13485 认证" },
  { date: "2024.9", text: "与上海六院数字化医疗中心建立合作" },
  {
    date: "2024.11",
    text: "协助国家骨科医学中心完成国内首例微创拇外翻髓内板矫形手术",
  },
];

/* ============================================================
   设施图片
   ============================================================ */
const facilities = [
  {
    src: "/images/about/image2.jpg",
    alt: "3D打印车间，工业级打印设备",
  },
  {
    src: "/images/about/image3.jpg",
    alt: "联合实验室与骨骼模型展示",
  },
  {
    src: "/images/about/image4.jpg",
    alt: "教学基地与大屏展示区",
  },
  {
    src: "/images/about/image5.jpg",
    alt: "产品展厅，3D打印模型陈列",
  },
];

/* ============================================================
   荣誉与合作图片
   ============================================================ */
const honors = [
  { src: "/images/about/image6.jpg", alt: "3D打印创新培训中心揭牌仪式" },
  { src: "/images/about/image7.jpg", alt: "政府领导冬季考察调研" },
  { src: "/images/about/image8.jpg", alt: "官员参观车间" },
  { src: "/images/about/image9.jpg", alt: "向领导展示3D打印技术" },
  { src: "/images/about/image10.png", alt: "2023年创新联合体颁奖典礼" },
  { src: "/images/about/image11.jpg", alt: "领导观摩3D打印模型" },
  { src: "/images/about/image12.jpg", alt: "数字化医学3D打印学术研讨会" },
  { src: "/images/about/image13.png", alt: "和林格尔新区领导参观车间" },
  { src: "/images/about/image14.jpg", alt: "AI医疗产业院企合作座谈" },
  { src: "/images/about/image15.png", alt: "骨科骨折复位带专利转让签约仪式" },
  { src: "/images/about/image16.jpg", alt: "AR/MR HoloLens医学影像演示" },
  { src: "/images/about/image17.jpg", alt: "拉链式医用高分子夹板产品展示" },
];

/* ============================================================
   关于我们页面
   ============================================================ */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#060e24]">
      {/* ---- Hero ---- */}
      <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden">
        <Image
          src="/images/about/image1.png"
          alt="子殷科技 A2 号楼，CHCOMCT 标识"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#060e24]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl"
          >
            关于子殷科技
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-white/70 sm:text-xl"
          >
            专注医学3D打印 &middot; 赋能精准医疗
          </motion.p>
        </div>
      </section>

      {/* ---- 公司概况 ---- */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white">公司概况</h2>
            <p className="mt-6 leading-relaxed text-gray-300">
              子殷科技是一家专注于医学3D打印服务解决方案的高新技术企业，入驻和林格尔新区智能制造产业园A2号楼（1-4层，约1939平米）。自2020年成立以来，公司已与近40家医院建立合作，完成近2000例临床案例。依托上海交大附属九院3D打印技术临床转化研发中心，持续推动数字骨科技术落地。
            </p>
          </motion.div>

          {/* 统计数字 */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { target: 40, suffix: "+", label: "合作医院" },
              { target: 2000, suffix: "+", label: "临床案例" },
              { target: 1939, suffix: " m\u00B2", label: "产研基地" },
              { target: 3, suffix: " 类", label: "NMPA 注册证" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 py-10"
              >
                <span className="text-4xl font-extrabold text-cyan-400">
                  <AnimatedNumber target={item.target} suffix={item.suffix} />
                </span>
                <span className="mt-2 text-sm text-gray-400">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 发展历程 ---- */}
      <section className="bg-[#0a1128] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center text-3xl font-bold text-white"
          >
            发展历程
          </motion.h2>

          <div className="relative border-l-2 border-cyan-500/30 pl-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.date}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative mb-10 last:mb-0"
              >
                {/* dot */}
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 border-cyan-400 bg-[#0a1128]" />
                <span className="text-sm font-semibold text-cyan-400">
                  {m.date}
                </span>
                <p className="mt-1 leading-relaxed text-gray-300">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 设施展示 ---- */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            基地与设施
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {facilities.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-medium text-white/90">
                  {img.alt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 荣誉与合作 ---- */}
      <section className="bg-[#0a1128] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            荣誉与合作
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {honors.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {img.alt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="bg-[#0A2463] py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            期待与您合作
          </h2>
          <p className="mx-auto mt-3 mb-8 max-w-md text-sm text-white/50">
            了解我们的医学3D打印解决方案，申请免费演示体验
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center rounded-lg bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          >
            申请免费演示
          </Link>
        </div>
      </section>
    </main>
  );
}
