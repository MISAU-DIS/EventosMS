"use client";

import { useEffect, useState } from "react";
import type { StoredEvent } from "@/types/event-record";

type ActiveEventState = {
  loading: boolean;
  hasActiveEvent: boolean;
  event: StoredEvent | null;
};

export function useActiveEventStatus(): ActiveEventState {
  const [state, setState] = useState<ActiveEventState>({
    loading: true,
    hasActiveEvent: true,
    event: null,
  });

  useEffect(() => {
    fetch("/api/v1/events/active")
      .then(async (r) => {
        if (!r.ok) {
          setState({ loading: false, hasActiveEvent: false, event: null });
          return;
        }
        const d = (await r.json()) as { event: StoredEvent };
        const active = d.event?.status === "active";
        setState({
          loading: false,
          hasActiveEvent: active,
          event: active ? d.event : null,
        });
      })
      .catch(() => {
        setState({ loading: false, hasActiveEvent: false, event: null });
      });
  }, []);

  return state;
}
