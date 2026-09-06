"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Save } from "lucide-react";
import Swal from "sweetalert2";
import type { EvaluationCriterion, EvaluationSubmission } from "@/types/evaluations";
import { EVALUATION_DAYS } from "@/types/evaluations";

export default function EvaluationsAdminPanel() {
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
      setCriteria(d.criteria);
      setSubmissions(d.submissions);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = submissions.filter((s) => filterDay === "all" || s.dayNumber === filterDay);

  const updateCriterion = (index: number, patch: Partial<EvaluationCriterion>) => {
    setCriteria((c) => c.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const handleSaveCriteria = async () => {
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
      <div className="flex flex-wrap gap-2 border-b pb-4">
        <button type="button" onClick={() => setTab("submissions")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "submissions" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>Submissões</button>
        <button type="button" onClick={() => setTab("criteria")} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "criteria" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>Critérios</button>
        <button type="button" onClick={load} className="ml-auto inline-flex items-center gap-2 px-3 py-2 border rounded-lg text-sm"><RefreshCw className="w-4 h-4" /> Actualizar</button>
      </div>

      {tab === "criteria" ? (
        <div className="space-y-4">
          {criteria.map((c, i) => (
            <div key={c.id} className="grid md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg border">
              <input value={c.label} onChange={(e) => updateCriterion(i, { label: e.target.value })} className="border rounded-lg px-3 py-2 md:col-span-2" />
              <select value={c.group} onChange={(e) => updateCriterion(i, { group: e.target.value as EvaluationCriterion["group"] })} className="border rounded-lg px-3 py-2">
                <option value="continuous">Contínuo</option>
                <option value="first_day_only">Só 1.º dia</option>
              </select>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={c.active} onChange={(e) => updateCriterion(i, { active: e.target.checked })} /> Activo</label>
            </div>
          ))}
          <button type="button" onClick={handleSaveCriteria} disabled={saving} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg"><Save className="w-4 h-4" /> {saving ? "A guardar..." : "Guardar critérios"}</button>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setFilterDay("all")} className={`px-3 py-1.5 rounded-lg text-sm ${filterDay === "all" ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>Todos</button>
            {EVALUATION_DAYS.map((d) => (
              <button key={d.number} type="button" onClick={() => setFilterDay(d.number)} className={`px-3 py-1.5 rounded-lg text-sm ${filterDay === d.number ? "bg-emerald-600 text-white" : "bg-gray-100"}`}>{d.label}</button>
            ))}
          </div>
          <p className="text-sm text-gray-600">{filtered.length} submissão(ões)</p>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {filtered.map((s) => (
              <div key={s.id} className="bg-white border rounded-xl p-4 text-sm">
                <p className="font-semibold">Dia {s.dayNumber} — {new Date(s.submittedAt).toLocaleString("pt-PT")}</p>
                {s.respondentName && <p className="text-gray-600">{s.respondentName}{s.organization ? ` · ${s.organization}` : ""}</p>}
                <ul className="mt-2 space-y-1">
                  {Object.entries(s.scores).map(([cid, score]) => {
                    const label = criteria.find((c) => c.id === cid)?.label ?? cid;
                    return <li key={cid}>{label}: <strong>{score}</strong>/5</li>;
                  })}
                </ul>
                {s.comment && <p className="mt-2 italic text-gray-700">«{s.comment}»</p>}
              </div>
            ))}
            {filtered.length === 0 && <p className="text-gray-500 italic">Sem submissões.</p>}
          </div>
        </>
      )}
    </div>
  );
}
