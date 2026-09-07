#!/usr/bin/env bash
# Inspecção completa do servidor — correr em portal@ccportal01
# Uso: bash inspect-server.sh
set -uo pipefail

ROOT="/opt/eventos-ms-deploy"
FRONT="${ROOT}/front"

echo "============================================================"
echo "  INSPEÇÃO LI CCS — $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================================"

echo ""
echo "========== 1. DOCKER =========="
cd "${ROOT}" && docker compose ps 2>/dev/null || echo "docker compose falhou"
curl -sf http://localhost:8080/api/health && echo || echo "health: FALHOU"

echo ""
echo "========== 2. DADOS (JSON — BD ficheiros) =========="
python3 <<'PY'
import json
from pathlib import Path

root = Path("/opt/eventos-ms-deploy/front/data")
checks = {
    "documents-store.json": lambda d: f"{len(d.get('documents',[]))} documentos",
    "agenda-store.json": lambda d: f"{len(d.get('days',[]))} dias, {sum(len(x.get('themes',[])) for x in d.get('days',[]))} temas",
    "program-store.json": lambda d: f"{len(d.get('days',[]))} dias, {sum(len(x.get('sessions',[])) for x in d.get('days',[]))} sessões",
    "photos-store.json": lambda d: f"{len(d.get('photos',[]))} fotos",
    "evaluations-store.json": lambda d: f"{len(d.get('evaluations',[]))} avaliações",
    "events-store.json": lambda d: f"{len(d.get('events',[]))} eventos",
}

for fname, fmt in checks.items():
    p = root / fname
    if not p.exists():
        print(f"  ❌ {fname}: AUSENTE")
        continue
    try:
        d = json.loads(p.read_text())
        info = fmt(d)
        # mínimos esperados em produção
        ok = True
        if "documents" in fname and len(d.get("documents",[])) < 14: ok = False
        if "agenda" in fname and len(d.get("days",[])) < 3: ok = False
        if "program" in fname and len(d.get("days",[])) < 3: ok = False
        mark = "✅" if ok else "⚠️"
        print(f"  {mark} {fname}: {info}  ({p.stat().st_size} bytes, mod {p.stat().st_mtime:.0f})")
    except Exception as e:
        print(f"  ❌ {fname}: ERRO — {e}")

# Listar títulos documentos
docs = root / "documents-store.json"
if docs.exists():
    d = json.loads(docs.read_text())
    print(f"\n  Documentos ({len(d['documents'])}):")
    for x in d["documents"][:20]:
        print(f"    - {x.get('title','?')[:70]}")
PY

echo ""
echo "========== 3. API (conteúdo real servido) =========="
python3 <<'PY'
import json, urllib.request

def get(path):
    try:
        with urllib.request.urlopen(f"http://localhost:8080{path}", timeout=5) as r:
            return json.loads(r.read())
    except Exception as e:
        return {"_error": str(e)}

d = get("/api/documents")
if "_error" in d:
    print(f"  ❌ /api/documents: {d['_error']}")
else:
    n = sum(len(s["documents"]) for s in d.get("sections",[]))
    print(f"  {'✅' if n >= 14 else '⚠️'} /api/documents: {n} docs")

d = get("/api/agenda")
if "_error" not in d:
    days = d.get("days",[])
    t = sum(len(x.get("themes",[])) for x in days)
    print(f"  {'✅' if len(days)>=3 else '⚠️'} /api/agenda: {len(days)} dias, {t} temas")

d = get("/api/program")
if "_error" not in d:
    days = d.get("days",[])
    s = sum(len(x.get("sessions",[])) for x in days)
    print(f"  {'✅' if len(days)>=3 else '⚠️'} /api/program: {len(days)} dias, {s} sessões")

d = get("/api/photos")
if "_error" not in d:
    print(f"  ✅ /api/photos: {len(d.get('photos',[]))} fotos")
PY

echo ""
echo "========== 4. IMAGENS — PÁGINA INICIAL =========="
python3 <<'PY'
from pathlib import Path

checks = [
    ("/opt/eventos-ms-deploy/front/public/fotografias/hero-evento.jpeg", 100000, "Hero (foto evento)"),
    ("/opt/eventos-ms-deploy/front/public/fotografias/sobre-o-evento.jpeg", 240000, "Sobre o evento (Beira2 ~247KB)"),
    ("/opt/eventos-ms-deploy/front/public/Emblem_of_Mozambique.svg", 1000, "Emblema Moçambique"),
    ("/opt/eventos-ms-deploy/front/public/edificio_MISAU.png", 1000, "Fundo edifício MISAU"),
    ("/opt/eventos-ms-deploy/front/public/icons/icon-192.png", 50000, "Ícone PWA 192 (emblema)"),
    ("/opt/eventos-ms-deploy/front/public/icons/icon-512.png", 200000, "Ícone PWA 512 (emblema)"),
]

for path, min_size, label in checks:
    p = Path(path)
    if not p.exists():
        print(f"  ❌ {label}: AUSENTE ({path})")
    elif p.stat().st_size < min_size:
        print(f"  ⚠️  {label}: {p.stat().st_size} bytes (esperado >= {min_size}) — pode ser versão antiga")
    else:
        print(f"  ✅ {label}: {p.stat().st_size} bytes")

# Todas fotografias
fdir = Path("/opt/eventos-ms-deploy/front/public/fotografias")
if fdir.exists():
    files = sorted(fdir.iterdir())
    print(f"\n  Pasta fotografias ({len(files)} ficheiros):")
    for f in files:
        if f.is_file():
            print(f"    {f.name}: {f.stat().st_size} bytes")
PY

