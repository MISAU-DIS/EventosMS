import { NextResponse } from "next/server";
import { resolveActiveEventId } from "@/server/active-event";
import { getAgendaDays } from "@/server/agenda-store";

export async function GET() {
  const eventId = await resolveActiveEventId();
  const days = await getAgendaDays(eventId);
  return NextResponse.json({ eventId, days });
}
