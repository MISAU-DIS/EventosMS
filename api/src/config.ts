export const API_VERSION = "1.1.0";
export const DEFAULT_EVENT_ID = "li-ccs-2026";

export const apiMeta = {
  name: "Eventos MISAU API",
  version: API_VERSION,
  defaultEventId: DEFAULT_EVENT_ID,
} as const;

export const config = {
  port: Number(process.env.PORT || 4000),
  adminPassword: process.env.ADMIN_PASSWORD || "Misau.2025",
  sessionToken:
    process.env.ADMIN_SESSION_TOKEN || "misau-ccs-admin-local-session",
  cookieName: "ccs_admin_session",
  cookieMaxAgeMs: 8 * 60 * 60 * 1000,
  cookieSecure: process.env.COOKIE_SECURE === "true",
  dataDir: process.env.DATA_DIR || "data",
  publicDir: process.env.PUBLIC_DIR || "public",
  publicBaseUrl: process.env.PUBLIC_BASE_URL?.replace(/\/$/, "") || "",
  corsOrigins: process.env.CORS_ALLOWED_ORIGINS?.split(",").map((v) => v.trim()).filter(Boolean),
  buildRevision: process.env.BUILD_REVISION?.trim() || "local",
} as const;

export function isValidAdminPassword(password: string): boolean {
  return password === config.adminPassword;
}

export function documentsRoot(): string {
  return `${config.publicDir}/documentos`;
}

export function photosRoot(): string {
  return `${config.publicDir}/fotografias`;
}

export function dataPath(name: string): string {
  return `${config.dataDir}/${name}`;
}
