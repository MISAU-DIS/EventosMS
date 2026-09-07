"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { eventConfig } from "@/data";
import InstitutionalBackground from "@/components/layout/InstitutionalBackground";
import PageContainer from "@/components/layout/PageContainer";
import ScoreScale from "@/components/event/ScoreScale";
import {
  getEvaluationFingerprint,
  getSubmittedDays,
  markDaySubmitted,
} from "@/lib/eval-fingerprint";
import { useOffline } from "@/hooks/useOffline";
import type { EvaluationCriterion } from "@/types/evaluations";
import { EVALUATION_DAYS } from "@/types/evaluations";

export default function ComentariosPage() {
  const offline = useOffline();
  const [dayNumber, setDayNumber] = useState(1);
  const [criteria, setCriteria] = useState<EvaluationCriterion[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [submittedDays, setSubmittedDays] = useState<number[]>([]);
  const [eventClosed, setEventClosed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const alreadySubmitted = submittedDays.includes(dayNumber);

  const loadCriteria = useCallback(async (day: number) => {
    setLoading(true);
    try {
      const r = await fetch(`/api/evaluation-criteria?day=${day}`);
      const d = (await r.json()) as { criteria: EvaluationCriterion[] };
      setCriteria(d.criteria);
      setScores({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setSubmittedDays(getSubmittedDays());
    fetch("/api/v1/events/active")
      .then((r) => r.json())
      .then((d: { event?: { status: string } }) => {
        if (d.event?.status !== "active") setEventClosed(true);
      })
      .catch(() => {});
    loadCriteria(dayNumber);
  }, [dayNumber, loadCriteria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadySubmitted || offline) return;

    for (const c of criteria) {
      if (scores[c.id] === undefined) {
        await Swal.fire({ icon: "warning", title: `Avalie «${c.label}» (0–5)`, confirmButtonColor: "#059669" });
        return;
      }
    }

    setSubmitting(true);
    try {
      const fingerprint = getEvaluationFingerprint();
      const r = await fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayNumber,
          fingerprint,
          scores,
          comment: comment.trim() || undefined,
          respondentName: name.trim() || undefined,
          role: role.trim() || undefined,
          organization: organization.trim() || undefined,
        }),
      });
      const d = (await r.json()) as { error?: string };
      if (!r.ok) throw new Error(d.error || "Erro ao submeter");

      markDaySubmitted(dayNumber);
      setSubmittedDays(getSubmittedDays());
      await Swal.fire({ icon: "success", title: "Avaliação registada", text: "Obrigado pelo seu feedback.", confirmButtonColor: "#059669" });
      setComment("");
    } catch (err) {
      await Swal.fire({ icon: "error", title: "Não foi possível submeter", text: err instanceof Error ? err.message : "", confirmButtonColor: "#059669" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <title>{`Avaliações - ${eventConfig.shortTitle} MISAU 2026`}</title>
      <meta name="description" content={`Avaliação diária do ${eventConfig.title}`} />

      <main className="relative z-10 min-h-screen">
        <InstitutionalBackground variant="extended" />

        <div className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 text-misau-dark">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-4xl font-extrabold mb-2">
              Avaliação Diária
            </motion.h1>
            <p className="text-gray-600">{eventConfig.title}</p>
            <p className="text-sm text-misau-medium mt-2">Escala 0–5 por critério · 1 avaliação por dia</p>
          </div>

          <PageContainer className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {EVALUATION_DAYS.map((d) => (
                <button
                  key={d.number}
                  type="button"
                  onClick={() => setDayNumber(d.number)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    dayNumber === d.number ? "bg-misau-gold text-white" : "bg-white border border-misau-100"
                  }`}
                >
                  {d.label}
                  {submittedDays.includes(d.number) && " ✓"}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="text-center text-gray-600">A carregar critérios...</p>
            ) : eventClosed ? (
              <div className="bg-white rounded-xl p-8 text-center border border-misau-100">
                <p className="text-lg font-semibold text-misau-medium">Evento encerrado</p>
                <p className="text-gray-600 mt-2">As avaliações não estão disponíveis para eventos arquivados.</p>
              </div>
            ) : alreadySubmitted ? (
              <div className="bg-white rounded-xl p-8 text-center border border-misau-100">
                <p className="text-lg font-semibold text-misau-medium">Já submeteu a avaliação deste dia.</p>
                <p className="text-gray-600 mt-2">Seleccione outro dia se ainda não avaliou.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 sm:p-8 border border-misau-100 space-y-6 shadow-sm">
                {offline && (
                  <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                    O envio de avaliações requer ligação à internet.
                  </p>
                )}
                {criteria.map((c) => (
                  <div key={c.id}>
                    <p className="font-semibold text-misau-dark mb-2">{c.label}</p>
                    <ScoreScale value={scores[c.id] ?? null} onChange={(v) => setScores({ ...scores, [c.id]: v })} />
                  </div>
                ))}

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Comentário global (opcional)</span>
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="mt-1 w-full border rounded-lg px-3 py-2" placeholder="Partilhe observações sobre o dia..." />
                </label>

                <div className="grid sm:grid-cols-3 gap-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome (opcional)" className="border rounded-lg px-3 py-2 text-sm" />
                  <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Função (opcional)" className="border rounded-lg px-3 py-2 text-sm" />
                  <input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Organização (opcional)" className="border rounded-lg px-3 py-2 text-sm" />
                </div>

                <button type="submit" disabled={submitting || offline} className="w-full bg-misau-gold hover:bg-misau-medium text-white py-3 rounded-full font-semibold disabled:opacity-60">
                  {offline ? "Indisponível offline" : submitting ? "A submeter..." : "Submeter avaliação"}
                </button>
              </form>
            )}
          </PageContainer>
        </div>
      </main>
    </>
  );
}
