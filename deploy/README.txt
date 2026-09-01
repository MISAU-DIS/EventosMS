# Deploy produção (Docker)

Configuração nginx do container front: `deploy/front/nginx.conf`

Sincronizar para o servidor em `/opt/eventos-ms-deploy/front/nginx.conf` antes de:

```bash
docker compose up -d --build front
```
