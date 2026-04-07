-- ============================================================
-- 子殷科技 3D 重建影像平台 — Supabase 数据库 Schema
-- 在 Supabase SQL Editor 中执行此脚本
-- ============================================================

-- 启用扩展
create extension if not exists "uuid-ossp";
create extension if not exists pg_trgm;

-- 合作医院
create table if not exists hospitals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text check (level in ('三甲','二甲','专科','其他')),
  city text,
  created_at timestamptz default now()
);

-- 临床案例
create table if not exists cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  hospital_id uuid references hospitals(id),
  surgery_type text check (surgery_type in
    ('spine','joint','trauma','custom')),
  body_part text,
  preview_url text,
  model_3d_path text,
  outcome_data jsonb default '{}',
  is_public boolean default true,
  published_at timestamptz default now()
);

-- 演示申请
create table if not exists demo_requests (
  id uuid primary key default gen_random_uuid(),
  doctor_name text not null,
  hospital_name text not null,
  department text,
  phone text not null,
  modules text[] default '{}',
  monthly_cases text,
  notes text,
  status text default 'pending'
    check (status in ('pending','contacted','converted')),
  created_at timestamptz default now()
);

-- RLS
alter table cases enable row level security;
alter table demo_requests enable row level security;
alter table hospitals enable row level security;

create policy "公开案例可读"
  on cases for select using (is_public = true);

create policy "医院信息可读"
  on hospitals for select using (true);

create policy "演示申请可写"
  on demo_requests for insert with check (true);

-- 索引
create index if not exists cases_surgery_type_idx
  on cases(surgery_type);
create index if not exists hospitals_name_trgm_idx
  on hospitals using gin(name gin_trgm_ops);

-- 新闻动态
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  content text,
  cover_url text,
  category text default '公司动态',
  is_published boolean default true,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table news enable row level security;

create policy "已发布新闻可读"
  on news for select using (is_published = true);

-- 种子数据（测试用）
insert into hospitals (name, level, city) values
  ('北京协和医院', '三甲', '北京'),
  ('上海瑞金医院', '三甲', '上海'),
  ('广州南方医院', '三甲', '广州')
on conflict do nothing;

insert into news (title, summary, category, published_at) values
  ('子殷科技完成数字骨科平台核心模块开发', '盘古AI三维重建系统完成CT/MRI DICOM数据自动分割与亚毫米级三维重建能力验证，标志着平台核心技术栈正式贯通。', '技术进展', '2026-03-15'),
  ('与内蒙古医科大学附属医院达成临床合作', '双方将在骨科3D打印手术导板、个性化植入物等领域开展深度合作，首批临床验证案例已启动。', '合作动态', '2026-03-01'),
  ('子殷科技官网正式上线', '全新官网 www.chcomct.cn 正式发布，展示数字骨科智能手术规划平台核心能力与临床案例。', '公司动态', '2026-02-20')
on conflict do nothing;
