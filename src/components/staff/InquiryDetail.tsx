"use client";
import { useCallback, useEffect, useState } from "react";
import { StaffApiError, staffFetch } from "@/lib/staff-browser";
import { inquiryStatuses, type InquiryDetail as Detail, type InquiryStatus, type StaffMember } from "@/lib/staff-types";
export function displayTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", dateStyle: "short", timeStyle: "short", hour12: false }).format(new Date(value));
}
export default function InquiryDetail({ id, member, members, onClose, onChanged, onDirty, onAuthError }: {
  id: string; member: StaffMember; members: StaffMember[]; onClose: () => void;
  onChanged: () => void; onDirty: (dirty: boolean) => void; onAuthError: (error: unknown) => void;
}) {
  const [data, setData] = useState<Detail | null>(null);
  const [status, setStatus] = useState<InquiryStatus>("pending");
  const [assignee, setAssignee] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const dirty = Boolean(data && (status !== data.inquiry.status || assignee !== (data.inquiry.assigned_to || "") || note.trim()));
  useEffect(() => { onDirty(dirty); }, [dirty, onDirty]);
  const load = useCallback(async () => {
    const next = await staffFetch<Detail>(`/api/staff/inquiries/${id}`);
    setData(next); setStatus(next.inquiry.status); setAssignee(next.inquiry.assigned_to || "");
    return next;
  }, [id]);
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const next = await staffFetch<Detail>(`/api/staff/inquiries/${id}`);
        if (cancelled) return;
        setData(next); setStatus(next.inquiry.status); setAssignee(next.inquiry.assigned_to || "");
        await staffFetch(`/api/staff/inquiries/${id}/read`, { method: "POST" });
        if (!cancelled) onChanged();
      } catch (e) { if (!cancelled) { setError(e instanceof Error ? e.message : "加载失败，请重试。"); onAuthError(e); } }
    })();
    return () => { cancelled = true; };
  }, [id, onChanged, onAuthError]);
  async function save() {
    if (!data) return;
    setBusy(true); setError(""); setMessage("");
    try {
      await staffFetch(`/api/staff/inquiries/${id}`, { method: "PATCH", body: JSON.stringify({ version: data.inquiry.version, status, assigned_to: assignee || null, note }) });
      setNote(""); onDirty(false); setMessage("已保存跟进。"); onChanged();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存失败，请重试。");
      if (e instanceof StaffApiError && e.status === 409) setMessage("刷新详情会更新状态与负责人，已输入的跟进文字会保留。");
      onAuthError(e);
    } finally { setBusy(false); }
  }
  const name = (userId: string | null) => userId ? members.find(m => m.user_id === userId)?.display_name || "历史员工" : "未分派";
  return <section className="staff-card self-start p-5 md:p-6" aria-label="需求详情">
    <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">需求详情</h2><button className="staff-secondary" onClick={onClose} disabled={busy}>关闭</button></div>
    {error && <p className="staff-error mt-4" role="alert">{error}</p>}
    {message && <p className="mt-3 text-sm text-blue-800" role="status">{message}</p>}
    {!data ? <div className="py-10 text-sm text-slate-500">{error ? <button className="staff-secondary" onClick={() => void load().catch(onAuthError)}>重新加载</button> : "正在加载…"}</div> : <>
      <p className="mt-5 text-lg font-semibold break-words">{data.inquiry.hospital_name}</p>
      <dl className="mt-4 grid grid-cols-[5rem_1fr] gap-x-3 gap-y-3 text-sm leading-6">
        <dt className="text-slate-500">联系人</dt><dd className="break-words">{data.inquiry.doctor_name}</dd>
        <dt className="text-slate-500">联系电话</dt><dd>{data.inquiry.phone}</dd>
        <dt className="text-slate-500">科室 / 部门</dt><dd>{data.inquiry.department || "未填写"}</dd>
        <dt className="text-slate-500">合作方向</dt><dd>{data.inquiry.modules?.join("、") || "未填写"}</dd>
        <dt className="text-slate-500">月手术量</dt><dd>{data.inquiry.monthly_cases || "未填写"}</dd>
        <dt className="text-slate-500">提交时间</dt><dd>{displayTime(data.inquiry.created_at)}</dd>
        <dt className="text-slate-500">客户留言</dt><dd className="whitespace-pre-wrap break-words">{data.inquiry.notes || "未填写"}</dd>
      </dl>
      <p className="mt-4 text-xs text-slate-400">需求编号：{data.inquiry.id}</p>
      <form className="mt-6 space-y-4 border-t border-slate-200 pt-5" onSubmit={e => { e.preventDefault(); void save(); }}>
        <label className="staff-label">跟进状态<select className="staff-field mt-2" value={status} disabled={busy} onChange={e => setStatus(e.target.value as InquiryStatus)}>{Object.entries(inquiryStatuses).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label className="staff-label">负责人<select className="staff-field mt-2" value={assignee} disabled={busy || member.role !== "manager"} onChange={e => setAssignee(e.target.value)}>
          <option value="">未分派</option>{members.filter(m => m.active || m.user_id === assignee).map(m => <option key={m.user_id} value={m.user_id} disabled={!m.active}>{m.display_name}{!m.active ? "（已停用）" : ""}</option>)}
        </select></label>
        {member.role !== "manager" && !data.inquiry.assigned_to && <button className="staff-secondary" type="button" disabled={busy || assignee === member.user_id} onClick={() => setAssignee(member.user_id)}>{assignee === member.user_id ? "保存后由我负责" : "由我认领"}</button>}
        <label className="staff-label">新增跟进记录<textarea className="staff-field mt-2 min-h-28" maxLength={2000} value={note} disabled={busy} onChange={e => setNote(e.target.value)} placeholder="记录沟通结果、下一步安排。请勿填写患者信息。" /></label>
        <div className="flex flex-wrap gap-2"><button className="staff-primary" disabled={busy || !dirty}>{busy ? "正在保存…" : "保存跟进"}</button><button className="staff-secondary" type="button" disabled={busy} onClick={() => { if (dirty && !window.confirm("刷新将重新加载状态与负责人，保留跟进文字。继续吗？")) return; setError(""); void load().catch(e => { setError(e instanceof Error ? e.message : "刷新失败。"); onAuthError(e); }); }}>刷新详情</button></div>
      </form>
      <div className="mt-7 border-t border-slate-200 pt-5"><h3 className="font-semibold">跟进历史</h3><p className="mt-1 text-xs text-slate-500">最近 100 条 · 北京时间 · 保存后不可删除</p>
        {!data.activity.length && <p className="mt-5 text-sm text-slate-500">还没有跟进记录。</p>}
        <ol className="mt-4 space-y-4">{data.activity.map(item => <li key={item.id} className="border-l-2 border-blue-100 pl-3 text-sm leading-6">
          <p className="text-xs text-slate-500">{name(item.actor_id)} · {displayTime(item.created_at)}</p>
          {item.kind === "note" ? <p className="mt-1 whitespace-pre-wrap break-words">{item.body}</p> : <div className="mt-1">
            {item.changes?.status_from !== item.changes?.status_to && <p>状态：{inquiryStatuses[item.changes!.status_from] || "待联系"} → {inquiryStatuses[item.changes!.status_to]}</p>}
            {item.changes?.assignee_from !== item.changes?.assignee_to && <p>负责人：{name(item.changes!.assignee_from)} → {name(item.changes!.assignee_to)}</p>}
          </div>}
        </li>)}</ol>
      </div>
    </>}
  </section>;
}
