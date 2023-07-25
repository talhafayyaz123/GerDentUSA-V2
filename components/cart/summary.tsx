import Coupon from "./coupon";
import { useContext, useEffect, useState } from "react"
import { MainContext } from "../../contexts/MainContext"

const Summary = (props: any) => {

    const {redirectTo, cartTotals} = useContext(MainContext)

    const [shipping, setShipping] = useState(0)

    useEffect(() => {
    }, [])

    return (
        <>
            <div className="cart-summary-container w-7/12 flex mt-4">
                <div className="cart-summary-wrapper w-full flex flex-col">
                    <div className="cart-summary border border-solid border-gray-300 rounded-lg pb-4">
                        <h2 className="p-4 lite-blue-bg-color rounded-lg font-bold border-b border-solid border-gray-300">Cart Summary</h2>
                        <div className="flex justify-between mt-4 px-4 text-gray-600">
                            <span>Sub Total</span>
                            <span className="cart-sub-total">${cartTotals.subTotal}</span>
                        </div>
                        <div className="flex justify-between mt-4 px-4 text-gray-600">
                            <span>Discount</span>
                            <span className="cart-discount">${cartTotals.discount}</span>
                        </div>
                        <div className="flex justify-between mt-4 px-4 text-gray-600">
                            <span>Shipping</span>
                            <span className="cart-shipping">${cartTotals.shipping}</span>
                        </div>
                        <div className="flex justify-between mt-4 px-4 text-black font-bold">
                            <span>Total</span>
                            <span className="cart-summary-total">${cartTotals.total}</span>
                        </div>
                        <button className="procedd-checkout-btn dark-blue-bg text-white py-4 px-8 rounded-full shadow-lg cursor-pointer w-max font-bold relative self-end mt-4 ml-2" onClick={()=>redirectTo('/checkout')}>
                            Checkout
                        </button>
                    </div>
                    <Coupon />
                </div>
            </div>
        </>
    )
}

export default Summary