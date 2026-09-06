import { NextResponse } from "next/server";
import { addSubmission, hasSubmitted } from "@/server/evaluations-store";

export async function POST(request: Request) {
  try {
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

    if (await hasSubmitted(body.dayNumber, body.fingerprint)) {
      return NextResponse.json({ error: "Já avaliou este dia." }, { status: 409 });
    }

    const record = await addSubmission({
      dayNumber: body.dayNumber,
      fingerprint: body.fingerprint,
      scores: body.scores,
      comment: body.comment,
      respondentName: body.respondentName,
      role: body.role,
      organization: body.organization,
    });

    return NextResponse.json({ ok: true, submission: record }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao submeter." },
      { status: 400 },
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "0");
  const fingerprint = searchParams.get("fingerprint") ?? "";
  if (!day || !fingerprint) {
    return NextResponse.json({ submitted: false });
  }
  const submitted = await hasSubmitted(day, fingerprint);
  return NextResponse.json({ submitted });
}
