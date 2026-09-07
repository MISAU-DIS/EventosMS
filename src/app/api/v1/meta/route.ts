import { v1Json } from "@/server/api-v1";
import { apiMeta, API_VERSION, DEFAULT_EVENT_ID } from "@/config/api";

const eventBase = `/api/v1/events/${DEFAULT_EVENT_ID}`;

export async function GET() {
  return v1Json({
    ...apiMeta,
    version: API_VERSION,
    environment: process.env.NODE_ENV ?? "development",
    defaultEventId: DEFAULT_EVENT_ID,
    mobile: {
      baseUrl: process.env.PUBLIC_BASE_URL ?? null,
      auth: {
        login: "POST /api/v1/auth/login",
        session: "GET /api/v1/auth/session",
        bearerHeader: "Authorization: Bearer <token>",
      },
      publicEndpoints: [
        `GET ${eventBase}`,
        `GET ${eventBase}/documents?absolute=true`,
        `GET ${eventBase}/agenda`,
        `GET ${eventBase}/program`,
        `GET ${eventBase}/photos?absolute=true`,
        `GET ${eventBase}/evaluation-criteria?day=1`,
        `GET ${eventBase}/evaluations?day=1&fingerprint=...`,
        `POST ${eventBase}/evaluations`,
      ],
    },
    legacyRoutes: [
      "/api/documents",
      "/api/agenda",
      "/api/program",
      "/api/photos",
      "/api/evaluations",
      "/api/admin/login",
      "/api/admin/documents",
    ],
    documentation: "/api/v1/docs",
    openApi: "/api/v1/openapi",
    health: "/api/v1/health",
  });
}
