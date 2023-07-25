import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../../../lib/constants";

async function handler(req:NextApiRequest, res: NextApiResponse) {
    let data;
    if(req.method=='POST')
    {
        data = await axios.post(`${API_BASE_URL}profile/update-password`, req.body)
        .then(response => response.data)
    }
    else
    {
        data = {
            message: 'api is not valid'
        }
    }
    res.status(200).json(data)
}

export default handler