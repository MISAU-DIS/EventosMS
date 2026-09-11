"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Archive,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Power,
} from "lucide-react";
import { isEventWithinDates } from "@/lib/event-dates";
import type { StoredEvent } from "@/types/event-record";

function statusLabel(status: StoredEvent["status"]) {
  if (status === "active") return "Activo no portal";
  if (status === "archived") return "Arquivado";
  return "Rascunho";
}

function statusBadgeClass(status: StoredEvent["status"]) {
  if (status === "active") return "bg-emerald-100 text-emerald-800";
  if (status === "archived") return "bg-gray-100 text-gray-700";
  return "bg-amber-100 text-amber-800";
}

export default function EventsAdminPanel() {
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch("/api/v1/events?status=all");
      const d = (await r.json()) as { events: StoredEvent[] };
      setEvents(d.events ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const activeEvent = events.find((event) => event.status === "active") ?? null;
  const archivedEvents = events.filter((event) => event.status === "archived");

  const archive = async (event: StoredEvent) => {
    const withinDates = isEventWithinDates(event);

    const result = await Swal.fire({
      icon: "warning",
      title: "Arquivar evento activo?",
      html: `
        <div class="text-left text-sm text-gray-600 space-y-3">
          <p>
            <strong>${event.title}</strong> deixará de estar activo no portal público.
          </p>
          <p class="rounded-lg bg-amber-50 border border-amber-200 p-3 text-amber-900">
            Os visitantes deixarão de ver documentos, agenda, programa, fotografias e avaliações
            deste evento. Verão a mensagem de que não há actividade em andamento.
          </p>
          ${
            withinDates
              ? `<p class="rounded-lg bg-red-50 border border-red-200 p-3 text-red-900">
                   Este evento está <strong>dentro do período previsto</strong> (${event.dateRange}).
                   Tem a certeza que deseja arquivá-lo agora?
                 </p>`
              : ""
          }
          <p class="text-gray-500">
            Os dados mantêm-se (documentos, fotografias, avaliações). Pode reactivar depois.
          </p>
          <p>Introduza a senha de administrador para confirmar.</p>
        </div>
      `,
      input: "password",
      inputPlaceholder: "Senha de administrador",
      inputAttributes: { autocapitalize: "off", autocorrect: "off" },
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Arquivar evento",
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage("Introduza a senha de administrador.");
        }
        return password;
      },
    });

    if (!result.isConfirmed || !result.value) return;

    const r = await fetch(`/api/v1/events/${event.id}/archive`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: result.value }),
    });

    if (r.ok) {
      await Swal.fire({
        icon: "success",
        title: "Evento arquivado",
        text: "O portal já não mostra este evento como activo.",
        confirmButtonColor: "#059669",
      });
      await load();
    } else {
      const err = (await r.json().catch(() => ({}))) as { error?: { message?: string } };
      await Swal.fire({
        icon: "error",
        title: "Não foi possível arquivar",
        text: err.error?.message ?? "Verifique a senha e tente novamente.",
        confirmButtonColor: "#059669",
      });
    }
  };

  const activate = async (target: StoredEvent) => {
    const currentTitle = activeEvent?.title;

    const result = await Swal.fire({
      icon: "question",
      title: "Activar evento no portal?",
      html: `
        <div class="text-left text-sm text-gray-600 space-y-2">
          <p>
            <strong>${target.title}</strong> ficará visível no portal público.
          </p>
          ${
            currentTitle
              ? `<p>O evento actualmente activo (<strong>${currentTitle}</strong>) será arquivado automaticamente.</p>`
              : "<p>Neste momento não há nenhum evento activo no portal.</p>"
          }
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Activar",
    });

    if (!result.isConfirmed) return;

    const r = await fetch(`/api/v1/events/${target.id}/activate`, { method: "POST" });

    if (r.ok) {
      await Swal.fire({
        icon: "success",
        title: "Evento activado",
        text: `${target.title} é agora o evento activo no portal.`,
        confirmButtonColor: "#059669",
      });
      await load();
    } else {
      await Swal.fire({ icon: "error", title: "Não foi possível activar.", confirmButtonColor: "#059669" });
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-gray-600">
        A carregar eventos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-misau-dark">Eventos</h2>
        <p className="text-sm text-gray-600 mt-1">
          Gerir qual evento está activo no portal público. Só um evento pode estar activo de cada vez.
        </p>
      </div>

      <section className="rounded-xl border-2 border-emerald-200 bg-emerald-50/40 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-emerald-900">Evento activo no portal</h3>
        </div>

        {activeEvent ? (
          <div className="bg-white rounded-xl border border-emerald-100 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xl font-bold text-misau-dark">{activeEvent.title}</p>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {activeEvent.dateRange}
                </p>
                <p className="text-gray-600 mt-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {activeEvent.location}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(activeEvent.status)}`}>
                {statusLabel(activeEvent.status)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => archive(activeEvent)}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700"
            >
              <Archive className="w-4 h-4" />
              Arquivar evento
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-dashed border-emerald-200 p-6 text-center">
            <p className="text-gray-700 font-medium">Nenhum evento activo no portal.</p>
            <p className="text-sm text-gray-500 mt-2">
              Os visitantes veem a mensagem de que não há actividade em andamento.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-xl border bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Eventos arquivados</h3>
          </div>
          <Link
            href="/arquivo"
            target="_blank"
            className="inline-flex items-center gap-1 text-sm font-semibold text-misau-medium hover:underline"
          >
            Ver página pública
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {archivedEvents.length === 0 ? (
          <p className="text-sm text-gray-500">Ainda não há eventos arquivados.</p>
        ) : (
          <ul className="space-y-3">
            {archivedEvents.map((event) => (
              <li
                key={event.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-gray-100 p-4 hover:border-misau-gold/30"
              >
                <div>
                  <p className="font-semibold text-misau-dark">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.dateRange} · {event.location}</p>
                  {event.archivedAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      Arquivado em {new Date(event.archivedAt).toLocaleDateString("pt-PT")}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => activate(event)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 shrink-0"
                >
                  <Power className="w-4 h-4" />
                  Activar no portal
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
