# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cached separately from source code)
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
# Use a lightweight nginx image to serve the static React build
FROM nginx:stable-alpine AS runner

# Copy the production build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config (SPA routing + gzip + caching)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Run nginx in the foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
