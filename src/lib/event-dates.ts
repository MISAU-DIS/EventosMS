import type { StoredEvent } from "@/types/event-record";

/** Verifica se a data actual está dentro do intervalo do evento (inclusive). */
export function isEventWithinDates(event: Pick<StoredEvent, "startDate" | "endDate">): boolean {
  const now = Date.now();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return now >= start && now <= end + 24 * 60 * 60 * 1000;
}
