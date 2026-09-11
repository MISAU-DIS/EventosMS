"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxPhoto = {
  src: string;
  alt: string;
  title: string;
};

type PhotoLightboxModalProps = {
  photos: LightboxPhoto[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function PhotoLightboxModal({
  photos,
  index,
  open,
  onClose,
  onIndexChange,
}: PhotoLightboxModalProps) {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onIndexChange(index - 1);
  }, [hasPrev, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (hasNext) onIndexChange(index + 1);
  }, [hasNext, index, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goPrev, goNext]);

  if (!open || !photo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizar ${photo.title}`}
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between gap-3 mb-3 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base truncate">{photo.title}</h3>
          <p className="text-xs text-white/70">
            {index + 1} de {photos.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 p-2 rounded-lg hover:bg-white/10"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="relative flex-1 min-h-0 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {hasPrev && (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 sm:left-2 z-10 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70"
            aria-label="Fotografia anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        {hasNext && (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 sm:right-2 z-10 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70"
            aria-label="Fotografia seguinte"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
