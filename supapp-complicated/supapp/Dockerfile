ARG NODE_VERSION=20.18-alpine
FROM node:${NODE_VERSION} AS BUILD

WORKDIR /build

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./ ./
RUN npm run build

FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=build /build/package*.json ./
RUN npm ci --omit dev
COPY --from=build /build/build ./build

CMD ["node", "build"]
