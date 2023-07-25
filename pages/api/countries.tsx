import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { API_BASE_URL } from '../../lib/constants';
import Cors from 'cors';

const cors = Cors({
	methods: ['GET', 'HEAD']
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	await runMiddleware(req, res, cors);
	let data;
	if (req.method == 'POST') {
		data = await axios.get(`${API_BASE_URL}countries`).then((respose) => {
			return respose.data;
		});
	} else {
		data = {
			message: 'api is not valid'
		};
	}

	res.status(200).json(data);
}

export default handler;
