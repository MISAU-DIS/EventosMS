import type { DocumentSectionId } from "@/config/document-sections";
import { findStoredDocumentByFile } from "@/server/documents-store";
import { isSafeFileName, servePublicFile } from "@/server/serve-public-file";

const validSections = new Set<DocumentSectionId>(["dia1", "dia2", "dia3", "gerais"]);

type RouteContext = {
  params: Promise<{ sectionId: string; fileName: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { sectionId, fileName } = await context.params;

  if (!validSections.has(sectionId as DocumentSectionId) || !isSafeFileName(fileName)) {
    return new Response("Not found", { status: 404 });
  }

  const registered = await findStoredDocumentByFile(
    sectionId as DocumentSectionId,
    fileName,
  );
  if (registered?.hidden) {
    return new Response("Not found", { status: 404 });
  }

  return servePublicFile(`documentos/${sectionId}/${fileName}`, {
    downloadName: fileName,
    disposition: "inline",
  });
}
