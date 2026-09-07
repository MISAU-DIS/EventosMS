"use client";

import { WifiOff } from "lucide-react";
import { useOffline } from "@/hooks/useOffline";

export default function OfflineBanner() {
  const offline = useOffline();

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 left-0 right-0 z-[100] bg-misau-shadow text-white text-sm sm:text-base py-2.5 px-4 flex items-center justify-center gap-2 shadow-md"
    >
      <WifiOff className="w-4 h-4 shrink-0" aria-hidden />
      <span className="font-medium">Modo offline</span>
      <span className="hidden sm:inline text-white/90">
        — a mostrar o último conteúdo disponível
      </span>
    </div>
  );
}
