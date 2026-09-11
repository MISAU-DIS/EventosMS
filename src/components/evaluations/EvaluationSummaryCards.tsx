"use client";

import { MessageSquare, Star, Users } from "lucide-react";
import { formatRating } from "@/lib/evaluation-stats";

type EvaluationSummaryCardsProps = {
  total: number;
  overallAverage: number | null;
  uniqueRespondents: number;
  withComments: number;
};

export default function EvaluationSummaryCards({
  total,
  overallAverage,
  uniqueRespondents,
  withComments,
}: EvaluationSummaryCardsProps) {
  const cards = [
    {
      label: "Submissões",
      value: total,
      icon: MessageSquare,
      color: "bg-blue-500",
      sub: "avaliações recebidas",
    },
    {
      label: "Média geral",
      value: formatRating(overallAverage),
      icon: Star,
      color: "bg-amber-500",
      sub: "escala 0–5",
    },
    {
      label: "Respondentes",
      value: uniqueRespondents,
      icon: Users,
      color: "bg-emerald-500",
      sub: "participantes únicos",
    },
    {
      label: "Com comentário",
      value: withComments,
      icon: MessageSquare,
      color: "bg-purple-500",
      sub: "com observações escritas",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">{card.label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
            </div>
            <div className={`p-2 rounded-lg ${card.color}`}>
              <card.icon className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
