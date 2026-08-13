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
      <div className="bg-gradient-to-r from-misau-gold to-misau-medium text-white rounded-xl sm:rounded-2xl border border-misau-gold/20 p-5 sm:p-8 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-misau-bright mb-3">
          <Calendar className="w-5 h-5 shrink-0" />
          <span className="text-base sm:text-lg md:text-xl font-semibold">{day.date}</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 leading-tight">
          Sessões do LI Conselho Coordenador
        </h2>
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base bg-white text-misau-medium hover:bg-misau-50 transition-all duration-300 w-full sm:w-auto"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span>Adicionar ao Google Calendar</span>
        </a>
      </div>

      <div className="bg-white rounded-xl sm:rounded-2xl border border-misau-100 p-5 sm:p-8 md:p-10">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-3">
          <div className="w-1.5 h-8 sm:h-10 bg-misau-light rounded-full shrink-0" />
          Temas do Dia
        </h3>

        <div className="space-y-3 sm:space-y-4">
          {day.themes.map((theme, index) => (
            <motion.div
              key={theme.order}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-start gap-3 sm:gap-5 p-4 sm:p-5 rounded-xl hover:bg-misau-50 transition-all duration-300 border border-misau-50 hover:border-misau-200">
                <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-misau-bright group-hover:bg-misau-light text-misau-gold group-hover:text-white rounded-lg flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed group-hover:text-misau-medium transition-colors break-words">
                    {theme.title}
                  </p>
                  {theme.responsible && (
                    <p className="text-sm sm:text-base md:text-lg text-misau-medium mt-1.5 sm:mt-2 font-medium break-words">
                      {theme.responsible}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <div className="inline-block bg-misau-50 text-misau-medium px-5 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base md:text-lg">
          Total de {day.themes.length} temas programados
        </div>
      </div>
    </>
  );
}
