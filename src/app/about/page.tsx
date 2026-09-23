"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  COMPANY_MILESTONES,
  COMPANY_TIMELINE_UPDATED_LABEL,
} from "@/lib/company-milestones";

/* ============================================================
   SEO metadata (exported from a separate file for client component)
   ============================================================ */

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
  {
    src: "/images/company/translation-gallery.jpg",
    alt: "子殷科技成果转化展示墙与实体模型展区",
  },
  {
    src: "/images/company/ziyin-brand.jpg",
    alt: "子殷科技品牌展示墙",
  },
];

const centerScenes = [
  { src: "/images/company/xiaogan-center.jpg", title: "孝感数智医学与临床转化中心", detail: "医学模型与中心展示区域", href: "/cases/xiaogan-medical-center-2026" },
  { src: "/images/company/guangyuan-center.jpg", title: "广元3D打印创新研究中心", detail: "中心实景与模型展台", href: "/products/medical-center" },
  { src: "/images/company/guangyuan-models.jpg", title: "医学3D打印应用展示", detail: "广元中心的技术介绍与实体模型", href: "/products/medical-3d-printing" },
  { src: "/images/company/guangyuan-entrance.jpg", title: "从场地到服务现场", detail: "广元3D打印创新研究中心入口", href: "/demo" },
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
            数智医学产品 &middot; 医工转化服务
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
              子殷科技面向医院提供数智医学产品与医工转化服务，围绕医学影像处理、医学3D打印和医疗AI研发，连接科室需求、工程实施与科研协作。通过产品交付、技术服务及中心共建，支持医院持续开展数字化医学工作。
            </p>
            <div className="mt-7 border-t border-white/15 pt-6 text-sm leading-7 text-slate-300"><p>Chcomct SM 医学图像处理软件的注册人为内蒙古子殷科技有限公司。上海子殷科技有限公司参与孝感数智医学与临床转化中心共建。</p><div className="mt-4 flex flex-wrap gap-6"><Link href="/products/chcomct-sm" className="text-cyan-200">查看产品资料 →</Link><Link href="/cases/xiaogan-medical-center-2026" className="text-cyan-200">查看中心共建项目 →</Link></div></div>
          </motion.div>


        </div>
      </section>

      {/* ---- 发展历程 ---- */}
      <section className="bg-[#0a1128] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-14 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white"
            >
              发展历程
            </motion.h2>
            <p className="mt-3 text-sm text-gray-400">
              重点里程碑与官网动态 · 最新事件日期 {COMPANY_TIMELINE_UPDATED_LABEL}
            </p>
          </div>

          <div className="relative border-l-2 border-cyan-500/30 pl-8">
            {COMPANY_MILESTONES.map((milestone, index) => (
              <motion.div
                key={`${milestone.sortDate}-${milestone.text}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
                className="relative mb-9 last:mb-0"
              >
                {/* dot */}
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 border-cyan-400 bg-[#0a1128]" />
                <span className="text-sm font-semibold text-cyan-400">
                  {milestone.date}
                </span>
                <p className="mt-1 leading-relaxed text-gray-300">
                  {milestone.text}
                </p>
                {(milestone.source || milestone.href) && (
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                    {milestone.source && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-gray-400">
                        {milestone.source}
                      </span>
                    )}
                    {milestone.href && (
                      <Link
                        href={milestone.href}
                        className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                      >
                        查看动态 <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                )}
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

      <section id="centers" className="bg-[#0a1128] py-20">
        <div className="site-container">
          <p className="text-sm font-medium text-cyan-200">医院场景 · 中心实景</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">看见医工协作发生的地方</h2>
          <p className="mt-4 max-w-2xl leading-8 text-slate-300">通过真实场地、医学模型与应用展示，了解数智医学中心的现场形态。</p>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {centerScenes.map((scene) => <Link key={scene.src} href={scene.href} className="overflow-hidden rounded-2xl border border-white/15 bg-[#0d1c32]">
              <div className="relative aspect-[16/10]"><Image src={scene.src} alt={scene.title + "，" + scene.detail} fill sizes="(max-width: 768px) 95vw, 600px" className="object-cover" /></div>
              <div className="p-6"><h3 className="text-lg font-semibold text-white">{scene.title}</h3><p className="mt-2 text-sm text-slate-300">{scene.detail}</p><span className="mt-4 inline-block text-sm text-cyan-200">了解相关服务与项目 →</span></div>
            </Link>)}
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
            围绕科室需求，沟通产品演示、工程服务、科研协作与中心共建。
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center rounded-lg bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
          >
            联系合作
          </Link>
          <Link href="/careers" className="ml-5 mt-4 inline-flex min-h-12 items-center rounded-lg border border-white/40 px-6 text-sm font-semibold text-white">加入我们 →</Link>
        </div>
      </section>
    </main>
  );
}
