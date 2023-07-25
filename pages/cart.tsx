import { NextPage } from "next";
import CartList from "../components/cart/CartList";
import { useContext, useEffect } from "react";
import { MainContext } from "../contexts/MainContext";
import Link from "next/dist/client/link";
import Breadcrumb from "../UIComponents/Breadcrumb";

const Cart: NextPage = () => {

    const {cart, setIsLoading} = useContext(MainContext)

    const data = {"name" : "Shopping Cart"};

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading, cart])

    return (
        <>
            <Breadcrumb data={data} />
            {/* main content for cart page */}
            <div className="Cart-page relative">
                <div className="cart-page-container width mt-14 mb-28">
                    <h2 className="text-3xl font-bold">
                        Shopping Cart
                    </h2>
                    <div className="cart-cart-total-container flex flex-row w-full mt-6">
                        {
                            cart.length > 0 ? (
                                <>
                                    <CartList />
                                </>
                            ) : (
                                <div>
                                    Sorry!, your cart is empty,
                                    <Link href='/'>
                                        click here to go back to the home page.
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart