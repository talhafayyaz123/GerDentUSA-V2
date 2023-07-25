import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../../lib/constants"
import { MainContext } from "../../contexts/MainContext"
import Summary from "./summary";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";

const CartList = () => {

    const {cart, getCart, countTotalCartSum, setIsLoading, removeCompleteCart} = useContext(MainContext)

    const [displayQtyInput, setDisplayQtyInput] = useState(false)

    const changeQuantity = (qty: any, index: any) => {
        cart[index].quantity = qty
        localStorage.setItem('cart',JSON.stringify(cart))
        getCart()
        countTotalCartSum()
        setDisplayQtyInput(false)
    }

    const removeProduct = (index: any) => {
        cart.splice(index, 1)
        if(cart.length==0)
        {
            removeCompleteCart()
        }
        localStorage.setItem('cart',JSON.stringify(cart))
        getCart()
    }

    useEffect(() => {
    }, [cart])

    return (
        <>
        <div className="cart-page-cart-detail-container border-gray-300 border-solid border rounded-lg mr-4 pb-4 flex flex-col overflow-scroll lg:overflow-hidden">
            <div className="cart-page-cart-detail-wrapper">
                <div className="grid grid-cols-8 w-full lite-blue-bg-color p-4 rounded-lg font-bold border-b border-solid border-gray-300 gap-x-2 md:gap-x-4">
                    <div className="col-span-1 text-center">Image</div>
                    <div className="col-start-2 col-end-5 text-center">Product</div>
                    <div className="col-span-1 text-center">Price</div>
                    <div className="col-span-1 text-center">Quantity</div>
                    <div className="col-span-1 text-center">Total</div>
                    <div className="col-span-1 text-center">Delete</div>
                </div>
                {
                    cart.length > 0 ? (
                        cart.map((cartItem: any, index: any) => {
                            return (
                                <div key={index} className="grid grid-cols-8 w-full p-4 rounded-lg items-center gap-x-2 md:gap-x-4">
                                    <div className="col-span-1 cart-product-img-wrapper flex justify-center border-gray-300 border-solid border rounded-lg w-full h-full lg:w-10/12 p-2 lg:p-0">
                                        <Image src={`${BASE_URL}up_data/products/images/medium/${cartItem.attributes.image}`} width={400} height={400} alt={cartItem.name} />
                                    </div>
                                    <Link href={cartItem.attributes.slug}>
                                        <a className="cart-product-detail flex flex-col justify-center col-start-2 col-end-5 border-gray-300 border-solid border rounded-lg w-full h-full p-2">
                                            <span className="leading-normal font-semibold">{cartItem.name}</span>
                                            <span className="cart-product-sku mt-2 text-gray-600 text-sm dark-blue-color">{cartItem.attributes.sku}</span>
                                        </a>
                                    </Link>
                                    <div className="cart-product-price font-semibold border-gray-300 border-solid border rounded-lg h-full flex flex-col justify-center items-center overflow-hidden">
                                        {
                                            cartItem.attributes.discount!=0 && (
                                            <div className="text-gray-400 text-xs"><del>${(cartItem.attributes.price_catalog).toFixed(2)}</del></div>
                                            )
                                        }
                                        <div className="mt-1.5">${Number(cartItem.price).toFixed(2)}</div>
                                    </div>
                                    <div className="cart-quantity-wrapper border-gray-300 border-solid border rounded-lg w-full h-full flex justify-center items-center overflow-hidden w-full h-full relative"> 
                                        {
                                            displayQtyInput==true ? (
                                                <input type="number" id="changeqtyinput" min={1} className="p-2 border-gray-300 border-solid border rounded-lg w-6/12 focus:outline-none" defaultValue={cartItem.quantity} onChange={(e) => changeQuantity(e.target.value, index)} />
                                            ) : (<>
                                                <span>{cartItem.quantity}</span>
                                                <div style={{ position: 'absolute',bottom: '2rem', cursor: 'pointer' }}>
                                                    <a onClick={()=>setDisplayQtyInput(true)} style={{ fontSize: '14px',color: '#52a0f2' }}> change </a>
                                                </div>
                                            </>)
                                        }
                                    </div>
                                    <div className="cart-total font-semibold border-gray-300 border-solid border rounded-lg h-full flex flex-col justify-center items-center overflow-hidden">
                                        {
                                            cartItem.attributes.discount!=0 && (
                                            <div className="text-gray-400 text-xs"><del>${(cartItem.quantity * cartItem.attributes.price_catalog).toFixed(2)}</del></div>
                                            )
                                        }
                                        <div className="mt-1.5">${(cartItem.quantity * cartItem.price).toFixed(2)}</div>
                                    </div>
                                    <div className="delete-cart-product flex justify-center border-gray-300 border-solid border rounded-lg w-full h-full items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#aaa" onClick={()=> removeProduct(index)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                            )
                        })
                    ): ''
                }
            </div>
            {/* <button className="update-cart-btn primary-blue-bg text-white py-4 px-8 rounded-full shadow-lg cursor-pointer w-max font-bold relative ml-4">
                Update Cart
            </button> */}
        </div>
        
        <Summary />
        </>
    )
}

export default CartList