#!/usr/bin/env bash
# Restaurar dados de produção a partir de um backup — correr NO SERVIDOR.
set -euo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"
BACKUP="${2:-}"

if [ -z "${BACKUP}" ]; then
  echo "Backups disponíveis:"
  ls -lt /home/portal/backup-eventos-*.tar.gz 2>/dev/null | head -10 || true
  echo ""
  echo "Uso: sudo $0 [ROOT] /home/portal/backup-eventos-YYYYMMDD-HHMM.tar.gz"
  exit 1
fi

if [ ! -f "${BACKUP}" ]; then
  echo "ERRO: backup não encontrado: ${BACKUP}"
  exit 1
fi

echo "==> Restaurar de ${BACKUP}"
sudo tar xzf "${BACKUP}" -C "${ROOT}" front/data front/public/documentos

echo "==> Estado após restore"
python3 <<PY
import json
from pathlib import Path
root = Path("${ROOT}")
for name in ["documents-store.json", "agenda-store.json", "program-store.json"]:
    p = root / "front/data" / name
    if not p.exists():
        print(f"{name}: AUSENTE")
        continue
    d = json.loads(p.read_text())
    if "documents" in d:
        print(f"documentos: {len(d['documents'])}")
    elif "days" in d:
        days = d["days"]
        items = sum(len(day.get("themes", day.get("sessions", []))) for day in days)
        print(f"{name}: {len(days)} dias, {items} itens")
PY

echo ""
echo "Reiniciar container: cd ${ROOT} && docker compose restart front"
