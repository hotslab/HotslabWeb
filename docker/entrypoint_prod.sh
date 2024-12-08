#!/bin/bash

node assets.js

npx prisma generate 

npx prisma db pull

if [ ! -d "prisma/migrations/0_init" ]; then mkdir -p mkdir -p prisma/migrations/0_init; fi

npx prisma migrate diff \
--from-empty \
--to-schema-datamodel prisma/schema.prisma \
--script > prisma/migrations/0_init/migration.sql

npx prisma migrate resolve --applied 0_init

npx prisma db push

exec "$@"