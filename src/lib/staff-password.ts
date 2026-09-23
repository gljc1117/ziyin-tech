import type { SupabaseClient } from "@supabase/supabase-js";

export const setupLinkError = "设置链接无效或已过期，请重新申请邮件，并打开最新的一封。";

export function readPasswordSetupLink(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  const type = params.get("type");
  if (params.has("error") || params.has("error_code")) throw new Error(setupLinkError);
  if ((type !== "invite" && type !== "recovery") ||
      ["type", "access_token", "refresh_token"].some(key => params.getAll(key).length !== 1) ||
      !params.get("access_token") || !params.get("refresh_token")) {
    throw new Error(setupLinkError);
  }
  return { access_token: params.get("access_token")!, refresh_token: params.get("refresh_token")! };
}

export function isPasswordSetupCallback(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return ["invite", "recovery"].includes(params.get("type") || "") ||
    params.has("error_code") || (params.has("access_token") && params.has("refresh_token"));
}

export async function establishPasswordSetupSession(client: SupabaseClient, hash: string) {
  // Only this email callback may establish a setup session. Never use another
  // employee's existing browser session as a fallback for a missing/expired link.
  const credentials = readPasswordSetupLink(hash);
  const { error } = await client.auth.setSession(credentials);
  if (error) throw new Error(setupLinkError);
  const { data: { user }, error: userError } = await client.auth.getUser();
  if (userError || !user?.email) throw new Error(setupLinkError);
  return user.email;
}

export function validateStaffPassword(password: string, confirmation: string) {
  if (password.length < 12 || password.length > 128) return "请设置 12—128 位密码。";
  if (password !== confirmation) return "两次输入的密码不一致，请重新输入。";
  return "";
}
