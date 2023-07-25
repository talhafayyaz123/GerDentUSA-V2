import type { NextApiRequest, NextApiResponse } from 'next'
// import Cors from 'cors'
import axios from 'axios'
import { API_BASE_URL } from '../../../lib/constants'

// Initializing the cors middleware
// const cors = Cors({
//     methods: ['GET', 'HEAD'],
// })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
//     return new Promise((resolve, reject) => {
//         fn(req, res, (result: any) => {
//             if (result instanceof Error) {
//                 return reject(result)
//             }
//             return resolve(result)
//         })
//     })
// }

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: any = await axios.get(`${API_BASE_URL}downloads`).then(response => {
        return response.data.flyers.data
    })
    // await runMiddleware(req, res, cors)
    res.status(200).json({ message: data })
}

export default handler