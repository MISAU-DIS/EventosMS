import type { EventAgendaDay, EventProgramDay } from "@/types/event";

/** Formato legado (pré multi-evento). */
export type LegacyAgendaStoreFile = {
  days: EventAgendaDay[];
};

export type LegacyProgramStoreFile = {
  days: EventProgramDay[];
};

export type AgendaStoreFile = {
  byEvent: Record<string, EventAgendaDay[]>;
};

export type ProgramStoreFile = {
  byEvent: Record<string, EventProgramDay[]>;
};
