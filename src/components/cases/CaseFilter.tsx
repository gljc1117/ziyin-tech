"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { CaseCategory } from "@/lib/types";

const categories: { value: CaseCategory | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "orthopedic", label: "骨科器械" },
  { value: "radiotherapy", label: "放疗模具" },
  { value: "surgical_guide", label: "手术导板" },
  { value: "implant", label: "植入物" },
  { value: "other", label: "其他" },
];

export default function CaseFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "all";

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    params.delete("page");
    router.push(`/cases?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleSelect(value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            current === value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
