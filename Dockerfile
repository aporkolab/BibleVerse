# ==========================================
# Multi-stage Docker build for BibleVerse
# ==========================================

# ==========================================
# Build Stage
# ==========================================
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build arguments
ARG VERSION=latest
ARG ENVIRONMENT=production

# Set environment variables
ENV VERSION=${VERSION}
ENV ENVIRONMENT=${ENVIRONMENT}

# Build the application
RUN npm run build:${ENVIRONMENT}

# ==========================================
# Production Stage
# ==========================================
FROM nginx:stable-alpine AS production

# Install security updates
RUN apk upgrade --no-cache && \
    apk add --no-cache \
    ca-certificates \
    tzdata \
    curl \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S bibleverse -u 1001

# Copy built application
COPY --from=builder /app/dist/bibleverse /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

# Create nginx directories with correct permissions
RUN mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/scgi_temp && \
    chown -R bibleverse:nodejs /var/cache/nginx && \
    chown -R bibleverse:nodejs /usr/share/nginx/html && \
    chown -R bibleverse:nodejs /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown bibleverse:nodejs /var/run/nginx.pid

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Security: run as non-root user
USER bibleverse

# Expose port
EXPOSE 8080

# Build arguments for production stage
ARG VERSION=latest
ARG BUILD_DATE

# Labels for metadata
LABEL maintainer="Dr. Porkoláb Ádám <adam@porkolab.hu>"
LABEL version="${VERSION}"
LABEL description="BibleVerse - Angular application for Bible verse lookup"
LABEL org.opencontainers.image.source="https://github.com/APorkolab/BibleVerse"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.created="${BUILD_DATE}"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
