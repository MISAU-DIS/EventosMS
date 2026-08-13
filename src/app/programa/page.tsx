"use client";

import { motion } from "framer-motion";
import { eventConfig, eventProgram } from "@/data";
import { useSelectedEventDay } from "@/hooks/useSelectedEventDay";
import EventDateLocationBadges from "@/components/event/EventDateLocationBadges";
import ProgramDayTabs from "@/components/event/ProgramDayTabs";
import ProgramDayContent from "@/components/event/ProgramDayContent";

export default function ProgramaPage() {
  const { selectedDay, setSelectedDay } = useSelectedEventDay();
  const selected = eventProgram.find((day) => day.id === selectedDay)!;
  const dayIndex = eventProgram.findIndex((day) => day.id === selectedDay);

  return (
    <>
      <title>Programa - {eventConfig.shortTitle} MISAU</title>
      <meta
        name="description"
        content={`Programa completo do ${eventConfig.title} - MISAU 2026`}
      />

      <main className="min-h-screen bg-slate-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto mt-20 px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-orange-700 mb-2">
                Programa
              </h1>
              <EventDateLocationBadges variant="inline" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
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
        </div>
      </main>
    </>
  );
}
