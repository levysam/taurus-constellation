FROM kiwfydev/node-clear-linux as build
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM kiwfydev/nginx-alpine:latest

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./app/build /var/www/html
EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
