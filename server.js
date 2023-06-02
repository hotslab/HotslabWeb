require('dotenv/config')
const http = require('http')
const https = require('https')
const fs = require('fs');
const next = require('next')
const { parse } = require("url")

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.NEXT_PUBLIC_PORT) || 3000
const hostname = process.env.NEXT_PUBLIC_HOST
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

const server = dev ? http : https
let options = {}
if (!dev) {
    options.key = fs.readFileSync(process.env.NEXT_PUBLIC_SSL_KEY)
    options.cert = fs.readFileSync(process.env.NEXT_PUBLIC_SSL_CERT)
}

app.prepare().then(() => {
    server.createServer(options, async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true)
            await handle(req, res, parsedUrl)
        } catch (error) {
            console.error('Error occurred handling', req.url, err)
            res.status(500).json('internal server error')
        }
    }).once('error', (err) => {
        console.error(err)
        process.exit(1)
    }).listen(port, () => {
        console.log(`> Server is ready on ${hostname}`)
    })
})