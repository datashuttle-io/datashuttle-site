# Early-access API

Tiny Node HTTP server that receives `POST /api/early-access` from the
marketing site and relays the submission to `hello@datashuttle.ai` via
Resend.

## Run locally

```bash
cd website/api
npm install
RESEND_API_KEY=re_xxx node server.mjs
```

Then hit it:

```bash
curl -X POST http://localhost:3001/api/early-access \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com"}'
```

## Deploy

Matches the nginx proxy target in `website/nginx.conf`
(`host.docker.internal:3001`):

```bash
docker build -t datashuttle-website-api:latest .
docker rm -f datashuttle-website-api
docker run -d \
  --name datashuttle-website-api \
  --restart unless-stopped \
  -p 127.0.0.1:3001:3001 \
  -e RESEND_API_KEY=re_xxx \
  datashuttle-website-api:latest
```

## Env

| Var | Default | Required |
|---|---|---|
| `PORT` | `3001` | no |
| `RESEND_API_KEY` | — | **yes** |
| `RESEND_FROM` | `DataShuttle <noreply@datashuttle.ai>` | no |
| `RESEND_TO` | `hello@datashuttle.ai` | no |
