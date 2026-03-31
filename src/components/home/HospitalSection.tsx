"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createBrowserClient } from "@supabase/ssr";

interface Hospital {
  id: string;
  name: string;
  level: string;
  city: string;
}

export default function HospitalSection() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return;

    const supabase = createBrowserClient(url, key);
    supabase
      .from("hospitals")
      .select("id, name, level, city")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setHospitals(data as Hospital[]);
      });
  }, []);

  if (hospitals.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">合作医院</h2>
        <p className="mx-auto mt-3 max-w-md text-center text-gray-500">
          携手全国多家三甲医院，推动数字骨科临床应用
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
                {h.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{h.name}</h3>
                <p className="mt-0.5 text-sm text-gray-500">
                  {h.city} · {h.level}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
