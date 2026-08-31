import { documentSectionMeta } from "@/config/document-sections";
import type { DocumentSection } from "@/types/documents";

/** @deprecated A listagem pública usa /api/documents */
export const meetingDocuments: DocumentSection[] = documentSectionMeta.map(
  (section) => ({
    ...section,
    documents: [],
  }),
);
