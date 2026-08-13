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
      <div className="bg-gradient-to-r from-misau-gold to-misau-medium text-white rounded-2xl border border-misau-gold/20 p-8 sm:p-10 mb-8">
        <div className="flex items-center gap-2 text-misau-bright mb-4">
          <Calendar className="w-6 h-6" />
          <span className="text-xl md:text-2xl font-semibold">{day.date}</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          Sessões do LI Conselho Coordenador
        </h2>
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-base md:text-lg bg-white text-misau-medium hover:bg-misau-50 transition-all duration-300"
        >
          <Calendar className="w-5 h-5" />
          <span>Adicionar ao Google Calendar</span>
        </a>
      </div>

      <div className="bg-white rounded-2xl border border-misau-100 p-8 sm:p-10">
        <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="w-1.5 h-10 bg-misau-light rounded-full" />
          Temas do Dia
        </h3>

        <div className="space-y-4">
          {day.themes.map((theme, index) => (
            <motion.div
              key={theme.order}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-start gap-5 p-5 rounded-xl hover:bg-misau-50 transition-all duration-300 border border-misau-50 hover:border-misau-200">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-misau-bright group-hover:bg-misau-light text-misau-gold group-hover:text-white rounded-lg flex items-center justify-center font-bold text-base md:text-lg transition-all duration-300">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800 text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed group-hover:text-misau-medium transition-colors">
                    {theme.title}
                  </p>
                  {theme.responsible && (
                    <p className="text-base md:text-xl text-misau-medium mt-2 font-medium">
                      {theme.responsible}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="inline-block bg-misau-50 text-misau-medium px-8 py-4 rounded-xl font-semibold text-lg md:text-xl">
          Total de {day.themes.length} temas programados
        </div>
      </div>
    </>
  );
}
