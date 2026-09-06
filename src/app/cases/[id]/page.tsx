import { notFound } from "next/navigation";
import { getPublicDemo } from "@/lib/public-demos";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import CaseModelSection from "./CaseModelSection";
import CaseMarkdownContent from "./CaseMarkdownContent";
import { createServerClient } from "@/lib/supabase-server";
import { canDisplayCase } from "@/lib/content-policy";
import { getEditorialArticle } from "@/lib/editorial-content";
import { EditorialCaseDetail } from "@/components/content/EditorialArticleBody";

const COS_MANIFEST_BASE =
  "https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models";

interface OutcomeData {
  hospital?: string;
  department?: string;
  doctors?: string;
  technique?: string;
  result?: string;
  significance?: string;
  date?: string;
  content?: string;
}

async function getSupabaseCase(id: string) {
  const supabase = createServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cases")
    .select("*, hospitals(name)")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (error || !data || !canDisplayCase(data)) return null;
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = getEditorialArticle(id);
  if (article) {
    const metadata = pageMetadata(article.caseProfile.title, article.summary, "/cases/" + id);
    return { ...metadata, openGraph: { ...metadata.openGraph, images: [{ url: article.cover.url, alt: article.cover.alt, width: article.cover.width, height: article.cover.height }] }, ...(article.status === "candidate" ? { robots: { index: false, follow: false } } : {}) };
  }
  const demo = getPublicDemo(id);
  if (demo) return pageMetadata(demo.title, demo.summary, "/cases/" + id);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return { robots: { index: false, follow: false } };
  const record = await getSupabaseCase(id);
  return record ? pageMetadata(record.title, "子殷科技案例与项目交付", "/cases/" + id) : { robots: { index: false, follow: false } };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getEditorialArticle(id);
  if (article) return <EditorialCaseDetail article={article} />;

  // Only explicitly listed technical demonstrations use static content.
  const demo = getPublicDemo(id);
  const staticData = demo ? { ...demo, caseId: demo.id, content: "本页用于展示三维模型的交互方式，不代表特定医院、医生或患者的临床结果。具体项目交付范围与效果请结合已核验的项目资料确认。" } : undefined;
  if (staticData) {
    const manifestUrl = staticData.caseId
      ? `${COS_MANIFEST_BASE}/${staticData.caseId}/manifest.json`
      : null;

    return (
      <main className="mx-auto max-w-4xl px-6 pt-24 pb-20">
        <Link href="/cases" className="text-sm text-blue-600 hover:underline">
          &larr; 返回案例列表
        </Link>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">{staticData.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          技术演示 · {staticData.department}
        </p>


        {manifestUrl && staticData.caseId && (
          <CaseModelSection
            manifestUrl={manifestUrl}
            caseId={staticData.caseId}
            title={staticData.title}
            department={staticData.department}
          />
        )}

        <article className="prose prose-gray mt-10 max-w-none">
          <p className="lead">{staticData.summary}</p>
          <p>{staticData.content}</p>
        </article>

        {manifestUrl && staticData.caseId && (
          <div className="mt-6 text-sm text-gray-400">
            外部分享链接：
            <Link
              href={`/viewer?case=${staticData.caseId}`}
              className="ml-1 text-blue-500 hover:underline"
            >
              /viewer?case={staticData.caseId}
            </Link>
          </div>
        )}
      </main>
    );
  }

  // Database cases use UUIDs; unpublished demo/test slugs are not public routes.
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) notFound();

  // Try Supabase
  const dbCase = await getSupabaseCase(id);
  if (!dbCase) notFound();

  const outcome: OutcomeData = (dbCase.outcome_data as OutcomeData) ?? {};
  const hospitalName =
    outcome.hospital ??
    (dbCase.hospitals as { name?: string } | null)?.name ??
    "";

  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-20">
      <Link href="/cases" className="text-sm text-blue-600 hover:underline">
        &larr; 返回案例列表
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-gray-900">
        {dbCase.title}
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        {hospitalName}
        {outcome.department ? ` · ${outcome.department}` : ""}
      </p>

      {/* 关键信息卡片 */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {outcome.doctors && (
          <div className="rounded-xl bg-blue-50 p-4">
            <div className="text-xs font-medium text-blue-600">手术团队</div>
            <div className="mt-1 text-sm text-gray-800">{outcome.doctors}</div>
          </div>
        )}
        {outcome.technique && (
          <div className="rounded-xl bg-green-50 p-4">
            <div className="text-xs font-medium text-green-600">技术要点</div>
            <div className="mt-1 text-sm text-gray-800">{outcome.technique}</div>
          </div>
        )}
        {outcome.result && (
          <div className="rounded-xl bg-purple-50 p-4">
            <div className="text-xs font-medium text-purple-600">手术结果</div>
            <div className="mt-1 text-sm text-gray-800">{outcome.result}</div>
          </div>
        )}
        {outcome.significance && (
          <div className="rounded-xl bg-amber-50 p-4">
            <div className="text-xs font-medium text-amber-600">临床意义</div>
            <div className="mt-1 text-sm text-gray-800">{outcome.significance}</div>
          </div>
        )}
      </div>

      {/* Markdown 图文内容 */}
      {outcome.content && (
        <article className="mt-10">
          <CaseMarkdownContent content={outcome.content} />
        </article>
      )}
    </main>
  );
}
