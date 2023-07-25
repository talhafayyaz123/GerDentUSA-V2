import React from 'react'
import Link from "next/link"

const FooterLinks = (props: any) => {
    return (
        <>
            <div className="footer-about-links w-12/12 sm:w-3/12 lg:w-2/12 mt-8 sm:mt-0">
                <div className="col-title text-black font-bold">About Us</div>
                <div className="link-wrapper mt-8 flex flex-col">
                    <Link href='/pages/about-us'>
                        <a className="text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>About Us</a>
                    </Link>
                    <Link href='/pages/our-mission'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Our Mission</a>
                    </Link>
                    <Link href='/pages/payment-info'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Payment Info</a>
                    </Link>
                    <Link href='/pages/condition-of-use'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Condition Of Use</a>
                    </Link>
                    <Link href='/contacts'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Contact Us</a>
                    </Link>
                </div>
            </div>
            <div className="footer-information-links w-12/12 sm:w-3/12 lg:w-2/12">
                <div className="col-title text-black font-bold mt-8 sm:mt-0">Our Information</div>
                <div className="link-wrapper mt-8 flex flex-col">
                    <Link href='/trade-shows'>
                        <a className="text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Trade Shows</a>
                    </Link>
                    <Link href='/show-special/greater-ny-dental-meeting'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Show Special</a>
                    </Link>
                    <Link href='/downloads'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Downoads</a>
                    </Link>
                    <Link href='/pages/videos'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Videos</a>
                    </Link>
                    <Link href='/blog'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Blogs</a>
                    </Link>
                    <Link href='/pages/faqs'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>FAQs</a>
                    </Link>
                </div>
            </div>
            <div className="footer-support-links hidden lg:block lg:w-2/12">
                <div className="col-title text-black font-bold">Customer Care</div>
                <div className="link-wrapper mt-8 flex flex-col">
                    {/* <a className="text-gray-600 w-max relative" href="#">Repairs</a>
                    <a className="mt-4 text-gray-600 w-max relative" href="#">Warranty</a>
                    <a className="mt-4 text-gray-600 w-max relative" href="#">Shipping Info</a> */}
                    <Link href='/pages/shipping-and-returns'>
                        <a className="text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Shipping &amp; Return</a>
                    </Link>
                    <Link href='/pages/privacy-policy'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Privacy Policy</a>
                    </Link>
                    <Link href='/pages/terms-and-conditions'>
                        <a className="mt-4 text-gray-600 w-max relative" onClick={()=>props.setIsLoading(true)}>Terms &amp; Conditions</a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default FooterLinks
