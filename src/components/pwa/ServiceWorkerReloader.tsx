"use client";

import { useEffect } from "react";

const UPDATE_INTERVAL_MS = 30 * 60 * 1000;

/**
 * Actualiza automaticamente tabs abertas quando um novo service worker é activado.
 * Sem confirmação do utilizador — necessário para PWA e browser reflectirem deploys.
 */
export default function ServiceWorkerReloader() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    if (!("serviceWorker" in navigator)) return;

    let reloaded = false;
    const reloadOnce = () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener("controllerchange", reloadOnce);

    const checkForUpdates = () => {
      navigator.serviceWorker.ready
        .then((reg) => reg.update())
        .catch(() => {});
    };

    checkForUpdates();
    const interval = window.setInterval(checkForUpdates, UPDATE_INTERVAL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") checkForUpdates();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", reloadOnce);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
