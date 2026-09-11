import { v1Error, v1Json } from "@/server/api-v1";
import { getEventById } from "@/server/events-store";
import { getProgramDays } from "@/server/program-store";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }

  const days = await getProgramDays(event.id);
  return v1Json({ eventId: event.id, days });
}
