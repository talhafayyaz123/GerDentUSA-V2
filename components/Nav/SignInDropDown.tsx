import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const SignInDropDown = (props: any) => {

    const router = useRouter()
    const setLoading = (url: any) => {
        if(router.asPath!= url)
        {
            props.setIsLoading(true)
        }
    }

    return (
        <div className="login-icon-container ml-2 cursor-pointer desk-sign-in-btn" onClick={ () => (props.session!=undefined && props.session.user!=undefined) ? '' : props.signInShow()}>
            <div className="login-icon-wrapper flex items-center relative">
                <svg className="w-8 h-8" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    <defs>
                        <style dangerouslySetInnerHTML={{ __html: "\n\t\t\t\t\t\t\t\t\t\t\t\t.cls-1 {\n\t\t\t\t\t\t\t\t\t\t\t\t\tfill: #bbb;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t" }} />
                    </defs>
                    <path className="cls-1" d="M57,266.74V245.92c.21-1.23.46-2.45.64-3.68,1.11-7.65,1.75-15.4,3.38-22.94,9.28-42.66,31.2-77.63,65.95-104,43.24-32.75,91.94-43.61,145-32.54,42.5,8.86,77.05,31.13,103.48,65.49,28.54,37.09,40.42,79.33,35.95,125.82-3.62,37.67-18.24,70.93-43.35,99.32-27.52,31.13-61.8,50.51-102.78,57.8-6.68,1.19-13.46,1.86-20.2,2.77H224.28a17.9,17.9,0,0,0-2.67-.57c-27.8-2-53.8-9.91-77.53-24.45C98,380.77,69.71,340.1,59.77,286.9,58.52,280.24,57.91,273.47,57,266.74Zm147.27,9.5c-39.43-21-45-69.31-22-99.12,22.63-29.34,66.23-34.43,94.75-10.32,13.89,11.73,22.2,26.77,23.39,44.89,1.91,29.08-11,50.55-36.07,65.05,4.7.55,9.11.73,13.38,1.63a56.21,56.21,0,0,1,45.1,54.94c.19,14.34,0,28.69,0,43v3.9c46.39-31.61,76.88-95.56,59.33-162.53-17.78-67.84-79.75-115.52-150.54-113.77-72.5,1.78-132.27,52-146.54,122.67-13.43,66.54,19.87,126,61.33,153.48v-3.9c0-14.69-.18-29.38.1-44.06a55.54,55.54,0,0,1,37.25-51.44C190.48,278.4,197.65,277.64,204.27,276.24Zm30.57,26.52v-.54c-10,0-19.9-.09-29.84,0a38.49,38.49,0,0,0-9.59,1.14c-15,4.17-23.77,15.89-23.83,31.77-.06,19,0,37.94-.07,56.91,0,2.35.7,3.44,2.85,4.33q60.39,25,120.72,0c2.18-.9,2.82-2.06,2.8-4.37-.1-17.69,0-35.39-.08-53.09a94.59,94.59,0,0,0-.6-10.37c-1.41-12.65-13.58-25-26.3-25.67C258.91,302.28,246.86,302.76,234.84,302.76Zm40.81-85.31a41,41,0,1,0-41.11,41A41.06,41.06,0,0,0,275.65,217.45Z" />
                </svg>
                {
                    (props.session!=undefined && props.session.user!=undefined) ? (
                        <>
                            <div className="">{props.session.user.first_name}</div>
                                <ul className="sign-mega-menu-container list-none bg-white absolute top-14 left-0 z-20 -ml-24 shadow-lg border border-solid border-gray-300 rounded-lg opacity-0 text-gray-600 text-sm">
                                    <li>
                                        <Link href={`/dashboard`}>
                                            <a className="bg-white block border-b border-gray-300 border-solid cursor-pointer p-3 rounded-lg signin-user-link" >My Account</a>
                                        </Link>
                                    </li>
                                    <li style={{width: 250}}>
                                        <Link href={`/dashboard/orders`}>
                                            <a className="bg-white block border-b border-gray-300 border-solid cursor-pointer p-3 rounded-lg signin-user-link" >My Orders</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/dashboard/payment-history`}>
                                            <a className="bg-white block border-b border-gray-300 border-solid cursor-pointer p-3 rounded-lg signin-user-link" >Payment History</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/checkout`}>
                                            <a className="bg-white block border-b border-gray-300 border-solid cursor-pointer p-3 rounded-lg signin-user-link" onClick={()=>setLoading('/checkout')}>Checkout</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/cart`}>
                                            <a className="bg-white block border-b border-gray-300 border-solid cursor-pointer p-3 rounded-lg signin-user-link" onClick={()=>setLoading('/cart')}>Shipping Cart</a>
                                        </Link>
                                    </li>
                                    <li className="p-3 mb-0 bg-white border-b border-solid border-gray-300 rounded-lg signin-user-link w-auto">
                                        <a className="flex items-center" onClick={() => props.Logout()}>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            </span>
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                        </>
                    ) : (
                        <div className="sign-in">Sign In</div>
                    )
                }
            </div>
        </div>
    )
}

export default SignInDropDown
