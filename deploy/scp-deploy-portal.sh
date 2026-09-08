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
mkdir -p "${STAGE}/front"

cp -a "${SRC}/src" "${STAGE}/front/"
cp -a "${SRC}/public" "${STAGE}/front/"
cp "${SRC}/package.json" "${SRC}/package-lock.json" "${STAGE}/front/"
cp "${SRC}/next.config.ts" "${SRC}/tsconfig.json" "${STAGE}/front/"
cp "${SRC}/postcss.config.mjs" "${SRC}/eslint.config.mjs" "${STAGE}/front/"
cp "${SRC}/Dockerfile" "${STAGE}/front/Dockerfile"
cp "${DEPLOY}/docker-compose.yml" "${STAGE}/docker-compose.yml"
cp "${SRC}/deploy/merge-production-documents.sh" "${STAGE}/merge-production-documents.sh"
cp "${SRC}/deploy/backup-production-full.sh" "${STAGE}/backup-production-full.sh"
cp "${SRC}/deploy/restore-production-data.sh" "${STAGE}/restore-production-data.sh"
cp "${SRC}/deploy/inspect-server.sh" "${STAGE}/inspect-server.sh"
echo "${BUILD_REVISION}" > "${STAGE}/BUILD_REVISION.txt"

echo "==> Criar tarball"
tar czf "/home/rodrigues/${REMOTE_TAR}" -C "${STAGE}" .

echo "==> Enviar para o servidor"
scp "/home/rodrigues/${REMOTE_TAR}" "${HOST}:~/"

echo ""
echo "==> No SERVIDOR (ssh ${HOST}):"
cat <<'SERVER'

cd /opt/eventos-ms-deploy

# 1. Backup COMPLETO (script no tarball ou tar manual)
if [ -x backup-production-full.sh ]; then
  sudo ./backup-production-full.sh /opt/eventos-ms-deploy
else
  sudo tar czf ~/backup-eventos-$(date +%Y%m%d-%H%M)-FULL.tar.gz \
    -C /opt/eventos-ms-deploy \
    front/data front/public/documentos front/public/fotografias docker-compose.yml
fi

# 2. Actualizar SÓ código — UM tarball (nunca usar glob com vários ficheiros)
TAR="$(ls -t ~/ccs-update-*.tar.gz | head -1)"
echo "A extrair: ${TAR}"
sudo tar xzf "${TAR}" -C /opt/eventos-ms-deploy

# 3. Se dados se perderam, restaurar backup bom (exemplo):
# sudo chmod +x restore-production-data.sh
# sudo ./restore-production-data.sh /opt/eventos-ms-deploy ~/backup-eventos-20260907-1140.tar.gz

# 4. Beira2 no volume de fotografias
sudo cp front/public/fotografias/sobre-o-evento.jpeg front/public/fotografias/sobre-o-evento.jpeg 2>/dev/null || \
  sudo cp /tmp/sobre-o-evento.jpeg front/public/fotografias/sobre-o-evento.jpeg 2>/dev/null || true

sudo chmod +x merge-production-documents.sh
sudo ./merge-production-documents.sh /opt/eventos-ms-deploy

# Permissões de escrita para uploads admin (uid nextjs no container)
sudo chown -R 1001:1001 front/data front/public/documentos front/public/fotografias

export BUILD_REVISION="$(cat BUILD_REVISION.txt 2>/dev/null || date +%Y%m%d)"
echo "Build revision: ${BUILD_REVISION}"
docker compose stop api 2>/dev/null || true
docker compose build front && docker compose up -d front

# BunkerWeb (ccs.misau.gov.mz): permitir POST multipart em /api/admin/*
# e client_max_body_size 100m — senão upload devolve HTML 500 do WAF.

curl -s http://localhost:8080/api/documents | python3 -c "import json,sys; d=json.load(sys.stdin); print('Docs:', sum(len(s['documents']) for s in d['sections']))"
curl -s http://localhost:8080/api/agenda | python3 -c "import json,sys; d=json.load(sys.stdin); print('Agenda dias:', len(d.get('days',[])))"

SERVER
