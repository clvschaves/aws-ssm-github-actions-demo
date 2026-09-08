# Design/operational intent: package the Blueprint Operacional React interface as an immutable Nginx image.
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

COPY client ./client
COPY shared ./shared
COPY components.json template.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN pnpm exec vite build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/public /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=20s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1

