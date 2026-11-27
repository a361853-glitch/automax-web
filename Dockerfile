FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src
COPY public ./public
COPY data ./data

EXPOSE 8888

CMD ["node", "src/server.js"]