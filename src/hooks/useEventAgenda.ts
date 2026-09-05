"use client";

import { useEffect, useState } from "react";
import { eventAgenda } from "@/data/agenda";
import type { EventAgendaDay } from "@/types/event";

export function useEventAgenda() {
  const [days, setDays] = useState<EventAgendaDay[]>(eventAgenda);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/agenda");
        if (!response.ok) throw new Error("Falha ao carregar agenda.");
        const data = (await response.json()) as { days: EventAgendaDay[] };
        if (!cancelled && data.days?.length) setDays(data.days);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Erro desconhecido.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { days, loading, error };
}
