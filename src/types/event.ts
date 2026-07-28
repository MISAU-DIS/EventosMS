export type EventTheme = {
  order: number;
  title: string;
  responsible: string;
};

export type EventAgendaDay = {
  id: string;
  label: string;
  date: string;
  themes: EventTheme[];
};

export type EventSession = {
  order: number;
  time: string;
  title: string;
  type: string;
  speaker: string;
};

export type EventProgramDay = {
  id: string;
  label: string;
  date: string;
  sessions: EventSession[];
};

export type EventConfig = {
  readonly title: string;
  readonly shortTitle: string;
  readonly edition: number;
  readonly description: string;
  readonly lema: string;
  readonly location: string;
  readonly province: string;
  readonly country: string;
  readonly dateRange: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly mapsUrl: string;
  readonly calendarTitle: string;
  readonly calendarDetails: string;
  readonly calendarLocation: string;
  readonly calendarDates: string;
  readonly organizer: string;
  readonly objectives: readonly string[];
  readonly expectedResults: readonly string[];
};

/** @deprecated Use EventTheme */
export type Ccs2026Theme = EventTheme;

/** @deprecated Use EventAgendaDay */
export type Ccs2026AgendaDay = EventAgendaDay;

/** @deprecated Use EventSession */
export type Ccs2026Session = EventSession;

/** @deprecated Use EventProgramDay */
export type Ccs2026ProgramDay = EventProgramDay;
