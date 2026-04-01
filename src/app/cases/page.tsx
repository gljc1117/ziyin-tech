import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CaseFilter from "@/components/cases/CaseFilter";
import CaseCard from "@/components/cases/CaseCard";
import AICasesSection from "./AICasesSection";
import type { ClinicalCase, CaseCategory } from "@/lib/types";
import { createServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "临床案例",
  description:
    "精选合作医院3D打印临床应用案例，涵盖骨科定制器械、放疗模具、手术导板等。",
  openGraph: {
    title: "临床案例 | 子殷科技",
    description: "精选合作医院3D打印临床应用案例",
  },
};

// 演示数据 — Supabase 无数据时使用
const demoCases: ClinicalCase[] = [
  {
    id: "1",
    title: "股骨远端骨折个性化接骨板",
    slug: "femur-custom-plate",
    category: "orthopedic",
    hospital: "上海市第六人民医院",
    department: "骨科",
    doctor_name: "张主任",
    summary:
      "基于 CT 数据三维重建，PEEK 材料 3D 打印定制接骨板，术前精准规划，术中完美贴合。",
    cover_image_url: "/images/case-placeholder.jpg",
    images: [],
    model_ids: [],
    tags: ["骨科", "PEEK", "个性化定制"],
    is_published: true,
    published_at: "2025-12-01T00:00:00Z",
    created_at: "2025-11-15T00:00:00Z",
    updated_at: "2025-12-01T00:00:00Z",
  },
  {
    id: "2",
    title: "宫颈癌后装放疗个体化施源器",
    slug: "cervical-brachytherapy-mold",
    category: "radiotherapy",
    hospital: "内蒙古医科大学第二附属医院",
    department: "放疗科",
    doctor_name: "李主任",
    summary:
      "根据患者解剖结构 3D 打印放疗模具，提升剂量分布精度，减少正常组织损伤。",
    cover_image_url: "/images/case-placeholder.jpg",
    images: [],
    model_ids: [],
    tags: ["放疗", "3D打印", "个体化"],
    is_published: true,
    published_at: "2025-11-20T00:00:00Z",
    created_at: "2025-11-10T00:00:00Z",
    updated_at: "2025-11-20T00:00:00Z",
  },
  {
    id: "3",
    title: "胫骨平台骨折手术导板",
    slug: "tibial-plateau-guide",
    category: "surgical_guide",
    hospital: "天津医院",
    department: "创伤骨科",
    doctor_name: "王主任",
    summary:
      "术前数字化规划截骨角度与螺钉通道，3D 打印手术导板，缩短手术时间 40%。",
    cover_image_url: "/images/case-placeholder.jpg",
    images: [],
    model_ids: [],
    tags: ["导板", "创伤骨科", "数字化"],
    is_published: true,
    published_at: "2025-10-15T00:00:00Z",
    created_at: "2025-10-01T00:00:00Z",
    updated_at: "2025-10-15T00:00:00Z",
  },
];

async function getCases(): Promise<{ cases: ClinicalCase[]; fromDb: boolean }> {
  const supabase = createServerClient();
  if (!supabase) return { cases: demoCases, fromDb: false };

  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("is_public", true)
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return { cases: demoCases, fromDb: false };
  }

  // Map Supabase schema to ClinicalCase type
  const mapped: ClinicalCase[] = data.map((row: Record<string, unknown>) => ({
    id: row.id as string,
    title: row.title as string,
    slug: (row.id as string).slice(0, 8),
    category: ((row.surgery_type as string) ?? "other") as CaseCategory,
    hospital: "",
    department: "",
    doctor_name: "",
    summary: "",
    cover_image_url: (row.preview_url as string) ?? "/images/case-placeholder.jpg",
    images: [],
    model_ids: [],
    tags: [(row.body_part as string) ?? ""].filter(Boolean),
    is_published: row.is_public as boolean,
    published_at: row.published_at as string,
    created_at: row.published_at as string,
    updated_at: row.published_at as string,
  }));

  return { cases: mapped, fromDb: true };
}

export default async function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const { cases, fromDb } = await getCases();

  const filtered = category
    ? cases.filter((c) => c.category === category)
    : cases;

  return (
    <main className="mx-auto max-w-7xl px-6 pt-24 pb-20">
      <h1 className="text-3xl font-bold text-gray-900">临床案例</h1>
      <p className="mt-2 text-gray-500">
        精选合作医院 3D 打印临床应用案例
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <CaseFilter />
        </Suspense>
      </div>

      {!fromDb && (
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          以下为演示案例，更多真实案例即将推出
        </div>
      )}

      {category === "ai_reconstruction" ? (
        <AICasesSection />
      ) : (
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => (
          <CaseCard key={c.id} caseData={c} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full flex flex-col items-center py-20">
            <div className="text-5xl text-gray-300">&#128203;</div>
            <p className="mt-4 text-lg font-medium text-gray-400">
              即将推出
            </p>
            <p className="mt-1 text-sm text-gray-400">
              更多临床案例正在整理中
            </p>
            <Link
              href="/demo"
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              申请演示了解更多
            </Link>
          </div>
        )}
      </div>
      )}
    </main>
  );
}
