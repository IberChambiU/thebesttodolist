FROM oven/bun:1.2.14-slim AS bun-deps
WORKDIR /app
COPY package.json package.json
RUN bun install

FROM oven/bun:1.2.14-slim AS bun-builder
WORKDIR /app
COPY --from=bun-deps /app/node_modules ./node_modules
COPY . .
COPY .env.dev .env.dev
RUN bun run build --mode dev

FROM nginx:stable-alpine3.21-slim AS bun-development
COPY --from=bun-builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY /cert /etc/nginx/ssl
CMD ["nginx", "-g", "daemon off;"]