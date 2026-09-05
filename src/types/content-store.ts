import type { EventAgendaDay, EventProgramDay } from "@/types/event";

export type AgendaStoreFile = {
  days: EventAgendaDay[];
};

export type ProgramStoreFile = {
  days: EventProgramDay[];
};
