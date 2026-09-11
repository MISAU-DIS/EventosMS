export type AdminEventInfo = {
  id: string;
  title: string;
  shortTitle: string;
  status: string;
  dateRange: string;
  location: string;
  edition: number;
};

export type AdminEventContext = {
  eventId: string;
  event: AdminEventInfo | null;
  isFallback: boolean;
};