echo ""
echo "========== 5. FICHEIROS DOCUMENTOS (disco) =========="
echo "  Total: $(find ${FRONT}/public/documentos -type f 2>/dev/null | wc -l) ficheiros"
du -sh "${FRONT}/public/documentos" 2>/dev/null || echo "  pasta ausente"
find "${FRONT}/public/documentos" -type f 2>/dev/null | head -5 | while read f; do
  echo "    $(basename "$f"): $(stat -c%s "$f" 2>/dev/null || echo ?) bytes"
done
echo "    ..."

echo ""
echo "========== 6. PWA =========="
curl -sf http://localhost:8080/manifest.webmanifest | python3 -c "
import json,sys
try:
    m=json.load(sys.stdin)
    print(f'  ✅ Manifest: {m.get(\"name\")}')
    for ic in m.get('icons',[]):
        print(f'     ícone: {ic.get(\"src\")} ({ic.get(\"sizes\")})')
except: print('  ❌ Manifest: inválido ou ausente')
" 2>/dev/null || echo "  ❌ Manifest: não responde"

SW=$(curl -sf http://localhost:8080/sw.js | head -c 30)
if [[ "$SW" == *"use strict"* ]] || [[ "$SW" == *"serwist"* ]] || [[ "$SW" == "(("* ]]; then
  echo "  ✅ Service worker: activo"
else
  echo "  ❌ Service worker: ausente ou HTML"
fi

echo ""
echo "========== 7. CÓDIGO — funcionalidades recentes =========="
checks=(
  "InstallPrompt.tsx:${FRONT}/src/components/pwa/InstallPrompt.tsx"
  "OfflineBanner.tsx:${FRONT}/src/components/pwa/OfflineBanner.tsx"
  "WarmOfflineCache.tsx:${FRONT}/src/components/pwa/WarmOfflineCache.tsx"
  "Service worker src:${FRONT}/src/app/sw.ts"
  "Manifest src:${FRONT}/src/app/manifest.ts"
  "HomeCtaSection:${FRONT}/src/components/event/HomeCtaSection.tsx"
  "HomeHero:${FRONT}/src/components/event/HomeHero.tsx"
)
for item in "${checks[@]}"; do
  name="${item%%:*}"
  path="${item#*:}"
  if [ -f "$path" ]; then
    echo "  ✅ $name"
  else
    echo "  ❌ $name — AUSENTE"
  fi
done

# Verificar gradiente CSS (fix fundo branco tablet)
if grep -q "misau-gradient-band" "${FRONT}/src/app/globals.css" 2>/dev/null; then
  echo "  ✅ CSS misau-gradient-band (fundos dourados tablet)"
else
  echo "  ⚠️  CSS misau-gradient-band — pode ter fundo branco no tablet"
fi

if grep -q "getBuildRevision" "${FRONT}/next.config.ts" 2>/dev/null; then
  echo "  ✅ next.config.ts (fix build Docker)"
else
  echo "  ⚠️  next.config.ts — versão antiga (build Docker pode falhar)"
fi

echo ""
echo "========== 8. CONTEÚDO SITE (home) =========="
curl -sf http://localhost:8080/ | python3 -c "
import sys
html = sys.stdin.read()
checks = [
    ('Beira2/sobre-o-evento', 'sobre-o-evento.jpeg' in html or 'sobre-o-evento' in html),
    ('Hero evento', 'hero-evento' in html),
    ('Metodologia', 'Metodologia' in html or 'metodologia' in html.lower()),
    ('InstallPrompt', 'Instale a app' in html or 'pwa-install' in html),
    ('Offline', 'Modo offline' in html or 'useOffline' in html),
    ('Lema', 'Por um Serviço' in html or 'Serviço Nacional' in html),
]
for label, ok in checks:
    print(f'  {\"✅\" if ok else \"⚠️\"} HTML home: {label}')
" 2>/dev/null || echo "  ❌ Não foi possível ler home"

echo ""
echo "========== 9. BACKUPS DISPONÍVEIS =========="
ls -lh /home/portal/backup-eventos-*.tar.gz 2>/dev/null | awk '{print "  "$9" — "$5" — "$6" "$7" "$8}' | head -8 || echo "  nenhum"

echo ""
echo "========== 10. RESUMO RÁPIDO =========="
python3 <<'PY'
import json, urllib.request
from pathlib import Path

issues = []
root = Path("/opt/eventos-ms-deploy/front")

# docs
try:
    d = json.loads((root/"data/documents-store.json").read_text())
    n = len(d.get("documents",[]))
    if n < 14: issues.append(f"Documentos: só {n} (esperado 15)")
except: issues.append("documents-store.json ilegível")

# beira2
beira = root/"public/fotografias/sobre-o-evento.jpeg"
if not beira.exists() or beira.stat().st_size < 240000:
    issues.append(f"Beira2: {beira.stat().st_size if beira.exists() else 'AUSENTE'} bytes (esperado ~247241)")

# pwa
try:
    with urllib.request.urlopen("http://localhost:8080/manifest.webmanifest", timeout=3) as r:
        m = json.loads(r.read())
        if "LI CCS" not in m.get("name",""): issues.append("PWA manifest nome incorrecto")
except: issues.append("PWA manifest não responde")

# icons emblem
icon = root/"public/icons/icon-192.png"
if not icon.exists() or icon.stat().st_size < 50000:
    issues.append("Ícone PWA pode ser MISAU antigo (não emblema)")

if issues:
    print("  ⚠️  ATENÇÃO — problemas detectados:")
    for i in issues: print(f"     • {i}")
else:
    print("  ✅ Tudo dentro do esperado")
PY

echo ""
echo "============================================================"
echo "  Fim da inspecção"
echo "============================================================"
