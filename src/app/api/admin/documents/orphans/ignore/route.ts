import { NextResponse } from "next/server";
import { ignoreOrphanDocumentFile } from "@/server/documents-store";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";
import type { DocumentSectionId } from "@/config/document-sections";
import { isValidDocumentSection } from "@/server/documents-store";

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const body = (await request.json()) as {
      sectionId?: string;
      fileName?: string;
    };

    if (
      !body.sectionId ||
      !body.fileName ||
      !isValidDocumentSection(body.sectionId)
    ) {
      return NextResponse.json({ error: "Parâmetros inválidos." }, { status: 400 });
    }

    await ignoreOrphanDocumentFile(
      body.sectionId as DocumentSectionId,
      body.fileName,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao ignorar ficheiro." },
      { status: 400 },
    );
  }
}
