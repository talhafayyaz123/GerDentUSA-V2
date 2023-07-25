import type { NextApiRequest, NextApiResponse } from 'next'
// import Cors from 'cors'
import axios from 'axios'
import { API_BASE_URL } from '../../../lib/constants'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data: any = await axios.get(`${API_BASE_URL}home`).then(response => {
        return response.data
    })
    res.status(200).json(data)
}

export default handler