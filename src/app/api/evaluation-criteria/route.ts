import { NextResponse } from "next/server";
import { resolveActiveEventId } from "@/server/active-event";
import { criteriaForDay, listCriteria } from "@/server/evaluations-store";

export async function GET(request: Request) {
  const eventId = await resolveActiveEventId();
  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "1");
  const all = eventId ? await listCriteria(eventId) : [];
  const criteria = criteriaForDay(all, day);
  return NextResponse.json({
    eventId,
    hasActiveEvent: Boolean(eventId),
    dayNumber: day,
    criteria,
  });
}
