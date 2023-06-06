import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    optionsSuccessStatus: 200,
    origin: "*"
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function nextCors(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function = cors
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) return reject(result)
            return resolve(result)
        })
    })
}