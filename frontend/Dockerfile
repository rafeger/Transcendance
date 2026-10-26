# Étape 1 : builder
FROM docker.io/library/node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build        

# Étape 2 : servir (plus de Node !)
FROM docker.io/library/nginx:alpine
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
RUN apk add --no-cache openssl \
 && openssl req -x509 -nodes -newkey rsa:2048 -days 100 -subj /CN=localhost \
    -keyout /etc/nginx/key.pem -out /etc/nginx/cert.pem