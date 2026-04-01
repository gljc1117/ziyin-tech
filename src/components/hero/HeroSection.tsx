"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import type { Mesh } from "three";

/* ---------- 3D 骨盆线框模型 ---------- */
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
        {/* 白色线框 */}
        <mesh ref={meshRef} scale={2}>
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial color="#ffffff" wireframe />
        </mesh>
        {/* 半透明蓝色外壳 */}
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

/* ---------- 进场动画包装 ---------- */
function AnimatedScene() {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 14, duration: 1.2 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, -3, 2]} intensity={0.4} color="#00B4D8" />
        <PelvisModel />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </motion.div>
  );
}

/* ---------- WebGL 检测 ---------- */
function checkWebGL() {
  if (typeof document === "undefined") return true;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("webgl2"));
  } catch {
    return false;
  }
}

function useWebGLSupport() {
  const [supported] = useState(checkWebGL);
  return supported;
}

/* ---------- HeroSection ---------- */
export default function HeroSection() {
  const webgl = useWebGLSupport();

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#0A2463",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      {/* 扫描线动画 */}
      <div className="scan-line pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col-reverse items-center px-6 md:flex-row md:gap-12 md:px-12">
        {/* 左侧文案 */}
        <div className="flex flex-1 flex-col items-center py-12 text-center md:items-start md:py-0 md:text-left">
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
            className="mt-5 max-w-lg text-base leading-relaxed text-blue-100/80 sm:text-lg"
          >
            CT/MRI 三维重建 + AI 手术规划，让骨科精准手术触手可及
          </motion.p>

          {/* 四大核心能力标签 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {["3D 重建", "术前规划", "AI 辅助测量", "手术导航"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300"
              >
                {tag}
              </span>
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
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#00B4D8" }}
            >
              申请免费演示
            </a>
            <Link
              href="/cases"
              className="inline-flex items-center rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 hover:border-white/70 active:scale-95"
            >
              查看临床案例
            </Link>
          </motion.div>
        </div>

        {/* 右侧 3D */}
        <div className="flex flex-1 items-center justify-center py-12 md:py-0" style={{ minHeight: 360 }}>
          {webgl ? (
            <AnimatedScene />
          ) : (
            <div className="flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-cyan-500 text-lg font-bold text-white/60">
              3D Preview
            </div>
          )}
        </div>
      </div>

      {/* 扫描线 CSS */}
      <style jsx>{`
        .scan-line::after {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
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
