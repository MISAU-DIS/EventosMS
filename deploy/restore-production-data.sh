#!/usr/bin/env bash
# Restaurar dados de produção a partir de um backup — correr NO SERVIDOR.
# Paths explícitos (sem globs).
set -euo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"
BACKUP="${2:-}"

if [ -z "${BACKUP}" ]; then
  echo "Backups disponíveis:"
  ls -lt /home/portal/backup-eventos-*-FULL.tar.gz /home/portal/backup-eventos-*.tar.gz 2>/dev/null | head -10 || true
  echo ""
  echo "Uso: sudo $0 [ROOT] /home/portal/backup-eventos-YYYYMMDD-HHMM-FULL.tar.gz"
  exit 1
fi

if [ ! -f "${BACKUP}" ]; then
  echo "ERRO: backup não encontrado: ${BACKUP}"
  exit 1
fi

echo "==> Restaurar de ${BACKUP}"
sudo tar xzf "${BACKUP}" -C "${ROOT}" \
  front/data \
  front/public/documentos \
  front/public/fotografias

sudo chown -R 1001:1001 \
  "${ROOT}/front/data" \
  "${ROOT}/front/public/documentos" \
  "${ROOT}/front/public/fotografias"

echo "==> Estado após restore"
python3 <<PY
import json
from pathlib import Path
root = Path("${ROOT}")
for name in [
    "documents-store.json",
    "agenda-store.json",
    "program-store.json",
    "photos-store.json",
    "evaluations-store.json",
    "events-store.json",
]:
    p = root / "front/data" / name
    if not p.exists():
        print(f"{name}: AUSENTE")
        continue
    d = json.loads(p.read_text())
    if "documents" in d:
        print(f"documentos: {len(d['documents'])}")
    elif "photos" in d:
        print(f"fotos (store): {len(d['photos'])}")
    elif "evaluations" in d:
        print(f"avaliações: {len(d['evaluations'])}")
    elif "events" in d:
        print(f"eventos: {len(d['events'])}")
    elif "days" in d:
        days = d["days"]
        items = sum(
            len(day.get("themes", day.get("sessions", [])))
            for day in days
        )
        print(f"{name}: {len(days)} dias, {items} itens")

for label, rel in [
    ("ficheiros documentos", "front/public/documentos"),
    ("ficheiros fotografias", "front/public/fotografias"),
]:
    base = root / rel
    n = sum(1 for f in base.rglob("*") if f.is_file()) if base.exists() else 0
    print(f"{label}: {n}")
PY

echo ""
echo "Reiniciar: cd ${ROOT} && docker compose restart front"
