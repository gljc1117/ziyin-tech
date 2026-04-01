"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface SharePopoverProps {
  caseId: string;
  onClose: () => void;
}

export default function SharePopover({ caseId, onClose }: SharePopoverProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const shareUrl = `https://www.chcomct.cn/viewer?case=${caseId}`;

  useEffect(() => {
    QRCode.toDataURL(shareUrl, {
      width: 200,
      margin: 2,
      color: { dark: "#000000", light: "#FFFFFF" },
    }).then(setQrDataUrl);
  }, [shareUrl]);

  // Click outside to close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, [onClose]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
      <div
        ref={ref}
        className="w-72 rounded-xl bg-white p-5 shadow-2xl"
      >
        <h4 className="text-center text-sm font-medium text-gray-900">
          分享 3D 模型
        </h4>

        {qrDataUrl && (
          <div className="mt-3 flex justify-center">
            <img src={qrDataUrl} alt="QR Code" className="h-48 w-48" />
          </div>
        )}

        <p className="mt-2 text-center text-xs text-gray-500">
          扫码查看 3D 模型
        </p>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
          <span className="flex-1 truncate text-[11px] text-gray-600">
            {shareUrl}
          </span>
          <button
            onClick={copyLink}
            className="flex-shrink-0 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-blue-700"
          >
            {copied ? "已复制" : "复制"}
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-lg border border-gray-200 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
        >
          关闭
        </button>
      </div>
    </div>
  );
}
