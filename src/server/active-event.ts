import { DEFAULT_EVENT_ID } from "@/config/api";
import { getActiveEvent, getDashboardEvent } from "@/server/events-store";
import type { StoredEvent } from "@/types/event-record";

/** ID do evento activo; fallback para o último evento relevante ou DEFAULT. */
export async function resolveActiveEventId(): Promise<string> {
  const active = await getActiveEvent();
  if (active) return active.id;

  const fallback = await getDashboardEvent();
  return fallback?.id ?? DEFAULT_EVENT_ID;
}

/** Contexto do evento para admin (activo ou último relevante). */
export async function getAdminEventContext(): Promise<{
  eventId: string;
  event: Pick<
    StoredEvent,
    "id" | "title" | "shortTitle" | "status" | "dateRange" | "location" | "edition"
  > | null;
  isFallback: boolean;
}> {
  const active = await getActiveEvent();
  const event = active ?? (await getDashboardEvent());

  if (!event) {
    return { eventId: DEFAULT_EVENT_ID, event: null, isFallback: true };
  }

  return {
    eventId: event.id,
    isFallback: !active,
    event: {
      id: event.id,
      title: event.title,
      shortTitle: event.shortTitle,
      status: event.status,
      dateRange: event.dateRange,
      location: event.location,
      edition: event.edition,
    },
  };
}
