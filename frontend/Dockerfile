FROM node:lts

# Preparando aplicação Angular
WORKDIR /frontend/application/
RUN apt update
RUN npm cache clean -f
RUN npm install -g @angular/cli

WORKDIR /webserver/
RUN npm install

EXPOSE 80
EXPOSE 4200
EXPOSE 443
