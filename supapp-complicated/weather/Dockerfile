ARG NODE_VERSION=20.18-alpine
FROM node:${NODE_VERSION} AS BUILD

WORKDIR /build

COPY ./package.json ./package-lock.json ./
COPY ./server.js ./server.js ./

RUN npm install

COPY ./ ./
CMD [ "npm","run","start" ]
