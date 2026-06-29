# Étape de base
FROM node:24-alpine AS base

# All deps stage
FROM base AS deps
WORKDIR /app
RUN npm install -g npm@latest
COPY package.json package-lock.json ./
RUN npm ci

# Production only deps stage
FROM base AS production-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --omit=optional

# Build stage (Construction de l'application)
FROM base AS build
WORKDIR /app

# Copie des node_modules complets pour la construction
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
# Construire l'application
RUN node ace build --ignore-ts-errors

# Production stage (Image finale d'exécution)
FROM base

RUN apk --no-cache add curl

WORKDIR /app
# RUN mkdir -p /app/uploads
# 1. Copie des dépendances de production uniquement
COPY --from=production-deps /app/node_modules /app/node_modules
# 2. Copie du code construit (le binaire de l'application)
COPY --from=build /app/build /app

EXPOSE 3333

# Commande pour démarrer le serveur
CMD ["node", "./bin/server.js"]
