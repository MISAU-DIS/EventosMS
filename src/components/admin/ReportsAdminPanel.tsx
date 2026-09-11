"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, RefreshCw } from "lucide-react";
import AdminEventBanner from "@/components/admin/AdminEventBanner";
import {
  ReportAgendaView,
  ReportDocumentsView,
  ReportEvaluationsView,
  ReportEventHeader,
  ReportPhotosView,
  ReportProgramView,
  ReportSummaryView,
} from "@/components/reports/ReportViews";
import { useAdminEventContext } from "@/hooks/useAdminEventContext";
import type { DashboardOverview } from "@/types/admin-dashboard";
import type { EvaluationCriterion, EvaluationSubmission } from "@/types/evaluations";
import type { DocumentSectionId } from "@/config/document-sections";

type ReportType = "summary" | "evaluations" | "documents" | "photos" | "agenda" | "program";

const reportOptions: { id: ReportType; label: string; description: string }[] = [
  { id: "summary", label: "Resumo geral", description: "Indicadores e actividade do evento" },
  { id: "evaluations", label: "Avaliações", description: "Médias, filtros e tabela de submissões" },
  { id: "documents", label: "Documentos", description: "Inventário por secção" },
  { id: "photos", label: "Fotografias", description: "Lista de fotografias publicadas" },
  { id: "agenda", label: "Agenda", description: "Temas por dia" },
  { id: "program", label: "Programa", description: "Sessões por dia" },
];

type ReportPayload = Record<string, unknown>;

function renderReport(type: ReportType, preview: ReportPayload) {
  switch (type) {
    case "summary":
      return <ReportSummaryView data={preview.data as DashboardOverview} />;
    case "evaluations":
      return (
        <ReportEvaluationsView
          criteria={(preview.criteria as EvaluationCriterion[]) ?? []}
          submissions={(preview.submissions as EvaluationSubmission[]) ?? []}
        />
      );
    case "documents":
      return (
        <ReportDocumentsView
          documents={
            (preview.documents as {
              title: string;
              sectionId: DocumentSectionId;
              fileName: string;
              fileType: string;
              hidden?: boolean;
              createdAt: string;
            }[]) ?? []
          }
        />
      );
    case "photos":
      return (
        <ReportPhotosView
          photos={
            (preview.photos as { title: string; fileName: string; order: number; uploadedAt: string }[]) ?? []
          }
        />
      );
    case "agenda":
      return (
        <ReportAgendaView
          days={
            (preview.days as {
              label: string;
              date: string;
              themes: { order: number; title: string; responsible: string }[];
            }[]) ?? []
          }
        />
      );
    case "program":
      return (
        <ReportProgramView
          days={
            (preview.days as {
              label: string;
              sessions: { order: number; time: string; title: string; type: string; speaker: string }[];
            }[]) ?? []
          }
        />
      );
    default:
      return null;
  }
}

export default function ReportsAdminPanel() {
  const { context } = useAdminEventContext();
  const [selected, setSelected] = useState<ReportType>("summary");
  const [preview, setPreview] = useState<ReportPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPreview = useCallback(async (type: ReportType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/reports?type=${type}&format=json`);
      if (!response.ok) throw new Error("Falha ao carregar relatório.");
      setPreview((await response.json()) as ReportPayload);
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

  return (
    <div className="space-y-6">
      {context && (
        <AdminEventBanner event={context.event} eventId={context.eventId} isFallback={context.isFallback} />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
          <p className="text-gray-600 text-sm mt-1">
            Resumo visual das actividades do evento com filtros e exportação CSV.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadPreview(selected)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
          <button
            type="button"
            onClick={downloadCsv}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {reportOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelected(option.id)}
            className={`text-left p-4 rounded-xl border transition-colors ${
              selected === option.id
                ? "border-emerald-300 bg-emerald-50 ring-1 ring-emerald-200"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="font-semibold text-gray-900">{option.label}</p>
            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {reportOptions.find((o) => o.id === selected)?.label}
        </h3>

        {loading ? (
          <p className="text-gray-500 text-sm py-8 text-center">A carregar relatório...</p>
        ) : !preview ? (
          <p className="text-gray-500 text-sm italic py-8 text-center">Sem dados para este relatório.</p>
        ) : (
          <>
            <ReportEventHeader
              ctx={{
                eventId: String(preview.eventId ?? ""),
                event: preview.event as { title: string } | null,
              }}
            />
            {renderReport(selected, preview)}
          </>
        )}
      </div>
    </div>
  );
}
