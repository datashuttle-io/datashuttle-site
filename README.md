# DataShuttle Website

Marketing site for [datashuttle.ai](https://datashuttle.ai). React + TypeScript + Vite + Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
```

## Deploy

The site is deployed as a Docker container behind nginx on jarvis-eu.

```bash
# 1. Build
npm run build

# 2. Package + upload
tar czf /tmp/datashuttle-website.tar.gz dist/ Dockerfile nginx.conf
scp /tmp/datashuttle-website.tar.gz root@jarvis-eu:/root/

# 3. Build image and restart container
ssh root@jarvis-eu '
  cd /root/datashuttle-website
  tar xzf /root/datashuttle-website.tar.gz
  docker build -t datashuttle-website:latest .
  docker rm -f datashuttle-website
  docker run -d \
    --name datashuttle-website \
    --restart unless-stopped \
    --network ds-net \
    -p 80:80 \
    datashuttle-website:latest
'
```

## Architecture

- **Static site** — Vite builds React to `dist/`, nginx serves it
- **API** — `/api/early-access` proxied by nginx to the `datashuttle-api` container on the shared `ds-net` docker network (port 3001), resolved via docker DNS
- **Email** — early-access form sends via Resend API to `hello@datashuttle.ai`
- **Security headers** — CSP, HSTS, X-Frame-Options, etc. set by nginx
- **TLS** — Cloudflare proxy with TLS 1.2 minimum, HSTS via origin
