# Deploy produção — front (nginx) + app (Next.js)

## Estrutura no servidor: `/opt/eventos-ms-deploy`

```
eventos-ms-deploy/
├── docker-compose.yml
├── front/
│   ├── Dockerfile
│   └── nginx.conf      ← actualizar via scp
└── app/                ← cópia do EventosMS (site + API)
    ├── Dockerfile
    ├── data/
    └── public/documentos|fotografias/
```

## Sincronizar da máquina local para o pacote deploy

```bash
rsync -a --delete \
  --exclude node_modules --exclude .next --exclude .git --exclude deploy \
  ~/MISAU/EventosMS/ ~/MISAU/eventos-ms-deploy/app/
```

## Enviar para o servidor (actualização completa)

```bash
rsync -a --delete \
  --exclude node_modules --exclude .next \
  ~/MISAU/eventos-ms-deploy/ portal@192.168.10.114:/opt/eventos-ms-deploy/
```

No servidor:
```bash
cd /opt/eventos-ms-deploy
docker compose up -d --build
```

## Só nginx (fluxo habitual)

```bash
scp ~/MISAU/eventos-ms-deploy/front/nginx.conf portal@192.168.10.114:~/
```

No servidor:
```bash
sudo cp ~/nginx.conf /opt/eventos-ms-deploy/front/nginx.conf
cd /opt/eventos-ms-deploy
docker compose up -d --build front
```

## Só código (site + API)

No servidor:
```bash
cd /opt/eventos-ms-deploy
docker compose up -d --build app
```
