#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

cd "$(dirname "$0")/.." || exit 1

. .env

yarn run web-ext sign \
    --channel=unlisted \
    --api-key="${AMO_JWT_ISSUER}" \
    --api-secret="${AMO_JWT_SECRET}"
