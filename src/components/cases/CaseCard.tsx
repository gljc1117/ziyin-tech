"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ClinicalCase } from "@/lib/types";

const categoryLabel: Record<string, string> = {
  orthopedic: "骨科器械",
  radiotherapy: "放疗模具",
  surgical_guide: "手术导板",
  implant: "植入物",
  other: "其他",
};

interface CaseCardProps {
  caseData: ClinicalCase;
  index?: number;
}

export default function CaseCard({ caseData, index = 0 }: CaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/cases/${caseData.slug}`}
        className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-lg"
      >
        {/* 封面 */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={caseData.cover_image_url}
            alt={caseData.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
            {categoryLabel[caseData.category] ?? caseData.category}
          </span>
        </div>

        {/* 信息 */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {caseData.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {caseData.hospital} · {caseData.department}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {caseData.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {caseData.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
