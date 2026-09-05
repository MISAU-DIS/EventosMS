import { v1Error, v1Json } from "@/server/api-v1";
import { getActiveEvent } from "@/server/events-store";

export async function GET() {
  const event = await getActiveEvent();
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Nenhum evento activo.", 404);
  }
  return v1Json({ event });
}
