"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaffApiError, staffClient, staffFetch } from "@/lib/staff-browser";
import { commentDate, commentStatuses, type CommentStatus, type StaffComment, type StaffCommentPage } from "@/lib/article-comments";

export default function CommentManager() {
  const router = useRouter();
  const [data, setData] = useState<StaffCommentPage | null>(null);
  const [status, setStatus] = useState<CommentStatus>("pending");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<StaffComment | null>(null);
  const [nextStatus, setNextStatus] = useState<CommentStatus>("pending");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const sequence = useRef(0);
  const savingRef = useRef(false);
  const detail = useRef<HTMLElement>(null);
  const dirty = !!selected && (nextStatus !== selected.status || reply !== (selected.official_reply || ""));
  const clearAccess = useCallback((cause: unknown) => {
    if (cause instanceof StaffApiError && [401, 403].includes(cause.status)) {
      sequence.current++; setData(null); setSelected(null); setLoading(false);
      if (cause.status === 401) router.replace("/staff/login");
    }
  }, [router]);
  const load = useCallback(async () => {
    const current = ++sequence.current;
    setLoading(true);
    try {
      const next = await staffFetch<StaffCommentPage>(`/api/staff/comments?status=${status}&page=${page}`);
      if (current === sequence.current) { setData(next); setError(""); }
    } catch (cause) {
      if (current !== sequence.current) return;
      setData(null); setError(cause instanceof Error ? cause.message : "连接中断，请重试。"); clearAccess(cause);
    } finally { if (current === sequence.current) setLoading(false); }
  }, [page, status, clearAccess]);
  useEffect(() => { const requests = sequence; void load(); return () => { requests.current++; }; }, [load]);
  useEffect(() => {
    try {
      const { data: listener } = staffClient().auth.onAuthStateChange(event => {
        if (event === "SIGNED_OUT") { sequence.current++; setData(null); setSelected(null); router.replace("/staff/login"); }
      });
      return () => listener.subscription.unsubscribe();
    } catch { /* load displays configuration errors. */ }
  }, [router]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function canLeave() { return !savingRef.current && (!dirty || window.confirm("有未保存的审核内容，确定放弃吗？")); }
  function select(item: StaffComment) {
    if (!canLeave()) return;
    setSelected(item); setNextStatus(item.status); setReply(item.official_reply || ""); setMessage("");
    requestAnimationFrame(() => detail.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!selected || savingRef.current) return;
    savingRef.current = true; setSaving(true); setError(""); setMessage("");
    try {
      await staffFetch(`/api/staff/comments/${selected.id}`, { method: "PATCH", body: JSON.stringify({ status: nextStatus, official_reply: reply, version: selected.version }) });
      setSelected(null); setMessage("审核已保存，公开页面会在下次加载时更新。"); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "保存失败，请重试。"); clearAccess(cause); }
    finally { savingRef.current = false; setSaving(false); }
  }
  async function logout() {
    if (!canLeave()) return;
    try {
      const { error: cause } = await staffClient().auth.signOut({ scope: "local" });
      if (cause) throw cause;
      setData(null); setSelected(null); router.replace("/staff/login");
    } catch { setError("退出失败，请稍后重试。"); }
  }
  return <div className="mx-auto max-w-6xl px-5 pt-28 pb-16 md:px-8">
    <header className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-semibold tracking-widest text-blue-700">ZIYIN · 员工工作台</p><h1 className="mt-3 text-3xl font-semibold">文章评论管理</h1><p className="mt-3 text-sm leading-7 text-slate-500">核对学术讨论内容后再公开。请隐藏广告及含有患者个人信息的评论。</p></div><div className="flex flex-wrap gap-3"><Link href="/staff/inquiries" className="staff-secondary" onClick={event => { if (!canLeave()) event.preventDefault(); }}>合作需求</Link><button className="staff-secondary" onClick={() => void logout()}>退出登录</button></div></header>
    {error && <p role="alert" className="staff-error mt-6">{error}</p>}
    {message && <p role="status" className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">{message}</p>}
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{Object.entries(commentStatuses).map(([value, label]) => <button key={value} disabled={saving} aria-pressed={status === value} className={status === value ? "staff-primary" : "staff-secondary"} onClick={() => { if (canLeave()) { setSelected(null); setStatus(value as CommentStatus); setPage(1); } }}>{label}</button>)}</div><button className="staff-secondary" disabled={loading || saving} onClick={() => { if (canLeave()) { setSelected(null); void load(); } }}>刷新列表</button></div>
    <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
      <section className="staff-card min-w-0" aria-label="评论列表" aria-busy={loading}>
        {loading ? <p role="status" className="p-8 text-sm text-slate-500">正在验证权限并加载评论…</p> : !data ? <p className="p-8 text-sm text-slate-500">暂时无法加载，请重试。</p> : <>
          {!data.items.length && <p className="p-8 text-center text-sm text-slate-500">暂无{commentStatuses[status]}的评论。</p>}
          <ul className="divide-y divide-slate-100">{data.items.map(item => <li key={item.id}><button disabled={saving} className={`w-full p-5 text-left hover:bg-slate-50 ${selected?.id === item.id ? "bg-blue-50" : ""}`} aria-pressed={selected?.id === item.id} onClick={() => select(item)}><p className="text-xs leading-6 text-slate-500">{item.article_title}</p><div className="mt-2 flex flex-wrap justify-between gap-2"><strong className="break-all">{item.nickname}</strong><time dateTime={item.created_at} className="text-xs text-slate-500">{commentDate(item.created_at)}</time></div><p className="mt-2 line-clamp-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">{item.body}</p><p className="mt-3 text-xs font-medium text-blue-800">查看并审核 →</p></button></li>)}</ul>
          <nav aria-label="审核列表分页" className="flex items-center justify-between gap-3 border-t border-slate-100 p-4 text-sm"><button className="staff-secondary" disabled={page <= 1 || saving} onClick={() => { if (canLeave()) { setSelected(null); setPage(value => value - 1); } }}>上一页</button><span>第 {page} 页</span><button className="staff-secondary" disabled={!data.hasMore || saving} onClick={() => { if (canLeave()) { setSelected(null); setPage(value => value + 1); } }}>下一页</button></nav>
        </>}
      </section>
      {selected ? <section ref={detail} className="staff-card min-w-0 scroll-mt-28 p-5 sm:p-6" aria-labelledby="moderation-title"><h2 id="moderation-title" className="text-lg font-semibold">审核与官方回复</h2><Link href={`/news/${encodeURIComponent(selected.article_id)}#discussion`} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm leading-7 text-blue-800 underline underline-offset-4">{selected.article_title} ↗</Link><p className="mt-4 break-all text-sm font-semibold">{selected.nickname}</p><p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-slate-50 p-4 text-sm leading-7">{selected.body}</p><form onSubmit={save} className="mt-5 space-y-4"><fieldset disabled={saving} className="space-y-4"><label className="staff-label">审核状态<select value={nextStatus} onChange={event => setNextStatus(event.target.value as CommentStatus)} className="staff-field mt-2">{Object.entries(commentStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="staff-label">子殷官方回复（可选）<textarea value={reply} onChange={event => setReply(event.target.value)} rows={6} maxLength={2000} className="staff-field mt-2" placeholder="回复研究问题、补充资料或说明后续沟通方式" /></label><p className="text-xs leading-6 text-slate-500">设为“已公开”时，评论和回复会一同展示。设为“已隐藏”可撤下整条讨论。读者原文不能修改。</p><button className="staff-primary" disabled={saving || !dirty}>{saving ? "正在保存…" : "保存审核结果"}</button></fieldset></form></section> : <p className="px-5 py-10 text-sm leading-7 text-slate-500">从左侧选择一条评论，查看全文并审核。<br />官方回复统一显示为“子殷科技”。</p>}
    </div>
  </div>;
}
