import React from 'react'
import axios from "axios"
import { API_BASE_URL } from "../../../lib/constants"

const contactUS = async (data: any) => {
    try {
        const result = await axios.post(`${API_BASE_URL}contact/send`, data).then((response) => {
            return response
        })
        return result
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default contactUS
