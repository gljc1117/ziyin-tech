"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import type { Mesh } from "three";

const ModelViewer = dynamic(
  () => import("@/components/viewer/ModelViewer"),
  { ssr: false }
);

const DEMO_MANIFEST_URL =
  "https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models/hero-preview/manifest.json";

/* ---------- Fallback icosahedron ---------- */
function PelvisModel() {
  const meshRef = useRef<Mesh>(null);
  const outerRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.3;
    if (outerRef.current) outerRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        <mesh ref={meshRef} scale={2}>
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        <mesh ref={outerRef} scale={2.05}>
          <icosahedronGeometry args={[1, 3]} />
          <meshPhongMaterial
            color="#00B4D8"
            transparent
            opacity={0.12}
            shininess={80}
          />
        </mesh>
      </group>
    </Float>
  );
}

function FallbackScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, -3, 2]} intensity={0.4} color="#00B4D8" />
      <PelvisModel />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}

/* ---------- Hero 3D (real model or fallback) ---------- */
function Hero3D() {
  const [mode, setMode] = useState<"checking" | "real" | "fallback">(
    "checking"
  );

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);

    fetch(DEMO_MANIFEST_URL, { signal: ctrl.signal })
      .then((res) => {
        clearTimeout(timer);
        if (!res.ok) throw new Error("not ok");
        return res.json();
      })
      .then((data) => {
        setMode(data?.models?.length > 0 ? "real" : "fallback");
      })
      .catch(() => {
        clearTimeout(timer);
        setMode("fallback");
      });

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  if (mode === "checking" || mode === "fallback") {
    return <FallbackScene />;
  }

  return (
    <ModelViewer
      manifestUrl={DEMO_MANIFEST_URL}
      autoRotate
      autoRotateSpeed={0.8}
      transparent
      showHint={false}
      showControls={false}
      distanceMultiplier={2.5}
      className="h-full w-full"
    />
  );
}

/* ---------- WebGL ---------- */
function useWebGL() {
  const [ok] = useState(() => {
    if (typeof document === "undefined") return true;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("webgl2"));
    } catch {
      return false;
    }
  });
  return ok;
}

/* ============================================================
   HeroSection
   ============================================================ */
export default function HeroSection() {
  const webgl = useWebGL();

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#0A1628",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      {/* Scan line */}
      <div className="scan-line pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center px-6 lg:flex-row lg:gap-0 lg:px-12">
        {/* Left 50% — text */}
        <div className="flex w-full flex-col items-center py-12 text-center lg:w-1/2 lg:items-start lg:py-0 lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium uppercase tracking-widest text-cyan-400"
          >
            数字骨科智能手术规划平台
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            每台手术，先数字演练
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-blue-100/70 sm:text-lg"
          >
            CT/MRI 三维重建 + AI 手术规划，让骨科精准手术触手可及
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {[
              {
                label: "3D 重建",
                href: "#cases",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                  </svg>
                ),
              },
              {
                label: "术前规划",
                href: "/demo",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 10h6M9 14h6M9 6h2" />
                  </svg>
                ),
              },
              {
                label: "AI 辅助测量",
                href: "/demo",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 20L20 2" /><path d="M2 20l4-1-3-3 1-4" strokeLinejoin="round" /><path d="M7 13l2 2M11 9l2 2M15 5l2 2" />
                  </svg>
                ),
              },
              {
                label: "手术导航",
                href: "/demo",
                icon: (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                ),
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition-all hover:bg-white/15 hover:text-white"
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="/demo"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              申请免费演示
            </a>
            <Link
              href="/cases"
              className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:border-white/60 active:scale-95"
            >
              查看临床案例
            </Link>
          </motion.div>
        </div>

        {/* Right 50% — 3D model */}
        <motion.div
          className="flex w-full cursor-grab items-center justify-center lg:w-1/2 active:cursor-grabbing"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 14,
            duration: 1.2,
          }}
        >
          {webgl ? (
            <div className="h-[350px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px] lg:w-[600px]">
              <Hero3D />
            </div>
          ) : (
            <div className="flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-cyan-500 text-lg font-bold text-white/60">
              3D Preview
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .scan-line::after {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          animation: scanMove 4s linear infinite;
        }
        @keyframes scanMove {
          0% {
            top: -1px;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </section>
  );
}
