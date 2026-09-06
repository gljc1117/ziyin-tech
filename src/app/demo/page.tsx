import { pageMetadata } from "@/lib/site";
import DemoRequestForm from "@/components/forms/DemoRequestForm";

export const metadata = pageMetadata("预约演示与合作咨询", "了解医疗AI、医学3D打印与数智医学中心的合作方式。", "/demo");

export default function DemoPage() {
  return (
    <main
      className="min-h-screen pt-16"
      style={{ backgroundColor: "#0A2463" }}
    >
      <div className="mx-auto max-w-xl px-6 py-16">
        <h1 className="text-center text-3xl font-bold text-white">
          预约演示与合作咨询
        </h1>
        <p className="mx-auto mt-3 mb-10 max-w-md text-center text-sm text-white/50">
          填写工作联系信息与需求，团队将据此安排沟通
        </p>
        <DemoRequestForm />
      </div>
    </main>
  );
}
