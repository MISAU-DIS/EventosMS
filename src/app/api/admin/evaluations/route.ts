import { NextResponse } from "next/server";
import { getAdminEventContext } from "@/server/active-event";
import { isAdminSessionValid, unauthorizedResponse } from "@/server/admin-session";
import { getEvaluationSummary, saveCriteria } from "@/server/evaluations-store";
import type { EvaluationCriterion } from "@/types/evaluations";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const ctx = await getAdminEventContext();
  const summary = await getEvaluationSummary(ctx.eventId);
  return NextResponse.json({ ...ctx, ...summary });
}

export async function PUT(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const ctx = await getAdminEventContext();
  const body = (await request.json()) as { criteria?: EvaluationCriterion[] };
  if (!body.criteria) {
    return NextResponse.json({ error: "Campo criteria obrigatório." }, { status: 400 });
  }
  const criteria = await saveCriteria(body.criteria, ctx.eventId);
  return NextResponse.json({ ...ctx, criteria });
}
