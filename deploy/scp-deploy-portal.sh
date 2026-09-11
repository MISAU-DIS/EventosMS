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
# sudo ./restore-production-data.sh /opt/eventos-ms-deploy ~/backup-eventos-YYYYMMDD-HHMM-FULL.tar.gz

# 4. Migrar agenda/programa para byEvent + preencher eventId em falta (NÃO apaga dados)
sudo node scripts/ensure-event-binding.mjs /opt/eventos-ms-deploy

# 5. Permissões de escrita para uploads admin (uid nextjs no container)
sudo chown -R 1001:1001 front/data front/public/documentos front/public/fotografias

export BUILD_REVISION="$(cat BUILD_REVISION.txt 2>/dev/null || date +%Y%m%d)"
echo "Build revision: ${BUILD_REVISION}"
docker compose build front && docker compose up -d front

echo "==> Verificação pós-deploy"
curl -sI http://localhost:8080/programa | head -3
curl -s http://localhost:8080/api/documents | python3 -c "import json,sys; d=json.load(sys.stdin); print('Docs API:', sum(len(s['documents']) for s in d['sections']))"
curl -s http://localhost:8080/api/program | python3 -c "import json,sys; d=json.load(sys.stdin); print('Program days:', len(d.get('days',[])))"
curl -s http://localhost:8080/api/agenda | python3 -c "import json,sys; d=json.load(sys.stdin); print('Agenda days:', len(d.get('days',[])))"
curl -s http://localhost:8080/api/admin/dashboard -H "Cookie: admin_session=misau-ccs-admin-local-session" | python3 -c "import json,sys; d=json.load(sys.stdin); print('Dashboard OK:', 'documents' in d)" 2>/dev/null || echo "Dashboard: verificar login admin manualmente"

# 6. Limpar tarballs antigos (manter 2 mais recentes)
ls -t ~/ccs-update-*.tar.gz 2>/dev/null | tail -n +3 | xargs -r rm -f
ls -t ~/backup-eventos-*-FULL.tar.gz 2>/dev/null | tail -n +3 | xargs -r rm -f

SERVER
