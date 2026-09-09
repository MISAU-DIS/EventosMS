import { NextResponse } from "next/server";
import {
  deleteStoredDocument,
  setDocumentHidden,
} from "@/server/documents-store";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const { id } = await context.params;
    const body = (await request.json()) as { hidden?: boolean };

    if (typeof body.hidden !== "boolean") {
      return NextResponse.json({ error: "Campo hidden inválido." }, { status: 400 });
    }

    const document = await setDocumentHidden(id, body.hidden);
    if (!document) {
      return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
    }

    return NextResponse.json({ document });
  } catch (error) {
    console.error("[admin/documents PATCH]", error);
    return NextResponse.json(
      { error: "Não foi possível actualizar o documento." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const { id } = await context.params;
    const deleted = await deleteStoredDocument(id);

    if (!deleted) {
      return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/documents DELETE]", error);
    return NextResponse.json(
      { error: "Não foi possível remover o documento." },
      { status: 500 },
    );
  }
}
