FROM node:20-alpine as development
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start:dev", "auth-srv"]


FROM node:20-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --prod
COPY . .
RUN yarn build
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/apps/auth-srv/main"]