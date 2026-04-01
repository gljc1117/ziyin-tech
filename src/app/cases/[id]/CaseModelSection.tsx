"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import QRCode from "qrcode";

const ModelViewer = dynamic(
  () => import("@/components/viewer/ModelViewer"),
  { ssr: false }
);
const ViewerModal = dynamic(
  () => import("@/components/viewer/ViewerModal"),
  { ssr: false }
);

export default function CaseModelSection({
  manifestUrl,
  caseId,
  title,
  department,
}: {
  manifestUrl: string;
  caseId: string;
  title: string;
  department?: string;
}) {
  const [hasModel, setHasModel] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(manifestUrl)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => {
        setHasModel(data?.models?.length > 0);
        if (data?.models?.length > 0) {
          QRCode.toDataURL(`https://www.chcomct.cn/viewer?case=${caseId}`, {
            width: 120, margin: 1,
          }).then(setQrUrl);
        }
      })
      .catch(() => setHasModel(false));
  }, [manifestUrl, caseId]);

  if (hasModel === null || hasModel === false) return null;

  return (
    <>
      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">3D 重建结果</h2>

        {/* Thumbnail preview */}
        <div className="relative overflow-hidden rounded-xl bg-[#0D1117]">
          <ModelViewer
            manifestUrl={manifestUrl}
            autoRotate
            autoRotateSpeed={1}
            showHint={false}
            showControls={false}
            distanceMultiplier={2.5}
            className="h-[300px] w-full"
          />
          {/* Overlay button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              打开 3D 阅片
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-80">
              <path d="M2 2h4v4H2V2zM10 2h4v4h-4V2zM2 10h4v4H2v-4zM10 10h4v4h-4v-4z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            打开 3D 阅片
          </button>
          {qrUrl && (
            <div className="flex items-center gap-3">
              <img src={qrUrl} alt="QR" className="h-16 w-16 rounded border border-gray-200" />
              <span className="text-xs text-gray-400">扫码查看</span>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <ViewerModal
          caseId={caseId}
          title={title}
          department={department}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
