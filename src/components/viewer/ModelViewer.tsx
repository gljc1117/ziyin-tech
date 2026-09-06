"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  Component,
  type ReactNode,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Link from "next/link";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { CaseManifest, ManifestModel } from "@/lib/types";
import { parseManifest } from "@/lib/model-manifest";

/* ============================================================
   器官颜色映射
   ============================================================ */
const ORGAN_COLORS: Record<string, { color: string; opacity: number }> = {
  // Lung lobes — very transparent shell
  lung_left: { color: "#F5DEB3", opacity: 0.15 },
  left_upper_lobe: { color: "#F5DEB3", opacity: 0.15 },
  left_lower_lobe: { color: "#F5DEB3", opacity: 0.15 },
  lung_right: { color: "#F5DEB3", opacity: 0.15 },
  lung_lower_lobe_left: { color: "#F5DEB3", opacity: 0.15 },
  lung_lower_lobe_right: { color: "#F5DEB3", opacity: 0.15 },
  lung_upper_lobe_left: { color: "#F5DEB3", opacity: 0.15 },
  lung_upper_lobe_right: { color: "#F5DEB3", opacity: 0.15 },
  lung_middle_lobe_right: { color: "#F5DEB3", opacity: 0.15 },
  right_upper_lobe: { color: "#F5DEB3", opacity: 0.15 },
  right_middle_lobe: { color: "#F5DEB3", opacity: 0.15 },
  right_lower_lobe: { color: "#F5DEB3", opacity: 0.15 },
  // Airways
  airway: { color: "#87CEEB", opacity: 0.8 },
  airways: { color: "#87CEEB", opacity: 0.8 },
  trachea: { color: "#D4C5A9", opacity: 0.6 },
  // Pulmonary vessels — solid, vivid
  pulmonary_artery: { color: "#E83030", opacity: 1.0 },
  pulmonary_vein: { color: "#3030E8", opacity: 1.0 },
  // Other vessels
  vessels: { color: "#E85D5D", opacity: 0.9 },
  aorta: { color: "#FF0000", opacity: 0.9 },
  portal_vein: { color: "#4169E1", opacity: 0.8 },
  portal_vein_and_splenic_vein: { color: "#4169E1", opacity: 0.8 },
  hepatic_vein: { color: "#6495ED", opacity: 0.8 },
  hepatic_artery: { color: "#DC143C", opacity: 0.9 },
  left_renal_artery: { color: "#FF4444", opacity: 0.9 },
  right_renal_artery: { color: "#FF6666", opacity: 0.9 },
  // Abdominal organs
  liver: { color: "#CD853F", opacity: 0.35 },
  gallbladder: { color: "#2E8B57", opacity: 0.7 },
  spleen: { color: "#9370DB", opacity: 0.7 },
  stomach: { color: "#F0C080", opacity: 0.4 },
  pancreas: { color: "#DEB887", opacity: 0.7 },
  left_kidney: { color: "#8B4513", opacity: 0.7 },
  right_kidney: { color: "#A0522D", opacity: 0.7 },
  // Skeletal
  spine: { color: "#F5F5DC", opacity: 0.9 },
  vertebra: { color: "#F5F5DC", opacity: 0.9 },
  ribs: { color: "#FAEBD7", opacity: 0.9 },
  // Other
  nodules: { color: "#FFFF00", opacity: 1.0 },
  duodenum: { color: "#E8C080", opacity: 0.6 },
};

