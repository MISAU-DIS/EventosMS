#!/usr/bin/env bash
# Deploy LI CCS para portal@192.168.10.114 — fluxo scp + docker compose build front
# Correr na máquina local COM VPN.
# IMPORTANTE: NÃO inclui front/data — dados ficam só no servidor (volumes Docker).
set -euo pipefail

HOST="portal@192.168.10.114"
SRC="/home/rodrigues/MISAU/EventosMS"
DEPLOY="/home/rodrigues/MISAU/eventos-ms-deploy"
STAGE="${DEPLOY}/.staging"
REMOTE_TAR="ccs-update-$(date +%Y%m%d-%H%M).tar.gz"
BUILD_REVISION="$(git -C "${SRC}" rev-parse --short HEAD 2>/dev/null || echo local)"

echo "==> Preparar pacote local (código apenas — sem data/)"
rm -rf "${STAGE}"
mkdir -p "${STAGE}/front" "${STAGE}/api"

cp -a "${SRC}/src" "${STAGE}/front/"
cp -a "${SRC}/public" "${STAGE}/front/"
cp "${SRC}/package.json" "${SRC}/package-lock.json" "${STAGE}/front/"
cp "${SRC}/next.config.ts" "${SRC}/tsconfig.json" "${STAGE}/front/"
cp "${SRC}/postcss.config.mjs" "${SRC}/eslint.config.mjs" "${STAGE}/front/"
cp "${SRC}/Dockerfile" "${STAGE}/front/Dockerfile"
cp -a "${SRC}/api/src" "${STAGE}/api/"
cp "${SRC}/api/package.json" "${SRC}/api/tsconfig.json" "${SRC}/api/Dockerfile" "${STAGE}/api/"
cp "${SRC}/api/.dockerignore" "${STAGE}/api/" 2>/dev/null || true
cp "${DEPLOY}/docker-compose.yml" "${STAGE}/docker-compose.yml"
cp "${SRC}/deploy/backup-production-full.sh" "${STAGE}/backup-production-full.sh"
cp "${SRC}/deploy/deploy-server.sh" "${STAGE}/deploy-server.sh"
cp "${SRC}/deploy/restore-production-data.sh" "${STAGE}/restore-production-data.sh"
cp "${SRC}/deploy/inspect-manual-documents.sh" "${STAGE}/inspect-manual-documents.sh"
cp "${SRC}/deploy/cleanup-manual-documents.sh" "${STAGE}/cleanup-manual-documents.sh"
mkdir -p "${STAGE}/scripts"
cp "${SRC}/scripts/ensure-event-binding.mjs" "${STAGE}/scripts/ensure-event-binding.mjs"
echo "${BUILD_REVISION}" > "${STAGE}/BUILD_REVISION.txt"

echo "==> Criar tarball"
tar czf "/home/rodrigues/${REMOTE_TAR}" -C "${STAGE}" .

echo "==> Enviar para o servidor"
scp "/home/rodrigues/${REMOTE_TAR}" "${HOST}:~/"

echo ""
echo "==> No SERVIDOR (ssh ${HOST}):"
cat <<'SERVER'

cd /opt/eventos-ms-deploy
sudo chmod +x deploy-server.sh
sudo ./deploy-server.sh /opt/eventos-ms-deploy

# Rollback se necessário:
# sudo ./restore-production-data.sh /opt/eventos-ms-deploy ~/backup-eventos-YYYYMMDD-HHMM-FULL.tar.gz
# docker compose restart front

SERVER
