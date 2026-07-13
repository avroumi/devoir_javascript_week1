FROM node:22

WORKDIR /app

COPY package.json . 

RUN npm i 

COPY . . 

ENV PORT=8000

EXPOSE 3003

CMD ["node","server.js"]