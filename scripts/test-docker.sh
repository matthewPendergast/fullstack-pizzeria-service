#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$PROJECT_ROOT/api"
docker exec -it pizza-api npm test

cd "$PROJECT_ROOT/client"
docker exec -it pizza-client bash -c 'cd /app && npx jest --config jest.config.cjs'
