-- Employee access is an explicit allowlist. Signing up never grants access.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create table public.staff_members (
  user_id uuid primary key references auth.users(id),
  display_name text not null check (char_length(display_name) between 1 and 80),
  role text not null default 'member' check (role in ('manager', 'member')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.staff_members enable row level security;
revoke all on public.staff_members from public, anon, authenticated;
grant select on public.staff_members to authenticated;

-- The narrowly scoped definer avoids a recursive staff_members RLS lookup.
-- It can only answer the caller's own role, never accept another user's ID.
create function private.staff_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from public.staff_members where user_id = (select auth.uid()) and active;
$$;
revoke all on function private.staff_role() from public, anon;
grant execute on function private.staff_role() to authenticated;
create policy staff_directory_read on public.staff_members for select to authenticated
  using ((select private.staff_role()) is not null);

alter table public.demo_requests
  add column assigned_to uuid references public.staff_members(user_id),
  add column version integer not null default 0,
  add column updated_at timestamptz not null default now();
alter table public.demo_requests add constraint inquiry_status_valid
  check (status in ('pending', 'contacted', 'converted'));
create index demo_requests_created_idx on public.demo_requests(created_at desc, id desc);
create index demo_requests_assigned_idx on public.demo_requests(assigned_to);
create index demo_requests_status_idx on public.demo_requests(status);

-- Public intake retains insert-only access to its original fields.
-- Staff cannot alter the customer's original contact details or delete requests.
revoke all on public.demo_requests from public, anon, authenticated;
grant insert (doctor_name, hospital_name, department, phone, modules, monthly_cases, notes, status)
  on public.demo_requests to anon;
grant select on public.demo_requests to authenticated;
grant update (status, assigned_to) on public.demo_requests to authenticated;
drop policy "演示申请可写" on public.demo_requests;
create policy public_inquiry_insert on public.demo_requests for insert to anon
  with check (status = 'pending' and assigned_to is null and version = 0);
create policy staff_inquiry_read on public.demo_requests for select to authenticated
  using ((select private.staff_role()) is not null);
create policy staff_inquiry_update on public.demo_requests for update to authenticated
  using ((select private.staff_role()) is not null)
  with check ((select private.staff_role()) is not null);

create table public.inquiry_activity (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.demo_requests(id),
  actor_id uuid not null references public.staff_members(user_id),
  kind text not null check (kind in ('note', 'change')),
  body text check (char_length(body) between 1 and 2000),
  changes jsonb,
  created_at timestamptz not null default now()
);
create index inquiry_activity_inquiry_idx on public.inquiry_activity(inquiry_id, created_at desc);
create index inquiry_activity_actor_idx on public.inquiry_activity(actor_id);
alter table public.inquiry_activity enable row level security;
revoke all on public.inquiry_activity from public, anon, authenticated;
grant select on public.inquiry_activity to authenticated;
grant insert (inquiry_id, actor_id, kind, body) on public.inquiry_activity to authenticated;
create policy staff_activity_read on public.inquiry_activity for select to authenticated
  using ((select private.staff_role()) is not null);
create policy staff_note_insert on public.inquiry_activity for insert to authenticated
  with check ((select private.staff_role()) is not null and actor_id = (select auth.uid())
    and kind = 'note' and body is not null and changes is null);

create table public.inquiry_reads (
  user_id uuid not null references public.staff_members(user_id),
  inquiry_id uuid not null references public.demo_requests(id),
  read_at timestamptz not null default now(),
  primary key (user_id, inquiry_id)
);
create index inquiry_reads_inquiry_idx on public.inquiry_reads(inquiry_id);
alter table public.inquiry_reads enable row level security;
revoke all on public.inquiry_reads from public, anon, authenticated;
grant select, insert, update on public.inquiry_reads to authenticated;
create policy own_reads_select on public.inquiry_reads for select to authenticated
  using (user_id = (select auth.uid()) and (select private.staff_role()) is not null);
create policy own_reads_insert on public.inquiry_reads for insert to authenticated
  with check (user_id = (select auth.uid()) and (select private.staff_role()) is not null);
create policy own_reads_update on public.inquiry_reads for update to authenticated
  using (user_id = (select auth.uid()) and (select private.staff_role()) is not null)
  with check (user_id = (select auth.uid()) and (select private.staff_role()) is not null);

create function private.guard_inquiry_update() returns trigger
language plpgsql security invoker set search_path = '' as $$
declare caller_role text := private.staff_role();
begin
  if caller_role is null then raise exception 'staff_access_denied' using errcode = '42501'; end if;
  if new.status is null or new.status not in ('pending', 'contacted', 'converted') then
    raise exception 'invalid_status' using errcode = '22023';
  end if;
  if new.assigned_to is distinct from old.assigned_to then
    if caller_role <> 'manager' and not (old.assigned_to is null and new.assigned_to = auth.uid()) then
      raise exception 'manager_assignment_required' using errcode = '42501';
    end if;
    if new.assigned_to is not null and not exists (
      select 1 from public.staff_members where user_id = new.assigned_to and active
    ) then raise exception 'inactive_assignee' using errcode = '22023'; end if;
  end if;
  new.version := old.version + 1;
  new.updated_at := clock_timestamp();
  return new;
end;
$$;
revoke all on function private.guard_inquiry_update() from public, anon, authenticated;
create trigger guard_inquiry_update before update on public.demo_requests
  for each row execute function private.guard_inquiry_update();

-- System audit rows are generated only by this trigger, not by callers.
create function private.audit_inquiry_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if private.staff_role() is null then raise exception 'staff_access_denied' using errcode = '42501'; end if;
  if new.status is distinct from old.status or new.assigned_to is distinct from old.assigned_to then
    insert into public.inquiry_activity(inquiry_id, actor_id, kind, changes)
    values (new.id, auth.uid(), 'change', jsonb_build_object(
      'status_from', old.status, 'status_to', new.status,
      'assignee_from', old.assigned_to, 'assignee_to', new.assigned_to));
  end if;
  return new;
end;
$$;
revoke all on function private.audit_inquiry_update() from public, anon, authenticated;
create trigger audit_inquiry_update after update on public.demo_requests
  for each row execute function private.audit_inquiry_update();

-- RLS and column grants still apply; the function does not elevate its caller.
-- Version checking prevents an old screen from silently overwriting another employee.
create function public.staff_save_inquiry(
  request_id uuid, expected_version integer, next_status text, next_assignee uuid, followup text default null
) returns void language plpgsql security invoker set search_path = '' as $$
begin
  if private.staff_role() is null then raise exception 'staff_access_denied' using errcode = '42501'; end if;
  if followup is not null and char_length(followup) > 2000 then
    raise exception 'note_too_long' using errcode = '22023';
  end if;
  update public.demo_requests set status = next_status, assigned_to = next_assignee
    where id = request_id and version = expected_version;
  if not found then raise exception 'inquiry_conflict' using errcode = '40001'; end if;
  if nullif(btrim(followup), '') is not null then
    insert into public.inquiry_activity(inquiry_id, actor_id, kind, body)
      values (request_id, auth.uid(), 'note', btrim(followup));
  end if;
end;
$$;
revoke all on function public.staff_save_inquiry(uuid, integer, text, uuid, text) from public, anon;
grant execute on function public.staff_save_inquiry(uuid, integer, text, uuid, text) to authenticated;

create view public.staff_inquiry_overview with (security_invoker = true) as
select r.*, s.display_name as assignee_name,
  exists (select 1 from public.inquiry_reads seen where seen.inquiry_id = r.id and seen.user_id = (select auth.uid())) as has_read
from public.demo_requests r left join public.staff_members s on s.user_id = r.assigned_to;
revoke all on public.staff_inquiry_overview from public, anon, authenticated;
grant select on public.staff_inquiry_overview to authenticated;

comment on table public.staff_members is 'Only explicitly authorized inquiry handlers. All active members can read all inquiries. Managers can assign any active member; members can claim unassigned inquiries. Provision through a trusted database administrator; never through signup metadata.';
