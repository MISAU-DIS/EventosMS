"use client";

import { useEffect } from "react";

const WARM_ENDPOINTS = [
  "/api/agenda",
  "/api/program",
  "/api/documents",
  "/api/photos",
  "/api/evaluation-criteria?day=1",
];

/** Prefetch public APIs while online so tablets have content for offline use. */
export default function WarmOfflineCache() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !navigator.onLine) return;

    const warm = () => {
      for (const endpoint of WARM_ENDPOINTS) {
        fetch(endpoint, { cache: "no-store" }).catch(() => {});
      }
    };

    warm();
    window.addEventListener("online", warm);
    return () => window.removeEventListener("online", warm);
  }, []);

  return null;
}
