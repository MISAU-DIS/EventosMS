"use client";

import { Download, Share, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DISMISS_KEY = "misau-pwa-install-dismissed";
const INSTALLED_KEY = "misau-pwa-install-done";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOSDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as Window & { MSStream?: unknown }).MSStream
  );
}

function shouldHideInstallPrompt() {
  if (isStandaloneMode()) return true;
  try {
    if (localStorage.getItem(INSTALLED_KEY)) return true;
    if (localStorage.getItem(DISMISS_KEY)) return true;
  } catch {
    return false;
  }
  return false;
}

function markInstallPromptSeen() {
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // storage indisponível
  }
}

function markAppInstalled() {
  try {
    localStorage.setItem(INSTALLED_KEY, "1");
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // storage indisponível
  }
}

export default function InstallPrompt() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || shouldHideInstallPrompt()) return;

    const ios = isIOSDevice();
    setIsIOS(ios);

    const onInstalled = () => {
      markAppInstalled();
      setVisible(false);
    };
    window.addEventListener("appinstalled", onInstalled);

    const handler = (event: Event) => {
      if (shouldHideInstallPrompt()) return;
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setCanInstall(true);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const timer = window.setTimeout(() => {
      if (shouldHideInstallPrompt()) return;
      if (ios) setVisible(true);
    }, 1200);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  const dismissPermanently = () => {
    markInstallPromptSeen();
    setVisible(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    if (choice.outcome === "accepted") markAppInstalled();
    setVisible(false);
  };

  if (pathname !== "/" || !visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="pwa-install-title"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[90]"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-misau-100 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-white border border-misau-100 p-1.5 flex items-center justify-center">
            <img
              src="/Emblem_of_Mozambique.svg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2
              id="pwa-install-title"
              className="text-base sm:text-lg font-bold text-misau-dark pr-6"
            >
              Instale a app LI CCS
            </h2>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              Recomendamos instalar no tablet para acesso rápido e uso offline
              durante o evento.
            </p>
          </div>
          <button
            type="button"
            onClick={dismissPermanently}
            className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          {canInstall && !isIOS ? (
            <button
              type="button"
              onClick={install}
              className="inline-flex items-center justify-center gap-2 flex-1 bg-misau-gold hover:bg-misau-medium text-white py-2.5 px-4 rounded-full font-semibold text-sm transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden />
              Instalar app
            </button>
          ) : isIOS ? (
            <p className="flex-1 text-sm text-gray-700 bg-misau-50 border border-misau-100 rounded-xl px-4 py-3 flex items-start gap-2">
              <Share className="w-4 h-4 text-misau-gold shrink-0 mt-0.5" aria-hidden />
              <span>
                Toque em <strong>Partilhar</strong> e depois em{" "}
                <strong>Adicionar ao ecrã principal</strong>.
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={canInstall ? install : undefined}
              disabled={!canInstall}
              className="inline-flex items-center justify-center gap-2 flex-1 bg-misau-gold hover:bg-misau-medium text-white py-2.5 px-4 rounded-full font-semibold text-sm transition-colors disabled:opacity-70"
            >
              <Download className="w-4 h-4" aria-hidden />
              Instalar app
            </button>
          )}
          <button
            type="button"
            onClick={dismissPermanently}
            className="sm:w-auto w-full py-2.5 px-4 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}
