import { NextResponse } from "next/server";
import { deleteBrokenDocumentRecord } from "@/server/documents-store";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const { id } = await context.params;
    const deleted = await deleteBrokenDocumentRecord(id);

    if (!deleted) {
      return NextResponse.json({ error: "Registo não encontrado." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao remover registo." },
      { status: 400 },
    );
  }
}
