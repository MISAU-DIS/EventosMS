import { NextResponse } from "next/server";
import { getAdminEventContext } from "@/server/active-event";
import { isAdminSessionValid, unauthorizedResponse } from "@/server/admin-session";
import { getAgendaDays, saveAgendaDays } from "@/server/agenda-store";
import type { EventAgendaDay } from "@/types/event";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const ctx = await getAdminEventContext();
  const days = await getAgendaDays(ctx.eventId);
  return NextResponse.json({ ...ctx, days });
}

export async function PUT(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const ctx = await getAdminEventContext();
    const body = (await request.json()) as { days?: EventAgendaDay[] };
    if (!body.days) {
      return NextResponse.json({ error: "Campo days é obrigatório." }, { status: 400 });
    }
    const days = await saveAgendaDays(body.days, ctx.eventId);
    return NextResponse.json({ ...ctx, days });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao guardar agenda." },
      { status: 400 },
    );
  }
}
