import { NextResponse } from "next/server";
import { documentSectionMeta } from "@/config/document-sections";
import { listStoredDocuments } from "@/server/documents-store";
import { toPublicDocument } from "@/types/stored-documents";
import type { DocumentSection } from "@/types/documents";

export async function GET() {
  const records = await listStoredDocuments();

  const sections: DocumentSection[] = documentSectionMeta.map((section) => ({
    ...section,
    documents: records
      .filter((record) => record.sectionId === section.id)
      .map(toPublicDocument),
  }));

  return NextResponse.json({ sections });
}
