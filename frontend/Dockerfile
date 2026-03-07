# ---------- STAGE 1: BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# ---------- STAGE 2: SERVE ----------
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# configuração para SPA (React Router)
RUN rm /etc/nginx/conf.d/default.conf

RUN echo 'server { \
    listen 6061; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 6061

CMD ["nginx", "-g", "daemon off;"]