import { v1Error, v1Json } from "@/server/api-v1";
import { addSubmission, hasSubmitted } from "@/server/evaluations-store";
import { getEventById } from "@/server/events-store";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }

  const { searchParams } = new URL(request.url);
  const day = Number(searchParams.get("day") ?? "0");
  const fingerprint = searchParams.get("fingerprint") ?? "";

  if (!day || !fingerprint) {
    return v1Json({ eventId: event.id, submitted: false });
  }

  const submitted = await hasSubmitted(day, fingerprint);
  return v1Json({ eventId: event.id, dayNumber: day, submitted });
}

export async function POST(request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }

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
      return v1Error("EVAL_INCOMPLETE", "Dados incompletos.", 400);
    }

    if (body.dayNumber < 1 || body.dayNumber > 3) {
      return v1Error("EVAL_INVALID_DAY", "Dia inválido.", 400);
    }

    if (await hasSubmitted(body.dayNumber, body.fingerprint)) {
      return v1Error("EVAL_ALREADY_SUBMITTED", "Já avaliou este dia.", 409);
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

    return v1Json({ eventId: event.id, ok: true, submission: record }, { status: 201 });
  } catch (error) {
    return v1Error(
      "EVAL_FAILED",
      error instanceof Error ? error.message : "Erro ao submeter.",
      400,
    );
  }
}
