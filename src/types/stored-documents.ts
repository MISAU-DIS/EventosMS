import type { MeetingDocument } from "@/types/documents";
import type { DocumentSectionId } from "@/config/document-sections";

export type StoredDocumentRecord = {
  id: string;
  eventId?: string;
  sectionId: DocumentSectionId;
  title: string;
  description?: string;
  fileName: string;
  fileType: MeetingDocument["fileType"];
  createdAt: string;
};

export type DocumentsStoreFile = {
  documents: StoredDocumentRecord[];
};

export function inferFileType(fileName: string): MeetingDocument["fileType"] {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "pdf";
    case "pptx":
    case "ppt":
      return "pptx";
    case "docx":
    case "doc":
      return "docx";
    case "xlsx":
    case "xls":
      return "xlsx";
    default:
      return "other";
  }
}

export function toPublicDocument(record: StoredDocumentRecord): MeetingDocument {
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    fileUrl: `/documentos/${record.sectionId}/${record.fileName}`,
    fileType: record.fileType,
  };
}

export function slugifyFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
