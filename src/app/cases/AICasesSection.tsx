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

const FALLBACK: CaseEntry[] = [
  { id: "lung-case", title: "肺部专科三维重建", department: "胸外科", organ: "lung" },
  { id: "fullbody", title: "全身多器官三维重建", department: "普外科", organ: "multi" },
  { id: "TEST001", title: "肝脏 CT 三维重建", department: "肝胆外科", organ: "liver" },
];

const GRADIENTS = [
  "from-cyan-600/30 to-blue-700/30",
  "from-emerald-600/30 to-cyan-700/30",
  "from-violet-600/30 to-blue-700/30",
];

export default function AICasesSection() {
  const [cases, setCases] = useState<CaseEntry[]>(FALLBACK);
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
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`flex h-[160px] items-center justify-center bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`}
            >
              <div className="text-center text-gray-400">
                <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                <span className="mt-1 block text-xs">3D Model</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">{c.title}</h3>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">
                  {c.department}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setViewerCase(c)}
                  className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  3D 阅片
                </button>
                <Link
                  href={`/cases/${c.id}`}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:border-gray-400"
                >
                  详情
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

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
