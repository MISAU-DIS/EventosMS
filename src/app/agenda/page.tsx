"use client";

import { motion, AnimatePresence } from "framer-motion";
import { eventAgenda, eventConfig } from "@/data";
import { useSelectedEventDay } from "@/hooks/useSelectedEventDay";
import { buildGoogleCalendarUrl } from "@/lib/calendar";
import EventDateLocationBadges from "@/components/event/EventDateLocationBadges";
import AgendaDayTabs from "@/components/event/AgendaDayTabs";
import AgendaDayContent from "@/components/event/AgendaDayContent";
import EventLemaBlock from "@/components/event/EventLemaBlock";
import PageContainer from "@/components/layout/PageContainer";

export default function AgendaPage() {
  const { selectedDay, setSelectedDay } = useSelectedEventDay();
  const selected = eventAgenda.find((day) => day.id === selectedDay)!;
  const calendarUrl = buildGoogleCalendarUrl(eventConfig);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-misau-50">
      <div className="bg-white border-b">
        <PageContainer className="mt-20 sm:mt-24 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-misau-medium mb-3 sm:mb-5 leading-tight">
            Agenda do Evento
          </h1>
          <p className="text-gray-600 text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed">
            {eventConfig.title}
          </p>
          <EventDateLocationBadges />
        </PageContainer>
      </div>

      <PageContainer className="py-8 sm:py-12">
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
      </PageContainer>
    </main>
  );
}
