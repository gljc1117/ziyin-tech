import ProductSection from "@/components/home/ProductSection";
import EngineeringDeliveries from "@/components/home/EngineeringDeliveries";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "产品与技术服务",
  "了解Chcomct SM医学图像处理软件、医学3D打印服务、CalcAI科研合作及数智医学中心共建。",
  "/products",
);
export default function ProductsPage() {
  return (
    <main className="pt-16">
      <ProductSection standalone />
      <EngineeringDeliveries />
    </main>
  );
}
