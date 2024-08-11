FROM node:20-alpine

ENV API_HOST=
ENV API_PATH=

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
CMD ["./entrypoint.sh"]
