# API v1 — Eventos MISAU

**Versão API:** `1.0.0`  
**Versão app:** `0.2.0`  
**Evento default:** `li-ccs-2026`

## Endpoints v1

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/v1/meta` | Metadados da API |
| GET | `/api/v1/openapi` | Spec OpenAPI 3.0 |
| GET | `/api/v1/docs` | Swagger UI |
| POST | `/api/v1/auth/login` | Login admin |
| POST | `/api/v1/auth/logout` | Logout |
| GET | `/api/v1/auth/session` | Sessão |
| GET | `/api/v1/events` | Listar eventos |
| GET | `/api/v1/events/active` | Evento activo |
| GET | `/api/v1/events/:eventId` | Detalhe |
| GET | `/api/v1/events/:eventId/documents` | Documentos |
| GET | `/api/v1/events/:eventId/agenda` | Agenda |
| GET | `/api/v1/events/:eventId/program` | Programa |

## Headers de versão

Todas as respostas v1 incluem:
- `X-API-Version: 1.0.0`
- `X-API-Deprecated: false`

Rotas legadas incluem:
- `X-API-Legacy: true`
- `X-API-Preferred: /api/v1/...`

## Compatibilidade

Rotas antigas **mantidas** (não removidas):
- `/api/documents`
- `/api/agenda`, `/api/program`
- `/api/admin/*`

## Migração documentos

Registos sem `eventId` recebem automaticamente `li-ccs-2026`.  
**Nenhum ficheiro uploadado é apagado** pela migração.
