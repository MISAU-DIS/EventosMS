import { NextResponse } from "next/server";
import { resolveActiveEventId } from "@/server/active-event";
import { getProgramDays } from "@/server/program-store";

export async function GET() {
  const eventId = await resolveActiveEventId();
  const days = await getProgramDays(eventId);
  return NextResponse.json({ eventId, days });
}
