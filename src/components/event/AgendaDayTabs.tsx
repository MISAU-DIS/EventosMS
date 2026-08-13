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
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-2xl shadow-lg p-3">
        <div className="grid grid-cols-3 gap-3">
          {days.map((day, index) => {
            const isActive = selectedDay === day.id;
            return (
              <motion.button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl"
                    : "bg-gray-50 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <div className="text-xs opacity-80 mb-1 font-medium">Dia</div>
                <div className="text-2xl font-bold mb-2">{index + 1}</div>
                <div
                  className={`text-xs ${
                    isActive ? "text-orange-100" : "text-gray-500"
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
