FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev \
  && NODE_ENV=development npm install tsx@4.23.12 --no-save --no-audit --no-fund \
  && test -x node_modules/.bin/tsx

COPY --from=builder /app/dist ./dist
COPY server ./server
COPY docker-entrypoint.sh ./
RUN sed -i 's/\r$//' docker-entrypoint.sh && chmod +x docker-entrypoint.sh \
  && mkdir -p data uploads

EXPOSE 3002

ENTRYPOINT ["./docker-entrypoint.sh"]
