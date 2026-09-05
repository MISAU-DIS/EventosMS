"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import type { EventAgendaDay, EventTheme } from "@/types/event";

export default function AgendaAdminPanel() {
  const [days, setDays] = useState<EventAgendaDay[]>([]);
  const [selectedDayId, setSelectedDayId] = useState("dia1");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAgenda = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/agenda");
      if (!response.ok) throw new Error("Falha ao carregar agenda.");
      const data = (await response.json()) as { days: EventAgendaDay[] };
      setDays(data.days);
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
    loadAgenda();
  }, [loadAgenda]);

  const selectedDay = days.find((day) => day.id === selectedDayId);

  const updateDay = (updater: (day: EventAgendaDay) => EventAgendaDay) => {
    setDays((current) =>
      current.map((day) => (day.id === selectedDayId ? updater(day) : day)),
    );
  };

  const updateTheme = (index: number, field: keyof EventTheme, value: string | number) => {
    updateDay((day) => ({
      ...day,
      themes: day.themes.map((theme, i) =>
        i === index ? { ...theme, [field]: value } : theme,
      ),
    }));
  };

  const addTheme = () => {
    updateDay((day) => {
      const maxOrder = day.themes.reduce((max, t) => Math.max(max, t.order), 0);
      return {
        ...day,
        themes: [
          ...day.themes,
          { order: maxOrder + 1, title: "", responsible: "" },
        ],
      };
    });
  };

  const removeTheme = async (index: number) => {
    const theme = selectedDay?.themes[index];
    if (!theme) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "Remover tema?",
      text: theme.title || "Este tema será removido da agenda.",
      showCancelButton: true,
      confirmButtonText: "Remover",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    updateDay((day) => ({
      ...day,
      themes: day.themes.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/agenda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days }),
      });
      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error || "Falha ao guardar.");
      }
      const data = (await response.json()) as { days: EventAgendaDay[] };
      setDays(data.days);
      await Swal.fire({
        icon: "success",
        title: "Agenda guardada",
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
    return <p className="text-gray-600">A carregar agenda...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestão da Agenda</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadAgenda}
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

          <div className="space-y-4">
            {selectedDay.themes.map((theme, index) => (
              <div
                key={`${selectedDay.id}-${index}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <label className="lg:col-span-1 block">
                  <span className="text-xs font-medium text-gray-600">Ordem</span>
                  <input
                    type="number"
                    min={1}
                    value={theme.order}
                    onChange={(e) =>
                      updateTheme(index, "order", Number(e.target.value) || 1)
                    }
                    className="mt-1 w-full border border-gray-300 rounded-lg px-2 py-2"
                  />
                </label>
                <label className="lg:col-span-7 block">
                  <span className="text-xs font-medium text-gray-600">Tema</span>
                  <input
                    type="text"
                    value={theme.title}
                    onChange={(e) => updateTheme(index, "title", e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </label>
                <label className="lg:col-span-3 block">
                  <span className="text-xs font-medium text-gray-600">Responsável</span>
                  <input
                    type="text"
                    value={theme.responsible}
                    onChange={(e) => updateTheme(index, "responsible", e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </label>
                <div className="lg:col-span-1 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeTheme(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    aria-label="Remover tema"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addTheme}
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 font-medium"
          >
            <Plus className="w-4 h-4" />
            Adicionar tema
          </button>
        </div>
      )}
    </div>
  );
}
