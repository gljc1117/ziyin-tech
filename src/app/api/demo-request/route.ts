import { createClient } from "@supabase/supabase-js";
import { handleDemoRequest, type DemoRequestData } from "@/lib/demo-request";

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const save = url && key ? async (data: DemoRequestData) => {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("demo_requests").insert({
      doctor_name: data.name,
      hospital_name: data.hospital,
      department: data.department,
      phone: data.phone,
      modules: data.products,
      monthly_cases: data.surgery_volume,
      notes: data.notes || null,
      status: "pending",
    });
    if (error) throw new Error("demo_request_write_failed");
  } : undefined;
  return handleDemoRequest(request, save);
}
