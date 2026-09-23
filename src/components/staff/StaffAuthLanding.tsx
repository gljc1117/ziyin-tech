"use client";
import { useEffect } from "react";
import { isPasswordSetupCallback } from "@/lib/staff-password";

export default function StaffAuthLanding() {
  useEffect(() => {
    // Dashboard-generated email links may return to the site's homepage.
    // Preserve the fragment on a fixed same-origin route; never follow `next`.
    if (window.location.pathname !== "/staff/set-password" && isPasswordSetupCallback(window.location.hash)) {
      window.location.replace("/staff/set-password" + window.location.hash);
    }
  }, []);
  return null;
}
