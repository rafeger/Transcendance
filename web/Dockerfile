FROM docker.io/library/nginx:alpine
RUN apk add --no-cache openssl \
 && openssl req -x509 -nodes -newkey rsa:2048 -days 1 -subj /CN=localhost \
    -keyout /etc/nginx/key.pem -out /etc/nginx/cert.pem
COPY nginx.conf /etc/nginx/conf.d/default.conf