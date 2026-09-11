import { NextResponse } from "next/server";
import { getAdminEventContext } from "@/server/active-event";
import { registerOrphanDocument } from "@/server/documents-store";
import {
  isAdminSessionValid,
  unauthorizedResponse,
} from "@/server/admin-session";
import type { DocumentSectionId } from "@/config/document-sections";

const validSections = new Set<DocumentSectionId>(["dia1", "dia2", "dia3", "gerais"]);

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) return unauthorizedResponse();

  try {
    const body = (await request.json()) as {
      sectionId?: string;
      fileName?: string;
      title?: string;
      description?: string;
    };

    if (
      typeof body.sectionId !== "string" ||
      !validSections.has(body.sectionId as DocumentSectionId) ||
      typeof body.fileName !== "string" ||
      !body.fileName.trim() ||
      typeof body.title !== "string" ||
      !body.title.trim()
    ) {
      return NextResponse.json(
        { error: "Secção, ficheiro e título são obrigatórios." },
        { status: 400 },
      );
    }

    const ctx = await getAdminEventContext();
    const document = await registerOrphanDocument({
      sectionId: body.sectionId as DocumentSectionId,
      fileName: body.fileName.trim(),
      title: body.title,
      description: body.description,
      eventId: ctx.eventId,
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao registar." },
      { status: 400 },
    );
  }
}
