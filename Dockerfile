# Marketing-site container. Serves `datashuttle.ai` (the Vite SPA built
# into `website/dist/`) and `docs.datashuttle.ai` (the mdbook under
# `docs/book/` rebuilt at image time).
#
# Build context is the repo ROOT, not `website/`, because mdbook sources
# live outside the website dir. Recipe:
#
#     cd <repo root>
#     (cd website && npm install && npm run build)
#     docker build --platform linux/amd64 -f website/Dockerfile -t datashuttle-website:latest .

# ── Stage 1: build mdbook into a throwaway image ───────────────────────
# Uses a pre-built mdbook release binary to avoid cargo/rust in the
# website image.
FROM alpine:3.19 AS docs-builder
ARG MDBOOK_VERSION=0.4.40
RUN apk add --no-cache curl tar \
    && curl -sSL "https://github.com/rust-lang/mdBook/releases/download/v${MDBOOK_VERSION}/mdbook-v${MDBOOK_VERSION}-x86_64-unknown-linux-musl.tar.gz" \
       | tar -xz -C /usr/local/bin
WORKDIR /work
COPY docs/book ./book
# Override site-url at build time so relative asset paths work under a
# domain root (docs.datashuttle.ai/), not the /docs/ subpath the
# embedded-in-binary version uses. The book.toml stays untouched so
# the main Rust build keeps its `/docs/` layout.
RUN sed -i 's|site-url = "/docs/"|site-url = "/"|' book/book.toml \
    && mdbook build book

# ── Stage 2: nginx runtime ────────────────────────────────────────────
FROM nginx:1.27-alpine
COPY website/dist/ /usr/share/nginx/html/
COPY --from=docs-builder /work/book/book/ /usr/share/nginx/html/docs-site/
COPY website/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
