import type { Metadata } from "next";
import "../staff/staff.css";
export const metadata: Metadata = { title: "官网发文工作台", robots: { index: false, follow: false } };
export default function PublishingLayout({ children }: { children: React.ReactNode }) {
  return <main className="staff-shell flex-1 bg-[#f4f7fb] pt-24">{children}</main>;
}
