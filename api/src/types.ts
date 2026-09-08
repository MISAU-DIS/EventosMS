export type DocumentSectionId = "dia1" | "dia2" | "dia3" | "gerais";

export const documentSectionMeta = [
  {
    id: "dia1" as const,
    title: "Documentos do 1.º dia",
    description: "Apresentações e materiais do primeiro dia da reunião.",
  },
  {
    id: "dia2" as const,
    title: "Documentos do 2.º dia",
    description: "Apresentações e materiais do segundo dia da reunião.",
  },
  {
    id: "dia3" as const,
    title: "Documentos do 3.º dia",
    description: "Apresentações e materiais do terceiro dia da reunião.",
  },
  {
    id: "gerais" as const,
    title: "Documentos gerais",
    description: "Agenda, programa e outros documentos de referência da reunião.",
  },
];

export type FileType = "pdf" | "pptx" | "docx" | "xlsx" | "other";

export type StoredDocumentRecord = {
  id: string;
  eventId?: string;
  sectionId: DocumentSectionId;
  title: string;
  description?: string;
  fileName: string;
  fileType: FileType;
  createdAt: string;
};

export type DocumentsStoreFile = {
  documents: StoredDocumentRecord[];
};

export function inferFileType(fileName: string): FileType {
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

export function slugifyFileName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function toPublicDocument(
  record: StoredDocumentRecord,
  baseUrl?: string,
) {
  const path = `/documentos/${record.sectionId}/${record.fileName}`;
  return {
    id: record.id,
    title: record.title,
    description: record.description,
    fileUrl: baseUrl ? `${baseUrl.replace(/\/$/, "")}${path}` : path,
    fileType: record.fileType,
  };
}

export type StoredPhoto = {
  id: string;
  eventId: string;
  title: string;
  alt: string;
  fileName: string;
  order: number;
  uploadedAt: string;
};

export type PhotosStoreFile = {
  photos: StoredPhoto[];
};

export function toPublicPhoto(photo: StoredPhoto, baseUrl?: string) {
  const path = `/fotografias/${photo.fileName}`;
  return {
    id: photo.id,
    title: photo.title,
    alt: photo.alt,
    src: baseUrl ? `${baseUrl.replace(/\/$/, "")}${path}` : path,
    order: photo.order,
  };
}

export type EventStatus = "draft" | "active" | "archived";

export type StoredEvent = {
  id: string;
  slug: string;
  status: EventStatus;
  edition: number;
  title: string;
  shortTitle: string;
  description: string;
  lema: string;
  slogan: string;
  location: string;
  province: string;
  country: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  heroImage: string;
  createdAt: string;
  updatedAt: string;
  archivedAt?: string;
};

export type EventsStoreFile = {
  events: StoredEvent[];
};

export type EvaluationCriterion = {
  id: string;
  eventId: string;
  label: string;
  group: "first_day_only" | "continuous";
  order: number;
  active: boolean;
};

export type EvaluationSubmission = {
  id: string;
  eventId: string;
  dayNumber: number;
  fingerprint: string;
  scores: Record<string, number>;
  comment?: string;
  respondentName?: string;
  role?: string;
  organization?: string;
  submittedAt: string;
};

export type CriteriaStoreFile = {
  criteria: EvaluationCriterion[];
};

export type EvaluationsStoreFile = {
  submissions: EvaluationSubmission[];
};

export type AgendaStoreFile = {
  days: unknown[];
};

export type ProgramStoreFile = {
  days: unknown[];
};
