# Stage 1: build library and demo app with the Node.js version from .nvmrc.
FROM node:22.23.4-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# Stage 2: serve the static files only, no Node.js needed at runtime.
FROM nginx:1.31.8-alpine
COPY --from=build /app/dist/demo-app/browser /usr/share/nginx/html
