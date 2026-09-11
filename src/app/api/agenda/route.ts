import { NextResponse } from "next/server";
import { resolveActiveEventId } from "@/server/active-event";
import { getAgendaDays } from "@/server/agenda-store";

export async function GET() {
  const eventId = await resolveActiveEventId();
  const days = eventId ? await getAgendaDays(eventId) : [];
  return NextResponse.json({ eventId, hasActiveEvent: Boolean(eventId), days });
}
