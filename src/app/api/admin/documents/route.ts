import { NextResponse } from "next/server";
import {
  addStoredDocument,
  listStoredDocuments,
} from "@/server/documents-store";
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
  const documents = await listStoredDocuments();
  return NextResponse.json({ documents });
}

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

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
  });

  return NextResponse.json({ document: record }, { status: 201 });
}
