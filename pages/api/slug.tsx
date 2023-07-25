import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../lib/constants";

async function handler(req: NextApiRequest, res:NextApiResponse) {
    let data;
    if(req.method=='POST')
    {
        data = await axios.get(`${API_BASE_URL}menu/${req.body.url}`)
        .then(respose => { return respose.data })
        .catch((error) => {
            data = error
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