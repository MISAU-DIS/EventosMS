import { v1Error, v1Json } from "@/server/api-v1";
import { listEvents } from "@/server/events-store";
import { DEFAULT_EVENT_ID, apiMeta } from "@/config/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as
    | "active"
    | "archived"
    | "draft"
    | "all"
    | null;

  const events = await listEvents(status ?? "all");
  return v1Json({ events, defaultEventId: DEFAULT_EVENT_ID, apiVersion: apiMeta.version });
}

export async function POST() {
  return v1Error(
    "NOT_IMPLEMENTED",
    "Criação de eventos disponível na sprint 6.",
    501,
  );
}
