import { Router } from "express";
import {
  adminLoginJson,
  clearAdminSessionCookie,
  isAdminSessionValid,
  parseLoginPassword,
  requireAdmin,
  setAdminSessionCookie,
} from "../auth.js";
import { getPublicBaseUrl, v1Error, v1Json } from "../api-v1.js";
import { getOpenApiSpec } from "../openapi-spec.js";
import {
  API_VERSION,
  DEFAULT_EVENT_ID,
  apiMeta,
} from "../config.js";
import { getAgendaDays } from "../stores/agenda-store.js";
import { getProgramDays } from "../stores/program-store.js";
import { listPhotos } from "../stores/photos-store.js";
import { listStoredDocuments } from "../stores/documents-store.js";
import {
  activateEvent,
  addSubmission,
  archiveEvent,
  criteriaForDay,
  getActiveEvent,
  getEventById,
  hasSubmitted,
  listCriteria,
  listEvents,
} from "../stores/evaluations-events-store.js";
import { documentSectionMeta, toPublicDocument, toPublicPhoto } from "../types.js";

export const v1Router = Router();

const eventBase = `/api/v1/events/${DEFAULT_EVENT_ID}`;

v1Router.get("/health", (_req, res) => {
  v1Json(res, {
    ok: true,
    service: "eventos-ms-api",
    apiVersion: API_VERSION,
    documentation: "/api/v1/docs",
    openApi: "/api/v1/openapi",
  });
});

v1Router.get("/meta", (_req, res) => {
  v1Json(res, {
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
});

v1Router.get("/openapi", (req, res) => {
  const baseUrl = getPublicBaseUrl(req);
  v1Json(res, getOpenApiSpec(baseUrl));
});

v1Router.get("/docs", (req, res) => {
  const baseUrl = getPublicBaseUrl(req);
  const openApiUrl = `${baseUrl}/api/v1/openapi`;
  const html = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Eventos MISAU API — Swagger</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: "${openApiUrl}",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis],
      });
    };
  </script>
