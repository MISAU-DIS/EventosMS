"use client";

import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";
import { getSessionColor } from "@/lib/session-colors";
import type { EventProgramDay } from "@/types/event";
import { eventConfig } from "@/data";

type ProgramDayContentProps = {
  day: EventProgramDay;
  dayIndex: number;
  totalDays: number;
};

export default function ProgramDayContent({
  day,
  dayIndex,
  totalDays,
}: ProgramDayContentProps) {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {eventConfig.title}
            </h2>
            <p className="text-gray-600">{day.date}</p>
          </div>
          <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            Dia {dayIndex + 1} de {totalDays}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-misau-200" />

        <div className="space-y-6">
          {day.sessions.map((session, index) => (
            <motion.div
              key={`${session.order}-${session.time}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="relative pl-20"
            >
              <div className="absolute left-6 top-6 w-4 h-4 bg-misau-light rounded-full border-4 border-white shadow-lg" />

              <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="lg:w-36 flex-shrink-0">
                      <div className="inline-flex items-center gap-2 bg-misau-50 text-misau-medium px-3 py-2 rounded-lg font-bold text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{session.time}</span>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                        {session.title}
                      </h3>
                      {session.speaker && (
                        <div className="flex items-center gap-2 text-misau-gold text-sm font-medium">
                          <Users className="w-4 h-4" />
                          <span>{session.speaker}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getSessionColor(
                          session.type,
                        )} shadow-sm`}
                      >
                        {session.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
