export type MeetingDocument = {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: "pdf" | "pptx" | "docx" | "other";
};

export type DocumentSection = {
  id: string;
  title: string;
  description?: string;
  documents: MeetingDocument[];
};
