import axios from "axios"
import { API_BASE_URL } from "../../lib/constants"

// export default async function signIn(req: any, res: any) {
//     if(req.method=='POST')
//     {
//         // let form: any = JSON.stringify(req.body)
//         await axios.post(`${API_BASE_URL}login/user`, req.body).then(response => {
//             res.status(200).json({ response })
//         })
//         // res.status(200).json({ data: 'response' })
//     }
//     else
//     {
//         res.status(200).json({ error: 'invalid request' })
//     }
// }

const signIn = async (formData: any) => {
    const result = await axios.post(`${API_BASE_URL}login/user`, (formData)).then((response) => {
        return response
    })
    .catch((error) => {
        console.log('ERROR: '+error)
    })
    return result
}
export default signIn