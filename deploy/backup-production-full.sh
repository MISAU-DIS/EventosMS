#!/usr/bin/env bash
# Backup completo de produção — correr NO SERVIDOR (portal@ccportal01).
# Guarda dados persistentes + docker-compose. Sem globs no restore (paths explícitos).
set -euo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"
STAMP="$(date +%Y%m%d-%H%M)"
BACKUP="${HOME}/backup-eventos-${STAMP}-FULL.tar.gz"
MANIFEST="${HOME}/backup-eventos-${STAMP}-MANIFEST.txt"

for path in \
  "${ROOT}/front/data" \
  "${ROOT}/front/public/documentos" \
  "${ROOT}/front/public/fotografias"; do
  if [ ! -d "${path}" ]; then
    echo "ERRO: pasta em falta: ${path}"
    exit 1
  fi
done

echo "==> Backup completo LI CCS — ${STAMP}"
echo "    Origem: ${ROOT}"
echo "    Destino: ${BACKUP}"

sudo tar czf "${BACKUP}" \
  -C "${ROOT}" \
  front/data \
  front/public/documentos \
  front/public/fotografias \
  docker-compose.yml

python3 <<PY > "${MANIFEST}"
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

root = Path("${ROOT}")
data = root / "front/data"
manifest = {
    "createdAt": datetime.now(timezone.utc).isoformat(),
    "root": str(root),
    "backupFile": "${BACKUP}",
    "gitCommitHint": "e23fdfe",
    "label": "prod-stable — PWA + upload + documentos OK",
    "stores": {},
    "files": {},
    "api": {},
}

def count_days(store):
    if "byEvent" in store:
        return sum(len(v) for v in store["byEvent"].values())
    return len(store.get("days", []))

stores = {
    "documents-store.json": lambda d: len(d.get("documents", [])),
    "agenda-store.json": count_days,
    "program-store.json": count_days,
    "photos-store.json": lambda d: len(d.get("photos", [])),
    "evaluations-store.json": lambda d: len(
        d.get("submissions", d.get("evaluations", []))
    ),
    "events-store.json": lambda d: len(d.get("events", [])),
}
for name, counter in stores.items():
    p = data / name
    if p.exists():
        try:
            payload = json.loads(p.read_text())
            manifest["stores"][name] = {
                "bytes": p.stat().st_size,
                "count": counter(payload),
            }
        except Exception as exc:
            manifest["stores"][name] = {"error": str(exc)}
    else:
        manifest["stores"][name] = {"missing": True}

for label, rel in [
    ("documentos", "front/public/documentos"),
    ("fotografias", "front/public/fotografias"),
]:
    base = root / rel
    count = sum(1 for f in base.rglob("*") if f.is_file())
    total = sum(f.stat().st_size for f in base.rglob("*") if f.is_file())
    manifest["files"][label] = {"count": count, "bytes": total}

try:
    out = subprocess.check_output(
        ["curl", "-sf", "http://localhost:8080/api/health"],
        text=True,
        timeout=5,
    )
    manifest["api"]["health"] = json.loads(out)
except Exception as exc:
    manifest["api"]["health"] = {"error": str(exc)}

print(json.dumps(manifest, indent=2, ensure_ascii=False))
PY

SIZE="$(du -h "${BACKUP}" | cut -f1)"
echo ""
echo "==> Concluído"
echo "    Arquivo: ${BACKUP} (${SIZE})"
echo "    Manifest: ${MANIFEST}"
echo ""
cat "${MANIFEST}"
echo ""
echo "Guardar também cópia externa (opcional):"
echo "  scp ${BACKUP} ${MANIFEST} user@backup-host:~/backups/li-ccs/"
