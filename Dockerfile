FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json turbo.json ./
COPY apps/dashboard/package.json ./apps/dashboard/
COPY packages/*/package.json ./

RUN npm ci --only=production

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npx turbo build --filter=dashboard...

# Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/dashboard/public ./apps/dashboard/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/dashboard/.next ./apps/dashboard/.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/dashboard/package.json ./apps/dashboard/package.json

USER nextjs

EXPOSE 3000

CMD ["npx", "turbo", "start", "--filter=dashboard"]
