#!/bin/bash

node assets.js

yarn pnpify prisma generate

yarn pnpify prisma db pull

if [ ! -d "prisma/migrations/0_init" ]; then mkdir -p prisma/migrations/0_init; fi

yarn pnpify prisma migrate diff \
--from-empty \
--to-schema-datamodel prisma/schema.prisma \
--script > prisma/migrations/0_init/migration.sql

yarn pnpify prisma migrate resolve --applied 0_init

yarn pnpify prisma db push

yarn pnpify node prisma/seed.js 

yarn build

exec "$@"