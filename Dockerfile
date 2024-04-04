FROM node:18-alpine as builder

RUN apk add --no-cache git

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build


#nginx
FROM docker.io/bitnami/nginx:1.25.1-debian-11-r39
COPY --from=builder /app/dist/ /usr/share/nginx/html

COPY ./nginx.conf /opt/bitnami/nginx/conf/nginx.conf

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]