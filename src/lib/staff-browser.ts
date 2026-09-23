"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
let client: SupabaseClient | undefined;
export function staffClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("员工服务尚未配置，请联系管理员。");
  // Browser-only instance. Staff routes never use cookies for authorization.
  client ??= createClient(url, key, { auth: { storageKey: "ziyin-staff-auth", detectSessionInUrl: false } });
  return client;
}
export class StaffApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}
export async function staffFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { data: { session } } = await staffClient().auth.getSession();
  if (!session) throw new StaffApiError("请先登录员工账号。", 401);
  const response = await fetch(path, { ...options, cache: "no-store", credentials: "omit",
    headers: { "Content-Type": "application/json", ...options.headers, Authorization: `Bearer ${session.access_token}` } });
  const data = await response.json();
  if (!response.ok) throw new StaffApiError(data.error || "操作失败，请稍后重试。", response.status);
  return data as T;
}
