import { v1Error, v1Json } from "@/server/api-v1";
import { criteriaForDay, listCriteria } from "@/server/evaluations-store";
import { getEventById } from "@/server/events-store";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }

  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "1");
  const all = await listCriteria(event.id);
  const criteria = criteriaForDay(all, day);

  return v1Json({ eventId: event.id, dayNumber: day, criteria });
}
