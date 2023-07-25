import { NextPage } from "next";
import React, { useContext, useEffect } from 'react';
import PaymentForm from "../components/checkout/PaymentForm";
import CheckoutSummary from "../components/checkout/summary";
import { MainContext } from "../contexts/MainContext";
import { SessionContext } from "../contexts/SessionContext";
import Breadcrumb from "../UIComponents/Breadcrumb";
import Script from "next/dist/client/script";
import { gsap } from "gsap";

const CheckOut:NextPage = () => {

    const {cart, getCart, cartTotals, setIsLoading} = useContext(MainContext)
    const {session} = useContext(SessionContext)
    
    const signInShow = () => {
        let signInUpContainer = document.querySelector('.sign-in-up-container')

        document.body.classList.add('body-height');
		let signContOpenTl = gsap.timeline();
		signContOpenTl
			.set(signInUpContainer, { autoAlpha: 1 })
			.fromTo(
				signInUpContainer,
				{
					xPercent: -100
				},
				{
					xPercent: 0,
					ease: 'expo.inOut'
				}
			)
			.from(
				'.sign-in-up-wrapper',
				{
					autoAlpha: 0,
					scale: 0.85,
					ease: 'back(2)'
				},
				'<90%'
			);
    }

    useEffect(() => {
        setIsLoading(false)
        gsap.set('.sign-in-up-container', { autoAlpha: 0 });
    }, [setIsLoading])

    const data = {"name" : "Checkout"};

    return (
        <>
            <Breadcrumb data={data} />
            {/* main content for product page */ }
            <div className = "checkout-page relative" >
                <div className="checkout-page-container width mt-14">
                    <h2 className="text-3xl font-bold">
                        Checkout
                    </h2>
                    {
                        session==undefined && (
                            <div className="returning-customer cursor-pointer p-4 lite-blue-bg-color rounded-lg mt-4 leading-normal">
                                Returning Customer? <span className="primary-blue-color font-semibold checkout-login-click" onClick={signInShow}>Click to log in</span>
                            </div>
                        )
                    }
                    <div className="shipping-order-review-container flex flex-col lg:flex-row mt-6 mb-28">

                        <PaymentForm cartItems={cart} signInShow={signInShow} />

                        <div className="order-review-detail-wrapper flex flex-col bg-gray-100 lg:w-4/12 order-1 lg:order-2 rounded-lg p-6 border border-solid border-gray-300">
                            <h3 className="text-lg border-b border-solid border-gray-300 pb-4 font-bold">
                                Order Review
                            </h3>
                            <div className="order-review-detail">
                                <h4 className="flex justify-between mt-4 font-semibold">
                                    <span>Product</span>
                                    <span>Total</span>
                                </h4>
                                <CheckoutSummary cartItems={cart} cartTotals={cartTotals} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Script src="/assets/js/nav.js"></Script>
        </>
    );
}

export default CheckOut