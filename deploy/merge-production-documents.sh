#!/usr/bin/env bash
# Fundir documentos da API Express (produção) com front/data — correr NO SERVIDOR.
set -euo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"
API_JSON="${ROOT}/api/data/documents-store.json"
FRONT_JSON="${ROOT}/front/data/documents-store.json"
API_FILES="${ROOT}/api/storage/documentos"
FRONT_FILES="${ROOT}/front/public/documentos"

if [ ! -f "${API_JSON}" ]; then
  echo "ERRO: ${API_JSON} não encontrado."
  exit 1
fi

sudo mkdir -p "$(dirname "${FRONT_JSON}")" "${FRONT_FILES}"

# Backup antes de fundir
sudo cp -a "${FRONT_JSON}" "${FRONT_JSON}.bak-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
sudo cp -a "${API_JSON}" "${ROOT}/api/data/documents-store.json.bak-$(date +%Y%m%d-%H%M%S)" 2>/dev/null || true

# Fundir JSON (produção api + front; produção ganha em duplicados)
sudo python3 <<PY
import json
from pathlib import Path

api_path = Path("${API_JSON}")
front_path = Path("${FRONT_JSON}")

api = json.loads(api_path.read_text()) if api_path.exists() else {"documents": []}
front = {"documents": []}
if front_path.exists():
    front = json.loads(front_path.read_text())

by_id = {d["id"]: d for d in front.get("documents", [])}
for d in api.get("documents", []):
    by_id[d["id"]] = d  # produção (api) prevalece

merged = {"documents": sorted(by_id.values(), key=lambda x: x.get("title", ""))}
front_path.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n")
print(f"Documentos fundidos: {len(merged['documents'])} (api={len(api.get('documents', []))}, front={len(front.get('documents', []))})")
PY

# Copiar TODOS os ficheiros físicos (sem -n)
if [ -d "${API_FILES}" ]; then
  sudo cp -a "${API_FILES}/." "${FRONT_FILES}/"
  echo "Ficheiros copiados de api/storage/documentos → front/public/documentos"
fi

echo "Concluído. Verificar:"
echo "  curl -s http://localhost:8080/api/documents | python3 -m json.tool | head -40"
