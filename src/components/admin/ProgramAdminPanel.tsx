"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { applyOrderAt, renumberOrders, sortByOrder } from "@/lib/content-order";
import type { EventProgramDay, EventSession } from "@/types/event";

export default function ProgramAdminPanel() {
  const [days, setDays] = useState<EventProgramDay[]>([]);
  const [selectedDayId, setSelectedDayId] = useState("dia1");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgram = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/program");
      if (!response.ok) throw new Error("Falha ao carregar programa.");
      const data = (await response.json()) as { days: EventProgramDay[] };
      setDays(
        data.days.map((day) => ({
          ...day,
          sessions: sortByOrder(day.sessions),
        })),
      );
      if (data.days.length && !data.days.find((d) => d.id === selectedDayId)) {
        setSelectedDayId(data.days[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  }, [selectedDayId]);

  useEffect(() => {
    loadProgram();
  }, [loadProgram]);

  const selectedDay = days.find((day) => day.id === selectedDayId);

  const updateDay = (updater: (day: EventProgramDay) => EventProgramDay) => {
    setDays((current) =>
      current.map((day) => (day.id === selectedDayId ? updater(day) : day)),
    );
  };

  const updateSession = (
    index: number,
    field: keyof EventSession,
    value: string | number,
  ) => {
    updateDay((day) => {
      const sessions = sortByOrder(day.sessions).map((session, i) =>
        i === index ? { ...session, [field]: value } : session,
      );
      return { ...day, sessions };
    });
  };

  const applySessionOrder = (index: number, newOrder: number) => {
    updateDay((day) => ({
      ...day,
      sessions: applyOrderAt(sortByOrder(day.sessions), index, newOrder),
    }));
  };

  const addSession = () => {
    updateDay((day) => {
      const sessions = sortByOrder(day.sessions);
      const maxOrder = sessions.reduce((max, s) => Math.max(max, s.order), 0);
      return {
        ...day,
        sessions: [
          ...sessions,
          {
            order: maxOrder + 1,
            time: "",
            title: "",
            type: "",
            speaker: "",
          },
        ],
      };
    });
  };

  const removeSession = async (index: number) => {
    const session = selectedDay ? sortByOrder(selectedDay.sessions)[index] : undefined;
    if (!session) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "Remover sessão?",
      text: session.title || "Esta sessão será removida do programa.",
      showCancelButton: true,
      confirmButtonText: "Remover",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    updateDay((day) => ({
      ...day,
      sessions: renumberOrders(sortByOrder(day.sessions).filter((_, i) => i !== index)),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/program", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days }),
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Falha ao guardar.");
      }
      const data = (await response.json()) as { days: EventProgramDay[] };
      setDays(
        data.days.map((day) => ({
          ...day,
          sessions: sortByOrder(day.sessions),
        })),
      );
      await Swal.fire({
        icon: "success",
        title: "Programa guardado",
        text: "As alterações já estão visíveis no portal.",
        confirmButtonColor: "#059669",
        timer: 2200,
        timerProgressBar: true,
      });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Erro ao guardar",
        text: err instanceof Error ? err.message : "Tente novamente.",
        confirmButtonColor: "#059669",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600">A carregar programa...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestão do Programa</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadProgram}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "A guardar..." : "Guardar alterações"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day.id}
            type="button"
            onClick={() => setSelectedDayId(day.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDayId === day.id
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {selectedDay && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Etiqueta do dia</span>
              <input
                type="text"
                value={selectedDay.label}
                onChange={(e) =>
                  updateDay((day) => ({ ...day, label: e.target.value }))
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Data</span>
              <input
                type="text"
                value={selectedDay.date}
                onChange={(e) =>
                  updateDay((day) => ({ ...day, date: e.target.value }))
                }
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </label>
          </div>

          <p className="text-sm text-gray-500">
            Altere o número de ordem e clique fora do campo — as sessões deslocam-se
            automaticamente (ex.: ordem 6 empurra o anterior 6 para 7).
          </p>

          <div className="space-y-4">
            {sortByOrder(selectedDay.sessions).map((session, index) => (
              <div
                key={`${selectedDay.id}-${index}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <label className="lg:col-span-1 block">
                  <span className="text-xs font-medium text-gray-600">Ordem</span>
                  <input
                    type="number"
                    min={1}
                    max={selectedDay.sessions.length}
                    value={session.order}
                    onChange={(e) =>
                      updateSession(index, "order", Number(e.target.value) || 1)
                    }
                    onBlur={(e) =>
                      applySessionOrder(index, Number(e.target.value) || session.order)
                    }
                    className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-2"
                  />
                </label>
                <label className="lg:col-span-2 block">
                  <span className="text-xs font-medium text-gray-600">Hora</span>
                  <input
                    type="text"
                    value={session.time}
                    onChange={(e) => updateSession(index, "time", e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </label>
                <label className="lg:col-span-4 block">
                  <span className="text-xs font-medium text-gray-600">Título</span>
                  <input
                    type="text"
                    value={session.title}
                    onChange={(e) => updateSession(index, "title", e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </label>
                <label className="lg:col-span-2 block">
                  <span className="text-xs font-medium text-gray-600">Tipo</span>
                  <input
                    type="text"
                    value={session.type}
                    onChange={(e) => updateSession(index, "type", e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </label>
                <label className="lg:col-span-2 block">
                  <span className="text-xs font-medium text-gray-600">Orador</span>
                  <input
                    type="text"
                    value={session.speaker}
                    onChange={(e) => updateSession(index, "speaker", e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </label>
                <div className="lg:col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeSession(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    aria-label="Remover sessão"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSession}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium"
          >
            <Plus className="w-4 h-4" />
            Adicionar sessão
          </button>
        </div>
      )}
    </div>
  );
}
