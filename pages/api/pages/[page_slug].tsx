import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { API_BASE_URL } from "../../../lib/constants";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = await axios.get(`${API_BASE_URL}pages/${req.query.page_slug}`).then(response => response.data)
    res.status(200).json(data)
}

export default handler