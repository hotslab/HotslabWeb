#!/bin/bash

node assets.js

npx prisma generate
npx prisma migrate dev

npm run seed

exec "$@"