</body>
</html>`;
  res.type("html").send(html);
});

v1Router.post("/auth/login", (req, res) => {
  if (!parseLoginPassword(req.body)) {
    v1Error(res, "AUTH_INVALID", "Senha inválida.", 401);
    return;
  }
  setAdminSessionCookie(res);
  v1Json(res, adminLoginJson(true));
});

v1Router.post("/auth/logout", (_req, res) => {
  clearAdminSessionCookie(res);
  v1Json(res, { ok: true });
});

v1Router.get("/auth/session", (req, res) => {
  v1Json(res, { authenticated: isAdminSessionValid(req) });
});

v1Router.get("/events", async (req, res) => {
  const status = req.query.status as
    | "active"
    | "archived"
    | "draft"
    | "all"
    | undefined;
  const events = await listEvents(status ?? "all");
  v1Json(res, { events, defaultEventId: DEFAULT_EVENT_ID, apiVersion: apiMeta.version });
});

v1Router.post("/events", (_req, res) => {
  v1Error(res, "NOT_IMPLEMENTED", "Criação de eventos disponível na sprint 6.", 501);
});

v1Router.get("/events/active", async (_req, res) => {
  const event = await getActiveEvent();
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Nenhum evento activo.", 404);
    return;
  }
  v1Json(res, { event });
});

v1Router.get("/events/:eventId", async (req, res) => {
  const event = await getEventById(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }
  v1Json(res, { event });
});

v1Router.post("/events/:eventId/activate", requireAdmin, async (req, res) => {
  const event = await activateEvent(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }
  v1Json(res, { event });
});

v1Router.post("/events/:eventId/archive", requireAdmin, async (req, res) => {
  const event = await archiveEvent(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }
  v1Json(res, { event });
});

v1Router.get("/events/:eventId/documents", async (req, res) => {
  const eventId = String(req.params.eventId);
  const event = await getEventById(eventId);
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }

  const absolute = req.query.absolute === "true";
  const baseUrl = absolute ? getPublicBaseUrl(req) : undefined;
  const records = await listStoredDocuments(event.id);
  const sections = documentSectionMeta.map((section) => ({
    ...section,
    documents: records
      .filter((record) => record.sectionId === section.id)
      .map((record) => toPublicDocument(record, baseUrl)),
  }));

  v1Json(res, { eventId: event.id, sections });
});

v1Router.get("/events/:eventId/agenda", async (req, res) => {
  const event = await getEventById(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }
  if (event.id !== DEFAULT_EVENT_ID) {
    v1Json(res, { eventId: event.id, days: [] });
    return;
  }
  const days = await getAgendaDays();
  v1Json(res, { eventId: event.id, days });
});

v1Router.get("/events/:eventId/program", async (req, res) => {
  const event = await getEventById(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }
  if (event.id !== DEFAULT_EVENT_ID) {
    v1Json(res, { eventId: event.id, days: [] });
    return;
  }
  const days = await getProgramDays();
  v1Json(res, { eventId: event.id, days });
});

v1Router.get("/events/:eventId/photos", async (req, res) => {
  const event = await getEventById(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }

  const absolute = req.query.absolute === "true";
  const baseUrl = absolute ? getPublicBaseUrl(req) : undefined;
  const photos = await listPhotos(event.id);
  v1Json(res, {
    eventId: event.id,
    photos: photos.map((photo) => toPublicPhoto(photo, baseUrl)),
  });
});

v1Router.get("/events/:eventId/evaluation-criteria", async (req, res) => {
  const event = await getEventById(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }
  const day = Number(req.query.day ?? "1");
  const all = await listCriteria(event.id);
  const criteria = criteriaForDay(all, day);
  v1Json(res, { eventId: event.id, dayNumber: day, criteria });
});

v1Router.get("/events/:eventId/evaluations", async (req, res) => {
  const event = await getEventById(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }

  const day = Number(req.query.day ?? "0");
  const fingerprint = String(req.query.fingerprint ?? "");

  if (!day || !fingerprint) {
    v1Json(res, { eventId: event.id, submitted: false });
    return;
  }

  const submitted = await hasSubmitted(day, fingerprint, event.id);
  v1Json(res, { eventId: event.id, dayNumber: day, submitted });
});

v1Router.post("/events/:eventId/evaluations", async (req, res) => {
  const event = await getEventById(String(req.params.eventId));
  if (!event) {
    v1Error(res, "EVENT_NOT_FOUND", "Evento não encontrado.", 404);
    return;
  }

  try {
    const body = req.body as {
      dayNumber?: number;
      fingerprint?: string;
      scores?: Record<string, number>;
      comment?: string;
      respondentName?: string;
      role?: string;
      organization?: string;
    };

    if (!body.dayNumber || !body.fingerprint || !body.scores) {
      v1Error(res, "EVAL_INCOMPLETE", "Dados incompletos.", 400);
      return;
    }

    if (body.dayNumber < 1 || body.dayNumber > 3) {
      v1Error(res, "EVAL_INVALID_DAY", "Dia inválido.", 400);
      return;
    }

    if (await hasSubmitted(body.dayNumber, body.fingerprint, event.id)) {
      v1Error(res, "EVAL_ALREADY_SUBMITTED", "Já avaliou este dia.", 409);
      return;
    }

    const record = await addSubmission({
      eventId: event.id,
      dayNumber: body.dayNumber,
      fingerprint: body.fingerprint,
      scores: body.scores,
      comment: body.comment,
      respondentName: body.respondentName,
      role: body.role,
      organization: body.organization,
    });

    v1Json(res, { eventId: event.id, ok: true, submission: record }, { status: 201 });
  } catch (error) {
    v1Error(
      res,
      "EVAL_FAILED",
      error instanceof Error ? error.message : "Erro ao submeter.",
      400,
    );
  }
});
