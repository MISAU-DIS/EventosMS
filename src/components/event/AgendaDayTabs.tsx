"use client";

import { motion } from "framer-motion";
import type { EventAgendaDay } from "@/types/event";

type AgendaDayTabsProps = {
  days: EventAgendaDay[];
  selectedDay: string;
  onSelectDay: (dayId: string) => void;
};

export default function AgendaDayTabs({
  days,
  selectedDay,
  onSelectDay,
}: AgendaDayTabsProps) {
  return (
    <div className="w-full mb-8 sm:mb-12">
      <div className="bg-white rounded-xl sm:rounded-2xl border border-misau-100 p-3 sm:p-4 md:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {days.map((day, index) => {
            const isActive = selectedDay === day.id;
            return (
              <motion.button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 sm:p-5 md:p-6 rounded-xl transition-all duration-300 min-h-[88px] ${
                  isActive
                    ? "bg-gradient-to-br from-misau-light to-misau-gold text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-misau-50 hover:text-misau-gold border border-transparent hover:border-misau-100"
                }`}
              >
                <div className="text-xs sm:text-sm opacity-80 mb-1 font-medium">Dia</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                  {index + 1}
                </div>
                <div
                  className={`text-xs sm:text-sm md:text-base leading-tight ${
                    isActive ? "text-misau-bright" : "text-gray-500"
                  }`}
                >
                  {day.date.replace(" de Setembro de 2026", " Set")}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
