"use client";

import type { EvaluationDayId } from "@/types/comments";
import { evaluationDays } from "@/types/comments";

type EvaluationDayTabsProps = {
  selectedDay: EvaluationDayId;
  onSelect: (dayId: EvaluationDayId) => void;
};

export default function EvaluationDayTabs({
  selectedDay,
  onSelect,
}: EvaluationDayTabsProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
      {evaluationDays.map((day) => {
        const isActive = selectedDay === day.id;
        return (
          <button
            key={day.id}
            type="button"
            onClick={() => onSelect(day.id)}
            className={`px-3 sm:px-5 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 min-h-[48px] ${
              isActive
                ? "bg-misau-gold text-white sm:scale-105"
                : "bg-white text-misau-medium hover:bg-misau-50 border border-misau-100"
            }`}
          >
            {day.label}
          </button>
        );
      })}
    </div>
  );
}
