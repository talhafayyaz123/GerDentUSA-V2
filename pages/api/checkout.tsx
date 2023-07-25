import axios from "axios"
import { API_BASE_URL } from "../../lib/constants"
 
const submitShippment = async (formData: any) => {
    const res = await axios.post(`${API_BASE_URL}checkout`, (formData)).then((response) => {
        if(response.data!=undefined)
        {
            localStorage.setItem('shipping', JSON.stringify(response.data))
            return getShippingSession()
        }
    })
    .catch((error) => {
        console.log('ERROR: '+error)
    })
    return res;
}

const addShippingNote = async (data: any) => {
    try {
        let shipping: any = await getShippingSession()
        await axios.post(`${API_BASE_URL}shipping-method`, data).then((response) => {
            if(shipping!=null)
            {
                shipping.shipping_method = {
                    service :response.data.service,
                    rate:response.data.rate,
                    notes:data.notes,
                    enc: data.rate
                }
                shipping.checkout_step=3
            }
            localStorage.setItem('shipping', JSON.stringify(shipping))
        })
    } catch (error) {
        console.error(error)
    }
}

const SubmitPayment = async (formData: any) => {
    try {
        const res = await axios.post(`${API_BASE_URL}checkout/process-payment`, (formData)).then((response) => {
            if(response.data.message!=undefined)
            {
                localStorage.removeItem('shipping')
                localStorage.removeItem('ses_coupon')
                localStorage.removeItem('cartTotalCounts')
                localStorage.removeItem('cart')
                localStorage.removeItem('ses_free_shipping_coupon')
                return 'success';
            }
        })
        .catch((error) => {
            console.log(`ERROR: ${error}`)
        })
        return res
    } catch (error) {
        console.error(error)
    }
}

const getShippingSession = async () => {
    let shipping: any = ''
    if (typeof window !== 'undefined') {
        shipping = await localStorage.getItem('shipping')
    }
    else
    {
        shipping = null
    }

    if(shipping!=null)
        shipping = JSON.parse(shipping)

    return shipping;
}

export {submitShippment, getShippingSession, addShippingNote, SubmitPayment}