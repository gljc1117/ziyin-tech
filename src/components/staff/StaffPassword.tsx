"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { establishPasswordSetupSession, validateStaffPassword } from "@/lib/staff-password";

function passwordClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("员工服务尚未配置，请联系管理员。");
  // Keep email-link credentials only in memory, separate from employee login.
  return createClient(url, key, { auth: {
    storageKey: "ziyin-staff-password", persistSession: false,
    autoRefreshToken: false, detectSessionInUrl: false, flowType: "implicit",
  } });
}

export default function StaffPassword() {
  const client = useRef<SupabaseClient | null>(null);
  const initialization = useRef<Promise<string | null> | null>(null);
  const [phase, setPhase] = useState<"loading" | "request" | "password" | "done">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    // Reuse the first initialization during React Strict Mode's effect replay.
    if (!initialization.current) {
      const hash = window.location.hash;
      // Remove credentials and untrusted errors before any asynchronous work.
      window.history.replaceState(null, "", "/staff/set-password");
      initialization.current = Promise.resolve().then(async () => {
        client.current = passwordClient();
        if (!hash) return null;
        return establishPasswordSetupSession(client.current, hash);
      });
    }
    initialization.current.then(accountEmail => {
      if (!active) return;
      if (accountEmail) { setEmail(accountEmail); setPhase("password"); }
      else setPhase("request");
    }).catch(() => {
      if (!active) return;
      setError("设置链接无效或已过期，请重新申请邮件，并打开最新的一封。");
      setPhase("request");
    });
    return () => { active = false; };
  }, []);

  async function requestEmail(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const db = client.current ?? (client.current = passwordClient());
      const { error: sendError } = await db.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin + "/staff/set-password",
      });
      if (sendError) { setError("邮件暂时无法发送，请稍后重试或联系管理员核对邮件配置。"); return; }
      setMessage("若该邮箱已有账号，系统将发送密码设置邮件。请查看收件箱和垃圾邮件，并打开最新邮件中的链接。");
    } catch { setError("邮件暂时无法发送，请稍后重试。"); }
    finally { setBusy(false); }
  }

  async function savePassword(event: FormEvent) {
    event.preventDefault(); setError("");
    const validation = validateStaffPassword(password, confirmation);
    if (validation) { setError(validation); return; }
    if (!client.current || phase !== "password") return;
    setBusy(true);
    try {
      const { error: saveError } = await client.current.auth.updateUser({ password });
      if (saveError) { setError("密码未保存。请换用符合要求的新密码；若链接已过期，请重新申请邮件。"); return; }
      setPassword(""); setConfirmation(""); setPhase("done");
      await client.current.auth.signOut({ scope: "local" }).catch(() => {});
    } catch { setError("暂时无法确认保存结果，请检查网络后重试。"); }
    finally { setBusy(false); }
  }

  return <div className="mx-auto max-w-xl px-6 py-16 md:py-24">
    <section className="staff-card p-7 md:p-9">
      <p className="text-xs font-semibold tracking-[.16em] text-blue-700">ZIYIN · 员工工作台</p>
      <h1 className="mt-4 text-2xl font-semibold">{phase === "done" ? "密码已设置" : "设置员工登录密码"}</h1>
      {phase === "loading" && <p className="mt-6 text-slate-600" role="status">正在验证邮件链接…</p>}
      {phase === "request" && <>
        <p className="mt-3 text-sm leading-7 text-slate-600">首次设置或忘记密码，请填写公司已开通的工作邮箱。</p>
        <form onSubmit={requestEmail} className="mt-6 space-y-5">
          <label className="staff-label">工作邮箱<input className="staff-field mt-2" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label>
          <button className="staff-primary w-full" disabled={busy}>{busy ? "正在发送…" : "发送密码设置邮件"}</button>
        </form>
        {message && <p className="mt-5 text-sm leading-7 text-blue-800" role="status">{message}</p>}
      </>}
      {phase === "password" && <>
        <p className="mt-3 break-all text-sm text-slate-600">账号：{email}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">请设置 12—128 位独立密码，建议组合大小写字母、数字和符号。保存前请保持此页面打开。</p>
        <form onSubmit={savePassword} className="mt-6 space-y-5">
          <input type="text" name="username" autoComplete="username" value={email} readOnly hidden />
          <label className="staff-label">新密码<input className="staff-field mt-2" type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} /></label>
          <label className="staff-label">再次输入新密码<input className="staff-field mt-2" type="password" autoComplete="new-password" required minLength={12} maxLength={128} value={confirmation} onChange={e => setConfirmation(e.target.value)} /></label>
          <button className="staff-primary w-full" disabled={busy}>{busy ? "正在保存…" : "保存密码"}</button>
        </form>
      </>}
      {error && <p className="staff-error mt-5" role="alert">{error}</p>}
      {phase === "done" && <p className="mt-5 text-sm leading-7 text-slate-600">请使用工作邮箱和刚设置的密码登录合作需求管理。</p>}
      <Link href="/staff/login" className="mt-7 inline-block text-sm font-semibold text-blue-700">返回员工登录 →</Link>
    </section>
  </div>;
}
