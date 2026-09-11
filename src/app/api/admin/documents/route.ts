import { NextResponse } from "next/server";
import {
  addStoredDocument,
  listStoredDocuments,
} from "@/server/documents-store";
import { getAdminEventContext } from "@/server/active-event";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";
import type { DocumentSectionId } from "@/config/document-sections";

const validSections = new Set<DocumentSectionId>([
  "dia1",
  "dia2",
  "dia3",
  "gerais",
]);

export async function GET() {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();
  const ctx = await getAdminEventContext();
  const documents = await listStoredDocuments(ctx.eventId, { includeHidden: true });
  return NextResponse.json({ ...ctx, documents });
}

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const ctx = await getAdminEventContext();
    const formData = await request.formData();
    const sectionId = formData.get("sectionId");
    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("file");

    if (
      typeof sectionId !== "string" ||
      !validSections.has(sectionId as DocumentSectionId) ||
      typeof title !== "string" ||
      !title.trim() ||
      !(file instanceof File) ||
      file.size === 0
    ) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique dia, título e ficheiro." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const record = await addStoredDocument({
      sectionId: sectionId as DocumentSectionId,
      title,
      description: typeof description === "string" ? description : undefined,
      originalFileName: file.name,
      fileBuffer: buffer,
      eventId: ctx.eventId,
    });

    return NextResponse.json({ ...ctx, document: record }, { status: 201 });
  } catch (error) {
    const code =
      error instanceof Error && "code" in error
        ? String((error as NodeJS.ErrnoException).code)
        : "";
    const message =
      code === "EACCES" || code === "EPERM"
        ? "Sem permissão para gravar ficheiros no servidor. Contacte o administrador do sistema."
        : "Não foi possível guardar o documento. Tente novamente.";

    console.error("[admin/documents POST]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
