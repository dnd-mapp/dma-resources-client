FROM --platform=$BUILDPLATFORM node:24 AS builder

WORKDIR /app

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm build


FROM nginx:alpine3.22

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/dma-resources-client/browser /usr/share/nginx/html

COPY .docker/config.json /usr/share/nginx/html/config.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
