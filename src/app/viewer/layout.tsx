import { pageMetadata } from "@/lib/site";
export const metadata = { ...pageMetadata("三维技术演示", "子殷科技三维交互技术演示", "/viewer"), robots: { index: false, follow: true } };
export default function ViewerLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
