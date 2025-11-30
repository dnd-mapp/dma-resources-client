FROM --platform=$BUILDPLATFORM node:24 AS builder

RUN corepack enable

WORKDIR /app

COPY package*.json pnpm-lock.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


FROM nginx:alpine3.22

WORKDIR /usr/share/nginx/html

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/dma-resources-client/browser .

COPY .docker/config.json ./config.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
