/// <reference lib="webworker" />

import { defaultCache } from "@serwist/next/worker";
import type {
  PrecacheEntry,
  RuntimeCaching,
  SerwistGlobalConfig,
} from "serwist";
import {
  ExpirationPlugin,
  NetworkFirst,
  Serwist,
  StaleWhileRevalidate,
} from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const apiCache: RuntimeCaching = {
  matcher: ({ sameOrigin, url }) =>
    sameOrigin &&
    url.pathname.startsWith("/api/") &&
    !url.pathname.startsWith("/api/admin/") &&
    !url.pathname.startsWith("/api/v1/auth/"),
  handler: new NetworkFirst({
    cacheName: "eventos-api",
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 64,
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxAgeFrom: "last-used",
      }),
    ],
  }),
};

const mediaCache: RuntimeCaching = {
  matcher: ({ sameOrigin, url }) =>
    sameOrigin &&
    (url.pathname.startsWith("/documentos/") ||
      url.pathname.startsWith("/fotografias/")),
  handler: new StaleWhileRevalidate({
    cacheName: "eventos-media",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 30 * 24 * 60 * 60,
        maxAgeFrom: "last-used",
      }),
    ],
  }),
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
  },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  disableDevLogs: true,
  runtimeCaching: [apiCache, mediaCache, ...defaultCache],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.mode === "navigate";
        },
      },
    ],
  },
});

serwist.addEventListeners();
