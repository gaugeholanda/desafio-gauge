# BUILD

FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html

EXPOSE 80
