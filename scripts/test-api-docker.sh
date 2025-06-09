#!/bin/bash

set -e

cd "$(dirname "$0")/../api"
docker exec -it pizza-api npm test
