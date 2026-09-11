import { NextResponse } from "next/server";
import { resolveActiveEventId } from "@/server/active-event";
import { getProgramDays } from "@/server/program-store";

export async function GET() {
  const eventId = await resolveActiveEventId();
  const days = eventId ? await getProgramDays(eventId) : [];
  return NextResponse.json({ eventId, hasActiveEvent: Boolean(eventId), days });
}
