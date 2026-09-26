"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { commentDate, commentInput, type CommentPage } from "@/lib/article-comments";

export default function ArticleComments({ articleId }: { articleId: string }) {
  const [data, setData] = useState<CommentPage | null>(null);
  const [page, setPage] = useState(1);
  const [retry, setRetry] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [nickname, setNickname] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const attempt = useRef<{ signature: string; id: string } | null>(null);
  const busy = useRef(false);
  const endpoint = `/api/articles/${encodeURIComponent(articleId)}/comments`;
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true); setLoadError("");
      try {
        const response = await fetch(`${endpoint}?page=${page}`, { cache: "no-store", signal: controller.signal });
        const next = await response.json();
        if (!response.ok) throw new Error(next.error || "评论暂时无法加载。");
        if (!controller.signal.aborted) setData(next);
      } catch (error) {
        if (!controller.signal.aborted) { setData(null); setLoadError(error instanceof Error ? error.message : "连接中断，请重试。"); }
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void load();
    return () => controller.abort();
  }, [endpoint, page, retry]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    setMessage(""); setSubmitError("");
    const signature = JSON.stringify([articleId, nickname.trim(), body.trim()]);
    if (attempt.current?.signature !== signature) attempt.current = { signature, id: crypto.randomUUID() };
    const input = commentInput.safeParse({ nickname, body, website, submission_id: attempt.current.id });
    if (!input.success) { setSubmitError("请填写 2–30 字昵称和 5–2000 字评论，昵称请勿使用官方身份。"); return; }
    busy.current = true; setSending(true);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input.data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "评论未能保存，请稍后重试。");
      setMessage(result.message); setBody(""); attempt.current = null;
    } catch (error) { setSubmitError(error instanceof Error ? error.message : "连接中断，内容已保留，请重试。"); }
    finally { busy.current = false; setSending(false); }
  }
  return <section id="discussion" aria-labelledby="discussion-title" className="mt-14 scroll-mt-28 border-t border-slate-200 pt-9">
    <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800" aria-hidden="true"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 4V6a2 2 0 0 1 2-2Z" /><path d="M7 9h10M7 13h7" /></svg></span><h2 id="discussion-title" className="text-2xl font-semibold text-slate-900">交流与讨论</h2></div>
    <p className="mt-3 text-sm leading-7 text-slate-600">欢迎交流研究方法、技术问题与实践经验。评论经审核后公开，子殷团队可在此回复。</p>
    <form onSubmit={submit} className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <fieldset disabled={sending} className="min-w-0 space-y-4 disabled:opacity-60"><legend className="sr-only">发表一条评论</legend>
        <label className="block text-sm font-medium text-slate-800">昵称<span className="ml-2 text-xs font-normal text-slate-500">公开显示 · 无需注册</span><input value={nickname} onChange={event => setNickname(event.target.value)} required minLength={2} maxLength={30} autoComplete="nickname" placeholder="如何称呼您" className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-offset-2 focus:outline-cyan-700 sm:max-w-xs" /></label>
        <label className="block text-sm font-medium text-slate-800">评论内容<textarea value={body} onChange={event => setBody(event.target.value)} required minLength={5} maxLength={2000} rows={5} placeholder="您对本文有哪些看法或问题？" aria-describedby="comment-guidance" className="mt-2 block w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-3 font-normal leading-7 outline-offset-2 focus:outline-cyan-700" /></label>
        <div className="hidden" aria-hidden="true"><label>个人网站<input value={website} onChange={event => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label></div>
        <div className="flex flex-wrap items-center justify-between gap-3"><p id="comment-guidance" className="text-xs leading-6 text-slate-500">请勿提交患者姓名、病历、电话等个人信息。<br />项目需求请前往<Link href="/demo" className="font-medium text-cyan-800 underline underline-offset-4">联系合作</Link>。</p><span className="text-xs text-slate-500">{body.length}/2000</span></div>
        <p className="text-xs leading-6 text-slate-500">提交即申请审核并公开昵称和评论内容，信息处理详见<Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">隐私说明</Link>。</p>
        <button type="submit" className="rounded-lg bg-[#163e7c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102f61] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700 disabled:cursor-wait">{sending ? "正在提交…" : "提交评论"}</button>
      </fieldset>
      {message && <div role="status" className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm leading-6 text-emerald-800"><p className="font-semibold">系统提示 · 自动回执</p><p className="mt-1">{message}</p></div>}
      {submitError && <p role="alert" className="mt-4 text-sm leading-6 text-red-700">{submitError}</p>}
    </form>
    <div className="mt-8 flex items-center justify-between"><h3 className="font-semibold text-slate-800">公开讨论</h3><button type="button" disabled={loading} onClick={() => setRetry(value => value + 1)} className="text-sm text-cyan-800 underline underline-offset-4 disabled:opacity-50">刷新评论</button></div>
    <div aria-busy={loading} className="mt-4">
      {loading ? <p role="status" className="py-6 text-sm text-slate-500">正在加载讨论…</p> : loadError ? <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{loadError}</p> : data && <>
        {!data.items.length && <p className="rounded-xl border border-dashed border-slate-200 px-5 py-8 text-sm leading-7 text-slate-500">{page === 1 ? "还没有公开评论，欢迎提出您的第一个问题。" : "本页暂无评论，请返回上一页。"}</p>}
        <ul className="divide-y divide-slate-200">{data.items.map(item => <li key={item.id} className="py-6 first:pt-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1"><span className="break-all font-semibold text-slate-800">{item.nickname}</span><span className="text-xs text-slate-500">读者</span><time dateTime={item.created_at} className="text-xs text-slate-500">{commentDate(item.created_at)}</time></div>
          <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">{item.body}</p>
          {item.official_reply && <div className="mt-4 rounded-xl border-l-2 border-cyan-600 bg-cyan-50/70 p-4"><div className="flex flex-wrap items-center gap-3"><strong className="text-sm text-cyan-900">子殷科技 · 官方回复</strong>{item.replied_at && <time dateTime={item.replied_at} className="text-xs text-slate-500">{commentDate(item.replied_at)}</time>}</div><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">{item.official_reply}</p></div>}
        </li>)}</ul>
      </>}
    </div>
    {(page > 1 || data?.hasMore) && <nav aria-label="评论分页" className="mt-5 flex items-center justify-between gap-3 text-sm"><button type="button" disabled={loading || page <= 1} onClick={() => setPage(value => value - 1)} className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-40">上一页</button><span className="text-slate-500">第 {page} 页</span><button type="button" disabled={loading || !data?.hasMore} onClick={() => setPage(value => value + 1)} className="rounded-lg border border-slate-300 px-4 py-2 disabled:opacity-40">下一页</button></nav>}
  </section>;
}
