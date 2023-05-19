require('dotenv/config')
const { nextStart } = require('next/dist/cli/next-start')
nextStart(['-p', process.env.NEXT_PUBLIC_PORT || 3000])