"use client";

import { useEffect, useState } from "react";
import { eventProgram } from "@/data/program";
import type { EventProgramDay } from "@/types/event";

export function useEventProgram() {
  const [days, setDays] = useState<EventProgramDay[]>(eventProgram);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/program");
        if (!response.ok) throw new Error("Falha ao carregar programa.");
        const data = (await response.json()) as { days: EventProgramDay[] };
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
