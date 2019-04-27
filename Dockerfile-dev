FROM node:10.12.0-alpine
WORKDIR /app
COPY package.json yarn.lock babel.config.js tsconfig.json ./
RUN yarn install
COPY src /app/src
EXPOSE 8000
