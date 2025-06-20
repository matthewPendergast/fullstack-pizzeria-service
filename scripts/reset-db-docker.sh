#!/bin/bash

set -e

export $(grep -v '^#' .env | xargs)

POSTGRES_USER=${POSTGRES_USER:-postgres}
POSTGRES_DB=${POSTGRES_DB:-pizza-store}
DB_CONTAINER=${DB_CONTAINER:-postgres-db}
TMP_DIR="/tmp"
SCHEMA_PATH="/tmp/01-schema.sql"
SEED_PATH="/tmp/02-seed.sql"

docker cp ./api/db/init/01-schema.sql "$DB_CONTAINER":"$SCHEMA_PATH"
docker cp ./api/db/init/02-seed.sql "$DB_CONTAINER":"$SEED_PATH"

docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" "$DB_CONTAINER" \
  sh -c "psql -U \"$POSTGRES_USER\" -d \"$POSTGRES_DB\" -f \"$SCHEMA_PATH\""

docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" "$DB_CONTAINER" \
  sh -c "psql -U \"$POSTGRES_USER\" -d \"$POSTGRES_DB\" -f \"$SEED_PATH\""

echo "Database reset complete inside Docker container '$DB_CONTAINER'"
