"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { staffClient, staffFetch } from "@/lib/staff-browser";

export default function StaffLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const { error: loginError } = await staffClient().auth.signInWithPassword({ email: email.trim(), password });
      if (loginError) { setError("登录失败，请检查工作邮箱和密码；多次失败请稍后重试。"); return; }
      try { await staffFetch("/api/staff/inquiries?page=1"); }
      catch (e) { await staffClient().auth.signOut({ scope: "local" }); throw e; }
      setPassword(""); router.replace("/staff/inquiries");
    } catch (e) { setError(e instanceof Error ? e.message : "暂时无法登录，请稍后重试。"); }
    finally { setBusy(false); }
  }
  return <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
    <div>
      <p className="text-xs font-semibold tracking-[.16em] text-blue-700">ZIYIN · 员工工作台</p>
      <h1 className="mt-5 text-4xl font-semibold leading-tight">让每一次合作意向，<br />都有后续。</h1>
      <p className="mt-6 max-w-sm text-base leading-8 text-slate-600">查看官网提交的合作需求，明确负责人，记录每一步沟通。</p>
      <div className="mt-8 border-t border-slate-200 pt-5 text-sm leading-7 text-slate-500">仅限已开通权限的员工使用。<br />请在工作设备上登录，离开时退出账号。</div>
    </div>
    <section className="staff-card p-7 md:p-9">
      <h2 className="text-2xl font-semibold">员工登录</h2>
      <p className="mt-2 text-sm text-slate-500">合作需求管理</p>
      <form onSubmit={submit} className="mt-7 space-y-5">
        <label className="staff-label">工作邮箱<input className="staff-field mt-2" type="email" autoComplete="username" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label className="staff-label">密码<input className="staff-field mt-2" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
        {error && <p className="staff-error" role="alert">{error}</p>}
        <button className="staff-primary w-full" disabled={busy}>{busy ? "正在验证…" : "登录工作台"}</button>
      </form>
      <p className="mt-6 text-xs leading-6 text-slate-500">账号由公司统一开通。如需开通权限或重置密码，请联系管理员。</p>
    </section>
  </div>;
}
