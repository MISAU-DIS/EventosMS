"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminEventContext } from "@/types/admin-event";

export function useAdminEventContext() {
  const [context, setContext] = useState<AdminEventContext | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/event");
      if (!response.ok) throw new Error();
      setContext((await response.json()) as AdminEventContext);
    } catch {
      setContext(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { context, loading, reload: load };
}
