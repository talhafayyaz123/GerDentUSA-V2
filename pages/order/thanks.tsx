import { NextPage } from 'next'
import React, { useContext, useEffect } from 'react'
import { gsap } from "gsap"
import Image404 from "../../public/assets/img/404/wave-01.svg"
import Link from 'next/link'
import Image from 'next/image'
import { MainContext } from '../../contexts/MainContext'
import { useRouter } from 'next/router'

const Process:NextPage = () => {
    const { setIsLoading } = useContext(MainContext);
    const style = {
        Page: {
            width: '100%',
            minHeight: '60vh',
            backgroundImage: 'linear-gradient(to bottom, #dbe5ef, #e1e9f1, #e8ecf3, #edf0f4, #f3f4f6)'
        },
        waveMask: {
            width: '100%',
            minHeight: '100%',
            backgroundImage: 'linear-gradient(to bottom, #dbe5ef, #e1e9f1, #e8ecf3, #edf0f4, #f3f4f6)'
        }
    }

    const router = useRouter();

    useEffect(() => {
        const check = async () => {
            let thanks = await localStorage.getItem('thanks');
            console.log(thanks)
            if (thanks==null)
            {
                document.querySelector('main')?.classList.add('opacity-0');
                router.push('/')
            }
            else
            {
                document.querySelector('#thanksPage')?.classList.remove('hidden');
                localStorage.removeItem('thanks');
                setIsLoading(false)
                let spanWrapper = document.querySelectorAll('.thanks-content-wrapper h2');
                spanWrapper.forEach((wrapper: any) => {
                    wrapper.innerHTML = wrapper.textContent.replace(/\S/g, "<span class='char'>$&</span>");
                });
                let thanksPage = gsap.timeline()
                thanksPage
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
                        '.thanks-content-wrapper h2 .char',
                        {
                            autoAlpha: 0,
                        },
                        {
                            autoAlpha: 1,
                            stagger: 0.05,
                        }
                    )
                    .fromTo(
                        '.thanks-content-wrapper p ',
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
                        '.thanks-btn-wrapper a',
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
            }
        }

        check();
    }, [setIsLoading])

    return (
        // <div className='text-center'>
        //     <h2 className="p-10 text-4xl">Thanks for your order.</h2>
        //     <p>Please click below to explor more products</p>
        // </div>
        <div id="thanksPage" className={`relative py-14 flex flex-col justify-center overflow-hidden hidden`} style={style.Page}>
            <Image layout="fill" className="top-0 left-0 w-full h-full object-cover -mt-8 z-10" src={Image404} alt="wave" />
            <div className={`wave-mask absolute top-0 left-0 z-10`} style={style.waveMask} />
            <div className="thanks-wrapper sm-width flex flex-col relative">
                <div className="thanks-content-wrapper mt-4 z-20">
                    <h2 className="text-xl sm:text-3xl text-center mt-6 font-semibold" style={{ fontSize: '4rem',lineHeight: 1 }}>Thanks for your order.</h2>
                    <p className="text-gray-600 text-center leading-normal sm:text-xl mt-4">
                        Please click below to explor more products.
                    </p>
                    <div className={`thanks-btn-wrapper flex justify-center mt-6 text-white`}>
                        <Link href='/'>
                            <a className="mr-4 btn dark-blue-bg px-5 py-3 rounded-full shadow-lg relative" onClick={() => setIsLoading(true)}>Home Page
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Process
