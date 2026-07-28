"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Users, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { ccs2026Event, ccs2026Program } from "@/data";

const dayMapping: Record<string, string> = {
  "5-8": "dia1",
  "6-8": "dia2",
  "7-8": "dia3",
};

const getSessionColor = (type: string): string => {
  const colors: Record<string, string> = {
    Protocolo: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
    Cerimónia: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    Apresentação: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    Discussão: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
    Intervalo: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
    Encerramento: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    Organização: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
    Painel: "bg-gradient-to-r from-violet-500 to-violet-600 text-white",
  };

  return colors[type] ?? "bg-gradient-to-r from-slate-500 to-slate-600 text-white";
};

const Programa = () => {
  const [selectedDay, setSelectedDay] = useState("dia1");

  useEffect(() => {
    const today = new Date();
    const key = `${today.getDate()}-${today.getMonth() + 1}`;
    const targetDay = dayMapping[key];
    if (targetDay) {
      setSelectedDay(targetDay);
    }
  }, []);

  const selected = ccs2026Program.find((day) => day.id === selectedDay)!;
  const dayIndex = ccs2026Program.findIndex((day) => day.id === selectedDay);

  return (
    <>
      <title>Programa - {ccs2026Event.shortTitle} MISAU</title>
      <meta
        name="description"
        content={`Programa completo do ${ccs2026Event.title} - MISAU 2026`}
      />

      <main className="min-h-screen bg-slate-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto mt-20 px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
                Programa
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{ccs2026Event.dateRange}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {ccs2026Event.location}, {ccs2026Event.province}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-2 max-w-3xl mx-auto">
              <div className="grid grid-cols-3 gap-2">
                {ccs2026Program.map((day, index) => {
                  const isActive = selectedDay === day.id;
                  const dayNumber = day.date.split(" ")[0];
                  return (
                    <button
                      key={day.id}
                      onClick={() => setSelectedDay(day.id)}
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

          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {ccs2026Event.title}
                  </h2>
                  <p className="text-gray-600">{selected.date}</p>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
                  Dia {dayIndex + 1} de {ccs2026Program.length}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-200" />

              <div className="space-y-6">
                {selected.sessions.map((session, index) => (
                  <motion.div
                    key={session.order}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.03 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-6 top-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-lg" />

                    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                          <div className="lg:w-36 flex-shrink-0">
                            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg font-bold text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{session.time}</span>
                            </div>
                          </div>

                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                              {session.title}
                            </h3>
                            {session.speaker && (
                              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
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
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Programa;
