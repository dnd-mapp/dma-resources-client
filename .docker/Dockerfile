FROM nginx:alpine3.22

WORKDIR /usr/share/nginx/html

COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist/dma-resources-client/browser .

COPY ./.docker/config.json ./config.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
