"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Schema ---------- */
const schema = z.object({
  name: z.string().min(2, "请输入姓名"),
  hospital: z.string().min(2, "请输入医院名称"),
  department: z.string().min(1, "请选择科室"),
  phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效手机号"),
  products: z.array(z.string()).min(1, "请至少选择一个产品模块"),
  surgery_volume: z.string().min(1, "请选择月手术量"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const departments = ["骨科", "脊柱外科", "关节外科", "创伤骨科", "放疗科", "口腔科"];
const products = ["3D重建", "术前规划", "AI辅助测量", "手术导航"];
const volumes = ["<20", "20-50", ">50"];

/* ---------- 步骤进度条 ---------- */
function StepBar({ current }: { current: number }) {
  const labels = ["基本信息", "需求意向", "补充提交"];
  return (
    <div className="mb-8 flex items-center justify-between">
      {labels.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              {i > 0 && (
                <div
                  className={`h-0.5 flex-1 transition-colors ${done ? "bg-cyan-400" : "bg-white/20"}`}
                />
              )}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  active
                    ? "bg-cyan-400 text-gray-900"
                    : done
                      ? "bg-cyan-400/80 text-gray-900"
                      : "bg-white/20 text-white/50"
                }`}
              >
                {done ? "✓" : step}
              </div>
              {i < labels.length - 1 && (
                <div
                  className={`h-0.5 flex-1 transition-colors ${done ? "bg-cyan-400" : "bg-white/20"}`}
                />
              )}
            </div>
            <span className={`text-xs ${active ? "text-cyan-300" : "text-white/40"}`}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- 共用样式 ---------- */
const inputCls =
  "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30";
const labelCls = "mb-1.5 block text-sm font-medium text-white/80";
const errorCls = "mt-1 text-xs text-red-400";

/* ---------- 主组件 ---------- */
export default function DemoRequestForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { products: [], surgery_volume: "", department: "" },
  });

  async function nextStep() {
    const fields: (keyof FormData)[][] = [
      ["name", "hospital", "department", "phone"],
      ["products", "surgery_volume"],
    ];
    const valid = await trigger(fields[step - 1]);
    if (valid) setStep((s) => s + 1);
  }

  async function onSubmit(data: FormData) {
    setSubmitError("");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError("提交失败，请稍后重试");
      }
    } catch {
      setSubmitError("网络错误，请检查网络连接后重试");
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-cyan-400/10 border border-cyan-400/30 p-10 text-center"
      >
        <div className="text-4xl">✅</div>
        <p className="mt-4 text-lg font-semibold text-white">预约成功</p>
        <p className="mt-2 text-sm text-white/60">我们将在 24 小时内联系您</p>
      </motion.div>
    );
  }

  const pageVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg">
      <StepBar current={step} />

      <AnimatePresence mode="wait">
        {/* ---- Step 1 ---- */}
        {step === 1 && (
          <motion.div
            key="s1"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div>
              <label className={labelCls}>姓名</label>
              <input {...register("name")} className={inputCls} placeholder="张医生" />
              {errors.name && <p className={errorCls}>{errors.name.message}</p>}
            </div>
            <div>
              <label className={labelCls}>医院</label>
              <input {...register("hospital")} className={inputCls} placeholder="XX人民医院" />
              {errors.hospital && <p className={errorCls}>{errors.hospital.message}</p>}
            </div>
            <div>
              <label className={labelCls}>科室</label>
              <select {...register("department")} className={inputCls}>
                <option value="" disabled>请选择</option>
                {departments.map((d) => (
                  <option key={d} value={d} className="text-gray-900">{d}</option>
                ))}
              </select>
              {errors.department && <p className={errorCls}>{errors.department.message}</p>}
            </div>
            <div>
              <label className={labelCls}>手机号</label>
              <input {...register("phone")} className={inputCls} placeholder="13800138000" />
              {errors.phone && <p className={errorCls}>{errors.phone.message}</p>}
            </div>
            <button
              type="button"
              onClick={nextStep}
              className="mt-2 w-full rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
            >
              下一步
            </button>
          </motion.div>
        )}

        {/* ---- Step 2 ---- */}
        {step === 2 && (
          <motion.div
            key="s2"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div>
              <label className={labelCls}>产品模块（多选）</label>
              <div className="grid grid-cols-2 gap-3">
                {products.map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      value={p}
                      {...register("products")}
                      className="accent-cyan-400"
                    />
                    {p}
                  </label>
                ))}
              </div>
              {errors.products && <p className={errorCls}>{errors.products.message}</p>}
            </div>
            <div>
              <label className={labelCls}>月手术量</label>
              <div className="flex gap-3">
                {volumes.map((v) => (
                  <label key={v} className="flex items-center gap-2 text-sm text-white/80">
                    <input
                      type="radio"
                      value={v}
                      {...register("surgery_volume")}
                      className="accent-cyan-400"
                    />
                    {v}
                  </label>
                ))}
              </div>
              {errors.surgery_volume && <p className={errorCls}>{errors.surgery_volume.message}</p>}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-lg border border-white/20 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
              >
                上一步
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
              >
                下一步
              </button>
            </div>
          </motion.div>
        )}

        {/* ---- Step 3 ---- */}
        {step === 3 && (
          <motion.div
            key="s3"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div>
              <label className={labelCls}>备注（选填）</label>
              <textarea
                {...register("notes")}
                rows={4}
                className={inputCls}
                placeholder="请描述您的具体需求或问题…"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded-lg border border-white/20 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
              >
                上一步
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "提交中…" : "提交预约"}
              </button>
            </div>
            {submitError && (
              <p className="mt-3 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-center text-sm text-red-400">
                {submitError}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
