"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type PdfViewerModalProps = {
  url: string;
  title: string;
  open: boolean;
  onClose: () => void;
};

export default function PdfViewerModal({ url, title, open, onClose }: PdfViewerModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/70 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizar ${title}`}
    >
      <div className="flex items-center justify-between gap-3 mb-3 text-white">
        <h3 className="font-semibold text-sm sm:text-base truncate">{title}</h3>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 p-2 rounded-lg hover:bg-white/10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 min-h-0 bg-white rounded-xl overflow-hidden shadow-2xl">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
