#!/bin/sh
set -e
mkdir -p /app/data /app/uploads
exec node_modules/.bin/tsx server/index.ts
