-- Dedicated website publishing access, independent of customer-inquiry staff.
create table public.website_publishers (
  user_id uuid primary key references auth.users(id),
  display_name text not null check (char_length(btrim(display_name)) between 1 and 80),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.website_publishers enable row level security;
revoke all on public.website_publishers from public, anon, authenticated;
grant select on public.website_publishers to authenticated;
create policy own_publishing_membership on public.website_publishers for select to authenticated
  using (user_id = (select auth.uid()));

alter table public.news
  add column author_id uuid references auth.users(id),
  add column byline text not null default '子殷科技',
  add column updated_at timestamptz not null default now(),
  add column version integer not null default 0;
alter table public.news alter column is_published set default false;
alter table public.news enable row level security;
-- Permissive policies combine with OR. Remove the old unrestricted read policy.
drop policy if exists "Public read access" on public.news;
drop policy if exists "已发布新闻可读" on public.news;
create policy published_news_read on public.news for select to anon, authenticated
  using (is_published = true);
create policy publisher_own_news_read on public.news for select to authenticated
  using (author_id = (select auth.uid()) and exists (
    select 1 from public.website_publishers p where p.user_id = (select auth.uid()) and p.active
  ));
create policy publisher_own_news_insert on public.news for insert to authenticated
  with check (author_id = (select auth.uid()) and is_published = false and exists (
    select 1 from public.website_publishers p where p.user_id = (select auth.uid()) and p.active
  ));
create policy publisher_own_news_update on public.news for update to authenticated
  using (author_id = (select auth.uid()) and exists (
    select 1 from public.website_publishers p where p.user_id = (select auth.uid()) and p.active
  ))
  with check (author_id = (select auth.uid()) and exists (
    select 1 from public.website_publishers p where p.user_id = (select auth.uid()) and p.active
  ));
-- Clients cannot delete, forge ownership, timestamps, version or insert as published.
revoke all on public.news from public, anon, authenticated;
grant select (id,title,summary,content,cover_url,category,is_published,published_at,created_at,byline)
  on public.news to anon;
grant select on public.news to authenticated;
grant insert (title,summary,content,category,byline,author_id) on public.news to authenticated;
grant update (title,summary,content,category,byline,is_published) on public.news to authenticated;
alter table public.news add constraint publisher_news_valid check (
  author_id is null or (
    char_length(btrim(title)) between 2 and 160
    and summary is not null and char_length(summary) <= 1000
    and content is not null and char_length(content) <= 200000
    and (is_published is false or (is_published is true and char_length(btrim(content)) >= 20))
    and char_length(btrim(byline)) between 1 and 120
    and category in ('学术观点','技术进展','公司动态','合作动态','学术动态')
  )
);
create index news_author_updated_idx on public.news(author_id, updated_at desc) where author_id is not null;

create table public.news_revisions (
  id uuid primary key default gen_random_uuid(),
  news_id uuid not null references public.news(id),
  owner_id uuid not null references auth.users(id),
  actor_id uuid references auth.users(id),
  version integer not null,
  action text not null check (action in ('created','edited','published','withdrawn')),
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique (news_id, version)
);
alter table public.news_revisions enable row level security;
revoke all on public.news_revisions from public, anon, authenticated;
grant select on public.news_revisions to authenticated;
create policy publisher_own_revisions on public.news_revisions for select to authenticated
  using (owner_id = (select auth.uid()) and exists (
    select 1 from public.website_publishers p where p.user_id = (select auth.uid()) and p.active
  ));
create index news_revisions_owner_idx on public.news_revisions(owner_id,news_id,version desc);

create function private.guard_website_news() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null then
    if current_user not in ('postgres','service_role','supabase_admin') then
      raise exception 'publishing_access_denied' using errcode = '42501';
    end if;
  else
    if not exists (select 1 from public.website_publishers p where p.user_id = auth.uid() and p.active)
      or new.author_id is distinct from auth.uid()
      or (tg_op = 'UPDATE' and old.author_id is distinct from auth.uid()) then
      raise exception 'publishing_access_denied' using errcode = '42501';
    end if;
  end if;
  if tg_op = 'INSERT' then
    new.version := 0;
    new.created_at := clock_timestamp();
    if new.author_id is not null then new.is_published := false; new.published_at := null; end if;
  else
    new.version := old.version + 1;
    if new.author_id is not null then
      new.author_id := old.author_id;
      new.created_at := old.created_at;
      new.published_at := case when new.is_published and old.published_at is null
        then clock_timestamp() else old.published_at end;
    end if;
  end if;
  new.updated_at := clock_timestamp();
  return new;
end;
$$;
revoke all on function private.guard_website_news() from public, anon, authenticated;
create trigger guard_website_news before insert or update on public.news
  for each row execute function private.guard_website_news();

-- Only this trigger writes immutable content versions, without a supplied actor.
create function private.audit_website_news() returns trigger
language plpgsql security definer set search_path = '' as $$
declare change_action text;
begin
  if new.author_id is null then return new; end if;
  if tg_op = 'INSERT' then change_action := 'created';
  elsif new.is_published and not old.is_published then change_action := 'published';
  elsif not new.is_published and old.is_published then change_action := 'withdrawn';
  else change_action := 'edited'; end if;
  insert into public.news_revisions(news_id,owner_id,actor_id,version,action,snapshot)
    values(new.id,new.author_id,auth.uid(),new.version,change_action,to_jsonb(new));
  return new;
end;
$$;
revoke all on function private.audit_website_news() from public, anon, authenticated;
create trigger audit_website_news after insert or update on public.news
  for each row execute function private.audit_website_news();
comment on table public.website_publishers is 'Separate allowlist for own website articles only. No staff_members, customer inquiries, account administration, or editing others. Provision only after exact account identity verification.';
comment on table public.news_revisions is 'Immutable website article snapshots written by a private trigger. Publication does not make revisions or drafts public.';
