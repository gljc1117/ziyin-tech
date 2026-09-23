export const inquiryStatuses = { pending: "待联系", contacted: "跟进中", converted: "已转化" } as const;
export type InquiryStatus = keyof typeof inquiryStatuses;
export type StaffMember = { user_id: string; display_name: string; role: "manager" | "member"; active: boolean };
export type Inquiry = {
  id: string; doctor_name: string; hospital_name: string; department: string | null;
  phone: string; modules: string[] | null; monthly_cases: string | null; notes: string | null;
  status: InquiryStatus; created_at: string; updated_at: string; version: number;
  assigned_to: string | null; assignee_name: string | null; has_read: boolean;
};
export type Activity = {
  id: string; actor_id: string; kind: "note" | "change"; body: string | null; created_at: string;
  changes: { status_from: InquiryStatus; status_to: InquiryStatus; assignee_from: string | null; assignee_to: string | null } | null;
};
export type InquiryList = {
  items: Inquiry[]; total: number; page: number; pageSize: number;
  stats: { unread: number; pending: number; mine: number; total: number };
  newestId: string | null; member: StaffMember; members: StaffMember[];
};
export type InquiryDetail = { inquiry: Inquiry; activity: Activity[] };
