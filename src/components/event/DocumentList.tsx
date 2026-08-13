import { FileText, Download } from "lucide-react";
import type { MeetingDocument } from "@/types/documents";

type DocumentListProps = {
  documents: MeetingDocument[];
};

const fileTypeLabels: Record<MeetingDocument["fileType"], string> = {
  pdf: "PDF",
  pptx: "PowerPoint",
  docx: "Word",
  other: "Ficheiro",
};

export default function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <p className="text-gray-600 italic py-4 text-base sm:text-lg">
        Ainda não há documentos publicados nesta secção.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {documents.map((doc) => (
        <li
          key={doc.id}
          className="flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-misau-100"
        >
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-misau-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-misau-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-misau-dark text-base sm:text-lg break-words">
                {doc.title}
              </h4>
              {doc.description && (
                <p className="text-sm text-gray-600 mt-1 break-words">{doc.description}</p>
              )}
              <span className="inline-block mt-2 text-xs font-medium uppercase tracking-wide text-misau-medium bg-misau-50 px-2 py-1 rounded">
                {fileTypeLabels[doc.fileType]}
              </span>
            </div>
          </div>
          <a
            href={doc.fileUrl}
            download
            className="inline-flex items-center justify-center gap-2 bg-misau-gold hover:bg-misau-medium text-white px-5 py-3 rounded-full font-semibold transition-all w-full sm:w-auto sm:self-end"
          >
            <Download className="w-4 h-4 shrink-0" />
            Descarregar
          </a>
        </li>
      ))}
    </ul>
  );
}
