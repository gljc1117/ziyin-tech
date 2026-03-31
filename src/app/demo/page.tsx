import type { Metadata } from "next";
import DemoRequestForm from "@/components/forms/DemoRequestForm";

export const metadata: Metadata = {
  title: "申请演示 | 子殷科技 - 数字骨科智能手术规划平台",
  description:
    "填写信息申请子殷科技数字骨科平台免费演示，体验3D重建、术前规划、AI辅助测量、手术导航全流程。",
  openGraph: {
    title: "申请演示 | 子殷科技",
    description: "申请子殷科技数字骨科平台免费演示",
  },
};

export default function DemoPage() {
  return (
    <main
      className="min-h-screen pt-16"
      style={{ backgroundColor: "#0A2463" }}
    >
      <div className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-center text-3xl font-bold text-white">
          申请免费演示
        </h1>
        <p className="mx-auto mt-3 mb-10 max-w-md text-center text-sm text-white/50">
          填写以下信息，我们的团队将在 24 小时内与您联系
        </p>
        <DemoRequestForm />
      </div>
    </main>
  );
}
