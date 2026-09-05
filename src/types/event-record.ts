export type EventStatus = "draft" | "active" | "archived";

export type StoredEvent = {
  id: string;
  slug: string;
  status: EventStatus;
  edition: number;
  title: string;
  shortTitle: string;
  description: string;
  lema: string;
  slogan: string;
  location: string;
  province: string;
  country: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  heroImage: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
};

export type EventsStoreFile = {
  events: StoredEvent[];
};
