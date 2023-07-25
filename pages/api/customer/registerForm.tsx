import axios from "axios"
import { API_BASE_URL } from "../../../lib/constants"

const RegisterForm = async (data: any) => {
    try {
        const result = await axios.post(`${API_BASE_URL}register`, data).then((response) => {
            return response
        })
        return result
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default RegisterForm