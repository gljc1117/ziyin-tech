"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

interface DicomViewerProps {
  modelUrl: string;
  className?: string;
}

function ModelMesh({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function DicomViewer({ modelUrl, className }: DicomViewerProps) {
  return (
    <div className={`relative aspect-square w-full overflow-hidden rounded-xl bg-gray-900 ${className ?? ""}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} shadows>
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#374151" wireframe />
            </mesh>
          }
        >
          <Stage environment="city" intensity={0.6}>
            <ModelMesh url={modelUrl} />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>

      {/* 操作提示 */}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/50 px-3 py-1.5 text-xs text-white/70">
        拖拽旋转 · 滚轮缩放
      </div>
    </div>
  );
}
