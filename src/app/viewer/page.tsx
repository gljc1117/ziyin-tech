"use client";

import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import dynamic from "next/dynamic";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  getOrganStyle,
  getOrganLabel,
  STLModel,
  CameraFitter,
  CanvasErrorBoundary,
  SceneBackground,
} from "@/components/viewer/ModelViewer";
import type { CaseManifest } from "@/lib/types";

const SharePopover = dynamic(
  () => import("@/components/viewer/SharePopover"),
  { ssr: false }
);

const COS_MANIFEST_BASE =
  "https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models";

function ViewerContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("case");

  const [manifest, setManifest] = useState<CaseManifest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const total = manifest?.models.length ?? 0;
  const allDone = total > 0 && loadedCount + failedCount >= total;

  useEffect(() => {
    if (!caseId) return;
    fetch(`${COS_MANIFEST_BASE}/${caseId}/manifest.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: CaseManifest) => {
        setManifest(data);
        const vis: Record<string, boolean> = {};
        data.models.forEach((m) => (vis[m.name] = true));
        setVisibility(vis);
      })
      .catch((e) => setError(e.message));
  }, [caseId]);

  const handleLoaded = useCallback(() => setLoadedCount((c) => c + 1), []);
  const handleError = useCallback((name: string) => {
    setFailedCount((c) => c + 1);
    setVisibility((prev) => ({ ...prev, [name]: false }));
  }, []);
  const toggleOrgan = useCallback((name: string) => {
    setVisibility((prev) => ({ ...prev, [name]: !prev[name] }));
  }, []);

  if (!caseId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0A1628] text-gray-400">
        <p className="text-lg">请指定案例 ID</p>
        <p className="mt-2 text-sm text-gray-600">使用方式: /viewer?case=CASE001</p>
        <Link href="/" className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-sm text-white hover:bg-blue-700">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col" style={{ background: "linear-gradient(135deg, #0A1628, #0F172A)" }}>
      {/* Top bar */}
      <div className="flex h-12 flex-shrink-0 items-center justify-between border-b border-white/10 px-5">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white">&larr; 返回首页</Link>
          <span className="text-sm text-gray-600">|</span>
          <span className="text-sm font-medium text-gray-300">3D 模型查看器 — {caseId}</span>
        </div>
        <button
          onClick={() => setShowShare(true)}
          className="rounded-md px-2.5 py-1 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
          title="分享"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>

      {/* Canvas */}
      <div className="relative flex-1">
        {!allDone && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#F0F4F8]">
            <div className="mb-3 text-sm text-gray-500">加载模型 {loadedCount}/{total}</div>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-cyan-500 transition-all"
                style={{ width: `${total > 0 ? ((loadedCount + failedCount) / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="flex h-full items-center justify-center bg-[#F0F4F8] text-gray-400">加载失败: {error}</div>
        )}

        {manifest && !error && (
          <CanvasErrorBoundary
            fallback={<div className="flex h-full items-center justify-center bg-[#F0F4F8] text-gray-400">渲染引擎初始化失败</div>}
          >
            <Canvas
              camera={{ position: [0, 0, 500], fov: 45 }}
              gl={{ antialias: true }}
              style={{ background: "#F0F4F8" }}
            >
              <SceneBackground color="#F0F4F8" />
              <ambientLight intensity={0.7} />
              <directionalLight position={[200, 200, 200]} intensity={1.0} />
              <directionalLight position={[-150, 100, -100]} intensity={0.4} />
              <directionalLight position={[0, -100, 150]} intensity={0.2} />

              <group>
                {manifest.models.map((m) => (
                  <STLModel
                    key={m.url}
                    url={m.url}
                    organName={m.name}
                    visible={visibility[m.name] !== false}
                    highlighted={hoveredOrgan === m.name}
                    onLoaded={handleLoaded}
                    onError={handleError}
                  />
                ))}
              </group>

              <CameraFitter ready={allDone} controlsRef={controlsRef} distanceMultiplier={2.5} />
              <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={0.1} />
            </Canvas>
          </CanvasErrorBoundary>
        )}
      </div>

      {/* Bottom organ bar */}
      {manifest && (
        <div className="flex-shrink-0 border-t border-white/10 bg-slate-800/95 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-1 overflow-x-auto px-4">
            {manifest.models.map((m) => {
              const style = getOrganStyle(m.name);
              const isVisible = visibility[m.name] !== false;
              const isHovered = hoveredOrgan === m.name;
              const label = getOrganLabel(m.name);
              return (
                <button
                  key={m.name}
                  onClick={() => toggleOrgan(m.name)}
                  onMouseEnter={() => setHoveredOrgan(m.name)}
                  onMouseLeave={() => setHoveredOrgan(null)}
                  className={`flex flex-shrink-0 items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                    isHovered
                      ? "bg-white/20 text-white ring-1 ring-white/30"
                      : isVisible
                        ? "bg-white/10 text-white"
                        : "opacity-30 hover:opacity-50"
                  }`}
                >
                  <span
                    className="h-3 w-3 flex-shrink-0 rounded-full transition-transform"
                    style={{
                      backgroundColor: isVisible ? style.color : "#555",
                      transform: isHovered ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                  <span className="whitespace-nowrap text-xs">{label}</span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    className={isVisible ? "text-white/50" : "text-gray-600"}
                  >
                    {isVisible ? (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    ) : (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    )}
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {showShare && caseId && (
        <SharePopover caseId={caseId} onClose={() => setShowShare(false)} />
      )}
    </div>
  );
}

export default function ViewerPage() {
  return (
    <Suspense
      fallback={<div className="flex h-screen items-center justify-center bg-[#0A1628] text-gray-500">加载中...</div>}
    >
      <ViewerContent />
    </Suspense>
  );
}
