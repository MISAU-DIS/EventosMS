import { NextResponse } from "next/server";
import { getAgendaDays } from "@/server/agenda-store";

export async function GET() {
  const days = await getAgendaDays();
  return NextResponse.json({ days });
}
