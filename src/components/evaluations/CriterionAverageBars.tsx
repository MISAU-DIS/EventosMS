"use client";

import { formatRating, ratingColor } from "@/lib/evaluation-stats";

type CriterionAverage = {
  id: string;
  label: string;
  average: number | null;
  count: number;
};

type CriterionAverageBarsProps = {
  items: CriterionAverage[];
  compact?: boolean;
};

export default function CriterionAverageBars({ items, compact = false }: CriterionAverageBarsProps) {
  if (!items.length) {
    return <p className="text-sm text-gray-500 italic">Sem dados de avaliação.</p>;
  }

  return (
    <ul className={compact ? "space-y-2" : "space-y-3"}>
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex items-center justify-between gap-3 text-sm mb-1">
            <span className="font-medium text-gray-800 truncate">{item.label}</span>
            <span className="shrink-0 tabular-nums text-gray-600">
              <strong className="text-misau-dark">{formatRating(item.average)}</strong>
              <span className="text-gray-400"> /5</span>
              {!compact && item.count > 0 && (
                <span className="text-xs text-gray-400 ml-1">({item.count})</span>
              )}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${ratingColor(item.average)}`}
              style={{ width: `${((item.average ?? 0) / 5) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
