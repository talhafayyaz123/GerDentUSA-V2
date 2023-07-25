import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../../../lib/constants";

async function handler(req: NextApiRequest, res:NextApiResponse) {
    let data;
    if(req.method=='POST')
    {
        data = await axios.get(`${API_BASE_URL}dashboard/payment-history/${req.query.payment_history}`, {params: req.body})
        .then(respose => { return respose.data })
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