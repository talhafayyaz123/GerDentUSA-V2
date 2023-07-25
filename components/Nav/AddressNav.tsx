import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { SITE_URL } from '../../lib/constants'
import styles from './AddressNav.module.css'

const AddressNav = (props: any)=> {

    const [countries, setCountries] = useState<any>([])
    const [PathContent, setPathContent] = useState<any>({
        type: '',
        data: ''
    })

    const [zipCode, setZipCode] = useState('')
    const [countryId, setCountryId] = useState('')
    const [message, setMessage] = useState<any>()
    const [visibleZip, setVisibleZip] = useState(true)

    const showDeliveryAddress = (e: any) => {

        let deliveryWrapperOpenBtn = document.querySelectorAll('.delivery-address-wrapper svg, .delivery-address-wrapper svg path, .delivery-address-wrapper .delivery-address span, .da-location-icon'),
            deliveryDetailWrapper = document.querySelector('.delivery-address-detail-wrapper'),
            deliveryForm = document.querySelector('.delivery-address-form');

        deliveryWrapperOpenBtn.forEach((btn) => {
            if(e.target === btn) {
                document.body.classList.add('body-height'),
                gsap.timeline().set(deliveryDetailWrapper, { autoAlpha: 1 })
                .fromTo(deliveryDetailWrapper, { xPercent: 100 }, { xPercent: 0, ease: 'expo.inOut' })
                .from(deliveryForm, { autoAlpha: 0, scale: 0.85, ease: 'back(2)' }, '<90%');
            }
        });
    }

    const cancelDeliveryAddress = (e: any) => {
        let deliveryDetailWrapper = document.querySelectorAll('.delivery-address-detail-wrapper, .da-cancel-btn');
        deliveryDetailWrapper.forEach((btn: any) => {
            if (e.target === btn) {
                gsap.to('.delivery-address-detail-wrapper', { autoAlpha: 0, duration: 0.3, onComplete: () => document.body.classList.remove('body-height') });
            }
        })
    }

    const submitDeliveryAddress = async (e: any) => {
        e.preventDefault()
        if(zipCode!='' || countryId !='')
        {
            props.setIsLoading(true)
            const res = await fetch(`${SITE_URL}api/post-delivery-address`, {
                method: "POST",
                body: JSON.stringify({'zip': zipCode, 'country': countryId}),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => response.json())
            if(res.message == 'success')
            {
                let deliveryAddress: any = '';
                if(zipCode!='')
                {
                    deliveryAddress = {type: 'zip', data: `${res.response.primary_city} ${res.response.zip}`}
                    setVisibleZip(false)
                }
                if(countryId!='')
                {
                    deliveryAddress = {type: 'country', data: res.response.name}
                }
                await localStorage.setItem('delivery-address', JSON.stringify(deliveryAddress))
                setPathContent(deliveryAddress)

                setZipCode('')
                setCountryId('')
                setMessage('')
                gsap.to('.delivery-address-detail-wrapper', { autoAlpha: 0, duration: 0.3, onComplete: () => document.body.classList.remove('body-height') });
            }
            else if(res.message == 'error')
            {
                await setMessage({ [res.message]: res.response})
            }
            props.setIsLoading(false)
        }
        else
        {
            await setMessage({ 'error': 'Please enter zip code or country!'})
        }
    }

    useEffect(() => {
        gsap.set('.delivery-address-detail-wrapper', { autoAlpha: 0 });
        const onDeliveryAddressLoad = async () => {

            let deliveryAddress: any = await localStorage.getItem('delivery-address')
            if(deliveryAddress!=null)
            {
                deliveryAddress = JSON.parse(deliveryAddress)
                setPathContent(deliveryAddress)
                if(deliveryAddress.type=='zip')
                {
                    setVisibleZip(false)
                }
            }

            let res = await fetch(`${SITE_URL}api/countries`, {
                method: "POST",
            }).then(response => response.json())
            await setCountries(res)
        }
        onDeliveryAddressLoad()
    }, [])

    return (
        <div className="delivery-address-wrapper flex items-center justify-self-end cursor-pointer relative" onClick={(e)=>showDeliveryAddress(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1 da-location-icon" fill="none" viewBox="0 0 24 24" stroke="#bbb">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="delivery-address flex items-center font-bold text-sm">
                {PathContent.type ? (
                    <>
                        <span className="dark-blue-color hidden sm:inline-block">{PathContent.data }</span>
                    </>
                ) : (
                    <>
                            <span className="hidden md:inline-block ">Delivery</span>
                        <span className="mr-2 ml-1 hidden md:inline-block">:</span>
                            <span className="dark-blue-color hidden sm:inline-block">Address</span>
                    </>
                )
                }
            </div>

            <div className={`delivery-address-detail-wrapper fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center overflow-y-scroll md:overflow-hidden`} onClick={(e) => cancelDeliveryAddress(e)} style={{ zIndex: '100' }}>
                <div className={`delivery-address-form bg-white rounded-lg shadow-lg ${styles.deliverAddressWrapper}`}>
                    <div className="text-lg p-3 bg-gray-100 border-b border-solid border-gray-300 rounded-lg text-black font-semibold">Choose your location</div>
                    <div className="delivery-rates-warn text-sm text-gray-600 px-2 sm:px-4 py-2">Delivery rates and time may vary depending the location</div>
                    <button type="button" className="delivey-form-sign-in-btn mx-2 sm:mx-4 my-2 dark-blue-bg relative overflow-hidden px-4 py-3 text-white rounded-full shadow-lg" onClick={()=>props.signInShow()}>Sign in to see your adress</button>
                    <form id="nav-delivery-address-form" onSubmit={(e)=>submitDeliveryAddress(e)}>
                        {
                            (message!='' && message!=undefined && message.error!=undefined) ? (
                                <div className='sm:px-4 flex text-center'>
                                    <small className="bg-red-500 text-xs p-1 rounded text-white w-full">{message.error}</small>
                                </div>
                            ) : ''
                        }
                        {
                            (message!='' && message!=undefined && message.success!=undefined) && (
                                <div className='sm:px-4 flex text-center'>
                                    <small className="bg-blue-500 text-xs p-1 rounded text-white w-full text-center">{message.success}</small>
                                </div>
                            )
                        }
                        {
                            !visibleZip && PathContent.type == 'zip' && (
                                <div className='p-3 mx-4 bg-gray-200 text-center rounded text-sm'>
                                    Deliver to {PathContent.data} <a className='cursor-pointer text-blue-400' onClick={()=>setVisibleZip(true)}>Change</a>
                                </div>
                            )
                        }
                        {
                            visibleZip && (
                                <>
                                    <div className="da-zip-code-wrapper flex flex-col px-2 sm:px-4 py-2">
                                        <label htmlFor="da-zip-code" className="pb-1 text-sm text-gray-600 inline-block">Please enter a US zipcode</label>
                                        <input id="da-zip-code" type="text" className="border border-solid border-gray-300 p-2 rounded-lg" autoComplete='off' placeholder='Zip code' value={zipCode} onChange={(e)=>{
                                            setCountryId('')
                                            setZipCode(e.target.value)
                                            }} />
                                    </div>
                                </>
                            )
                        }
                        <div className="px-2 sm:px-4 pt-1">Or</div>
                        <div className="da-select-country-wrapper flex flex-col px-2 sm:px-4 py-2">
                            <label htmlFor="da-select-country" className="pb-1 text-sm text-gray-600 inline-block">Please select your country</label>
                            <select id="da-select-country" className="border border-solid border-gray-300 pl-1 pr-2 py-2 rounded-lg" defaultValue={countryId} onChange={(e)=>{
                                setZipCode('')
                                setVisibleZip(true)
                                setCountryId(e.target.value)
                                }}>
                                <option value=''>Ship outside the US</option>
                                {
                                    countries.length > 0 && (
                                        countries.map((country: any, index: any) => {
                                            return (<option key={index} value={country.id}>{country.name}</option>)
                                        })
                                    )
                                }
                                {/* <option>Canada</option>
                                <option>UK</option> */}
                            </select>
                        </div>
                        <div className="da-form-btn-wrapper flex p-2 sm:p-4 pt-2">
                            <button type='button' className={`bg-red-500 relative overflow-hidden px-4 py-2 text-white rounded-full shadow-lg da-cancel-btn ${styles.cancel}`}>Cancel</button>
                            <button className="dark-blue-bg relative overflow-hidden px-4 py-2 text-white rounded-full shadow-lg ml-2 da-done-btn">Select</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddressNav