# Deploy produção (Docker) — EventosMS completo (site + API Next.js)

Requisitos: Docker 20+, Docker Compose v2.

## Variáveis (.env na raiz do projecto)

APP_PORT=8080    # porta exposta no host (proxy DTIC → esta porta)

## Arrancar

docker compose up -d --build

## Verificar

docker compose ps
docker compose logs -f app
curl -s http://localhost:8080/api/health

## Dados persistentes (volumes)

data/                      — agenda, programa, documentos, fotos, avaliações
public/documentos/         — ficheiros uploaded (PDF, PPT, etc.)
public/fotografias/        — fotografias uploaded

## Actualizar no servidor

cd /opt/eventos-ms-deploy   # ou pasta onde clonou o repo
git pull origin main
docker compose up -d --build
