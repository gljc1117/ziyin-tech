import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CaseModelSection from "./CaseModelSection";

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
    title: "肝脏三维重建测试",
    hospital: "测试医院",
    department: "数字影像",
    doctor: "测试",
    summary: "肝脏 CT 三维重建测试案例。",
    content: "用于验证 COS 上传与 3D 查看器集成的测试案例。",
    caseId: "TEST001",
  },
  "lung-case": {
    title: "肺部专科三维重建",
    hospital: "PanGu AI 胸外科",
    department: "胸外科",
    doctor: "AI",
    summary: "PanGu AI 桌面端导出的高质量肺部 CT 三维重建，含五叶、肺动脉、肺静脉、气管气道。",
    content:
      "本案例展示 PanGu AI 桌面端的肺部专科重建能力。系统精确分割双肺五叶（右肺上叶、中叶、下叶，左肺上叶、下叶），同时重建肺动脉、肺静脉血管树和气管-气道系统，共 9 个解剖结构。模型直接从 PanGu AI 桌面软件导出，保留了亚毫米级的解剖细节。",
    caseId: "lung-case",
  },
  fullbody: {
    title: "全身多器官三维重建",
    hospital: "PanGu AI 演示",
    department: "普外科",
    doctor: "AI",
    summary: "TotalSegmentator 全自动分割，13个腹部器官高精度三维重建。",
    content:
      "本案例使用 TotalSegmentator 对腹部 CT 进行全自动分割，重建了肝脏、脾脏、左右肾、胃、胰腺、胆囊、主动脉、门静脉、十二指肠及双侧肺叶等 13 个解剖结构。所有模型经过网格简化处理，总数据量仅 2.9MB，适合在线实时交互。",
    caseId: "fullbody",
  },
};

const COS_MANIFEST_BASE =
  "https://pangu-models-1376181172.cos.ap-shanghai.myqcloud.com/models";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = caseMap[id];
  if (!data) notFound();

  const manifestUrl = data.caseId
    ? `${COS_MANIFEST_BASE}/${data.caseId}/manifest.json`
    : null;

  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-20">
      <Link href="/cases" className="text-sm text-blue-600 hover:underline">
        &larr; 返回案例列表
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-gray-900">{data.title}</h1>
      <p className="mt-2 text-sm text-gray-500">
        {data.hospital} · {data.department} · {data.doctor}
      </p>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src="/images/case-placeholder.jpg"
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 3D 查看器 */}
      {manifestUrl && data.caseId && (
        <CaseModelSection
          manifestUrl={manifestUrl}
          caseId={data.caseId}
          title={data.title}
          department={data.department}
        />
      )}

      <article className="prose prose-gray mt-10 max-w-none">
        <p className="lead">{data.summary}</p>
        <p>{data.content}</p>
      </article>

      {manifestUrl && data.caseId && (
        <div className="mt-6 text-sm text-gray-400">
          外部分享链接：
          <Link
            href={`/viewer?case=${data.caseId}`}
            className="ml-1 text-blue-500 hover:underline"
          >
            /viewer?case={data.caseId}
          </Link>
        </div>
      )}
    </main>
  );
}
