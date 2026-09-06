"use client";

import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DEFAULT_EVENT_ID } from "@/config/api";
import type { StoredEvent } from "@/types/event-record";

export default function EventsAdminPanel() {
  const [event, setEvent] = useState<StoredEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/v1/events/active");
      const d = (await r.json()) as { event: StoredEvent };
      setEvent(d.event);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const archive = async () => {
    if (!event) return;
    const result = await Swal.fire({
      icon: "warning",
      title: "Arquivar evento?",
      text: "O evento deixa de aceitar avaliações. Os dados mantêm-se.",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Arquivar",
    });
    if (!result.isConfirmed) return;
    const r = await fetch(`/api/v1/events/${event.id}/archive`, { method: "POST" });
    if (r.ok) {
      await Swal.fire({ icon: "success", title: "Evento arquivado", confirmButtonColor: "#059669" });
      await load();
    }
  };

  if (loading) return <p className="text-gray-600">A carregar...</p>;
  if (!event) return <p className="text-gray-600">Nenhum evento activo.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Evento activo</h2>
      <div className="bg-white border rounded-xl p-6">
        <p className="font-semibold text-lg">{event.title}</p>
        <p className="text-gray-600">{event.dateRange} · {event.location}</p>
        <p className="text-sm mt-2"><span className="font-medium">Estado:</span> {event.status}</p>
        {event.status === "active" && (
          <button type="button" onClick={archive} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
            Arquivar evento
          </button>
        )}
        {event.status === "archived" && event.id === DEFAULT_EVENT_ID && (
          <button
            type="button"
            onClick={async () => {
              await fetch(`/api/v1/events/${event.id}/activate`, { method: "POST" });
              await load();
            }}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm"
          >
            Reactivar evento
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500">Eventos arquivados: consulta pública em /arquivo</p>
    </div>
  );
}
