"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  demoRequestSchema,
  demoProducts,
  demoVolumes,
  type DemoRequestData,
} from "@/lib/demo-request";
const departments = [
  "骨科",
  "脊柱外科",
  "关节外科",
  "创伤骨科",
  "胸外科",
  "放疗科",
  "口腔科",
  "影像科",
  "医工/科研/管理",
  "其他",
];
const descriptions = [
  "图像处理软件的功能、适用范围与演示",
  "三维建模、个性化设计及制造服务",
  "跟骨骨折专科研发与科研演示",
  "建设方案、技术操作与运营协作",
  "科研项目申报、协同研发与技术成果转化",
  "其他需求，欢迎在备注中说明",
];
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-500";
export default function DemoRequestForm({
  initialProduct,
}: {
  initialProduct?: string;
}) {
  const chosen = demoProducts.find((p) => p === initialProduct);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequestData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      products: chosen ? [chosen] : [],
      department: "",
      surgery_volume: "不适用",
    },
  });
  async function nextStep() {
    if (await trigger(["products", "notes"])) {
      setStep(2);
      requestAnimationFrame(() => titleRef.current?.focus());
    }
  }
  async function onSubmit(data: DemoRequestData) {
    setSubmitError("");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => null);
      if (res.ok && result?.success === true) setSubmitted(true);
      else
        setSubmitError(
          typeof result?.error === "string"
            ? result.error
            : "暂未确认提交成功，请稍后重试",
        );
    } catch {
      setSubmitError("网络连接中断，暂未确认提交成功，请检查网络后重试");
    }
  }
  if (submitted)
    return (
      <div
        role="status"
        className="rounded-xl border border-cyan-200 bg-cyan-50 p-8"
      >
        <p className="text-2xl font-semibold text-slate-900">合作需求已提交</p>
        <p className="mt-4 leading-7 text-slate-600">
          我们已收到您的需求，工作人员将据此与您联系。
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block font-medium text-blue-700"
        >
          继续了解产品与服务 →
        </Link>
      </div>
    );
  return (
    <form
      noValidate
      onSubmit={(e) => {
        if (step === 1) {
          e.preventDefault();
          void nextStep();
        } else {
          void handleSubmit(onSubmit)(e);
        }
      }}
    >
      <ol
        aria-label="填写进度"
        className="mb-8 flex gap-6 border-b border-slate-200 pb-5 text-sm"
      >
        {["选择需求", "联系信息"].map((label, i) => (
          <li
            key={label}
            aria-current={step === i + 1 ? "step" : undefined}
            className={
              step === i + 1 ? "font-semibold text-blue-800" : "text-slate-500"
            }
          >
            {i + 1}. {label}
          </li>
        ))}
      </ol>
      <h2
        ref={titleRef}
        tabIndex={-1}
        className="mb-6 text-xl font-semibold text-slate-900"
      >
        {step === 1 ? "您希望了解哪些服务？" : "留下工作联系信息"}
      </h2>
      {step === 1 ? (
        <div>
          <fieldset>
            <legend className="mb-4 text-sm text-slate-600">
              可多选，我们会根据需求安排沟通。
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {demoProducts.map((p, i) => (
                <label
                  key={p}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 has-checked:border-blue-700 has-checked:bg-blue-50"
                >
                  <input
                    type="checkbox"
                    value={p}
                    {...register("products")}
                    aria-invalid={!!errors.products}
                    aria-describedby={
                      errors.products ? "products-error" : undefined
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-blue-700"
                  />
                  <span>
                    <span className="text-sm font-semibold text-slate-800">
                      {p}
                    </span>
                    <span className="mt-2 block text-xs leading-6 text-slate-600">
                      {descriptions[i]}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {errors.products && (
              <p
                id="products-error"
                role="alert"
                className="mt-3 text-sm text-red-700"
              >
                {errors.products.message}
              </p>
            )}
          </fieldset>
          <label
            htmlFor="notes"
            className="mb-2 mt-7 block text-sm font-medium text-slate-800"
          >
            需求说明（选填）
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={3}
            maxLength={2000}
            placeholder="例如：希望了解科室三维建模服务或中心建设。请勿填写患者姓名、病历或影像信息。"
            className={inputClass}
          />
          {errors.notes && (
            <p role="alert" className="mt-2 text-sm text-red-700">
              {errors.notes.message}
            </p>
          )}
          <button
            type="button"
            onClick={nextStep}
            className="primary-button mt-6 w-full"
          >
            下一步：联系信息
          </button>
        </div>
      ) : (
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            {(
              [
                {
                  key: "name",
                  label: "姓名",
                  placeholder: "您的姓名",
                  autoComplete: "name",
                },
                {
                  key: "hospital",
                  label: "医院 / 机构",
                  placeholder: "医院或机构全称",
                  autoComplete: "organization",
                },
                {
                  key: "phone",
                  label: "手机号",
                  placeholder: "便于工作联系的手机号",
                  autoComplete: "tel",
                },
              ] as const
            ).map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  {field.label}
                </label>
                <input
                  id={field.key}
                  {...register(field.key)}
                  type={field.key === "phone" ? "tel" : "text"}
                  autoComplete={field.autoComplete}
                  maxLength={
                    field.key === "phone" ? 11 : field.key === "name" ? 50 : 120
                  }
                  placeholder={field.placeholder}
                  aria-invalid={!!errors[field.key]}
                  aria-describedby={
                    errors[field.key] ? `${field.key}-error` : undefined
                  }
                  className={inputClass}
                />
                {errors[field.key] && (
                  <p
                    id={`${field.key}-error`}
                    role="alert"
                    className="mt-2 text-sm text-red-700"
                  >
                    {errors[field.key]?.message}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label
                htmlFor="department"
                className="mb-2 block text-sm font-medium text-slate-800"
              >
                科室 / 部门
              </label>
              <select
                id="department"
                {...register("department")}
                aria-invalid={!!errors.department}
                aria-describedby={
                  errors.department ? "department-error" : undefined
                }
                className={inputClass}
              >
                <option value="">请选择</option>
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              {errors.department && (
                <p
                  id="department-error"
                  role="alert"
                  className="mt-2 text-sm text-red-700"
                >
                  {errors.department.message}
                </p>
              )}
            </div>
          </div>
          <label
            htmlFor="surgery_volume"
            className="mb-2 mt-6 block text-sm font-medium text-slate-800"
          >
            月手术量（选填）
          </label>
          <select
            id="surgery_volume"
            {...register("surgery_volume")}
            className={inputClass}
          >
            {demoVolumes.map((v) => (
              <option key={v} value={v}>
                {v === "不适用" ? "暂不提供 / 不适用" : `${v} 例`}
              </option>
            ))}
          </select>
          <p className="mt-5 text-xs leading-6 text-slate-600">
            信息仅用于本次演示预约与合作咨询跟进，请填写工作联系信息。
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                setStep(1);
                setSubmitError("");
              }}
              className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
            >
              上一步
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="primary-button flex-1 disabled:opacity-60"
            >
              {isSubmitting ? "正在提交…" : "提交合作需求"}
            </button>
          </div>
          {submitError && (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-800"
            >
              {submitError}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
