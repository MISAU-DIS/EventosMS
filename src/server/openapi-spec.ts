import { API_VERSION, DEFAULT_EVENT_ID } from "@/config/api";

export function getOpenApiSpec(baseUrl = "") {
  return {
    openapi: "3.0.3",
    info: {
      title: "Eventos MISAU API",
      version: API_VERSION,
      description:
        "API versionada do portal LI CCS. Rotas legadas (/api/documents, /api/admin/*) mantêm-se por compatibilidade.",
    },
    servers: [{ url: `${baseUrl}/api/v1`, description: "API v1" }],
    tags: [
      { name: "Meta", description: "Informação e documentação" },
      { name: "Auth", description: "Autenticação admin" },
      { name: "Events", description: "Eventos MISAU" },
      { name: "Documents", description: "Documentos por evento" },
      { name: "Agenda", description: "Agenda por evento" },
      { name: "Program", description: "Programa por evento" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "ccs_admin_session",
        },
      },
      schemas: {
        ApiError: {
          type: "object",
          properties: {
            error: {
              type: "object",
              properties: {
                code: { type: "string" },
                message: { type: "string" },
                details: {},
              },
              required: ["code", "message"],
            },
          },
        },
        StoredEvent: {
          type: "object",
          properties: {
            id: { type: "string", example: DEFAULT_EVENT_ID },
            slug: { type: "string" },
            status: { type: "string", enum: ["draft", "active", "archived"] },
            title: { type: "string" },
            shortTitle: { type: "string" },
            dateRange: { type: "string" },
            location: { type: "string" },
          },
        },
      },
    },
    paths: {
      "/meta": {
        get: {
          tags: ["Meta"],
          summary: "Metadados da API",
          responses: { "200": { description: "OK" } },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login admin",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { password: { type: "string" } },
                  required: ["password"],
                },
              },
            },
          },
          responses: {
            "200": { description: "Sessão iniciada" },
            "401": { description: "Senha inválida" },
          },
        },
      },
      "/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout admin",
          responses: { "200": { description: "Sessão terminada" } },
        },
      },
      "/auth/session": {
        get: {
          tags: ["Auth"],
          summary: "Estado da sessão admin",
          responses: { "200": { description: "OK" } },
        },
      },
      "/events": {
        get: {
          tags: ["Events"],
          summary: "Listar eventos",
          parameters: [
            {
              name: "status",
              in: "query",
              schema: { type: "string", enum: ["active", "archived", "draft", "all"] },
            },
          ],
          responses: { "200": { description: "Lista de eventos" } },
        },
      },
      "/events/active": {
        get: {
          tags: ["Events"],
          summary: "Evento activo",
          responses: { "200": { description: "Evento activo" } },
        },
      },
      "/events/{eventId}": {
        get: {
          tags: ["Events"],
          summary: "Detalhe do evento",
          parameters: [{ name: "eventId", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "OK" }, "404": { description: "Não encontrado" } },
        },
      },
      "/events/{eventId}/documents": {
        get: {
          tags: ["Documents"],
          summary: "Documentos do evento agrupados por secção",
          parameters: [{ name: "eventId", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "OK" } },
        },
      },
      "/events/{eventId}/agenda": {
        get: {
          tags: ["Agenda"],
          summary: "Agenda do evento",
          parameters: [{ name: "eventId", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "OK" } },
        },
      },
      "/events/{eventId}/program": {
        get: {
          tags: ["Program"],
          summary: "Programa do evento",
          parameters: [{ name: "eventId", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "OK" } },
        },
      },
    },
  };
}
