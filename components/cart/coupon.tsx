import axios from "axios";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { API_BASE_URL } from "../../lib/constants";
import { MainContext } from "../../contexts/MainContext";
import { MessageContext } from "../../contexts/MessageContext";
import { gsap } from "gsap"

const Coupon: NextPage = () => {

    const [coupon, setCoupon] = useState('')
    const {getCart} = useContext(MainContext)
    const {setAlert} = useContext(MessageContext)

    const applyCouponFunc = async (e: any) => {
        e.preventDefault();
        let formData = {
            coupon_code: coupon
        }
        await axios.post(`${API_BASE_URL}apply-coupon`, (formData)).then((response) => {
            if(response.data.flash=='flash_success')
            {
                localStorage.setItem('ses_free_shipping_coupon', 'Y')
                localStorage.setItem('ses_coupon', JSON.stringify(response.data.ses_coupon))
                setAlert({
                    type: 'success',
                    message: response.data.message
                })
                setCoupon('')
            }
            else {
                localStorage.removeItem('ses_free_shipping_coupon')
                localStorage.removeItem('ses_coupon')
                setAlert({
                    type: 'danger',
                    message: response.data.message
                })
                setCoupon('')
            }
            gsap.timeline().fromTo('.alert-show', {
                xPercent: -50,
                autoAlpha: 0,
                }, {
                xPercent: 0,
                ease: 'back(2)',
                autoAlpha: 1,
                onComplete: () => {
                    gsap.to('.alert-show', {
                        xPercent: -50,
                        autoAlpha: 0,
                        duration: 0.3,
                        delay: 2
                    })
                }
            },'<90%')
            getCart()
        })
    }

    return (
        <div className="coupon-wrapper flex flex-col mt-4 py-4 px-4 rounded-lg border border-solid border-gray-300">
            <p className="text-gray-600">
                Enter the coupon code!
            </p>
            <form onSubmit={(e)=>applyCouponFunc(e)}>
                <input type="text" name="coupon" placeholder="Enter coupon" className="text-sm p-4 border border-gray-300 border-solid rounded-lg focus:outline-none mt-4 w-full" onChange={(e)=>setCoupon(e.target.value)} value={coupon} autoComplete="off" />
                <button className="coupon-btn dark-blue-bg text-white py-4 px-8 rounded-full shadow-lg cursor-pointer w-max font-bold relative mt-4">
                    Apply Coupon
                </button>
            </form>
        </div>
    )
}

export default Coupon