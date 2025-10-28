# -------- Stage 1: build React app --------
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# penting: pastikan kode FE sekarang fetch ke "/api"
RUN npm run build

# setelah ini, output static ada di /app/dist

# -------- Stage 2: serve static with Nginx --------
FROM nginx:alpine

# hapus default index nginx dan ganti dengan build kita
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port 80 DI DALAM container frontend
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
