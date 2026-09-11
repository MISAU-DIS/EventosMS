"use client";

import { useMemo, useState } from "react";
import CriterionAverageBars from "@/components/evaluations/CriterionAverageBars";
import EvaluationSummaryCards from "@/components/evaluations/EvaluationSummaryCards";
import { documentSectionLabels, type DocumentSectionId } from "@/config/document-sections";
import {
  criterionAverages,
  overallAverage,
  submissionsByDay,
} from "@/lib/evaluation-stats";
import type { DashboardOverview } from "@/types/admin-dashboard";
import type { EvaluationCriterion, EvaluationSubmission } from "@/types/evaluations";
import { EVALUATION_DAYS } from "@/types/evaluations";
import { formatRelativeTimePt } from "@/lib/format-relative-time";

type ReportContext = {
  eventId: string;
  event?: { title: string; dateRange?: string; location?: string } | null;
};

export function ReportSummaryView({ data }: { data: DashboardOverview }) {
  return (
    <div className="space-y-6">
      {data.event && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
          <p className="font-semibold text-emerald-900">{data.event.title}</p>
          <p className="text-sm text-emerald-800">{data.event.dateRange} · {data.event.location}</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Avaliações", value: data.stats.evaluations },
          { label: "Média avaliações", value: data.stats.avgRating ?? "—" },
          { label: "Documentos", value: data.stats.documents },
          { label: "Fotografias", value: data.stats.photos },
          { label: "Temas agenda", value: data.stats.agendaThemes },
          { label: "Sessões programa", value: data.stats.programSessions },
          { label: "Respondentes", value: data.stats.uniqueRespondents },
          { label: "Com comentário", value: data.stats.evaluationsWithComments },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 rounded-lg p-3 border">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section>
          <h4 className="font-semibold mb-3">Documentos por secção</h4>
          <ul className="space-y-2">
            {data.documentSections.map((s) => (
              <li key={s.id} className="flex justify-between text-sm border-b pb-2">
                <span>{s.label}</span>
                <strong>{s.count}</strong>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="font-semibold mb-3">Actividade recente</h4>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {data.recentActivity.length === 0 ? (
              <li className="text-sm text-gray-500 italic">Sem actividade registada.</li>
            ) : (
              data.recentActivity.map((a) => (
                <li key={a.id} className="text-sm border-b pb-2">
                  <p>{a.description}</p>
                  <p className="text-xs text-gray-400">{formatRelativeTimePt(a.at)}</p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function ReportEvaluationsView({
  criteria,
  submissions,
}: {
  criteria: EvaluationCriterion[];
  submissions: EvaluationSubmission[];
}) {
  const [day, setDay] = useState<number | "all">("all");
  const dayFilter = day === "all" ? undefined : day;
  const filtered = useMemo(
    () => submissions.filter((s) => day === "all" || s.dayNumber === day),
    [submissions, day],
  );
  const stats = criterionAverages(criteria, submissions, dayFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setDay("all")} className={`px-3 py-1.5 rounded-lg text-sm ${day === "all" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>Todos</button>
        {EVALUATION_DAYS.map((d) => (
          <button key={d.number} type="button" onClick={() => setDay(d.number)} className={`px-3 py-1.5 rounded-lg text-sm ${day === d.number ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>{d.label}</button>
        ))}
      </div>

      <EvaluationSummaryCards
        total={filtered.length}
        overallAverage={overallAverage(submissions, dayFilter)}
        uniqueRespondents={new Set(filtered.map((s) => s.fingerprint)).size}
        withComments={filtered.filter((s) => s.comment?.trim()).length}
      />

      <div className="bg-gray-50 rounded-xl p-4 border">
        <h4 className="font-semibold mb-3">Médias por critério</h4>
        <CriterionAverageBars items={stats} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-2 border">Data</th>
              <th className="p-2 border">Dia</th>
              <th className="p-2 border">Nome</th>
              {criteria.filter((c) => c.active).map((c) => (
                <th key={c.id} className="p-2 border whitespace-nowrap">{c.label}</th>
              ))}
              <th className="p-2 border">Comentário</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-2 border whitespace-nowrap">{new Date(s.submittedAt).toLocaleString("pt-PT")}</td>
                <td className="p-2 border">{s.dayNumber}</td>
                <td className="p-2 border">{s.respondentName ?? "—"}</td>
                {criteria.filter((c) => c.active).map((c) => (
                  <td key={c.id} className="p-2 border text-center tabular-nums">{s.scores[c.id] ?? "—"}</td>
                ))}
                <td className="p-2 border max-w-xs truncate">{s.comment ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-6 italic">Sem submissões.</p>}
      </div>
    </div>
  );
}

export function ReportDocumentsView({
  documents,
}: {
  documents: {
    title: string;
    sectionId: DocumentSectionId;
    fileName: string;
    fileType: string;
    hidden?: boolean;
    createdAt: string;
  }[];
}) {
  const [section, setSection] = useState<DocumentSectionId | "all">("all");
  const filtered = section === "all" ? documents : documents.filter((d) => d.sectionId === section);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setSection("all")} className={`px-3 py-1.5 rounded-lg text-sm ${section === "all" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>Todas</button>
        {(Object.keys(documentSectionLabels) as DocumentSectionId[]).map((id) => (
          <button key={id} type="button" onClick={() => setSection(id)} className={`px-3 py-1.5 rounded-lg text-sm ${section === id ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>{documentSectionLabels[id]}</button>
        ))}
      </div>
      <p className="text-sm text-gray-600">{filtered.length} documento(s)</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-2 border">Secção</th>
              <th className="p-2 border">Título</th>
              <th className="p-2 border">Ficheiro</th>
              <th className="p-2 border">Tipo</th>
              <th className="p-2 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.fileName} className="hover:bg-gray-50">
                <td className="p-2 border">{documentSectionLabels[d.sectionId]}</td>
                <td className="p-2 border font-medium">{d.title}</td>
                <td className="p-2 border text-gray-600">{d.fileName}</td>
                <td className="p-2 border">{d.fileType}</td>
                <td className="p-2 border">{d.hidden ? "Oculto" : "Visível"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ReportPhotosView({
  photos,
}: {
  photos: { title: string; fileName: string; order: number; uploadedAt: string }[];
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">{photos.length} fotografia(s)</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {photos.map((p) => (
          <div key={p.fileName} className="rounded-xl border p-4 bg-gray-50">
            <p className="font-semibold">{p.title}</p>
            <p className="text-xs text-gray-500 mt-1">Ordem {p.order}</p>
            <p className="text-xs text-gray-400">{p.fileName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReportAgendaView({
  days,
}: {
  days: { label: string; date: string; themes: { order: number; title: string; responsible: string }[] }[];
}) {
  return (
    <div className="space-y-6">
      {days.map((day) => (
        <section key={day.label} className="rounded-xl border overflow-hidden">
          <div className="bg-misau-medium text-white px-4 py-2 font-semibold">{day.label}</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left w-12">#</th>
                <th className="p-2 text-left">Tema</th>
                <th className="p-2 text-left">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {day.themes.map((t) => (
                <tr key={t.order} className="border-t">
                  <td className="p-2">{t.order}</td>
                  <td className="p-2">{t.title}</td>
                  <td className="p-2 text-gray-600">{t.responsible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

export function ReportProgramView({
  days,
}: {
  days: {
    label: string;
    sessions: { order: number; time: string; title: string; type: string; speaker: string }[];
  }[];
}) {
  return (
    <div className="space-y-6">
      {days.map((day) => (
        <section key={day.label} className="rounded-xl border overflow-hidden">
          <div className="bg-misau-medium text-white px-4 py-2 font-semibold">{day.label}</div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Hora</th>
                <th className="p-2 text-left">Actividade</th>
                <th className="p-2 text-left">Tipo</th>
                <th className="p-2 text-left">Orador</th>
              </tr>
            </thead>
            <tbody>
              {day.sessions.map((s) => (
                <tr key={s.order} className="border-t">
                  <td className="p-2 whitespace-nowrap font-medium">{s.time}</td>
                  <td className="p-2">{s.title}</td>
                  <td className="p-2 text-gray-600">{s.type}</td>
                  <td className="p-2 text-gray-600">{s.speaker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}

export function ReportEventHeader({ ctx }: { ctx: ReportContext }) {
  if (!ctx.event) return null;
  return (
    <div className="mb-4 pb-4 border-b">
      <p className="text-sm text-gray-500">Evento</p>
      <p className="font-semibold text-lg">{ctx.event.title}</p>
    </div>
  );
}
