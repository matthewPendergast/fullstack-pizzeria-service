#!/bin/bash

set -e

docker compose down -v
docker compose up --build -d