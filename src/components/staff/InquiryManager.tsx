"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StaffApiError, staffClient, staffFetch } from "@/lib/staff-browser";
import { inquiryStatuses, type InquiryList } from "@/lib/staff-types";
import InquiryDetail, { displayTime } from "./InquiryDetail";

export default function InquiryManager() {
  const router = useRouter();
  const [data, setData] = useState<InquiryList | null>(null);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [scope, setScope] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const newest = useRef<string | null | undefined>(undefined);
  const dirty = useRef(false);
  const sequence = useRef(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const onDirty = useCallback((value: boolean) => { dirty.current = value; }, []);
  const onAuthError = useCallback((e: unknown) => {
    if (e instanceof StaffApiError && (e.status === 401 || e.status === 403)) {
      sequence.current++; setData(null); setSelected(null); setBlocked(true); setError(e.message);
      if (e.status === 401) router.replace("/staff/login");
    }
  }, [router]);
  const refresh = useCallback(async () => {
    const current = ++sequence.current;
    try {
      const params = new URLSearchParams({ q: search, status, scope, page: String(page) });
      const next = await staffFetch<InquiryList>(`/api/staff/inquiries?${params}`);
      if (current !== sequence.current) return;
      if (newest.current !== undefined && next.newestId && next.newestId !== newest.current) {
        setNotificationMessage("收到新的合作需求，请查看未读列表。");
        if (typeof Notification !== "undefined" && Notification.permission === "granted") {
          try { new Notification("子殷 · 新合作需求", { body: "官网有新的合作需求，请登录工作台查看。", tag: "ziyin-inquiry" }); } catch { /* In-app reminder remains available. */ }
        }
      }
      newest.current = next.newestId;
      setData(next); setError(""); setLastRefresh(new Date().toLocaleTimeString("zh-CN", { hour12: false }));
      document.title = `${next.stats.unread ? `(${next.stats.unread} 条未读) ` : ""}合作需求管理 | 子殷科技`;
    } catch (e) {
      if (current !== sequence.current) return;
      setError(e instanceof Error ? e.message : "连接中断，请稍后刷新。"); onAuthError(e);
    } finally { if (current === sequence.current) setLoading(false); }
  }, [search, status, scope, page, onAuthError]);
  const latestRefresh = useRef(refresh);
  useEffect(() => { latestRefresh.current = refresh; }, [refresh]);
  const onChanged = useCallback(() => { void latestRefresh.current(); }, []);
  useEffect(() => {
    if (blocked) return;
    const requestSequence = sequence;
    let alive = true;
    const run = () => { if (alive && document.visibilityState === "visible") void refresh(); };
    void refresh();
    const timer = window.setInterval(run, 30000);
    document.addEventListener("visibilitychange", run);
    let unsubscribe = () => {};
    try {
      const { data: listener } = staffClient().auth.onAuthStateChange(event => {
        if (event === "SIGNED_OUT") { sequence.current++; setData(null); setSelected(null); setBlocked(true); router.replace("/staff/login"); }
      });
      unsubscribe = () => listener.subscription.unsubscribe();
    } catch { /* Configuration failure is shown by refresh. */ }
    return () => { alive = false; requestSequence.current++; window.clearInterval(timer); document.removeEventListener("visibilitychange", run); unsubscribe(); };
  }, [refresh, router, blocked]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty.current) event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);
  async function logout() {
    if (dirty.current && !window.confirm("有未保存的跟进内容，确定退出吗？")) return;
    const { error: logoutError } = await staffClient().auth.signOut({ scope: "local" });
    if (logoutError) { setError("退出失败，请检查网络后重试。"); return; }
    setData(null); setSelected(null); router.replace("/staff/login");
  }
  function select(id: string | null) {
    if (id === selected) return;
    if (dirty.current && !window.confirm("有未保存的跟进内容，确定离开这条需求吗？")) return;
    dirty.current = false; setSelected(id);
    if (id) window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }
  async function enableNotifications() {
    if (typeof Notification === "undefined") { setNotificationMessage("此浏览器不支持桌面提醒，站内未读提醒正常可用。"); return; }
    try {
      const permission = await Notification.requestPermission();
      setNotificationMessage(permission === "granted" ? "桌面提醒已开启。请保持工作台打开；关闭页面后仍会保留未读需求。" : "桌面提醒未开启，站内未读提醒正常可用。");
    } catch { setNotificationMessage("无法开启桌面提醒，站内未读提醒正常可用。"); }
  }
  const scopes = [["", "全部需求"], ["unread", "未读"], ["mine", "我负责的"], ["unassigned", "未分派"]];
  return <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-8">
    <header className="flex flex-wrap items-start justify-between gap-5">
      <div><p className="text-xs font-semibold tracking-widest text-blue-700">ZIYIN · 员工工作台</p><h1 className="mt-3 text-3xl font-semibold">合作需求管理</h1><p className="mt-3 text-sm text-slate-500">把官网提交的合作意向，接到具体的负责人和下一步行动。</p></div>
      <div className="flex items-center gap-3 text-sm">{data && <span>{data.member.display_name} · {data.member.role === "manager" ? "管理员" : "业务员工"}</span>}<button className="staff-secondary" onClick={() => void logout()}>退出登录</button></div>
    </header>
    <nav aria-label="工作台功能" className="mt-5"><Link href="/staff/comments" className="staff-secondary inline-block" onClick={event => { if (dirty.current && !window.confirm("有未保存的跟进内容，确定离开吗？")) event.preventDefault(); }}>文章评论管理 →</Link></nav>
    {error && <div className="staff-error mt-6" role="alert">{error}{!blocked && <button className="ml-3 underline" onClick={() => void refresh()}>重试</button>}{data && <p className="mt-1 text-xs">当前显示上次成功加载的数据，提醒检查已中断。</p>}</div>}
    {!data ? <p className="py-20 text-center text-slate-500">{blocked ? "请联系管理员开通权限，或退出后使用已授权账号登录。" : loading ? "正在验证权限并加载需求…" : "暂时无法加载工作台。"}</p> : <>
      <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="需求概览">
        {[["未读需求", data.stats.unread, "unread"], ["待联系", data.stats.pending, "pending"], ["我负责的", data.stats.mine, "mine"], ["全部需求", data.stats.total, ""]].map(([label, count, filter]) => <button key={label} className={`staff-card p-5 text-left ${filter === "unread" ? "border-blue-200 bg-blue-50/50" : ""}`} onClick={() => { setScope(filter === "pending" ? "" : String(filter)); setStatus(filter === "pending" ? "pending" : ""); setPage(1); }}><span className="text-sm text-slate-500">{label}</span><strong className="mt-2 block text-3xl font-semibold">{count}</strong></button>)}
      </section>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#e8f0f9] px-4 py-3 text-sm">
        <p role="status">{notificationMessage || (data.stats.unread ? `有 ${data.stats.unread} 条需求尚未阅读。打开详情后会标记已读。` : "当前没有未读需求。")}</p><button className="shrink-0 text-xs font-semibold text-blue-800 underline underline-offset-4" onClick={() => void enableNotifications()}>开启桌面提醒</button>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">工作台可见时每 30 秒检查新需求，关闭页面后不发送桌面通知。未读记录会保留至下次登录。{lastRefresh && ` 最近更新 ${lastRefresh}`}</p>
      <div className={`mt-7 grid items-start gap-5 ${selected ? "xl:grid-cols-[minmax(0,1.3fr)_minmax(360px,1fr)]" : ""}`}>
        <section className="staff-card min-w-0 overflow-hidden" aria-label="需求列表">
          <div className="flex flex-wrap gap-2 border-b border-slate-100 p-4">{scopes.map(([value, label]) => <button key={value} className={`rounded-lg px-3 py-2 text-sm ${scope === value ? "bg-[#163e7c] text-white" : "bg-slate-100 text-slate-600"}`} aria-pressed={scope === value} onClick={() => { setScope(value); setPage(1); }}>{label}</button>)}</div>
          <form className="flex flex-wrap items-end gap-3 p-4" onSubmit={e => { e.preventDefault(); setSearch(query); setPage(1); }}>
            <label className="staff-label min-w-40 flex-1">搜索需求<input className="staff-field mt-1" placeholder="姓名、机构或手机号" maxLength={80} value={query} onChange={e => setQuery(e.target.value)} /></label>
            <label className="staff-label">跟进状态<select className="staff-field mt-1" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}><option value="">全部状态</option>{Object.entries(inquiryStatuses).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
            <button className="staff-primary">搜索</button><button className="staff-secondary" type="button" onClick={() => void refresh()}>刷新</button>
          </form>
          {!data.items.length && <div className="px-6 py-16 text-center"><h2 className="font-semibold">{search || status || scope ? "没有符合条件的需求" : "暂时还没有合作需求"}</h2><p className="mt-2 text-sm text-slate-500">{search || status || scope ? "试试调整筛选条件或搜索关键词。" : "客户从官网提交成功后，会出现在这里。"}</p></div>}
          <ul>{data.items.map(item => <li key={item.id} className="border-t border-slate-100"><button className={`w-full p-5 text-left transition hover:bg-slate-50 ${selected === item.id ? "bg-blue-50/70" : ""}`} onClick={() => select(item.id)} aria-pressed={selected === item.id}>
            <div className="flex flex-wrap items-center justify-between gap-2"><span className="flex min-w-0 items-center gap-2 font-semibold">{!item.has_read && <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-label="未读" />}<span className="break-words">{item.hospital_name}</span></span><span className={`rounded-full px-2 py-1 text-xs ${item.status === "pending" ? "bg-amber-50 text-amber-800" : item.status === "converted" ? "bg-emerald-50 text-emerald-800" : "bg-blue-50 text-blue-800"}`}>{inquiryStatuses[item.status]}</span></div>
            <p className="mt-2 text-sm text-slate-600">{item.doctor_name} · {item.department || "未填写科室"}</p>
            <p className="mt-2 text-sm text-slate-500">{item.modules?.join(" / ") || "合作咨询"}</p>
            <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-400"><span>{displayTime(item.created_at)}</span><span>{item.assignee_name ? `负责人：${item.assignee_name}` : "待分派"} · 查看详情 →</span></div>
          </button></li>)}</ul>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 text-sm"><p className="text-slate-500">共 {data.total} 条 · 第 {page} 页</p><div className="flex gap-2"><button className="staff-secondary" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>上一页</button><button className="staff-secondary" disabled={page * data.pageSize >= data.total} onClick={() => setPage(p => p + 1)}>下一页</button></div></div>
        </section>
        {selected && <div ref={detailRef} className="scroll-mt-24"><InquiryDetail key={selected} id={selected} member={data.member} members={data.members} onClose={() => select(null)} onChanged={onChanged} onDirty={onDirty} onAuthError={onAuthError} /></div>}
      </div>
    </>}
  </div>;
}
