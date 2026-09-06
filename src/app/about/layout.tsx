import { pageMetadata, SITE_DESCRIPTION } from "@/lib/site";
export const metadata = pageMetadata("关于我们", SITE_DESCRIPTION, "/about");
export default function AboutLayout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
