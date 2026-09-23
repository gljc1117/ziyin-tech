# 合作需求管理

入口：`https://www.chcomct.cn/staff/login`，也可在官网页脚点击「员工入口」。

## 使用

- 使用已开通的工作邮箱和密码登录。
- 未读需求、待联系、我负责的、全部需求显示统计；支持机构、姓名、手机号搜索和分页。
- 打开详情后，仅为当前员工标记已读，不影响同事的未读状态。
- 员工可以认领未分派需求、更新状态、填写跟进。管理员可以分派或取消分派。
- 状态、分派变更自动留痕；跟进记录保存后不能修改或删除。
- 保存遇到版本冲突时，刷新详情后再保存；刷新保留已经输入的跟进文字。
- 工作台打开且可见时，每 30 秒检查新需求。站内未读数量持续保留，也可选择开启浏览器桌面通知。浏览器不支持或用户拒绝通知权限时，站内提醒仍可用。关闭页面后不会推送通知。
- 当前版本未接入邮件或企业微信。外部渠道需要确认收件人、通知渠道和凭据后另外接入，不能把站内提醒当作离线推送。

## 首次开通（受信任的项目管理员）

### 密码设置与邀请

- 登录页提供「首次设置 / 忘记密码」入口：`https://www.chcomct.cn/staff/set-password`。
- Supabase Authentication → URL Configuration 的 Site URL 应设为 `https://www.chcomct.cn`，Redirect URLs 添加 `https://www.chcomct.cn/staff/set-password`。须保存后重新发送邮件；旧邮件的跳转地址不会自动改变。
- 受邀员工打开邀请或恢复密码邮件后，官网接收链接，验证身份并显示密码设置页。通过后台发出的邮件若返回官网首页，也会自动进入该页。
- 密码由员工本人填写，12—128 位并二次确认。保存后返回员工登录，使用邮箱及新密码登录。
- 邀请、恢复链接中的凭据仅在独立内存会话中使用，页面初始化立即清除地址栏凭据，不写入员工登录存储；缺失或失效链接不会复用已登录员工身份。任何链接均不能授予员工或管理员权限。
- 邮件请求显示受理结果，不宣称实际送达；实际送达、首次密码设置和真实员工登录必须由收件人验收。若邮件跳到 localhost，先修正上述 URL Configuration，再发送新邮件。
- 没有自助注册入口，不应删除已邀请账号来重建。

本功能不会自动创建账号、不会开放员工自助注册、不会根据邮箱后缀或用户元数据授予权限。生产环境最初没有任何员工账号，发布代码后须完成首次开通。

1. 在 Supabase 项目 `ziyin-tech` 的 Authentication → Users 中为经过确认的员工创建邮箱/密码账号。初始密码通过公司的安全渠道交付，勿写入 Git、工单或群聊。已有认证账号可直接使用。身份确认和密码重置由公司管理员负责。
2. 确认该员工需要查看**全部官网合作需求**。当前权限面向处理这些信息的业务员工，并非全体员工默认可见。
3. 在受信任的 SQL Editor 中按确认过的工作邮箱开通名单；替换以下占位文字。先开通一位 `manager`，其他工作人员一般用 `member`。管理员身份需要明确确认，不能从登录邮箱或职位自行推定。

```sql
-- 将三个值替换为确认过的工作邮箱、显示姓名和角色。
insert into public.staff_members(user_id, display_name, role)
select id, '员工姓名', 'manager'
from auth.users
where lower(email) = lower('confirmed-work-email@example.com')
on conflict (user_id) do update
set display_name = excluded.display_name, role = excluded.role, active = true;
-- 应返回且只返回一位授权员工。
select user_id, display_name, role, active from public.staff_members;
```

停用账号：在 `staff_members` 中把对应员工的 `active` 改为 `false`。下次请求立即失去权限；不要删除员工行以免破坏历史归属。员工列表及角色只能由受信任的数据库管理员维护，网页不能自行提权。

## 技术与上线

- Supabase Auth 登录；API 每次调用 `getUser(token)`，再检查有效员工名单。
- 员工会话使用独立的浏览器存储键 `ziyin-staff-auth`，API 只接受 Authorization Bearer，不接受 cookie 鉴权。每次请求新建 Supabase 客户端，使用调用者 JWT 和原有 anon key；不需要 service-role key。
- API 所有响应 `Cache-Control: private, no-store`；员工页面 `noindex`，页面静态壳不包含客户数据。
- 原始 `demo_requests` 保留；增加负责人、版本及更新时间，并新增员工、活动、个人已读表。RLS 控制实际访问；公开申请仍只能插入原有字段。
- `staff_inquiry_overview` 使用 `security_invoker`；写入 RPC 同样使用调用者权限。仅私有的自身角色查询和不可由客户端伪造的审计触发器使用限定的 definer 权限。
- 迁移文件由 Supabase CLI 生成：`supabase/migrations/20260923074638_staff_inquiry_management.sql`。先通过测试，再按原流程把该迁移应用到项目，然后发布应用。不需要修改现有公开环境变量。
- 初次开通后，用真实员工账号完成登录、分派、未读变化、跟进、退出验收。自动化测试使用隔离的合成数据，不能替代账号开通后的这一步。

验证：`npm run test:trust`、`npm run test:staff`、`npm run build`。数据库测试在隔离的 PostgreSQL/PGlite 中验证匿名、非员工、员工、管理员、停用账号、持久已读、审计与并发冲突，不写入生产客户资料。

生产中先前存在的「内部验收（非客户）」记录应视为测试数据，不应联系或计作实际客户。
