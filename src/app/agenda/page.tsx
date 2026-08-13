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
      <div className="bg-white border-b">
        <div className="w-full max-w-[1600px] mx-auto mt-20 px-6 sm:px-10 lg:px-16 py-10">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-misau-medium mb-5">
              Agenda do Evento
            </h1>
            <p className="text-gray-600 text-xl md:text-2xl lg:text-3xl mb-8">
              {eventConfig.title}
            </p>
            <EventDateLocationBadges />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
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
            className="w-full"
          >
            <AgendaDayContent day={selected} calendarUrl={calendarUrl} />
          </motion.div>
        </AnimatePresence>

        <EventLemaBlock />

        <div className="text-center mt-12">
          <a
            href="/contacto"
            className="inline-block bg-misau-gold hover:bg-misau-medium text-white text-lg font-semibold px-10 py-4 rounded-xl transition-all duration-300"
          >
            Precisa de mais informações? Entre em contacto
          </a>
        </div>
      </div>
    </main>
  );
}
