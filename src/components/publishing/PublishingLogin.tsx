"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { staffClient, staffFetch } from "@/lib/staff-browser";

export default function PublishingLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const { error } = await staffClient().auth.signInWithPassword({ email: email.trim(), password });
      if (error) { setError("登录失败，请核对邮箱和密码，或稍后重试。"); return; }
      try { await staffFetch("/api/publishing/articles"); }
      catch (e) { await staffClient().auth.signOut({ scope: "local" }); throw e; }
      setPassword(""); router.replace("/publishing");
    } catch (e) { setError(e instanceof Error ? e.message : "暂时无法登录。"); }
    finally { setBusy(false); }
  }
  return <section className="staff-card mx-auto my-10 max-w-lg p-8">
    <p className="text-xs font-semibold tracking-widest text-blue-700">ZIYIN · 动态与洞察</p>
    <h1 className="mt-4 text-3xl font-semibold">官网发文登录</h1>
    <p className="mt-4 text-sm leading-7 text-slate-600">管理自己的草稿，预览文章，并发布到子殷官网。</p>
    <form onSubmit={submit} className="mt-7 space-y-5">
      <label className="staff-label">登录邮箱<input type="email" autoComplete="username" required maxLength={254} className="staff-field mt-2" value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label className="staff-label">密码<input type="password" autoComplete="current-password" required className="staff-field mt-2" value={password} onChange={e => setPassword(e.target.value)} /></label>
      {error && <p className="staff-error" role="alert">{error}</p>}
      <button className="staff-primary w-full" disabled={busy}>{busy ? "正在验证…" : "登录发文工作台"}</button>
    </form>
    <Link href="/staff/set-password" className="mt-6 inline-block text-sm font-semibold text-blue-700">首次设置 / 忘记密码</Link>
    <p className="mt-4 text-xs leading-6 text-slate-500">发文资格由公司单独开通。完成密码设置后，请回到本页登录。</p>
  </section>;
}
