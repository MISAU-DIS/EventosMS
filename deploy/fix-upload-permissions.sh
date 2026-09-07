#!/usr/bin/env bash
# Corrigir permissões de upload admin — correr NO SERVIDOR após restore/deploy com sudo.
set -euo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"

sudo chown -R 1001:1001 \
  "${ROOT}/front/data" \
  "${ROOT}/front/public/documentos" \
  "${ROOT}/front/public/fotografias"

echo "Permissões actualizadas (1001:1001 = utilizador nextjs no container)."
echo "Testar upload:"
echo "  curl -si -X POST http://localhost:8080/api/admin/documents \\"
echo "    -H 'Cookie: ccs_admin_session=SESSAO' \\"
echo "    -F sectionId=dia1 -F title=teste -F file=@/tmp/ficheiro.pdf | head -5"
echo ""
echo "Reiniciar: cd ${ROOT} && docker compose restart front"
