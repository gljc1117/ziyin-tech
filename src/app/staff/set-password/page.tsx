import type { Metadata } from "next";
import StaffPassword from "@/components/staff/StaffPassword";

export const metadata: Metadata = {
  title: "设置员工登录密码", referrer: "no-referrer",
  robots: { index: false, follow: false },
};
export default function PasswordPage() { return <StaffPassword />; }
