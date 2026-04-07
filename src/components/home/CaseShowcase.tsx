"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ViewerModal = dynamic(
  () => import("@/components/viewer/ViewerModal"),
  { ssr: false }
);

const COS_BASE =
  "https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models";

interface CaseEntry {
  id: string;
  title: string;
  department: string;
  organ: string;
}

const FALLBACK_CASES: CaseEntry[] = [
  { id: "fullbody", title: "全身多器官三维重建", department: "普外科", organ: "multi" },
  { id: "demo", title: "腹部器官分割", department: "肝胆外科", organ: "liver" },
  { id: "TEST001", title: "肝脏分割测试", department: "肝胆外科", organ: "liver" },
];

const ORGAN_ICON: Record<string, string> = {
  liver: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z",
  multi: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z",
};

function OrganIcon({ organ }: { organ: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-12 w-12" fill="currentColor">
      <path d={ORGAN_ICON[organ] || ORGAN_ICON.multi} />
    </svg>
  );
}

const GRADIENTS = [
  "from-cyan-600/30 to-blue-700/30",
  "from-emerald-600/30 to-cyan-700/30",
  "from-violet-600/30 to-blue-700/30",
];

export default function CaseShowcase() {
  const [cases, setCases] = useState<CaseEntry[]>(FALLBACK_CASES);
  const [viewerCase, setViewerCase] = useState<CaseEntry | null>(null);

  useEffect(() => {
    fetch(`${COS_BASE}/cases-index.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.cases?.length) setCases(data.cases);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section id="cases" className="bg-[#0A1628] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white">临床案例</h2>
            <p className="mt-3 text-sm text-gray-400">
              AI 全自动分割 · 多器官三维重建
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <CaseCard
                key={c.id}
                data={c}
                index={i}
                gradient={GRADIENTS[i % GRADIENTS.length]}
                onView={() => setViewerCase(c)}
              />
            ))}
          </div>
        </div>
      </section>

      {viewerCase && (
        <ViewerModal
          caseId={viewerCase.id}
          title={viewerCase.title}
          department={viewerCase.department}
          onClose={() => setViewerCase(null)}
        />
      )}
    </>
  );
}

function CaseCard({
  data,
  index,
  gradient,
  onView,
}: {
  data: CaseEntry;
  index: number;
  gradient: string;
  onView: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group overflow-hidden rounded-xl bg-[#111827] ring-1 ring-white/5 transition-all hover:-translate-y-1 hover:ring-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
    >
      {/* Icon + gradient thumbnail */}
      <div
        className={`flex h-[180px] items-center justify-center bg-gradient-to-br ${gradient}`}
      >
        <div className="flex flex-col items-center gap-3 text-white/40 transition-colors group-hover:text-white/60">
          <OrganIcon organ={data.organ} />
          <span className="text-xs font-medium uppercase tracking-wider">
            3D Model
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-white">{data.title}</h3>
          <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] text-cyan-400">
            {data.department}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={onView}
            className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 text-xs font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            3D 阅片
          </button>
          <Link
            href={`/cases/${data.id}`}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition-colors hover:border-white/30 hover:text-white"
          >
            详情
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