const ORGAN_LABELS: Record<string, string> = {
  liver: "肝脏",
  left_kidney: "左肾",
  right_kidney: "右肾",
  left_renal_artery: "左肾动脉",
  right_renal_artery: "右肾动脉",
  airway: "气管",
  airways: "气道",
  lung_left: "左肺",
  lung_right: "右肺",
  lung_lower_lobe_left: "左肺下叶",
  lung_lower_lobe_right: "右肺下叶",
  lung_upper_lobe_left: "左肺上叶",
  lung_upper_lobe_right: "右肺上叶",
  lung_middle_lobe_right: "右肺中叶",
  left_upper_lobe: "左肺上叶",
  left_lower_lobe: "左肺下叶",
  right_upper_lobe: "右肺上叶",
  right_middle_lobe: "右肺中叶",
  right_lower_lobe: "右肺下叶",
  vessels: "血管",
  nodules: "结节",
  spine: "脊柱",
  ribs: "肋骨",
  portal_vein: "门静脉",
  portal_vein_and_splenic_vein: "门静脉/脾静脉",
  hepatic_vein: "肝静脉",
  hepatic_artery: "肝动脉",
  gallbladder: "胆囊",
  spleen: "脾脏",
  stomach: "胃",
  duodenum: "十二指肠",
  pancreas: "胰腺",
  aorta: "主动脉",
  trachea: "气管",
  pulmonary_artery: "肺动脉",
  pulmonary_vein: "肺静脉",
};

function getOrganStyle(name: string) {
  const key = name.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  return ORGAN_COLORS[key] ?? { color: "#CCCCCC", opacity: 0.8 };
}

function getOrganLabel(name: string) {
  const key = name.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  return ORGAN_LABELS[key] ?? name.replace(/_/g, " ");
}

/* ============================================================
   Error Boundary
   ============================================================ */
class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onError?: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode; onError?: () => void }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() { this.props.onError?.(); }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ============================================================
   Scene Background Setter (must be inside Canvas)
   ============================================================ */
function SceneBackground({ color }: { color: string }) {
  return <color attach="background" args={[color]} />;
}

/* ============================================================
   STL Model (imperative loader)
   ============================================================ */
function STLModel({
  url,
  organName,
  visible,
  highlighted = false,
  onLoaded,
  onError,
}: {
  url: string;
  organName: string;
  visible: boolean;
  highlighted?: boolean;
  onLoaded: () => void;
  onError: (name: string) => void;
}) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const style = useMemo(() => getOrganStyle(organName), [organName]);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    let ownedGeometry: THREE.BufferGeometry | null = null;
    const timer = setTimeout(() => controller.abort(), 20000);
    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("model_http_error");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        if (disposed) return;
        const geo = new STLLoader().parse(buffer);
        const positions = geo.getAttribute("position");
        if (!positions || positions.count === 0 || !Array.from(positions.array).every(Number.isFinite)) {
          geo.dispose();
          throw new Error("invalid_model_geometry");
        }
        geo.computeVertexNormals();
        geo.computeBoundingBox();
        ownedGeometry = geo;
        setGeometry(geo);
        onLoaded();
      })
      .catch(() => { if (!disposed) onError(organName); })
      .finally(() => clearTimeout(timer));
    return () => {
      disposed = true;
      clearTimeout(timer);
      controller.abort();
      ownedGeometry?.dispose();
    };
  }, [url, organName, onLoaded, onError]);

  if (!geometry || !visible) return null;

  const isTransparent = style.opacity < 1;

  return (
    <mesh geometry={geometry} renderOrder={isTransparent ? 1 : 0}>
      <meshPhongMaterial
        color={style.color}
        transparent={isTransparent || highlighted}
        opacity={highlighted ? Math.min(style.opacity + 0.3, 1.0) : style.opacity}
        depthWrite={!isTransparent}
        side={THREE.DoubleSide}
        shininess={highlighted ? 120 : 80}
        specular={highlighted ? "#888888" : "#333333"}
        emissive={highlighted ? style.color : "#000000"}
        emissiveIntensity={highlighted ? 0.4 : 0}
      />
    </mesh>
  );
}

/* ============================================================
   Camera Fitter
   ============================================================ */
