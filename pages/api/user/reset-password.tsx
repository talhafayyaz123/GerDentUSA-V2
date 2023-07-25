import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../../lib/constants";

async function handler (req: NextApiRequest, res: NextApiResponse) {
    const data: any = await axios.post(`${API_BASE_URL}password/reset`, req.body).then(response => {
        return response.data
    })
    let message = 'success';
    let result = ''
    if(data.error!=undefined)
    {
        message = 'error';
        result = data.error
    }
    else
    {
        result = data.success
    }
    res.status(200).json({ message: message, response: result })
}

export default handler