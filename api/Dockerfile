FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
ARG BUILD_REVISION=local
ENV BUILD_REVISION=${BUILD_REVISION}
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ARG BUILD_REVISION=local
ENV NODE_ENV=production
ENV BUILD_REVISION=${BUILD_REVISION}
ENV PORT=4000
ENV DATA_DIR=data
ENV PUBLIC_DIR=public

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
RUN mkdir -p data public/documentos public/fotografias && chown -R nextjs:nodejs data public

USER nextjs
EXPOSE 4000
CMD ["node", "dist/index.js"]
