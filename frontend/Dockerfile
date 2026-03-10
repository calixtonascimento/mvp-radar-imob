# ---------- STAGE 1: BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Sobrescreve o base do vite para servir da raiz no Docker
ENV VITE_BASE=/
RUN sed -i 's|base: "/mvp-radar-imob/"|base: "/"|' vite.config.ts && npm run build


# ---------- STAGE 2: SERVE ----------
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# configuração para SPA (React Router)
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 6061;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

EXPOSE 6061

CMD ["nginx", "-g", "daemon off;"]