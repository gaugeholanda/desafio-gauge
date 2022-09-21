#!/usr/bin/env bash

cp .env.example .env

sudo docker compose --profile dev up -d

echo Aplicação pronta
echo Frontend: localhost:8080
echo API: localhost:8081

