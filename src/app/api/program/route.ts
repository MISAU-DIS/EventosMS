import { NextResponse } from "next/server";
import { getProgramDays } from "@/server/program-store";

export async function GET() {
  const days = await getProgramDays();
  return NextResponse.json({ days });
}
