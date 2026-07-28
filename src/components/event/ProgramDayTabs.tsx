"use client";

import type { EventProgramDay } from "@/types/event";

type ProgramDayTabsProps = {
  days: EventProgramDay[];
  selectedDay: string;
  onSelectDay: (dayId: string) => void;
};

export default function ProgramDayTabs({
  days,
  selectedDay,
  onSelectDay,
}: ProgramDayTabsProps) {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-2 max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-2">
          {days.map((day) => {
            const isActive = selectedDay === day.id;
            const dayNumber = day.date.split(" ")[0];
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className={`relative px-3 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                <div className="text-xs opacity-80 mb-1">Ago</div>
                <div className="text-lg font-bold">{dayNumber}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
