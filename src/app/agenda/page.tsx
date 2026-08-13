"use client";

import { motion, AnimatePresence } from "framer-motion";
import { eventAgenda, eventConfig } from "@/data";
import { useSelectedEventDay } from "@/hooks/useSelectedEventDay";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import EventDateLocationBadges from "@/components/event/EventDateLocationBadges";
import AgendaDayTabs from "@/components/event/AgendaDayTabs";
import AgendaDayContent from "@/components/event/AgendaDayContent";
import EventLemaBlock from "@/components/event/EventLemaBlock";

export default function AgendaPage() {
  const { selectedDay, setSelectedDay } = useSelectedEventDay();
  const selected = eventAgenda.find((day) => day.id === selectedDay)!;
  const calendarUrl = buildGoogleCalendarUrl(eventConfig);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-misau-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto mt-20 px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-misau-medium mb-4">
              Agenda do Evento
            </h1>
            <p className="text-gray-600 text-lg mb-6">{eventConfig.title}</p>
            <EventDateLocationBadges />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <AgendaDayTabs
          days={eventAgenda}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <AgendaDayContent day={selected} calendarUrl={calendarUrl} />
          </motion.div>
        </AnimatePresence>

        <EventLemaBlock />

        <div className="text-center mt-12">
          <a
            href="/contacto"
            className="inline-block bg-misau-gold hover:bg-misau-medium text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Precisa de mais informações? Entre em contacto
          </a>
        </div>
      </div>
    </main>
  );
}
