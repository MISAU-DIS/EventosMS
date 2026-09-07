#!/usr/bin/env bash
# Deploy LI CCS para portal@192.168.10.114 — fluxo scp + docker compose build front
# Correr na máquina local COM VPN.
set -euo pipefail

HOST="portal@192.168.10.114"
SRC="/home/rodrigues/MISAU/EventosMS"
DEPLOY="/home/rodrigues/MISAU/eventos-ms-deploy"
STAGE="${DEPLOY}/.staging"
REMOTE_TAR="ccs-update-$(date +%Y%m%d).tar.gz"

echo "==> Preparar pacote local"
rm -rf "${STAGE}"
mkdir -p "${STAGE}/front"

cp -a "${SRC}/src" "${STAGE}/front/"
cp -a "${SRC}/public" "${STAGE}/front/"
cp -a "${SRC}/data" "${STAGE}/front/"
cp "${SRC}/package.json" "${SRC}/package-lock.json" "${STAGE}/front/"
cp "${SRC}/next.config.ts" "${SRC}/tsconfig.json" "${STAGE}/front/"
cp "${SRC}/postcss.config.mjs" "${SRC}/eslint.config.mjs" "${STAGE}/front/"
cp "${DEPLOY}/front/Dockerfile" "${STAGE}/front/Dockerfile"
cp "${DEPLOY}/docker-compose.yml" "${STAGE}/docker-compose.yml"
cp "${SRC}/deploy/merge-production-documents.sh" "${STAGE}/merge-production-documents.sh"

echo "==> Criar tarball"
tar czf "/home/rodrigues/${REMOTE_TAR}" -C "${STAGE}" .

echo "==> Enviar para o servidor"
scp "/home/rodrigues/${REMOTE_TAR}" "${HOST}:~/"

echo ""
echo "==> No SERVIDOR (ssh ${HOST}):"
cat <<'SERVER'

cd /opt/eventos-ms-deploy
sudo tar xzf ~/ccs-update-*.tar.gz -C /opt/eventos-ms-deploy

# Fundir documentos de produção (api/) com front/ — NUNCA cp -n aqui
sudo chmod +x merge-production-documents.sh
sudo ./merge-production-documents.sh /opt/eventos-ms-deploy

docker compose stop api 2>/dev/null || true
docker compose build front && docker compose up -d front
docker compose ps
curl -s http://localhost:8080/api/health

SERVER
