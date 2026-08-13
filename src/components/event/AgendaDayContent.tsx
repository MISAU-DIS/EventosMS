"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { EventAgendaDay } from "@/types/event";

type AgendaDayContentProps = {
  day: EventAgendaDay;
  calendarUrl: string;
};

export default function AgendaDayContent({
  day,
  calendarUrl,
}: AgendaDayContentProps) {
  return (
    <>
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center gap-2 text-orange-100 mb-3">
          <Calendar className="w-5 h-5" />
          <span className="text-lg font-semibold">{day.date}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sessões do LI Conselho Coordenador
        </h2>
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-white text-orange-700 hover:bg-orange-50 transition-all duration-300 shadow-lg"
        >
          <Calendar className="w-4 h-4" />
          <span>Adicionar ao Google Calendar</span>
        </a>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-1 h-8 bg-orange-500 rounded-full" />
          Temas do Dia
        </h3>

        <div className="space-y-3">
          {day.themes.map((theme, index) => (
            <motion.div
              key={theme.order}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-all duration-300 border border-transparent hover:border-orange-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-orange-100 group-hover:bg-orange-500 text-orange-600 group-hover:text-white rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800 font-medium leading-relaxed group-hover:text-orange-700 transition-colors">
                    {theme.title}
                  </p>
                  {theme.responsible && (
                    <p className="text-sm text-orange-700 mt-1 font-medium">
                      {theme.responsible}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-block bg-orange-50 text-orange-700 px-6 py-3 rounded-xl font-semibold">
          Total de {day.themes.length} temas programados
        </div>
      </div>
    </>
  );
}
