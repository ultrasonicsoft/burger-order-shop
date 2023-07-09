FROM --platform=$BUILDPLATFORM node:17.0.1-bullseye-slim as builder
RUN mkdir /web
WORKDIR /web

RUN npm install -g @angular/cli@16

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]