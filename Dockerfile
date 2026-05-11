FROM node:18-alpine AS dependency-installation-stage

WORKDIR /usr/src/app
COPY package.json package.json
RUN yarn install --registry=https://registry.yarnpkg.com/

FROM gitlab-registry.bitcofe.com:443/hosting-frontend/hosting-frontend:dependencies-latest AS builder-stage

WORKDIR /usr/src/app
COPY . .
COPY variables.env .env
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start"]
