import { NextResponse } from "next/server";
import {
  deleteOrphanDocumentFile,
  listBrokenDocuments,
  listOrphanDocumentFiles,
} from "@/server/documents-store";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";
import type { DocumentSectionId } from "@/config/document-sections";
import { isValidDocumentSection } from "@/server/documents-store";

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  const [orphans, broken] = await Promise.all([
    listOrphanDocumentFiles(),
    listBrokenDocuments(),
  ]);

  return NextResponse.json({ orphans, broken });
}

export async function DELETE(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const sectionId = searchParams.get("sectionId");
  const fileName = searchParams.get("fileName");

  if (!sectionId || !fileName || !isValidDocumentSection(sectionId)) {
    return NextResponse.json({ error: "Parâmetros inválidos." }, { status: 400 });
  }

  try {
    await deleteOrphanDocumentFile(sectionId as DocumentSectionId, fileName);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao apagar ficheiro." },
      { status: 400 },
    );
  }
}
