// ============================================================
// 子殷科技 3D 重建影像平台 — 全局类型定义
// ============================================================

/* ---------- 通用 ---------- */
export type ID = string;
export type ISODateString = string;

/* ---------- 用户 / 角色 ---------- */
export type UserRole = "admin" | "doctor" | "engineer" | "viewer";

export interface UserProfile {
  id: ID;
  email: string;
  name: string;
  role: UserRole;
  hospital?: string;
  department?: string;
  avatar_url?: string;
  created_at: ISODateString;
}

/* ---------- DICOM & 3D ---------- */
export interface DicomStudy {
  id: ID;
  patient_id: string;
  patient_name: string;
  modality: "CT" | "MRI" | "PET" | "DR" | "OTHER";
  study_date: ISODateString;
  description: string;
  series_count: number;
  instance_count: number;
  storage_path: string;
  created_at: ISODateString;
}

export interface Model3D {
  id: ID;
  study_id: ID;
  name: string;
  format: "STL" | "OBJ" | "GLTF" | "PLY";
  file_url: string;
  thumbnail_url?: string;
  polygon_count?: number;
  material: ModelMaterial;
  status: ModelStatus;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export type ModelMaterial = "PEEK" | "Titanium" | "Resin" | "Nylon" | "Other";
export type ModelStatus = "processing" | "ready" | "printing" | "completed" | "failed";

/* ---------- COS Manifest ---------- */
export interface ManifestModel {
  name: string;
  format: string;
  url: string;
  size_mb: number;
  md5?: string;
}

export interface CaseManifest {
  case_id: string;
  generated_at: string;
  models: ManifestModel[];
}

/* ---------- 临床案例 ---------- */
export type CaseCategory =
  | "orthopedic"      // 骨科定制器械
  | "radiotherapy"    // 后装放疗模具
  | "surgical_guide"  // 手术导板
  | "implant"         // 植入物
  | "other";

export interface ClinicalCase {
  id: ID;
  title: string;
  slug: string;
  category: CaseCategory;
  hospital: string;
  department: string;
  doctor_name: string;
  summary: string;
  cover_image_url: string;
  images: string[];
  model_ids: ID[];
  tags: string[];
  is_published: boolean;
  published_at?: ISODateString;
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface CaseFilterParams {
  category?: CaseCategory;
  hospital?: string;
  tag?: string;
  search?: string;
  page?: number;
  per_page?: number;
}

/* ---------- Demo 预约 ---------- */
export interface DemoRequest {
  id: ID;
  name: string;
  phone: string;
  email?: string;
  hospital: string;
  department: string;
  position: string;
  interest: CaseCategory[];
  message?: string;
  status: "pending" | "contacted" | "scheduled" | "completed";
  created_at: ISODateString;
}

export type DemoRequestInput = Omit<DemoRequest, "id" | "status" | "created_at">;

/* ---------- API 响应 ---------- */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
