import { API_VERSION, DEFAULT_EVENT_ID } from "./config.js";

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
      { name: "Photos", description: "Fotografias por evento" },
      { name: "Evaluations", description: "Avaliações do evento" },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "ccs_admin_session",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Token devolvido por POST /auth/login (campo token)",
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
      "/health": {
        get: {
          tags: ["Meta"],
          summary: "Estado da API",
          responses: { "200": { description: "OK" } },
        },
      },
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
            "200": {
              description: "Sessão iniciada; corpo inclui token para mobile",
            },
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
          parameters: [
            { name: "eventId", in: "path", required: true, schema: { type: "string" } },
            {
              name: "absolute",
              in: "query",
              schema: { type: "boolean" },
              description: "URLs absolutas para mobile",
            },
          ],
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
      "/events/{eventId}/photos": {
        get: {
          tags: ["Photos"],
          summary: "Fotografias do evento",
          parameters: [
            { name: "eventId", in: "path", required: true, schema: { type: "string" } },
            { name: "absolute", in: "query", schema: { type: "boolean" } },
          ],
          responses: { "200": { description: "OK" } },
        },
      },
      "/events/{eventId}/evaluation-criteria": {
        get: {
          tags: ["Evaluations"],
          summary: "Critérios de avaliação por dia",
          parameters: [
            { name: "eventId", in: "path", required: true, schema: { type: "string" } },
            { name: "day", in: "query", schema: { type: "integer", minimum: 1, maximum: 3 } },
          ],
          responses: { "200": { description: "OK" } },
        },
      },
      "/events/{eventId}/evaluations": {
        get: {
          tags: ["Evaluations"],
          summary: "Verificar se já submeteu avaliação",
          parameters: [
            { name: "eventId", in: "path", required: true, schema: { type: "string" } },
            { name: "day", in: "query", schema: { type: "integer" } },
            { name: "fingerprint", in: "query", schema: { type: "string" } },
          ],
          responses: { "200": { description: "OK" } },
        },
        post: {
          tags: ["Evaluations"],
          summary: "Submeter avaliação",
          parameters: [{ name: "eventId", in: "path", required: true, schema: { type: "string" } }],
          responses: { "201": { description: "Criada" }, "409": { description: "Já submeteu" } },
        },
      },
    },
  };
}
