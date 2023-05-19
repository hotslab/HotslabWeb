require('dotenv/config')
const { nextDev } = require('next/dist/cli/next-dev.js')
nextDev(['-p', process.env.NEXT_PUBLIC_PORT || 3000])