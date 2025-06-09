#!/bin/bash

export $(grep -v '^#' .env | xargs)

POSTGRES_USER=${POSTGRES_USER:-postgres}
POSTGRES_DB=${POSTGRES_DB:-db-name}
DB_CONTAINER=${DB_CONTAINER:-postgres-db}

docker exec -it "$DB_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
