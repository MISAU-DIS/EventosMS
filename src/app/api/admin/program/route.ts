import { NextResponse } from "next/server";
import { isAdminSessionValid, unauthorizedResponse } from "@/server/admin-session";
import { getProgramDays, saveProgramDays } from "@/server/program-store";
import type { EventProgramDay } from "@/types/event";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const days = await getProgramDays();
  return NextResponse.json({ days });
}

export async function PUT(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const body = (await request.json()) as { days?: EventProgramDay[] };
    if (!body.days) {
      return NextResponse.json({ error: "Campo days é obrigatório." }, { status: 400 });
    }
    const days = await saveProgramDays(body.days);
    return NextResponse.json({ days });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao guardar programa." },
      { status: 400 },
    );
  }
}
