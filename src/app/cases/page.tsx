import { Suspense } from "react";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import CaseFilter from "@/components/cases/CaseFilter";
import CaseCard from "@/components/cases/CaseCard";
import AICasesSection from "./AICasesSection";
import type { ClinicalCase, CaseCategory } from "@/lib/types";
import { createServerClient } from "@/lib/supabase-server";
import { canDisplayCase } from "@/lib/content-policy";
import { getEditorialCases } from "@/lib/editorial-content";

export const metadata = pageMetadata("案例与交付", "了解医学3D打印应用案例与三维技术演示。", "/cases");

async function getCases(): Promise<{ cases: ClinicalCase[]; fromDb: boolean }> {
  const editorial = getEditorialCases();
  const supabase = createServerClient();
  if (!supabase) return { cases: editorial, fromDb: false };

  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("is_public", true)
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return { cases: editorial, fromDb: false };
  }

  // Map Supabase schema to ClinicalCase type
  const mapped: ClinicalCase[] = data.map((row: Record<string, unknown>) => {
    const outcome = (row.outcome_data ?? {}) as Record<string, string>;
    return {
      id: row.id as string,
      title: row.title as string,
      slug: row.id as string,
      category: ((row.surgery_type as string) ?? "other") as CaseCategory,
      hospital: outcome.hospital ?? "",
      department: outcome.department ?? "",
      doctor_name: outcome.doctors ?? "",
      summary: outcome.result ?? "",
      cover_image_url: (row.preview_url as string) ?? "/images/case-placeholder.jpg",
      images: [],
      model_ids: [],
      tags: [(row.body_part as string) ?? "", (row.surgery_type as string) ?? ""].filter(Boolean),
      is_published: row.is_public as boolean,
      published_at: row.published_at as string,
      created_at: row.published_at as string,
      updated_at: row.published_at as string,
    };
  });

  return { cases: [...editorial, ...mapped.filter(canDisplayCase).filter((item) => !editorial.some((entry) => entry.id === item.id))], fromDb: true };
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
      <h1 className="text-3xl font-bold text-gray-900">案例与交付</h1>
      <p className="mt-2 text-gray-500">
        了解中心共建、服务项目与医学3D打印应用记录
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <CaseFilter />
        </Suspense>
      </div>

      {!fromDb && cases.length === 0 && category !== "ai_reconstruction" && (
        <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          案例资料暂未加载，请稍后重试或联系团队了解交付项目。
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
