"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import AdminEventBanner from "@/components/admin/AdminEventBanner";
import CriterionAverageBars from "@/components/evaluations/CriterionAverageBars";
import EvaluationSummaryCards from "@/components/evaluations/EvaluationSummaryCards";
import { useAdminEventContext } from "@/hooks/useAdminEventContext";
import {
  criterionAverages,
  formatRating,
  overallAverage,
  ratingColor,
  submissionAverage,
  submissionsByDay,
} from "@/lib/evaluation-stats";
import type { EvaluationCriterion, EvaluationSubmission } from "@/types/evaluations";
import { EVALUATION_DAYS } from "@/types/evaluations";

function slugifyId(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "criterio";
}

export default function EvaluationsAdminPanel() {
  const { context } = useAdminEventContext();
  const [criteria, setCriteria] = useState<EvaluationCriterion[]>([]);
  const [submissions, setSubmissions] = useState<EvaluationSubmission[]>([]);
  const [filterDay, setFilterDay] = useState<number | "all">("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"submissions" | "criteria">("submissions");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/evaluations");
      if (!r.ok) throw new Error();
      const d = (await r.json()) as { criteria: EvaluationCriterion[]; submissions: EvaluationSubmission[] };
      setCriteria(d.criteria.sort((a, b) => a.order - b.order));
      setSubmissions(d.submissions);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () => submissions.filter((s) => filterDay === "all" || s.dayNumber === filterDay),
    [submissions, filterDay],
  );

  const dayFilter = filterDay === "all" ? undefined : filterDay;
  const criterionStats = useMemo(
    () => criterionAverages(criteria, submissions, dayFilter),
    [criteria, submissions, dayFilter],
  );
  const overall = useMemo(
    () => overallAverage(submissions, dayFilter),
    [submissions, dayFilter],
  );
  const uniqueRespondents = useMemo(
    () => new Set(filtered.map((s) => s.fingerprint)).size,
    [filtered],
  );
  const withComments = filtered.filter((s) => s.comment?.trim()).length;
  const byDay = useMemo(() => submissionsByDay(submissions), [submissions]);

  const updateCriterion = (index: number, patch: Partial<EvaluationCriterion>) => {
    setCriteria((c) => c.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const moveCriterion = (index: number, direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= criteria.length) return;
    setCriteria((items) => {
      const copy = [...items];
      [copy[index], copy[next]] = [copy[next], copy[index]];
      return copy.map((item, i) => ({ ...item, order: i + 1 }));
    });
  };

  const addCriterion = () => {
    const eventId = context?.eventId ?? criteria[0]?.eventId ?? "li-ccs-2026";
    const label = "Novo critério";
    setCriteria((items) => [
      ...items,
      {
        id: `${slugifyId(label)}-${Date.now()}`,
        eventId,
        label,
        group: "continuous",
        order: items.length + 1,
        active: true,
      },
    ]);
  };

  const removeCriterion = async (index: number) => {
    const c = criteria[index];
    const result = await Swal.fire({
      icon: "warning",
      title: "Remover critério?",
      text: `«${c.label}» deixará de aparecer nas avaliações futuras.`,
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Remover",
    });
    if (!result.isConfirmed) return;
    setCriteria((items) =>
      items.filter((_, i) => i !== index).map((item, i) => ({ ...item, order: i + 1 })),
    );
  };

  const handleSaveCriteria = async () => {
    for (const c of criteria) {
      if (!c.label.trim()) {
        await Swal.fire({ icon: "warning", title: "Todos os critérios precisam de um nome.", confirmButtonColor: "#059669" });
        return;
      }
    }
    setSaving(true);
    try {
      const r = await fetch("/api/admin/evaluations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ criteria }),
      });
      if (!r.ok) throw new Error();
      await Swal.fire({ icon: "success", title: "Critérios guardados", timer: 2000, showConfirmButton: false });
      await load();
    } catch {
      await Swal.fire({ icon: "error", title: "Erro ao guardar", confirmButtonColor: "#059669" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-600">A carregar avaliações...</p>;

  return (
    <div className="space-y-6">
      {context && (
        <AdminEventBanner event={context.event} eventId={context.eventId} isFallback={context.isFallback} />
      )}

      <div className="flex flex-wrap gap-2 border-b pb-4">
        <button
          type="button"
          onClick={() => setTab("submissions")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "submissions" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}
        >
          Submissões e médias
        </button>
        <button
          type="button"
          onClick={() => setTab("criteria")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "criteria" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}
        >
          Critérios
        </button>
        <button type="button" onClick={load} className="ml-auto inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm">
          <RefreshCw className="w-4 h-4" /> Actualizar
        </button>
      </div>

      {tab === "criteria" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600">
              Gerir critérios de avaliação do evento. Critérios inactivos não aparecem no formulário público.
            </p>
            <button
              type="button"
              onClick={addCriterion}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" /> Adicionar critério
            </button>
          </div>

          {criteria.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
              Nenhum critério definido. Adicione o primeiro critério.
            </div>
          ) : (
            <div className="space-y-3">
              {criteria.map((c, i) => (
                <div key={c.id} className="grid md:grid-cols-[auto_1fr_auto] gap-3 p-4 bg-white rounded-xl border shadow-sm">
                  <div className="flex flex-col gap-1">
                    <button type="button" onClick={() => moveCriterion(i, -1)} disabled={i === 0} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30" aria-label="Subir">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => moveCriterion(i, 1)} disabled={i === criteria.length - 1} className="p-1 rounded hover:bg-gray-100 disabled:opacity-30" aria-label="Descer">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500">Nome do critério</label>
                      <input
                        value={c.label}
                        onChange={(e) => updateCriterion(i, { label: e.target.value })}
                        className="mt-1 w-full border rounded-lg px-3 py-2"
                        placeholder="Ex: Alimentação"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Aplicável</label>
                      <select
                        value={c.group}
                        onChange={(e) => updateCriterion(i, { group: e.target.value as EvaluationCriterion["group"] })}
                        className="mt-1 w-full border rounded-lg px-3 py-2"
                      >
                        <option value="continuous">Todos os dias</option>
                        <option value="first_day_only">Só 1.º dia</option>
                      </select>
                    </div>
                    <label className="flex items-center gap-2 text-sm sm:col-span-2">
                      <input type="checkbox" checked={c.active} onChange={(e) => updateCriterion(i, { active: e.target.checked })} />
                      Activo no formulário público
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCriterion(i)}
                    className="self-start p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    aria-label="Remover critério"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveCriteria}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            <Save className="w-4 h-4" /> {saving ? "A guardar..." : "Guardar critérios"}
          </button>
        </div>
      ) : (
        <>
          <EvaluationSummaryCards
            total={filtered.length}
            overallAverage={overall}
            uniqueRespondents={uniqueRespondents}
            withComments={withComments}
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-1">Média por critério</h3>
              <p className="text-xs text-gray-500 mb-4">
                {filterDay === "all" ? "Todos os dias" : EVALUATION_DAYS.find((d) => d.number === filterDay)?.label}
              </p>
              <CriterionAverageBars items={criterionStats} />
            </div>

            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Média por dia</h3>
              <ul className="space-y-3">
                {byDay.map((day) => (
                  <li key={day.day} className="flex items-center gap-3">
                    <span className="w-16 text-sm font-medium text-gray-700">Dia {day.day}</span>
                    <div className="flex-1 h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ratingColor(day.average)}`}
                        style={{ width: `${((day.average ?? 0) / 5) * 100}%` }}
                      />
                    </div>
                    <span className="w-20 text-right text-sm tabular-nums">
                      <strong>{formatRating(day.average)}</strong>
                      <span className="text-gray-400 text-xs ml-1">({day.count})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterDay("all")}
              className={`px-3 py-1.5 rounded-lg text-sm ${filterDay === "all" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}
            >
              Todos
            </button>
            {EVALUATION_DAYS.map((d) => (
              <button
                key={d.number}
                type="button"
                onClick={() => setFilterDay(d.number)}
                className={`px-3 py-1.5 rounded-lg text-sm ${filterDay === d.number ? "bg-emerald-600 text-white" : "bg-gray-100"}`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            {filtered.map((s) => {
              const avg = submissionAverage(s);
              return (
                <div key={s.id} className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Dia {s.dayNumber} · {new Date(s.submittedAt).toLocaleString("pt-PT")}
                      </p>
                      {s.respondentName && (
                        <p className="text-sm text-gray-600">
                          {s.respondentName}
                          {s.role ? ` · ${s.role}` : ""}
                          {s.organization ? ` · ${s.organization}` : ""}
                        </p>
                      )}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold tabular-nums">
                      Média {formatRating(avg)}/5
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {Object.entries(s.scores).map(([cid, score]) => {
                      const label = criteria.find((c) => c.id === cid)?.label ?? cid;
                      return (
                        <li key={cid}>
                          <div className="flex justify-between text-sm mb-0.5">
                            <span className="text-gray-700">{label}</span>
                            <span className="font-semibold tabular-nums">{score}/5</span>
                          </div>
                          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${ratingColor(score)}`}
                              style={{ width: `${(score / 5) * 100}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {s.comment && (
                    <blockquote className="mt-3 pl-3 border-l-2 border-misau-gold text-sm italic text-gray-700">
                      {s.comment}
                    </blockquote>
                  )}
                </div>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-gray-500 italic text-center py-8">Sem submissões para o filtro seleccionado.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
