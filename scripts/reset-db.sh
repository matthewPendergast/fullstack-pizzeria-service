#!/bin/bash

set -e

export $(grep -v '^#' .env | xargs)

DB_NAME=${POSTGRES_DB:-pizza-store}
POSTGRES_USER=${POSTGRES_USER:-postgres}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-password}
POSTGRES_HOST=${POSTGRES_HOST:-localhost}
SCHEMA_FILE="./api/db/init/01-schema.sql"
SEED_FILE="./api/db/init/02-seed.sql"

PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -d "$DB_NAME" -f "$SCHEMA_FILE"
PGPASSWORD="$POSTGRES_PASSWORD" psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -d "$DB_NAME" -f "$SEED_FILE"
