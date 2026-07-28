"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { ccs2026Agenda, ccs2026Event } from "@/data";

const dayMapping: Record<string, string> = {
  "5-8": "dia1",
  "6-8": "dia2",
  "7-8": "dia3",
};

const AgendaTemas = () => {
  const [selectedDay, setSelectedDay] = useState("dia1");

  useEffect(() => {
    const today = new Date();
    const key = `${today.getDate()}-${today.getMonth() + 1}`;
    const targetDay = dayMapping[key];
    if (targetDay) {
      setSelectedDay(targetDay);
    }
  }, []);

  const selected = ccs2026Agenda.find((day) => day.id === selectedDay)!;
  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    ccs2026Event.calendarTitle,
  )}&details=${encodeURIComponent(ccs2026Event.calendarDetails)}&location=${encodeURIComponent(
    ccs2026Event.calendarLocation,
  )}&dates=${ccs2026Event.calendarDates}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto mt-20 px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-700 mb-4">
              Agenda do Evento
            </h1>
            <p className="text-gray-600 text-lg mb-6">{ccs2026Event.title}</p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">{ccs2026Event.dateRange}</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold">
                  {ccs2026Event.location}, {ccs2026Event.province}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-3">
            <div className="grid grid-cols-3 gap-3">
              {ccs2026Agenda.map((day, index) => {
                const isActive = selectedDay === day.id;
                return (
                  <motion.button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl"
                        : "bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <div className="text-xs opacity-80 mb-1 font-medium">Dia</div>
                    <div className="text-2xl font-bold mb-2">{index + 1}</div>
                    <div
                      className={`text-xs ${
                        isActive ? "text-emerald-100" : "text-gray-500"
                      }`}
                    >
                      {day.date.replace(" de Agosto de 2026", " Ago")}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center gap-2 text-emerald-100 mb-3">
                <Calendar className="w-5 h-5" />
                <span className="text-lg font-semibold">{selected.date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sessões do LI Conselho Coordenador
              </h2>
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-white text-emerald-700 hover:bg-emerald-50 transition-all duration-300 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Adicionar ao Google Calendar</span>
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                Temas do Dia
              </h3>

              <div className="space-y-3">
                {selected.themes.map((theme, index) => (
                  <motion.div
                    key={theme.order}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-emerald-50 transition-all duration-300 border border-transparent hover:border-emerald-200">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 bg-emerald-100 group-hover:bg-emerald-500 text-emerald-600 group-hover:text-white rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="text-gray-800 font-medium leading-relaxed group-hover:text-emerald-700 transition-colors">
                          {theme.title}
                        </p>
                        {theme.responsible && (
                          <p className="text-sm text-emerald-700 mt-1 font-medium">
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
              <div className="inline-block bg-emerald-50 text-emerald-700 px-6 py-3 rounded-xl font-semibold">
                Total de {selected.themes.length} temas programados
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Lema do Evento</h3>
            <p className="text-xl text-emerald-50 italic">{ccs2026Event.lema}</p>
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <a
            href="/contacto"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Precisa de mais informações? Entre em contacto
          </a>
        </div>
      </div>
    </main>
  );
};

export default AgendaTemas;
