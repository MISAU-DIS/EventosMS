import { NextResponse } from "next/server";
import { isAdminSessionValid, unauthorizedResponse } from "@/server/admin-session";
import { getEvaluationSummary, listCriteria, saveCriteria } from "@/server/evaluations-store";
import type { EvaluationCriterion } from "@/types/evaluations";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const summary = await getEvaluationSummary();
  return NextResponse.json(summary);
}

export async function PUT(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const body = (await request.json()) as { criteria?: EvaluationCriterion[] };
  if (!body.criteria) {
    return NextResponse.json({ error: "Campo criteria obrigatório." }, { status: 400 });
  }
  const criteria = await saveCriteria(body.criteria);
  return NextResponse.json({ criteria });
}
