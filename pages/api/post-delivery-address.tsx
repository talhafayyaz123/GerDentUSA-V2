import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../lib/constants";

async function handler(req: NextApiRequest, res:NextApiResponse) {
    let data;
    if(req.method=='POST')
    {
        data = await axios.post(`${API_BASE_URL}cart/set-shipping-location`, req.body)
        .then(respose => { return respose.data })
        .catch((error) => {
            return error
        })
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