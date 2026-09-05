import { documentSectionMeta } from "@/config/document-sections";
import { v1Error, v1Json } from "@/server/api-v1";
import { listStoredDocuments } from "@/server/documents-store";
import { getEventById } from "@/server/events-store";
import { toPublicDocument } from "@/types/stored-documents";
import type { DocumentSection } from "@/types/documents";

type RouteContext = { params: Promise<{ eventId: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { eventId } = await context.params;
  const event = await getEventById(eventId);
  if (!event) {
    return v1Error("EVENT_NOT_FOUND", "Evento não encontrado.", 404);
  }

  const records = await listStoredDocuments(event.id);
  const sections: DocumentSection[] = documentSectionMeta.map((section) => ({
    ...section,
    documents: records
      .filter((record) => record.sectionId === section.id)
      .map(toPublicDocument),
  }));

  return v1Json({ eventId: event.id, sections });
}
