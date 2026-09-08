#!/usr/bin/env bash
# Inspecionar documentos manuais / órfãos — correr NO SERVIDOR.
# Uso: bash inspect-manual-documents.sh [/opt/eventos-ms-deploy]
set -uo pipefail

ROOT="${1:-/opt/eventos-ms-deploy}"
DATA="${ROOT}/front/data/documents-store.json"
DOCS="${ROOT}/front/public/documentos"

echo "============================================================"
echo "  Documentos — registo JSON vs disco"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "  ROOT: ${ROOT}"
echo "============================================================"

python3 <<PY
import json
from pathlib import Path

root = Path("${ROOT}")
store_path = root / "front/data/documents-store.json"
docs_root = root / "front/public/documentos"
sections = ("dia1", "dia2", "dia3", "gerais")

if not store_path.exists():
    print("ERRO: documents-store.json não encontrado")
    raise SystemExit(1)

store = json.loads(store_path.read_text())
registered = store.get("documents", [])
reg_paths = {f"{d['sectionId']}/{d['fileName']}" for d in registered}

print(f"\n=== REGISTADOS NO PORTAL ({len(registered)}) ===\n")
for d in sorted(registered, key=lambda x: (x.get("sectionId",""), x.get("title",""))):
    p = docs_root / d["sectionId"] / d["fileName"]
    ok = "OK" if p.is_file() else "FICHEIRO EM FALTA"
    print(f"  [{d['sectionId']:6}] {ok:16} | {d.get('title','?')[:60]}")
    print(f"           ficheiro: {d['fileName']}")

orphans = []
for sec in sections:
    base = docs_root / sec
    if not base.is_dir():
        continue
    for f in sorted(base.iterdir()):
        if not f.is_file():
            continue
        rel = f"{sec}/{f.name}"
        if rel not in reg_paths:
            orphans.append((sec, f.name, f.stat().st_size))

print(f"\n=== FICHEIROS ÓRFÃOS (disco sem JSON) — {len(orphans)} ===\n")
if not orphans:
    print("  (nenhum — pasta alinhada com o registo)")
else:
    for sec, name, size in orphans:
        print(f"  [{sec:6}] {name}  ({size // 1024} KB)")
        print(f"           → candidato a APAGAR se for teste manual")

broken = [d for d in registered if not (docs_root / d["sectionId"] / d["fileName"]).is_file()]
print(f"\n=== REGISTOS FANTASMA (JSON sem ficheiro) — {len(broken)} ===\n")
for d in broken:
    print(f"  [{d['sectionId']}] {d['title'][:50]} — {d['fileName']}")

gerais = [d for d in registered if d.get("sectionId") == "gerais"]
print(f"\n=== SECÇÃO GERAIS (registados: {len(gerais)}) ===\n")
for d in gerais:
    print(f"  - {d['title']}")
    print(f"    {d['fileName']}")

print("\n=== NOTA ===")
print("  O PDF «Agenda e Programa» dinâmico NÃO está no JSON — é normal.")
print("  Órfãos = ficheiros copiados à mão para public/documentos/.")
print("============================================================")
PY
