#!/bin/bash

set -e

echo "Starting API..."
npm run dev:api &

echo "Starting client..."
npm run dev:client &

wait
