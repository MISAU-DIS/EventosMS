"use client";

import Link from "next/link";
import { Archive, CalendarOff } from "lucide-react";

type NoActiveEventNoticeProps = {
  compact?: boolean;
};

export default function NoActiveEventNotice({ compact = false }: NoActiveEventNoticeProps) {
  if (compact) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p className="font-medium">Neste momento não há nenhuma actividade em andamento no portal.</p>
        <Link href="/arquivo" className="inline-flex items-center gap-1 mt-1 font-semibold text-misau-medium hover:underline">
          <Archive className="w-4 h-4" />
          Ver eventos anteriores
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center border border-misau-100">
      <CalendarOff className="w-12 h-12 sm:w-16 sm:h-16 text-misau-gold mx-auto mb-4 sm:mb-6" />
      <h2 className="text-xl sm:text-2xl font-bold text-misau-medium mb-3 sm:mb-4">
        Sem actividade em andamento
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
        De momento não existe nenhum evento activo no portal do MISAU. Pode consultar
        reuniões e actividades anteriores no arquivo.
      </p>
      <Link
        href="/arquivo"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-misau-medium text-white font-semibold hover:bg-misau-dark transition-colors"
      >
        <Archive className="w-4 h-4" />
        Ver eventos anteriores
      </Link>
    </div>
  );
}
