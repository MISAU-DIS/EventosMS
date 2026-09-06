import { NextResponse } from "next/server";
import { criteriaForDay, listCriteria } from "@/server/evaluations-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "1");
  const all = await listCriteria();
  const criteria = criteriaForDay(all, day);
  return NextResponse.json({ dayNumber: day, criteria });
}
