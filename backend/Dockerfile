# step 1 : developper (Node + npm)
FROM docker.io/library/node:24-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run start:dev"]
#&& npx prisma db seed #need to code de seed script in package.json

# step 2 : build (Node + npm)
FROM dev AS build
RUN npm run build

# step 3 : final (Node + npm)
FROM docker.io/library/node:24-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma7.config.ts ./prisma7.config.ts
USER node
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]