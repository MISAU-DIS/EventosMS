#!/usr/bin/env bash
# Deploy no servidor — correr em /opt/eventos-ms-deploy após receber tarball via scp-deploy-portal.sh
set -euo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"
cd "${ROOT}"

echo "==> 1. Backup completo"
if [ -x backup-production-full.sh ]; then
  ./backup-production-full.sh "${ROOT}"
else
  sudo tar czf ~/backup-eventos-$(date +%Y%m%d-%H%M)-FULL.tar.gz \
    -C "${ROOT}" \
    front/data front/public/documentos front/public/fotografias docker-compose.yml
fi

echo "==> 2. Extrair tarball mais recente"
TAR="$(ls -t ~/ccs-update-*.tar.gz | head -1)"
echo "A extrair: ${TAR}"
sudo tar xzf "${TAR}" -C "${ROOT}"

echo "==> 3. Vincular dados ao evento activo (byEvent + eventId)"
sudo node scripts/ensure-event-binding.mjs "${ROOT}"

echo "==> 4. Permissões uploads admin"
sudo chown -R 1001:1001 front/data front/public/documentos front/public/fotografias

echo "==> 5. Build e restart"
export BUILD_REVISION="$(cat BUILD_REVISION.txt 2>/dev/null || date +%Y%m%d)"
echo "Build revision: ${BUILD_REVISION}"
docker compose build front && docker compose up -d front

echo "==> 6. Verificação"
curl -sI http://localhost:8080/programa | head -3
curl -s http://localhost:8080/api/documents | python3 -c \
  "import json,sys; d=json.load(sys.stdin); print('Docs API:', sum(len(s['documents']) for s in d['sections']))"
curl -s http://localhost:8080/api/program | python3 -c \
  "import json,sys; d=json.load(sys.stdin); print('Program days:', len(d.get('days',[])))"
curl -s http://localhost:8080/api/agenda | python3 -c \
  "import json,sys; d=json.load(sys.stdin); print('Agenda days:', len(d.get('days',[])))"

echo "==> 7. Limpar tarballs antigos (manter 2)"
ls -t ~/ccs-update-*.tar.gz 2>/dev/null | tail -n +3 | xargs -r rm -f
ls -t ~/backup-eventos-*-FULL.tar.gz 2>/dev/null | tail -n +3 | xargs -r rm -f

echo "==> Deploy concluído"
