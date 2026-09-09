"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data";
import { useEventProgram } from "@/hooks/useEventProgram";
import { useSelectedEventDay } from "@/hooks/useSelectedEventDay";
import EventDateLocationBadges from "@/components/event/EventDateLocationBadges";
import ProgramDayTabs from "@/components/event/ProgramDayTabs";
import ProgramDayContent from "@/components/event/ProgramDayContent";
import PageContainer from "@/components/layout/PageContainer";

export default function ProgramaPage() {
  const { days: eventProgram, loading } = useEventProgram();
  const { selectedDay, setSelectedDay } = useSelectedEventDay();
  const selected = eventProgram.find((day) => day.id === selectedDay) ?? eventProgram[0];
  const dayIndex = eventProgram.findIndex((day) => day.id === selectedDay);

  if (loading || !selected) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-600">A carregar programa...</p>
      </main>
    );
  }

  return (
    <>
      <title>Programa - {eventConfig.shortTitle} MISAU</title>
      <meta
        name="description"
        content={`Programa completo do ${eventConfig.title} - MISAU 2026`}
      />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-misau-50">
        <div className="bg-white border-b">
          <PageContainer className="mt-20 sm:mt-24 py-8 sm:py-10 text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-misau-medium mb-3 sm:mb-5">
              Programa
            </h1>
            <p className="text-gray-600 text-base sm:text-xl mb-6 sm:mb-8">
              {eventConfig.title}
            </p>
            <EventDateLocationBadges variant="inline" />
          </PageContainer>
        </div>

        <PageContainer className="py-8 sm:py-12">
          <ProgramDayTabs
            days={eventProgram}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />

          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <ProgramDayContent
              day={selected}
              dayIndex={dayIndex}
              totalDays={eventProgram.length}
            />
          </motion.div>
        </PageContainer>
      </main>
    </>
  );
}
