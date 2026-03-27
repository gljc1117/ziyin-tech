# 子殷科技 3D 重建影像平台

内蒙古子殷科技有限公司医疗级 3D 重建影像平台，面向骨科医生提供 CT/MRI 三维重建、AI 手术规划、有限元分析及 AR 导航能力。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) + TypeScript |
| 样式 | Tailwind CSS 4 |
| 3D | React Three Fiber + Three.js + @react-three/drei |
| 动画 | Framer Motion |
| 表单 | React Hook Form + Zod |
| 后端 | Supabase (PostgreSQL + Auth + Storage) |
| 部署 | Vercel |

## 本地启动

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量（编辑 .env.local 填入 Supabase 密钥）
cp .env.local .env.local.backup

# 3. 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## Supabase 配置

1. 在 [supabase.com](https://supabase.com) 创建新项目
2. 进入 SQL Editor，粘贴 `supabase/schema.sql` 并执行
3. 从 Project Settings → API 中复制密钥填入 `.env.local`

## Vercel 部署

```bash
# 方式一：CLI
npx vercel

# 方式二：GitHub 集成
# 推送到 GitHub 后在 Vercel Dashboard 导入仓库
```

在 Vercel 项目设置中添加以下环境变量：

## 环境变量说明

| 变量名 | 说明 | 获取位置 |
|--------|------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名公钥 | Dashboard → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务端密钥（勿暴露） | Dashboard → Settings → API → service_role |

## 许可

本项目为内蒙古子殷科技有限公司内部产品，保留所有权利。
