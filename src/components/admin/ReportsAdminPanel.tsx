"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Eye, RefreshCw } from "lucide-react";
import AdminEventBanner from "@/components/admin/AdminEventBanner";
import { useAdminEventContext } from "@/hooks/useAdminEventContext";

type ReportType = "summary" | "evaluations" | "documents" | "photos" | "agenda" | "program";

const reportOptions: { id: ReportType; label: string; description: string }[] = [
  { id: "summary", label: "Resumo geral", description: "Estatísticas do evento actual" },
  { id: "evaluations", label: "Avaliações", description: "Submissões e notas por critério" },
  { id: "documents", label: "Documentos", description: "Inventário de documentos publicados" },
  { id: "photos", label: "Fotografias", description: "Lista de fotografias do evento" },
  { id: "agenda", label: "Agenda", description: "Temas por dia" },
  { id: "program", label: "Programa", description: "Sessões por dia" },
];

export default function ReportsAdminPanel() {
  const { context } = useAdminEventContext();
  const [selected, setSelected] = useState<ReportType>("summary");
  const [preview, setPreview] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPreview = useCallback(async (type: ReportType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/reports?type=${type}&format=json`);
      if (!response.ok) throw new Error("Falha ao carregar relatório.");
      setPreview(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPreview(selected);
  }, [selected, loadPreview]);

  const downloadCsv = () => {
    window.open(`/api/admin/reports?type=${selected}&format=csv`, "_blank");
  };

  const downloadJson = () => {
    if (!preview) return;
    const blob = new Blob([JSON.stringify(preview, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `relatorio-${selected}-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {context && (
        <AdminEventBanner
          event={context.event}
          eventId={context.eventId}
          isFallback={context.isFallback}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
          <p className="text-gray-600 text-sm mt-1">
            Ver e exportar dados do evento actual por actividade.
          </p>
        </div>
        <button
          type="button"
          onClick={() => loadPreview(selected)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {reportOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className={`text-left p-4 rounded-xl border transition-colors ${
              selected === option.id
                ? "border-emerald-300 bg-emerald-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="font-semibold text-gray-900">{option.label}</p>
            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => loadPreview(selected)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <Eye className="w-4 h-4" />
          Ver relatório
        </button>
        <button
          type="button"
          onClick={downloadCsv}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
        <button
          type="button"
          onClick={downloadJson}
          disabled={!preview}
          className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Exportar JSON
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pré-visualização — {reportOptions.find((o) => o.id === selected)?.label}
        </h3>
        {loading ? (
          <p className="text-gray-500 text-sm">A carregar...</p>
        ) : !preview ? (
          <p className="text-gray-500 text-sm italic">Sem dados.</p>
        ) : (
          <pre className="text-xs bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-auto max-h-[480px] whitespace-pre-wrap break-words">
            {JSON.stringify(preview, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
