import { v1Error, v1Json } from "@/server/api-v1";
import { getEventById } from "@/server/events-store";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }
  return v1Json({ event });
}
