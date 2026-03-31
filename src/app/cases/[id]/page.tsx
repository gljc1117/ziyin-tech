import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// 临时演示数据 — 后续接入 Supabase
const caseMap: Record<string, { title: string; hospital: string; department: string; doctor: string; summary: string; content: string }> = {
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
};

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = caseMap[id];
  if (!data) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 pt-24 pb-20">
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

      <article className="prose prose-gray mt-10 max-w-none">
        <p className="lead">{data.summary}</p>
        <p>{data.content}</p>
      </article>
    </main>
  );
}
