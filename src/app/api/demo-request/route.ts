import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  hospital: z.string().min(2),
  department: z.string().min(1),
  phone: z.string().regex(/^1[3-9]\d{9}$/),
  products: z.array(z.string()).min(1),
  surgery_volume: z.string().min(1),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("[Demo Request]", parsed.data);
      return NextResponse.json({ success: true, data: parsed.data });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { error } = await supabase.from("demo_requests").insert({
      doctor_name: parsed.data.name,
      hospital_name: parsed.data.hospital,
      department: parsed.data.department,
      phone: parsed.data.phone,
      modules: parsed.data.products,
      monthly_cases: parsed.data.surgery_volume,
      notes: parsed.data.notes ?? null,
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ success: false, error: "数据库写入失败" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "服务器错误" }, { status: 500 });
  }
}
