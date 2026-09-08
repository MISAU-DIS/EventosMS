#!/usr/bin/env bash
# Remover ficheiros órfãos (disco sem JSON) — correr NO SERVIDOR.
# NUNCA apaga ficheiros que estão registados em documents-store.json.
#
# Uso:
#   bash inspect-manual-documents.sh          # ver primeiro
#   sudo bash cleanup-manual-documents.sh     # apaga TODOS os órfãos (pede confirmação)
#   sudo bash cleanup-manual-documents.sh --yes   # sem confirmação interactiva
#   sudo bash cleanup-manual-documents.sh --dry-run
set -euo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"
DRY_RUN=false
AUTO_YES=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --yes) AUTO_YES=true ;;
  esac
done
# Se primeiro arg for path absoluto
if [[ "${1:-}" == /opt/* ]]; then
  ROOT="$1"
fi

DATA="${ROOT}/front/data/documents-store.json"
DOCS="${ROOT}/front/public/documentos"

if [ ! -f "${DATA}" ]; then
  echo "ERRO: ${DATA} não encontrado"
  exit 1
fi

echo "==> Backup rápido antes de limpar órfãos"
BACKUP="${HOME}/backup-orphans-$(date +%Y%m%d-%H%M).tar.gz"
tar czf "${BACKUP}" -C "${ROOT}" front/data/documents-store.json front/public/documentos 2>/dev/null || \
  sudo tar czf "${BACKUP}" -C "${ROOT}" front/data/documents-store.json front/public/documentos
echo "    ${BACKUP}"

ORPHANS="$(python3 <<PY
import json
from pathlib import Path
root = Path("${ROOT}")
store = json.loads((root / "front/data/documents-store.json").read_text())
reg = {f"{d['sectionId']}/{d['fileName']}" for d in store.get("documents", [])}
docs = root / "front/public/documentos"
for sec in ("dia1", "dia2", "dia3", "gerais"):
    base = docs / sec
    if not base.is_dir():
        continue
    for f in sorted(base.iterdir()):
        if f.is_file() and f"{sec}/{f.name}" not in reg:
            print(f"{sec}|{f.name}")
PY
)"

if [ -z "${ORPHANS}" ]; then
  echo "==> Nenhum ficheiro órfão. Nada a fazer."
  exit 0
fi

echo ""
echo "==> Ficheiros órfãos a remover:"
echo "${ORPHANS}" | while IFS='|' read -r sec name; do
  echo "    ${DOCS}/${sec}/${name}"
done

if [ "${DRY_RUN}" = true ]; then
  echo ""
  echo "(--dry-run — nada apagado)"
  exit 0
fi

if [ "${AUTO_YES}" != true ]; then
  echo ""
  read -r -p "Apagar estes ficheiros? [digite APAGAR para confirmar] " confirm
  if [ "${confirm}" != "APAGAR" ]; then
    echo "Cancelado."
    exit 0
  fi
fi

echo "${ORPHANS}" | while IFS='|' read -r sec name; do
  path="${DOCS}/${sec}/${name}"
  if [ -f "${path}" ]; then
    sudo rm -f "${path}"
    echo "  removido: ${sec}/${name}"
  fi
done

echo ""
echo "==> Limpar registos fantasma (JSON sem ficheiro)"
python3 <<PY
import json
from pathlib import Path
root = Path("${ROOT}")
store_path = root / "front/data/documents-store.json"
docs = root / "front/public/documentos"
store = json.loads(store_path.read_text())
before = len(store["documents"])
store["documents"] = [
    d for d in store["documents"]
    if (docs / d["sectionId"] / d["fileName"]).is_file()
]
removed = before - len(store["documents"])
if removed:
    store_path.write_text(json.dumps(store, indent=2, ensure_ascii=False) + "\n")
    print(f"  {removed} registo(s) fantasma removido(s) do JSON")
else:
    print("  nenhum registo fantasma")
PY

sudo chown 1001:1001 "${DATA}" "${DOCS}"/*/* 2>/dev/null || true

echo ""
echo "==> Concluído. Verificar:"
echo "    bash inspect-manual-documents.sh ${ROOT}"
echo "    curl -s http://localhost:8080/api/documents | python3 -c \"import json,sys; d=json.load(sys.stdin); print('Docs:', sum(len(s['documents']) for s in d['sections']))\""
