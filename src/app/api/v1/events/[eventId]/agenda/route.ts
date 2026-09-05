import { DEFAULT_EVENT_ID } from "@/config/api";
import { v1Error, v1Json } from "@/server/api-v1";
import { getAgendaDays } from "@/server/agenda-store";
import { getEventById } from "@/server/events-store";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }

  if (event.id !== DEFAULT_EVENT_ID) {
    return v1Json({ eventId: event.id, days: [] });
  }

  const days = await getAgendaDays();
  return v1Json({ eventId: event.id, days });
}
