import React from 'react'
import axios from "axios"
import { API_BASE_URL } from "../../../lib/constants"

const NewsletterForm = async (data: any) => {
    try {
        const result = await axios.post(`${API_BASE_URL}subscribe`, data).then((response) => {
            return response
        })
        return result
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default NewsletterForm
