FROM node:20-alpine

ENV API_URL=

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install --force
COPY . .
CMD ["./entrypoint.sh"]