function CameraFitter({
  ready,
  controlsRef,
  distanceMultiplier = 2.5,
}: {
  ready: boolean;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  distanceMultiplier?: number;
}) {
  const { camera, scene } = useThree();
  const fitted = useRef(false);

  useEffect(() => {
    if (!ready || fitted.current) return;

    const timer = setTimeout(() => {
      const box = new THREE.Box3();
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry) {
          const meshBox = new THREE.Box3().setFromObject(child);
          if (!meshBox.isEmpty()) box.union(meshBox);
        }
      });

      if (box.isEmpty()) {
        fitted.current = true;
        return;
      }

      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim * distanceMultiplier;

      camera.position.set(
        center.x,
        center.y + distance * 0.3,
        center.z + distance
      );
      camera.lookAt(center);

      const cam = camera as THREE.PerspectiveCamera;
      cam.near = Math.max(distance * 0.005, 0.1);
      cam.far = distance * 20;
      cam.updateProjectionMatrix();

      if (controlsRef.current) {
        controlsRef.current.target.copy(center);
        controlsRef.current.update();
      }

      fitted.current = true;
    }, 400);

    return () => clearTimeout(timer);
  }, [ready, camera, scene, controlsRef, distanceMultiplier]);

  return null;
}

/* ============================================================
   Scene Content
   ============================================================ */
function SceneContent({
  models,
  visibility,
  autoRotate,
  autoRotateSpeed = 1.5,
  onModelLoaded,
  onModelError,
  allLoaded,
  distanceMultiplier,
  lightMode = "dark",
  hoveredOrgan,
}: {
  models: ManifestModel[];
  visibility: Record<string, boolean>;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  onModelLoaded: () => void;
  onModelError: (name: string) => void;
  allLoaded: boolean;
  distanceMultiplier?: number;
  lightMode?: "dark" | "light";
  hoveredOrgan?: string | null;
}) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <>
      {lightMode === "light" && <SceneBackground color="#F0F4F8" />}
      {lightMode === "light" ? (
        <>
          <ambientLight intensity={0.7} />
          <directionalLight position={[200, 200, 200]} intensity={1.0} />
          <directionalLight position={[-150, 100, -100]} intensity={0.4} />
          <directionalLight position={[0, -100, 150]} intensity={0.2} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[100, 100, 100]} intensity={0.8} />
          <directionalLight position={[-100, -50, -100]} intensity={0.3} />
          <pointLight position={[0, 200, 0]} intensity={0.4} />
        </>
      )}

      <group>
        {models.map((m) => (
          <STLModel
            key={m.url}
            url={m.url}
            organName={m.name}
            visible={visibility[m.name] !== false}
            highlighted={hoveredOrgan === m.name}
            onLoaded={onModelLoaded}
            onError={onModelError}
          />
        ))}
      </group>

      <CameraFitter
        ready={allLoaded}
        controlsRef={controlsRef}
        distanceMultiplier={distanceMultiplier}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

/* ============================================================
   Loading Overlay
   ============================================================ */
function LoadingOverlay({
  loaded,
  total,
  failed,
  bg = "#0a0a1a",
}: {
  loaded: number;
  total: number;
  failed: number;
  bg?: string;
}) {
  const done = loaded + failed;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <div className="mb-4 text-sm text-gray-400">
        加载模型 {loaded}/{total}
        {failed > 0 && (
          <span className="text-yellow-500"> ({failed} 失败)</span>
        )}
      </div>
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-full rounded-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   Main ModelViewer Component
   ============================================================ */
export interface ModelViewerProps {
  manifestUrl: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  showControls?: boolean;
  showHint?: boolean;
  transparent?: boolean;
  lightMode?: "dark" | "light";
  distanceMultiplier?: number;
  className?: string;
  onManifestLoaded?: (manifest: CaseManifest) => void;
  onVisibilityChange?: (visibility: Record<string, boolean>) => void;
}

export default function ModelViewer(props: ModelViewerProps) {
  const [attempt, setAttempt] = useState(0);
  return <div className={`relative ${props.className ?? ""}`}>
    <ModelViewerSession key={props.manifestUrl + ":" + attempt} {...props} className="h-full min-h-[280px] w-full" />
    <button onClick={() => setAttempt((value) => value + 1)} className="absolute bottom-3 left-3 z-20 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white">重新加载</button>
  </div>;
}

function ContextLossGuard({ onError }: { onError: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const element = gl.domElement;
    const handleLoss = (event: Event) => { event.preventDefault(); onError(); };
    element.addEventListener("webglcontextlost", handleLoss);
    return () => element.removeEventListener("webglcontextlost", handleLoss);
  }, [gl, onError]);
  return null;
}

