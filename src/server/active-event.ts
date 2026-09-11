import { DEFAULT_EVENT_ID } from "@/config/api";
import { getActiveEvent, getDashboardEvent } from "@/server/events-store";
import type { StoredEvent } from "@/types/event-record";

/** ID do evento activo no portal público (null se nenhum activo). */
export async function resolveActiveEventId(): Promise<string | null> {
  const active = await getActiveEvent();
  return active?.id ?? null;
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
