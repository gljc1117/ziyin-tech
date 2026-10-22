"use client";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { staffClient, staffFetch, StaffApiError } from "@/lib/staff-browser";
import NewsContent from "@/components/news/NewsContent";
import { articleFields, publishingCategories, type ArticleFields, type PublishingArticle, type PublishingList } from "@/lib/publishing-types";

const empty: ArticleFields = { title: "", summary: "", content: "", byline: "子殷科技", category: "学术观点" };
function fieldsOf(item: PublishingArticle): ArticleFields {
  return { title: item.title, summary: item.summary, content: item.content, byline: item.byline, category: item.category };
}
function displayTime(value: string) {
  return new Date(value).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
}
export default function PublishingManager() {
  const router = useRouter();
  const [data, setData] = useState<PublishingList | null>(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<PublishingArticle | null>(null);
  const [fields, setFields] = useState<ArticleFields>(empty);
  const [preview, setPreview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dirty = JSON.stringify(fields) !== JSON.stringify(selected ? fieldsOf(selected) : empty);
  const load = useCallback(async (nextPage: number) => {
    const result = await staffFetch<PublishingList>("/api/publishing/articles?page=" + nextPage);
    setData(result); setPage(nextPage);
  }, []);
  const handleError = useCallback((e: unknown) => {
    if (e instanceof StaffApiError && [401, 403].includes(e.status)) {
      setData(null); setSelected(null); setFields(empty); router.replace("/publishing/login");
    }
    setError(e instanceof Error ? e.message : "操作未完成，请稍后重试。");
  }, [router]);
  useEffect(() => {
    let active = true;
    staffFetch<PublishingList>("/api/publishing/articles").then(result => { if (active) setData(result); })
      .catch(e => { if (active) handleError(e); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [handleError]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function choose(item: PublishingArticle | null) {
    if (dirty && !window.confirm("当前内容尚未保存，确定切换文章吗？")) return;
    setSelected(item); setFields(item ? fieldsOf(item) : empty); setPreview(false);
    setError(""); setMessage(""); setConfirmed(false);
  }
  function change<K extends keyof ArticleFields>(name: K, value: ArticleFields[K]) {
    setFields(current => ({ ...current, [name]: value })); setConfirmed(false); setMessage("");
  }
  async function importText(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    if (!/\.(md|txt)$/i.test(file.name) || file.size > 800000) { setError("请导入 800 KB 以内的 UTF-8 .md 或 .txt 文件。Word 请复制正文到编辑区。"); return; }
    if (fields.content && !window.confirm("导入将替换当前编辑区正文，确定继续吗？")) return;
    try { const text = await file.text(); if (text.length > 200000) throw new Error("正文超过 20 万字。"); change("content", text); setError(""); }
    catch (e) { handleError(e); }
  }
  async function save(publish: boolean) {
    const checked = articleFields.safeParse(fields);
    if (!checked.success) { setError("标题需 2–160 字，署名需 1–120 字，摘要最多 1000 字，正文最多 20 万字。"); return; }
    if (publish && (checked.data.content.length < 20 || !confirmed)) { setError("发布正文至少 20 字，并请确认内容已获准公开。"); return; }
    setBusy(true); setError(""); setMessage("");
    let saved = selected;
    try {
      if (!saved) {
        const result = await staffFetch<{ item: PublishingArticle }>("/api/publishing/articles", { method: "POST", body: JSON.stringify(checked.data) });
        saved = result.item; setSelected(saved); setFields(fieldsOf(saved));
      } else if (!publish || saved.is_published) {
        const result = await staffFetch<{ item: PublishingArticle }>("/api/publishing/articles/" + saved.id, {
          method: "PATCH", body: JSON.stringify({ ...checked.data, version: saved.version, is_published: publish }),
        });
        saved = result.item; setSelected(saved); setFields(fieldsOf(saved));
      }
      if (publish && !saved.is_published) {
        const result = await staffFetch<{ item: PublishingArticle }>("/api/publishing/articles/" + saved.id, {
          method: "PATCH", body: JSON.stringify({ ...checked.data, version: saved.version, is_published: true }),
        });
        saved = result.item; setSelected(saved); setFields(fieldsOf(saved));
      }
      setConfirmed(false);
      setMessage(saved.is_published ? "文章已发布，可点击“查看官网文章”核对。" : "草稿已保存，官网访客不可见。");
      await load(page);
    } catch (e) { handleError(e); if (saved && !saved.is_published && publish) setMessage("草稿已保存，发布尚未完成。请核对提示后重试。"); }
    finally { setBusy(false); }
  }
  async function logout() {
    if (dirty && !window.confirm("尚有未保存内容，确定退出吗？")) return;
    try { await staffClient().auth.signOut({ scope: "local" }); router.replace("/publishing/login"); }
    catch (e) { handleError(e); }
  }
  if (loading) return <p className="p-10 text-center" role="status">正在核对发文权限…</p>;
  if (!data) return <div className="mx-auto max-w-xl p-10"><p role="alert">{error || "请先登录官网发文账号。"}</p><Link href="/publishing/login" className="mt-5 inline-block text-blue-700">前往发文登录</Link></div>;
  return <div className="mx-auto max-w-7xl px-5 py-8">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
      <div><p className="text-sm text-blue-700">ZIYIN · 动态与洞察</p><h1 className="mt-2 text-3xl font-semibold">官网发文工作台</h1><p className="mt-3 text-sm text-slate-600">{data.member.display_name} · 仅管理本人文章</p></div>
      <div className="flex gap-5 text-sm"><Link href="/news" target="_blank" rel="noopener noreferrer" className="text-blue-700">浏览官网</Link><button onClick={logout} disabled={busy}>退出账号</button></div>
    </header>
    <div className="mt-7 grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="staff-card p-4" aria-label="我的文章">
        <button className="staff-primary w-full" disabled={busy} onClick={() => choose(null)}>新建文章</button>
        <h2 className="mt-6 font-semibold">我的文章</h2>
        {!data.items.length && <p className="my-5 text-sm leading-7 text-slate-500">暂时没有文章，从新建草稿开始。</p>}
        <ul className="mt-3 space-y-2">{data.items.map(item => <li key={item.id}><button disabled={busy} onClick={() => choose(item)} className={`w-full rounded-lg border p-3 text-left ${selected?.id === item.id ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}>
          <span className="text-xs text-slate-500">{item.is_published ? "已发布" : "草稿"}</span><span className="mt-1 block break-words text-sm font-semibold">{item.title}</span><span className="mt-2 block text-xs text-slate-500">{displayTime(item.updated_at)}</span>
        </button></li>)}</ul>
        <div className="mt-5 flex justify-between text-sm"><button disabled={busy || page <= 1} onClick={() => load(page - 1).catch(handleError)}>上一页</button><span>{page}</span><button disabled={busy || !data.hasMore} onClick={() => load(page + 1).catch(handleError)}>下一页</button></div>
      </aside>
      <section className="staff-card min-w-0 p-5 md:p-8" aria-label="文章编辑区">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-semibold">{selected ? (selected.is_published ? "编辑已发布文章" : "编辑草稿") : "新建草稿"}</h2><button className="text-sm text-blue-700" onClick={() => setPreview(!preview)}>{preview ? "返回编辑" : "预览文章"}</button></div>
        {selected && <p className="mt-3 text-xs leading-6 text-slate-500">上次保存：{displayTime(selected.updated_at)} · 版本 {selected.version} · 历次保存和发布均有记录</p>}
        {preview ? <article className="mt-7 break-words"><p className="text-sm text-slate-500">{fields.category} · {fields.byline}</p><h3 className="mt-3 text-3xl font-semibold">{fields.title || "文章标题"}</h3><NewsContent content={fields.content || "请先填写正文。"} /></article> : <div className="mt-6 space-y-5">
          <label className="staff-label">标题<input className="staff-field mt-2" maxLength={160} value={fields.title} onChange={e => change("title", e.target.value)} disabled={busy} /></label>
          <div className="grid gap-5 md:grid-cols-2"><label className="staff-label">栏目<select className="staff-field mt-2" value={fields.category} onChange={e => change("category", e.target.value as ArticleFields["category"])} disabled={busy}>{publishingCategories.map(category => <option key={category}>{category}</option>)}</select></label><label className="staff-label">文章署名<input className="staff-field mt-2" maxLength={120} value={fields.byline} onChange={e => change("byline", e.target.value)} disabled={busy} /></label></div>
          <label className="staff-label">摘要<textarea className="staff-field mt-2" rows={3} maxLength={1000} value={fields.summary} onChange={e => change("summary", e.target.value)} disabled={busy} /></label>
          <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-slate-600">正文支持 Markdown，也可从 Word 复制文字。</p><label className="cursor-pointer text-sm font-semibold text-blue-700">导入 .md / .txt<input type="file" accept=".md,.txt,text/plain,text/markdown" className="sr-only" onChange={importText} disabled={busy} /></label></div>
          <label className="staff-label">正文<textarea className="staff-field mt-2 min-h-96 font-mono text-sm" rows={20} maxLength={200000} value={fields.content} onChange={e => change("content", e.target.value)} disabled={busy} /></label>
        </div>}
        {error && <p className="staff-error mt-5" role="alert">{error}</p>}{message && <p className="mt-5 text-sm leading-7 text-blue-800" role="status">{message}</p>}
        <div className="mt-7 border-t border-slate-200 pt-5">
          <label className="flex items-start gap-3 text-sm leading-6 text-slate-700"><input className="mt-1" type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} disabled={busy} />我已核对文章、署名与引用，确认内容和图片已获准公开，且不包含患者身份信息、账号密码或未获准公开的资料。</label>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {!selected?.is_published && <button disabled={busy} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold" onClick={() => save(false)}>保存草稿</button>}
            <button disabled={busy || !confirmed} className="staff-primary" onClick={() => save(true)}>{busy ? "正在保存…" : selected?.is_published ? "保存更新并同步官网" : "发布到官网"}</button>
            {selected?.is_published && <><button disabled={busy} className="text-sm text-slate-600" onClick={() => { if (window.confirm("确定将本文从官网撤回为草稿吗？")) void save(false); }}>撤回为草稿</button><Link href={"/news/" + selected.id} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-700">查看官网文章 →</Link></>}
            {dirty && <span className="text-xs text-amber-800">有未保存内容</span>}
          </div>
        </div>
      </section>
    </div>
  </div>;
}
