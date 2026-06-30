FROM node:24-alpine AS base
RUN npm install -g pnpm

# All deps stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
RUN node ace build --ignore-ts-errors

# Production stage
FROM base

RUN apk --no-cache add curl

WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY --from=build /app/storage /app/storage

EXPOSE 3333

CMD ["node", "./bin/server.js"]
