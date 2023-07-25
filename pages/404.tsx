import { NextPage } from "next"
import { useContext, useEffect } from "react"
import { MainContext } from "../contexts/MainContext"
import Link from "next/link"
import { gsap } from "gsap"
import styles from '../styles/404.module.css'
import Image from "next/image"
import Image404 from "../public/assets/img/404/wave-01.svg"

const ErrorPage: NextPage = () => {

    const {setIsLoading} = useContext(MainContext)

    useEffect(() => {
        setIsLoading(false)

        let errorTl = gsap.timeline()
        errorTl
			.fromTo(
				'.wave-mask',
				{
					xPercent: 0
				},
				{
					delay: 0.3,
					xPercent: -100,
					duration: 1.5
				}
			)
			.fromTo(
				'#errorPage h1 span:nth-of-type(odd)',
				{
					autoAlpha: 0,
					scale: 0
				},
				{
					autoAlpha: 1,
					scale: 1,
					stagger: 0.1,
					ease: 'elastic.out(1, 0.3)',
                    duration: 1.5
				}
			)
			.fromTo(
				'#errorPage h1 span:nth-of-type(even)',
				{
					autoAlpha: 0,
					scale: 0
				},
				{
					autoAlpha: 1,
					scale: 1,
					stagger: 0.1,
					ease: 'elastic.out(1, 0.3)',
                    duration: 1.5
				},
				'<'
			)
			.fromTo(
				'.error-content-wrapper h2, .error-content-wrapper p ',
				{
					y: 25,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1,
					stagger: 0.1,
					duration: 0.5
				},
				'<60%'
			)
			.fromTo(
				'.error-btn-wrapper a',
				{
					y: 25,
					autoAlpha: 0
				},
				{
					y: 0,
					autoAlpha: 1,
					stagger: 0.1,
					duration: 0.5
				},
				'<70%'
			);

    }, [setIsLoading])
    return (
        <div id="errorPage" className={`relative py-14 overflow-hidden ${styles.errorPage}`}>
            <Image layout="fill" className="top-0 left-0 w-full h-full object-cover -mt-8 z-10" src={Image404} alt="wave" />
            <div className={`${styles.waveMask} wave-mask absolute top-0 left-0 z-10`} />
            <div className="error-wrapper sm-width flex flex-col relative">
                <h1 className="font-bold"><span>E</span><span>r</span><span>r</span><span>o</span><span>r</span></h1>
                <h1 className="font-bold text-right"><span>4</span><span className="relative z-20">0</span><span>4</span></h1>
                <div className="error-content-wrapper mt-4 z-20">
                    <h2 className="text-xl sm:text-3xl text-center mt-6 font-semibold">OOPS! The requested page Cannot be found.</h2>
                    <p className="text-gray-600 text-center leading-normal sm:text-xl mt-4">
                        We can&rsquo;t seem to find the page you are looking for, seems like you may have mis-typed the URL. Or the page has been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <p className="mt-4 text-center leading-normal sm:text-xl font-semibold">Please go back to home page or contact us</p>
                    <div className={`${styles.errorBtnWrapper} error-btn-wrapper flex justify-center mt-6 text-white`}>
                        <Link href='/'>
                            <a className="mr-4">
                                <button className="btn dark-blue-bg px-5 py-3 rounded-full shadow-lg relative">Home Page</button>
                            </a>
                        </Link>
                        <Link href='/contacts'>
                            <a>
                                <button className="btn primary-blue-bg px-5 py-3 rounded-full shadow-lg relative">Contact Us</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        // <div className="py-14 relative" >
        //     <div className="flex justify-center mt-14 text-center width">
        //         <div className="w-2/4">
        //             <h2 className="text-3xl font-bold mb-3">OOPS! THIS PAGE CAN NOT BE FOUND</h2>
        //             <p className="mb-3" style={{ lineHeight: 1.5 }}>We can't seem to find the page you are looking for, seems like you may have mis-typed the URL. Or the page has been removed, had its name changed, or is temporarily unavailable.</p>
        //             <p className="font-bold">Please go back to home page or contact us</p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ErrorPage