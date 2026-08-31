"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { generateAgendaPdf } from "@/lib/generateAgendaPdf";

export default function AgendaPdfDownloadButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      await generateAgendaPdf();
    } catch {
      setError("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-misau-100">
      <div className="flex items-start gap-3 sm:gap-4 min-w-0">
        <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-misau-50 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-misau-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-misau-dark text-base sm:text-lg break-words">
            Agenda e Programa — LI Conselho Coordenador de Saúde (PDF)
          </h4>
          <p className="text-sm text-gray-600 mt-1 break-words">
            Programa detalhado da reunião (9–11 Set 2026, Beira), gerado a
            partir dos dados actuais do site.
          </p>
          <span className="inline-block mt-2 text-xs font-medium uppercase tracking-wide text-misau-medium bg-misau-50 px-2 py-1 rounded">
            PDF
          </span>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 bg-misau-gold hover:bg-misau-medium disabled:opacity-60 text-white px-5 py-3 rounded-full font-semibold transition-all w-full sm:w-auto sm:self-end"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 shrink-0 animate-spin" />
        ) : (
          <Download className="w-4 h-4 shrink-0" />
        )}
        {loading ? "A descarregar…" : "Descarregar"}
      </button>
    </div>
  );
}
