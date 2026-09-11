import { NextResponse } from "next/server";
import { resolveActiveEventId } from "@/server/active-event";
import { addSubmission, hasSubmitted } from "@/server/evaluations-store";

export async function POST(request: Request) {
  try {
    const eventId = await resolveActiveEventId();
    const body = (await request.json()) as {
      dayNumber?: number;
      fingerprint?: string;
      scores?: Record<string, number>;
      comment?: string;
      respondentName?: string;
      role?: string;
      organization?: string;
    };

    if (!body.dayNumber || !body.fingerprint || !body.scores) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    if (body.dayNumber < 1 || body.dayNumber > 3) {
      return NextResponse.json({ error: "Dia inválido." }, { status: 400 });
    }

    if (await hasSubmitted(body.dayNumber, body.fingerprint, eventId)) {
      return NextResponse.json({ error: "Já avaliou este dia." }, { status: 409 });
    }

    const record = await addSubmission({
      eventId,
      dayNumber: body.dayNumber,
      fingerprint: body.fingerprint,
      scores: body.scores,
      comment: body.comment,
      respondentName: body.respondentName,
      role: body.role,
      organization: body.organization,
    });

    return NextResponse.json({ eventId, ok: true, submission: record }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao submeter." },
      { status: 400 },
    );
  }
}

export async function GET(request: Request) {
  const eventId = await resolveActiveEventId();
  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "0");
  const fingerprint = searchParams.get("fingerprint") ?? "";
  if (!day || !fingerprint) {
    return NextResponse.json({ eventId, submitted: false });
  }
  const submitted = await hasSubmitted(day, fingerprint, eventId);
  return NextResponse.json({ eventId, submitted });
}
