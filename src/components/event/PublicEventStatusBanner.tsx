"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Archive } from "lucide-react";
import { useActiveEventStatus } from "@/hooks/useActiveEventStatus";

const SKIP_PREFIXES = ["/Login", "/AdminDashboard", "/register", "/arquivo", "/eventos"];

export default function PublicEventStatusBanner() {
  const pathname = usePathname();
  const { loading, hasActiveEvent } = useActiveEventStatus();

  if (loading || hasActiveEvent) return null;
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-amber-900">
        <p>
          <strong>Sem actividade em andamento.</strong> Neste momento não há nenhum evento activo no portal.
        </p>
        <Link
          href="/arquivo"
          className="inline-flex items-center gap-1 font-semibold text-misau-medium hover:underline shrink-0"
        >
          <Archive className="w-4 h-4" />
          Ver eventos anteriores
        </Link>
      </div>
    </div>
  );
}
