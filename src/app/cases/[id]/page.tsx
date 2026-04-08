import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CaseModelSection from "./CaseModelSection";
import CaseMarkdownContent from "./CaseMarkdownContent";
import { createServerClient } from "@/lib/supabase-server";

// 临时演示数据 — 后续接入 Supabase
const caseMap: Record<
  string,
  {
    title: string;
    hospital: string;
    department: string;
    doctor: string;
    summary: string;
    content: string;
    caseId?: string; // COS case-id for 3D models
  }
> = {
  "femur-custom-plate": {
    title: "股骨远端骨折个性化接骨板",
    hospital: "上海市第六人民医院",
    department: "骨科",
    doctor: "张主任",
    summary: "基于 CT 数据三维重建，PEEK 材料 3D 打印定制接骨板。",
    content:
      "患者男性，45岁，股骨远端粉碎性骨折。传统接骨板无法完美贴合复杂骨折形态。我们基于术前 CT 数据进行三维重建，设计个性化 PEEK 接骨板，通过 3D 打印制造。术中验证贴合度优异，固定牢靠，手术时间缩短 30%。术后随访 6 个月，骨折愈合良好，无并发症。",
  },
  "cervical-brachytherapy-mold": {
    title: "宫颈癌后装放疗个体化施源器",
    hospital: "内蒙古医科大学第二附属医院",
    department: "放疗科",
    doctor: "李主任",
    summary: "3D 打印个体化放疗模具，提升剂量分布精度。",
    content:
      "患者女性，52 岁，宫颈癌 IIB 期，需行后装放疗。传统标准施源器与患者解剖结构匹配度有限。我们基于 MRI 数据重建宫颈三维模型，设计并 3D 打印个体化施源器，剂量分布均匀性提升 25%，直肠和膀胱受照剂量显著降低。",
  },
  "tibial-plateau-guide": {
    title: "胫骨平台骨折手术导板",
    hospital: "天津医院",
    department: "创伤骨科",
    doctor: "王主任",
    summary: "数字化规划 + 3D 打印导板，缩短手术时间 40%。",
    content:
      "患者男性，38 岁，Schatzker IV 型胫骨平台骨折。术前基于 CT 三维重建进行虚拟手术规划，确定截骨平面和螺钉置入通道，3D 打印手术导板。术中导板精准定位，手术时间从 3.5 小时缩短至 2 小时，透视次数减少 60%。",
  },
  demo: {
    title: "多器官 CT 三维重建演示",
    hospital: "PanGu AI 演示",
    department: "数字影像",
    doctor: "AI",
    summary: "基于 CT 数据的多器官自动分割与三维重建，包含肝脏、肾脏、气管等结构。",
    content:
      "本演示案例展示 PanGu AI 平台的多器官自动分割能力。系统自动识别并分割 CT 影像中的肝脏、左右肾脏、肾动脉、气管等解剖结构，生成高精度 STL 三维模型。所有模型可在浏览器中实时交互查看，支持器官分色显示与显隐控制。",
    caseId: "demo",
  },
  TEST001: {
    title: "肝脏 CT 三维重建",
    hospital: "四川大学华西第二医院",
    department: "肝胆外科",
    doctor: "主任医师",
    summary: "肝脏 CT 三维重建，精确分割肝脏轮廓，为肝切除术前规划提供解剖参考。",
    content: "本案例基于腹部增强 CT 数据，使用 AI 自动分割肝脏轮廓并生成高精度三维模型。重建结果可用于肝切除术前规划，帮助外科医生评估肝脏体积、确定切除范围和安全切缘。",
    caseId: "TEST001",
  },
  "lung-case": {
    title: "肺部专科三维重建",
    hospital: "上海市第六人民医院",
    department: "胸外科",
    doctor: "主任医师",
    summary: "基于高分辨率胸部 CT，AI 全自动分割肺叶、支气管树、肺动脉与肺静脉。9 个解剖结构精确重建，辅助术前规划与解剖评估。",
    content:
      "本案例基于高分辨率胸部 CT 数据，使用 PanGu AI 桌面端进行全自动肺部专科重建。系统精确分割双肺五叶（右肺上叶、中叶、下叶，左肺上叶、下叶），同时重建肺动脉、肺静脉血管树和气管-气道系统，共 9 个解剖结构。模型保留了亚毫米级的解剖细节，可辅助胸外科术前手术入路规划与解剖评估。",
    caseId: "lung-case",
  },
  fullbody: {
    title: "全身多器官三维重建",
    hospital: "浙江大学第二附属医院",
    department: "普外科",
    doctor: "主任医师",
    summary: "腹部 CT 全自动多器官分割，覆盖肝脏、脾脏、双肾、胃、胰腺、胆囊等 13 个解剖结构。支持器官体积计算与空间关系评估。",
    content:
      "本案例使用 TotalSegmentator 对腹部 CT 进行全自动分割，重建了肝脏、脾脏、左右肾、胃、胰腺、胆囊、主动脉、门静脉、十二指肠及双侧肺叶等 13 个解剖结构。所有模型经过网格简化处理，总数据量仅 2.9MB，适合在线实时交互查看，支持器官体积计算与空间关系评估。",
    caseId: "fullbody",
  },
};

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
    .single();

  if (error || !data) return null;
  return data;
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Try static caseMap first
  const staticData = caseMap[id];
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
          {staticData.hospital} · {staticData.department} · {staticData.doctor}
        </p>

        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src="/images/case-placeholder.jpg"
            alt={staticData.title}
            fill
            className="object-cover"
            priority
          />
        </div>

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
