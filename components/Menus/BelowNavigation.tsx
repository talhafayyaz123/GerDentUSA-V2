import { useContext, useEffect, useState } from "react"
import { MainContext } from "../../contexts/MainContext"
import Link from "next/dist/client/link"
import { SessionContext } from "../../contexts/SessionContext"
import { gsap } from "gsap"
import SearchBar from "../Nav/SearchBar"

const BelowNavigation = (props: any) => {

    const {setIsLoading, redirectTo, totalCartItems} = useContext(MainContext)
    const {session} = useContext(SessionContext)
    const [IsSearchListPropup, setIsSearchListPropup] = useState(false)

    const mobMenuFunc = () => {

        let mobMenuCont = document.querySelector('.nav-links-container-mob'),
        mobMenu = document.querySelector('.nav-link-wrapper-mob')

        document.body.classList.add('body-height');
		let mobMenuTl = gsap.timeline();
        mobMenuTl
            .set(mobMenuCont, { autoAlpha: 1 })
            .fromTo(
                mobMenuCont,
                {
                    xPercent: -100
                },
                {
                    xPercent: 0,
                    ease: 'expo.in'
                }
            )
            .fromTo(
                mobMenu,
                {
                    xPercent: -100
                },
                {
                    xPercent: 0,
                    ease: 'expo.out'
                },
                '<0.5'
            )
            .from(
                '.nav-link-wrapper-mob .mob-links',
                {
                    y: 50,
                    autoAlpha: 0,
                    stagger: 0.065
                },
                '<90%'
            );
    }

    const mobMenuCloseFunc = (e: any) => {
        let mobMenuCloseBtn = document.querySelectorAll('.nav-links-container-mob, .nc-close-mob, .nc-close-mob path, .mega-menu-link a, .mob-links, .mob-links li'),
        mobMenuCont = document.querySelector('.nav-links-container-mob')

        mobMenuCloseBtn.forEach((btn) => {
            if (e.target === btn) {
                document.body.classList.remove('body-height');
                gsap.to(mobMenuCont, { autoAlpha: 0, onComplete: () => document.body.classList.remove('body-height') });
            }
        });
    }

    const removeOverlay = (e: any) => {
        var searchBars = document.querySelectorAll('.desktop-search-bar, .mob-search'),
        searchCloseBtn = document.querySelectorAll('.input-bg, .mob-search-bar-container')

        searchCloseBtn.forEach((btn) => {
            if (e.target === btn) {
                document.body.classList.remove('body-height');
                // document.querySelector('.input-bg')?.classList.remove('hidden')
                // document.querySelector('.mob-search-bar-container')?.classList.remove('hidden')
                setIsSearchListPropup(false)
            }
        });
    }

    useEffect(() => {
        gsap.set('.nav-links-container-mob', { autoAlpha: 0 });
    }, [])

    return (
        <>
        {/* navigation links for below 1280px or for tablet devices */}
        <nav className="nav-bottom-bar-container w-full fixed bottom-0 left-0 bg-gray-100 z-20 hidden shadow-lg border-t border-solid border-white">
            <div className="nav-bottom-bar-wrapper width">
                <div className="bottom nav-icons flex justify-between items-center h-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mob-menu cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>mobMenuFunc()}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer mob-search" fill="none" viewBox="0 0 24 24" stroke="#bbb" onClick={()=>setIsSearchListPropup(true)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <Link href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#bbb">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                    <div className="cart-icon relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="#bbb" onClick={()=>props.cartOpenBtnFunc()}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <div className="cart-quantity dark-blue-bg rounded-full w-4 h-4 absolute top-0 right-0 text-xs text-center text-white">{ totalCartItems }</div>
                    </div>
                    <svg className="w-8 h-8 mr-1 cursor-pointer mob-sign-in-btn" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" onClick={ () => (session!=undefined && session.user!=undefined) ? redirectTo('/dashboard') : props.signInShow()}>
                        <defs>
                            <style dangerouslySetInnerHTML={{ __html: "\n\t\t\t\t\t\t\t\t.cls-1 {\n\t\t\t\t\t\t\t\t\tfill: #bbb;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t" }} />
                        </defs>
                        <path className="cls-1 cursor-pointer" d="M57,266.74V245.92c.21-1.23.46-2.45.64-3.68,1.11-7.65,1.75-15.4,3.38-22.94,9.28-42.66,31.2-77.63,65.95-104,43.24-32.75,91.94-43.61,145-32.54,42.5,8.86,77.05,31.13,103.48,65.49,28.54,37.09,40.42,79.33,35.95,125.82-3.62,37.67-18.24,70.93-43.35,99.32-27.52,31.13-61.8,50.51-102.78,57.8-6.68,1.19-13.46,1.86-20.2,2.77H224.28a17.9,17.9,0,0,0-2.67-.57c-27.8-2-53.8-9.91-77.53-24.45C98,380.77,69.71,340.1,59.77,286.9,58.52,280.24,57.91,273.47,57,266.74Zm147.27,9.5c-39.43-21-45-69.31-22-99.12,22.63-29.34,66.23-34.43,94.75-10.32,13.89,11.73,22.2,26.77,23.39,44.89,1.91,29.08-11,50.55-36.07,65.05,4.7.55,9.11.73,13.38,1.63a56.21,56.21,0,0,1,45.1,54.94c.19,14.34,0,28.69,0,43v3.9c46.39-31.61,76.88-95.56,59.33-162.53-17.78-67.84-79.75-115.52-150.54-113.77-72.5,1.78-132.27,52-146.54,122.67-13.43,66.54,19.87,126,61.33,153.48v-3.9c0-14.69-.18-29.38.1-44.06a55.54,55.54,0,0,1,37.25-51.44C190.48,278.4,197.65,277.64,204.27,276.24Zm30.57,26.52v-.54c-10,0-19.9-.09-29.84,0a38.49,38.49,0,0,0-9.59,1.14c-15,4.17-23.77,15.89-23.83,31.77-.06,19,0,37.94-.07,56.91,0,2.35.7,3.44,2.85,4.33q60.39,25,120.72,0c2.18-.9,2.82-2.06,2.8-4.37-.1-17.69,0-35.39-.08-53.09a94.59,94.59,0,0,0-.6-10.37c-1.41-12.65-13.58-25-26.3-25.67C258.91,302.28,246.86,302.76,234.84,302.76Zm40.81-85.31a41,41,0,1,0-41.11,41A41.06,41.06,0,0,0,275.65,217.45Z" />
                    </svg>
                </div>
            </div>
        </nav>

        {/* navigation links for below 1280px */}
        <div className="nav-links-container-mob fixed top-0 left-0 w-screen h-full z-50 overflow-y-scroll" onClick={(e) => mobMenuCloseFunc(e)}>
            <ul className="nav-link-wrapper-mob flex flex-col z-30 relative bg-gray-100 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 nc-close-mob relative cursor-pointer self-end m-2 sm:m-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={(e) => mobMenuCloseFunc(e)}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Link href='/'>
                    <a onClick={(e)=>{
                    setIsLoading(true)
                    mobMenuCloseFunc(e)
                }} className="p-4 relative border-b border-solid border-gray-300 mob-links">
                        <li>Home</li>
                    </a>
                </Link>
                <Link href='/all-instruments'>
                    <a onClick={(e)=>{
                    setIsLoading(true)
                    mobMenuCloseFunc(e)
                }} className="p-4 relative border-b border-solid border-gray-300 mob-links">
                        <li>All Instruments</li>
                    </a>
                </Link>
                <div className="relative cursor-pointer mega-menu-links-container">
                    <div className="mega-menu-links-wrapper p-4 text-gray-600 flex border-b border-solid border-gray-300 mob-links">
                        <span className="mr-1">About Us</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#aaa">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <div className="mega-menu-links-inner-wrapper flex flex-col absolute top-3 left-0 z-10 bg-white rounded-lg shadow-lg border border-gray-300 border-solid opacity-0 invisible">
                        <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                            <Link href='/pages/about-us'>
                                <a onClick={(e)=>{
                                setIsLoading(true)
                                mobMenuCloseFunc(e)
                            }} > About Us </a>
                            </Link>
                        </div>
                        <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                            <Link href='/pages/our-mission'>
                                <a onClick={(e)=>{
                                setIsLoading(true)
                                mobMenuCloseFunc(e)
                            }} > Our Mission </a>
                            </Link>
                        </div>
                        <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                            <Link href='/pages/payment-info'>
                                <a onClick={(e)=>{
                                setIsLoading(true)
                                mobMenuCloseFunc(e)
                            }} > Payment Info </a>
                            </Link>
                        </div>
                        <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg leading-snug">
                            <Link href='/pages/shipping-and-returns'>
                                <a onClick={(e)=>{
                                setIsLoading(true)
                                mobMenuCloseFunc(e)
                            }} > Shipping &amp; Returns </a>
                            </Link>
                        </div>
                        <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                            <Link href='/pages/condition-of-use'>
                                <a onClick={(e)=>{
                                setIsLoading(true)
                                mobMenuCloseFunc(e)
                            }} > Condition Of Use </a>
                            </Link>
                        </div>
                        <div className="relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                            <Link href='/contacts'>
                                <a onClick={(e)=>{
                                setIsLoading(true)
                                mobMenuCloseFunc(e)
                            }} > Contact Us </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <Link href='/downloads'>
                    <a onClick={(e)=>{
                    setIsLoading(true)
                    mobMenuCloseFunc(e)
                }} className="p-4 relative border-b border-solid border-gray-300 cursor-pointer mob-links">
                        <li>Downloads</li>
                    </a>
                </Link>
                <Link href='/pages/videos'>
                    <a onClick={(e)=>{
                    setIsLoading(true)
                    mobMenuCloseFunc(e)
                }} className="p-4 relative border-b border-solid border-gray-300 cursor-pointer mob-links">
                        <li>Videos</li>
                    </a>
                </Link>
                <Link href='/blog'>
                    <a onClick={(e)=>{
                    setIsLoading(true)
                    mobMenuCloseFunc(e)
                }} className="p-4 relative border-b border-solid border-gray-300 cursor-pointer mob-links">
                        <li>Blogs</li>
                    </a>
                </Link>
                <Link href='/show-special/greater-ny-dental-meeting'>
                    <a onClick={(e)=>{
                    setIsLoading(true)
                    mobMenuCloseFunc(e)
                }} className="p-4 relative border-b border-solid border-gray-300 cursor-pointer mob-links">
                        <li>Show Special</li>
                    </a>
                </Link>
                <Link href='/trade-shows'>
                    <a onClick={(e)=>{
                    setIsLoading(true)
                    mobMenuCloseFunc(e)
                }} className="p-4 relative border-b border-solid border-gray-300 cursor-pointer mob-links">
                        <li>Trade Shows</li>
                    </a>
                </Link>
            </ul>
        </div>

        {/* search bar for below 1280px */}
        <div className={`mob-search-bar-container fixed top-0 left-0 width h-screen z-50 flex flex-col items-center ${!IsSearchListPropup ? 'hidden' : ''}`} onClick={(e)=>removeOverlay(e)}>
            <SearchBar key={3} setClass={'input-wrapper flex items-center lite-blue-bg-color rounded-lg relative w-full sm:w-9/12 shadow-lg z-30 m-6 sm:m-20'} setIsSearchListPropup={setIsSearchListPropup} IsSearchListPropup={IsSearchListPropup} />
        </div>
        </>
    )
}

export default BelowNavigation