function ModelViewerSession({
  manifestUrl,
  autoRotate = false,
  autoRotateSpeed = 1.5,
  showControls = false,
  showHint = true,
  transparent = false,
  lightMode = "dark",
  distanceMultiplier = 2.5,
  className = "",
  onManifestLoaded,
  onVisibilityChange,
}: ModelViewerProps) {
  const [manifest, setManifest] = useState<CaseManifest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  const total = manifest?.models.length ?? 0;
  const allDone = total > 0 && loadedCount + failedCount >= total;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    async function load() {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!context) throw new Error("当前浏览器未开启三维图形支持，请使用支持 WebGL 的浏览器");
        context.getExtension("WEBGL_lose_context")?.loseContext();
        const response = await fetch(manifestUrl, { signal: controller.signal });
        if (!response.ok) throw new Error("模型清单暂不可用，请稍后重试");
        const data = parseManifest(await response.json());
        if (cancelled) return;
        setManifest(data);
        setVisibility(Object.fromEntries(data.models.map((model) => [model.name, true])));
        onManifestLoaded?.(data);
      } catch (cause) {
        if (!cancelled) setError(controller.signal.aborted ? "模型清单加载超时，请检查网络后重试" : cause instanceof Error ? cause.message : "三维演示暂不可用");
      } finally {
        clearTimeout(timer);
      }
    }
    void load();
    return () => { cancelled = true; clearTimeout(timer); controller.abort(); };
    // This session is remounted when the URL changes; callbacks are notifications.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestUrl]);

  useEffect(() => {
    if (!manifest || allDone || error) return;
    const timer = setTimeout(() => setError("三维资源加载超时，请稍后重试"), 30000);
    return () => clearTimeout(timer);
  }, [manifest, allDone, error]);

  const handleRenderError = useCallback(() => setError("三维图形引擎不可用，请重新加载或更换浏览器"), []);

  const handleModelLoaded = useCallback(() => {
    setLoadedCount((c) => c + 1);
  }, []);

  const handleModelError = useCallback((name: string) => {
    setFailedCount((c) => c + 1);
    setVisibility((prev) => ({ ...prev, [name]: false }));
  }, []);

  const toggleOrgan = useCallback(
    (name: string) => {
      setVisibility((prev) => {
        const next = { ...prev, [name]: !prev[name] };
        onVisibilityChange?.(next);
        return next;
      });
    },
    [onVisibilityChange]
  );

  const setAllVisible = useCallback(
    (visible: boolean) => {
      setVisibility((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => (next[k] = visible));
        onVisibilityChange?.(next);
        return next;
      });
    },
    [onVisibilityChange]
  );

  if (error || (allDone && loadedCount === 0)) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-[#0a0a1a] text-gray-300 ${className}`}
      >
        <div role="alert" className="px-6 text-center">
          <p className="text-lg">3D 模型加载失败</p>
          <p className="mt-2 text-sm leading-6 text-gray-300">{error || "模型资源未加载成功，请稍后重试"}</p>
          <Link href="/cases?category=ai_reconstruction" className="mt-4 inline-block text-sm text-cyan-300">返回三维演示列表</Link>
        </div>
      </div>
    );
  }

  const bgColor = transparent
    ? "transparent"
    : lightMode === "light"
      ? "#F8FAFC"
      : "#0a0a1a";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {!allDone && (
        <LoadingOverlay
          loaded={loadedCount}
          total={total}
          failed={failedCount}
          bg={bgColor === "transparent" ? "rgba(10,22,40,0.8)" : bgColor}
        />
      )}

      {manifest && (
        <CanvasErrorBoundary
          onError={handleRenderError}
          fallback={
            <div className="flex h-full items-center justify-center text-gray-500">
              <p>3D 渲染引擎初始化失败</p>
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 500], fov: 45 }}
            gl={{ antialias: true, alpha: transparent || lightMode === "light" }}
            style={{ background: bgColor }}
          >
            <ContextLossGuard onError={handleRenderError} />
            <SceneContent
              models={manifest.models}
              visibility={visibility}
              autoRotate={autoRotate}
              autoRotateSpeed={autoRotateSpeed}
              onModelLoaded={handleModelLoaded}
              onModelError={handleModelError}
              allLoaded={allDone}
              distanceMultiplier={distanceMultiplier}
              lightMode={lightMode}
            />
          </Canvas>
        </CanvasErrorBoundary>
      )}

      {allDone && failedCount > 0 && <p role="status" className="absolute inset-x-0 bottom-8 bg-amber-950/90 px-4 py-2 text-center text-xs text-amber-100">部分模型加载失败（{failedCount}/{total}），当前展示不完整，请重新加载。</p>}

      {showControls && manifest && allDone && (
        <SideControlsPanel
          models={manifest.models}
          visibility={visibility}
          onToggle={toggleOrgan}
          onShowAll={() => setAllVisible(true)}
          onHideAll={() => setAllVisible(false)}
        />
      )}

      {showHint && allDone && manifest && (
        <div className="pointer-events-none absolute inset-x-0 bottom-1.5 text-center">
          <span className="inline-block rounded bg-black/30 px-2 py-0.5 text-[10px] text-white/30">
            拖拽旋转 · 滚轮缩放 · 右键平移
          </span>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Side Controls Panel (for embedded viewer)
   ============================================================ */
function SideControlsPanel({
  models,
  visibility,
  onToggle,
  onShowAll,
  onHideAll,
}: {
  models: ManifestModel[];
  visibility: Record<string, boolean>;
  onToggle: (name: string) => void;
  onShowAll: () => void;
  onHideAll: () => void;
}) {
  return (
    <div className="absolute right-3 top-3 z-20 w-36 sm:w-48 rounded-lg bg-black/70 p-3 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-300">器官显隐</span>
        <div className="flex gap-1">
          <button
            onClick={onShowAll}
            className="rounded px-1.5 py-0.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white"
          >
            全显
          </button>
          <button
            onClick={onHideAll}
            className="rounded px-1.5 py-0.5 text-[10px] text-gray-400 hover:bg-white/10 hover:text-white"
          >
            全隐
          </button>
        </div>
      </div>
      <div className="max-h-40 space-y-1 overflow-y-auto sm:max-h-80">
        {models.map((m) => {
          const style = getOrganStyle(m.name);
          const isVisible = visibility[m.name] !== false;
          const label = getOrganLabel(m.name);
          return (
            <button
              key={m.name}
              onClick={() => onToggle(m.name)}
              className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs transition-colors ${
                isVisible
                  ? "text-gray-200 hover:bg-white/10"
                  : "text-gray-500 hover:bg-white/5"
              }`}
            >
              <span
                className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: isVisible ? style.color : "#444" }}
              />
              <span className="flex-1 truncate">{label}</span>
              <span className="text-[10px]">{isVisible ? "ON" : "OFF"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { getOrganStyle, getOrganLabel, ORGAN_LABELS, STLModel, SceneContent, CameraFitter, CanvasErrorBoundary, LoadingOverlay, SceneBackground };
