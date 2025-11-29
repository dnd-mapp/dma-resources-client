FROM nginx:alpine3.22

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY dist/dma-resources-client/browser /usr/share/nginx/html

COPY .docker/config.json /usr/share/nginx/html/config.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
