-- Additive migration. Existing staff membership remains the authorization source.
-- Article IDs span both the source catalog and legacy news UUIDs.
create table public.article_comments (
  id uuid primary key default gen_random_uuid(),
  article_id text not null check (article_id ~ '^[a-z0-9][a-z0-9-]{0,159}$'),
  nickname text not null check (char_length(btrim(nickname)) between 2 and 30
    and nickname !~ '[<>\r\n]' and nickname !~ '子殷|官方|管理员'),
  body text not null check (char_length(btrim(body)) between 5 and 2000),
  submission_id uuid not null unique,
  status text not null default 'pending' check (status in ('pending', 'approved', 'hidden')),
  official_reply text check (char_length(btrim(official_reply)) between 1 and 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  replied_at timestamptz,
  moderated_by uuid references public.staff_members(user_id),
  version integer not null default 0
);
create index article_comments_public_idx on public.article_comments(article_id, created_at desc, id desc) where status = 'approved';
create index article_comments_queue_idx on public.article_comments(status, created_at desc, id desc);
create index article_comments_recent_idx on public.article_comments(created_at desc);
create index article_comments_nickname_idx on public.article_comments(article_id, lower(nickname), created_at desc);
create index article_comments_duplicate_idx on public.article_comments(article_id, md5(body), created_at desc);
create index article_comments_moderator_idx on public.article_comments(moderated_by);
alter table public.article_comments enable row level security;
revoke all on public.article_comments from public, anon, authenticated;
grant select (id, article_id, nickname, body, created_at, official_reply, replied_at, status)
  on public.article_comments to anon;
grant insert (article_id, nickname, body, submission_id) on public.article_comments to anon;
grant select on public.article_comments to authenticated;
grant update (status, official_reply) on public.article_comments to authenticated;
create policy comment_public_read on public.article_comments for select to anon using (status = 'approved');
create policy comment_public_submit on public.article_comments for insert to anon
  with check (status = 'pending' and version = 0 and official_reply is null and replied_at is null and moderated_by is null);
create policy comment_staff_read on public.article_comments for select to authenticated
  using ((select private.staff_role()) is not null);
create policy comment_staff_update on public.article_comments for update to authenticated
  using ((select private.staff_role()) is not null)
  with check ((select private.staff_role()) is not null);

-- Anonymous callers cannot read pending rows, including for deduplication/rate limits.
-- This private, non-callable trigger has the narrow privilege to count those rows.
-- It never returns their content and cannot approve, edit, or delete a comment.
create function private.guard_comment_intake() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is not null then raise exception 'anonymous_intake_only' using errcode = '42501'; end if;
  perform pg_catalog.pg_advisory_xact_lock(9024092401);
  if exists (select 1 from public.article_comments where submission_id = new.submission_id) then
    return null; -- A lost response can be retried without creating a duplicate.
  end if;
  new.nickname := btrim(new.nickname);
  new.body := btrim(new.body);
  if exists (select 1 from public.article_comments where article_id = new.article_id
      and md5(body) = md5(new.body) and created_at > now() - interval '24 hours')
    or exists (select 1 from public.article_comments where article_id = new.article_id
      and lower(nickname) = lower(new.nickname) and created_at > now() - interval '1 minute')
    or (select count(*) from public.article_comments where created_at > now() - interval '1 minute') >= 30
    or (select count(*) from public.article_comments where created_at > now() - interval '1 hour') >= 200 then
    raise exception 'comment_rate_limited' using errcode = 'P0429';
  end if;
  return new;
end;
$$;
revoke all on function private.guard_comment_intake() from public, anon, authenticated;
create trigger guard_comment_intake before insert on public.article_comments
  for each row execute function private.guard_comment_intake();

-- The caller still needs live staff membership, RLS, and column privileges.
create function private.guard_comment_moderation() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if private.staff_role() is null then raise exception 'staff_access_denied' using errcode = '42501'; end if;
  new.official_reply := nullif(btrim(new.official_reply), '');
  if new.official_reply is distinct from old.official_reply then
    new.replied_at := case when new.official_reply is null then null else clock_timestamp() end;
  end if;
  new.moderated_by := auth.uid();
  new.updated_at := clock_timestamp();
  new.version := old.version + 1;
  return new;
end;
$$;
revoke all on function private.guard_comment_moderation() from public, anon, authenticated;
create trigger guard_comment_moderation before update on public.article_comments
  for each row execute function private.guard_comment_moderation();
comment on table public.article_comments is 'Moderated article discussion. Public readers see approved content only. No emails, IPs or patient records are collected. Staff may change visibility and the official reply, never the reader text. The website checks article eligibility before intake and publication.';
