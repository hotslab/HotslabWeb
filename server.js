require('dotenv/config')
const { createServer } = require('http')
const { parse } = require("url")
const next = require('next')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.NEXT_PUBLIC_PORT) || 3000
const hostname = process.env.NEXT_PUBLIC_HOST
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

let options = {}
// if (!dev) {
//     options.ca = fs.readFileSync(process.env.NEXT_PUBLIC_SSL_CA)
//     options.cert = fs.readFileSync(process.env.NEXT_PUBLIC_SSL_CERT)
//     options.key = fs.readFileSync(process.env.NEXT_PUBLIC_SSL_KEY)
// }

app.prepare().then(() => {
    createServer(options, async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true)
            await handle(req, res, parsedUrl)
        } catch (error) {
            console.error('Error occurred handling', req.url, err)
            res.status(500).json('Internal server error')
        }
    }).once('error', (err) => {
        console.error(err)
        process.exit(1)
    }).listen(port, () => {
        console.log(`> Server is ready on ${port} with hostname ${hostname}`)
    })
})