FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY .env .env

COPY mjs ./mjs
COPY app ./app
COPY public ./public

RUN npm install
RUN npm run build

# Production image
FROM node:20

WORKDIR /app

COPY --from=builder /app /app
COPY server ./server

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
