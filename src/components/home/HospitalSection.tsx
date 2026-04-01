"use client";

import { motion } from "framer-motion";

const hospitals = [
  { name: "上海市第六人民医院", city: "上海", level: "三甲", abbr: "沪", color: "#1E40AF" },
  { name: "北京大学人民医院", city: "北京", level: "三甲", abbr: "京", color: "#DC2626" },
  { name: "浙江大学第二附属医院", city: "杭州", level: "三甲", abbr: "浙", color: "#059669" },
  { name: "中日友好医院", city: "北京", level: "三甲", abbr: "中", color: "#7C3AED" },
  { name: "四川大学华西第二医院", city: "成都", level: "三甲", abbr: "川", color: "#D97706" },
  { name: "内蒙古自治区人民医院", city: "呼和浩特", level: "三甲", abbr: "蒙", color: "#0891B2" },
];

export default function HospitalSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">合作医院</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-gray-500">
          携手全国多家三甲医院，推动数字骨科临床应用
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-shadow hover:shadow-md"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
                style={{ backgroundColor: h.color }}
              >
                {h.abbr}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{h.name}</h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  {h.city} · {h.level}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
