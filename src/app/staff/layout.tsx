import type { Metadata } from "next";
import "./staff.css";
export const metadata: Metadata = {
  title: "员工工作台", robots: { index: false, follow: false },
};
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return <main className="staff-shell flex-1 bg-[#f4f7fb]">{children}</main>;
}
