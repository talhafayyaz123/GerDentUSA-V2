import { useContext, useEffect, useState } from "react"
import { BASE_URL, SITE_URL } from "../../lib/constants"
import { MainContext } from "../../contexts/MainContext"
import { SessionContext } from "../../contexts/SessionContext"
// import { submitShippment, getShippingSession, addShippingNote, SubmitPayment } from "../../pages/api/checkout";
import Link from "next/link"
import Image from "next/image"
import AddressesList from "./AddressesList"
import axios from "axios"
import router from "next/router"
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import CreditCard from '../../public/assets/icons/card-credit-card.png'
import AmexCard from '../../public/assets/icons/card-amex.svg'
import VisaCard from '../../public/assets/icons/card-visa.svg'
import JCBCard from '../../public/assets/icons/card-JCB.svg'
import MasterCard from '../../public/assets/icons/card-mastercard.svg'
import DinersClubCard from '../../public/assets/icons/card-diners-club.svg'
import DiscoverCard from '../../public/assets/icons/card-discover.svg'
import Cleave from 'cleave.js/react'
import { MessageContext } from "../../contexts/MessageContext"
import { gsap } from "gsap"

const PaymentForm = (props: any) => {

    const { getCart, setIsLoading } = useContext(MainContext)
    const {setAlert} = useContext(MessageContext)
    const {session} = useContext(SessionContext)

    const [shipping, setShipping] = useState({
        address_id: '',
        email: '',
        first_name: '',
        last_name: '',
        company: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        phone: ''
    })
    const [cardType, setCardType]: any = useState('')

    const [readAndAccept, setReactAndAccept] = useState(false);
    const [shippingMethod, setShippingMethod] = useState({rate: '', notes: ''});
    const [shippingErr, setShippingErr] = useState('');
    const [countriesList, setCountriesList] = useState([])
    const [statesByCountry, setStatesByCountry] = useState([])
    const [rates, setRates] = useState<any[]>([])
    const [displayError, setDisplayError] = useState<any>()
    const [Addresses, setAddresses] = useState<any[]>([])
    const [useDifferentAddress, setUseDifferentAddress] = useState(true)
    const [loginAlertName, setLoginAlertName] = useState('')
    const [cancelLogin, setCancelLogin] = useState(false)

    const checkEmailExist = async (email: any) => {
        if(cancelLogin==false)
        {
            const res = await axios.get(`${BASE_URL}check-email-account?email=${email}`).then(response=> {
                return response.data
            })
            if(res.status==1)
            {
                setLoginAlertName(res.name)
            }
            else
            {
                setLoginAlertName('')
            }
        }
    }

    const clearShipping = () => {
        setShipping({
            address_id: '',
            email: '',
            first_name: '',
            last_name: '',
            company: '',
            address1: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            zip: '',
            phone: ''
        })
    }

    // ------------------ Submit Forms Start ------------------

    // Shipping Address submition
    const onSubmitShippingFunc = (event: any) => {
        event.preventDefault();
        SubmitShippingFunc()
    }
    const SubmitShippingFunc = async () => {
        setIsLoading(true)
        let ses_coupon: any = await localStorage.getItem('ses_coupon')
        ses_coupon = JSON.parse(ses_coupon);
        let formData: any = {
            cart: props.cartItems,
            shipping: shipping,
            coupon: ses_coupon,
        }
        if(shipping.email == '' && session!=undefined)
        {
            setDisplayError('Please select an address.')
        }
        if(session!=undefined && session.user!=undefined)
        {
            formData.customer = session.user
        }
        let sessShipping: any = await fetch(`${SITE_URL}api/checkouts`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        if(sessShipping!=undefined && sessShipping!=null)
        {
            await localStorage.setItem('shipping', JSON.stringify(sessShipping))
        }

        if(sessShipping!=null && sessShipping.shipping_details!=undefined && sessShipping.checkout_step==2 && sessShipping.rates.error==undefined)
        {
            setShippingAddressShow(false)
            setShippingShow(true)
            setRates(sessShipping.rates)
            setDisplayError('')
        }
        else if(sessShipping!=null && sessShipping.rates!=undefined && sessShipping.rates.error!=undefined)
        {
            setDisplayError(sessShipping.rates.error)
            clearShipping()
        }
        else if(sessShipping!=null)
        {
            setRates(sessShipping.rates)
        }
        setIsLoading(false)
    }

    // Shipping method section submition
    const SubmitNoteFunc = async () => {
        let shipping: any = await localStorage.getItem('shipping')
        if (shipping != null && shippingMethod.rate != 'free' && shippingMethod.rate!='')
        {
            shipping = JSON.parse(shipping)
            const result = await fetch(`${SITE_URL}api/checkouts/shipping-method`, {
                method: "POST",
                body: JSON.stringify(shippingMethod),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => response.json())

            shipping.shipping_method = {
                service :result.service,
                rate: result.rate,
                notes: shippingMethod.notes,
                enc: shippingMethod.rate
            }
            shipping.checkout_step=3
            await localStorage.setItem('shipping', JSON.stringify(shipping))

            setShippingAddressShow(false)
            setShippingShow(false)
            setPaymentShow(true)
            getCart()
            setShippingErr('')
        }
        else if (shippingMethod.rate=='free')
        {
            shipping = JSON.parse(shipping)
            shipping.shipping_method = {
                service: 'Free Shipping',
                rate: 0,
                notes: shippingMethod.notes,
                enc: shippingMethod.rate
            }
            shipping.checkout_step = 3
            await localStorage.setItem('shipping', JSON.stringify(shipping))
            getCart()
            setShippingAddressShow(false)
            setShippingShow(false)
            setPaymentShow(true)
            setShippingErr('')
        }
        else if (shippingMethod.rate == '')
        {
            setShippingErr('Please select shipping address')
        }
    }

    // Payment card section submition

    interface IFormInputs {
        cc_number: string,
        cc_name: string,
        cc_month: string,
        cc_year: string,
        cc_cvv: string
    }

    const validationSchema = Yup.object().shape({
        cc_number: Yup.string()
            .required('Card number is required'),
        cc_name: Yup.string()
            .required('Name is required'),
        cc_month: Yup.string()
            .required('Expiry month is required'),
        cc_year: Yup.string()
            .required('Expiry year is required'),
        cc_cvv: Yup.string()
            .required('CVV number is required')
            .min(3, 'CVV number length will be 3 or 4')
            .max(4, 'CVV number length will be 3 or 4')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, setError, reset, setValue, formState: { errors }  } = useForm<IFormInputs>(formOptions);

    const SubmitPaymentFunc = async (data: any) => {
        setIsLoading(true)
        let cartTotals = localStorage.getItem('cartTotalCounts')
        let ses_coupon = localStorage.getItem('ses_coupon')
        let sessShipping: any = await localStorage.getItem('shipping')
        sessShipping = JSON.parse(sessShipping)

        if(cartTotals!=null)
            cartTotals = JSON.parse(cartTotals)
        if(ses_coupon!=null)
            ses_coupon = JSON.parse(ses_coupon)
        let formData: any = {
            cc_month: data.cc_month,
            cc_year: data.cc_year,
            cc_cvv: data.cc_cvv,
            cc_name: data.cc_name,
            cc_number: data.cc_number,
            cart: props.cartItems,
            shipping: sessShipping,
            cartTotals: cartTotals,
            ses_coupon: ses_coupon,
            ses_free_shipping_coupon: localStorage.getItem('ses_free_shipping_coupon')
        }
        if(session!=undefined && session.user!=undefined)
        {
            formData.customer = session.user
        }
        const res: any = await fetch(`${SITE_URL}api/checkouts/process-payment`,{
            method: "POST",
            body: JSON.stringify(formData),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        .catch((error: any) => {
            console.log(`Error Found: ${error}`)
        })

        if (res!=undefined && res.error!=undefined)
        {
            setAlert({
                type: 'danger',
                message: res.error
            })

            gsap.timeline().fromTo('.alert-show', {
                xPercent: -50,
                autoAlpha: 0,
                }, {
                xPercent: 0,
                ease: 'back(2)',
                autoAlpha: 1,
                onComplete: () => {
                    gsap.to('.alert-show', {
                        xPercent: -50,
                        autoAlpha: 0,
                        duration: 0.3,
                        delay: 2
                    })
                }
            },'<90%')
            setIsLoading(false)
        }
        else if(res!=undefined && res.message!=undefined)
        {
            await localStorage.removeItem('shipping')
            await localStorage.removeItem('ses_coupon')
            await localStorage.removeItem('cartTotalCounts')
            await localStorage.removeItem('cart')
            await localStorage.removeItem('ses_free_shipping_coupon')
            await getCart()
            await localStorage.setItem('thanks', 'true')
            router.push('/order/thanks')
        }
        // const res = await SubmitPayment(formData)
    }
    // ------------------ Submit Forms End ------------------

    const setReactAndAcceptFunc = () => {
        if(readAndAccept==true)
            setReactAndAccept(false)
        else
            setReactAndAccept(true)
    }

    // ------------------ Checkout Tabers Display Effects Start ------------------
    const [shippingShow,setShippingShow] = useState(false)
    const [paymentShow,setPaymentShow] = useState(false)
    const [shippingAddressShow,setShippingAddressShow] = useState(true)

    const ShippingAddressShowFunc = () => {
        if(shippingAddressShow)
            setShippingAddressShow(false)
        else
            setShippingAddressShow(true)
            setShippingShow(false)
            setPaymentShow(false)
    }

    const ShippingShowFunc = () => {
        if(shippingShow)
            setShippingShow(false)
        else
            setShippingShow(true)
            setShippingAddressShow(false)
            setPaymentShow(false)
    }

    const PaymentShowFunc = () => {
        if(paymentShow)
            setPaymentShow(false)
        else
            setPaymentShow(true)
            setShippingShow(false)
            setShippingAddressShow(false)
    }
    // ------------------ Checkout Tabers Display Effects End ------------------

    const getStatesByCountries = async (value: any, setValue: boolean=true) => {
        const resut = await fetch(`${SITE_URL}api/states`, {
            method: "POST",
            body: JSON.stringify({ country_id: value }),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        setStatesByCountry(resut)
        if(setValue)
        {
            setShipping({...shipping, country: value})
        }
    }

    const useDifferentAddressFunc = () => {
        setShipping({
            address_id: shipping.address_id,
            email: '',
            first_name: '',
            last_name: '',
            company: '',
            address1: '',
            address2: '',
            country: '',
            state: '',
            city: '',
            zip: '',
            phone: ''
        })
        setUseDifferentAddress(true)
    }

    const CreditCardIcon = (props: any) => {
        let cardIcon;
        if(cardType=='visa')
        {
            cardIcon = VisaCard.src
        }
        else if(cardType=='amex')
        {
            cardIcon = AmexCard.src
        }
        else if(cardType=='mastercard')
        {
            cardIcon = MasterCard.src
        }
        else if(cardType=='diners')
        {
            cardIcon = DinersClubCard.src
        }
        else if(cardType=='discover')
        {
            cardIcon = DiscoverCard.src
        }
        else if(cardType=='jcb')
        {
            cardIcon = JCBCard.src
        }
        else
        {
            cardIcon = CreditCard.src
        }
        return <img src={cardIcon} />
    }

    useEffect(() => {

        const getCountries = async () => {
            const result = await fetch(`${SITE_URL}api/countries`, {method: "POST"})
            const res = await result.json()
            setCountriesList(res)
        }
        getCountries()
        
        const getStatesByCountries = async (value: any, setValue: boolean=true) => {
            const resut = await fetch(`${SITE_URL}api/states`, {
                method: "POST",
                body: JSON.stringify({ country_id: value }),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => response.json())
            setStatesByCountry(resut)
            if(setValue)
            {
                setShipping({...shipping, country: value})
            }
        }

        const loadShippingDetails = (sessShipping: any) => {
            setShipping({
                address_id: '',
                address1: sessShipping.address1,
                address2: sessShipping.address2,
                city: sessShipping.city,
                company: sessShipping.company,
                country: sessShipping.country,
                email: sessShipping.email,
                first_name: sessShipping.first_name,
                last_name: sessShipping.last_name,
                phone: sessShipping.phone,
                state: sessShipping.state,
                zip: sessShipping.zip
            })
            getStatesByCountries(sessShipping.country, false)
        }
        
        const getShippingDetails = async () => {
            let sessShipping: any = await localStorage.getItem('shipping')
            sessShipping = await JSON.parse(sessShipping)
            if(sessShipping!=null && sessShipping.rates!=undefined && sessShipping.rates.error!=undefined)
            {
                setDisplayError(sessShipping.rates.error)
            }
            else if(sessShipping!=null && sessShipping.shipping_details!=undefined && sessShipping.rates.error==undefined)
            {
                
                setShippingAddressShow(pShippingAddressShow => false)
                if(sessShipping.checkout_step==2)
                {
                    setShippingShow(pShippingShow => true)
                }
                else if(sessShipping.checkout_step==3)
                {
                    setPaymentShow(pPaymentShow => true)
                }
                // filling shipping method section
                sessShipping.shipping_method!=undefined && setShippingMethod({
                    rate: sessShipping.shipping_method.enc,
                    notes: sessShipping.shipping_method.notes
                })
                
                // filling rates list in shipping method
                setRates(pRates => sessShipping.rates)
            }
            (sessShipping!=undefined && sessShipping.shipping_details!=undefined) && loadShippingDetails(sessShipping.shipping_details)

            let sessionData = await session
            if(sessionData!=undefined && sessionData.user!=undefined)
            {
                setUseDifferentAddress(false)
            }
        }
        getShippingDetails()

        const getAddressesList = async () => {
            if(session.user!=undefined)
            {
                let data: any = {
                    customer: {id: session.user.id}
                }
                let res: any = await fetch(`${SITE_URL}api/dashboard/addresses`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then(respose => { return respose.json()})
                await setAddresses((pre) => res.addresses.data)
            }
        }
        (session!=undefined && session.user!=undefined) && getAddressesList()

    }, [session])

    return (
        <div className="shipping-address-wrapper lg:w-8/12 lg:mr-4 border border-solid border-gray-300 rounded-lg order-2 lg:order-1 mt-6 lg:mt-0" style={{ height: 'fit-content' }}>
            <h3 className="p-4 lite-blue-bg-color rounded-lg font-semibold border-b border-solid border-gray-300 flex items-center" onClick={()=>ShippingAddressShowFunc()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="#333">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>
                    Shipping Address
                </span>
            </h3>
            <div className={`shipping-address-detail ${shippingAddressShow==true ? 'my-4' : 'zero-height'}`} style={ shippingAddressShow==true ? { overflow: 'hidden', height: '100%', transition: 'all 0.3s ease-in-out'} : {}}>
                {
                    session!=undefined && session.user!=undefined && useDifferentAddress==false && Addresses.length > 0 ? 
                        <div className="mx-4">
                            <div className="text-sm my-4">Please select from already saved addresses:</div>
                            <AddressesList Addresses={Addresses} customer={session.user} shipping={shipping} setShipping={setShipping} SubmitShippingFunc={SubmitShippingFunc} setUseDifferentAddress={setUseDifferentAddress} />
                            {
                                displayError!='' && (
                                    <div className="text-red-400 px-4 pb-4">{displayError}</div>
                                )
                            }
                            <div className="flex flex-wrap justify-end">
                                <button className="border dark-blue-hover capitalize mt-4 overflow-hidden px-8 py-4 relative rounded-full text-blue-400 mr-2" onClick={()=>useDifferentAddressFunc()}>Use Different Address</button>
                                <button className="capitalize dark-blue-bg mt-4 overflow-hidden px-8 py-4 relative rounded-full text-white white-hover" onClick={()=>SubmitShippingFunc()}>Continue</button>
                            </div>
                        </div>
                    : ''
                }
                {
                    useDifferentAddress==true || Addresses.length==0 ?
                    <form id="shipping-address" action="#" onSubmit={(event) => onSubmitShippingFunc(event)}>
                        { session==undefined && (
                            <>
                            <label htmlFor="email" className="p-4 relative block">
                                Email Address:
                                <input type="email" required placeholder="Enter email address ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.email} onBlur={(e)=>checkEmailExist(e.target.value)} onChange={(e)=>setShipping({...shipping, email: e.target.value})} />
                                { loginAlertName!='' && cancelLogin==false && (
                                    <div className="primary-blue-bg text-white p-3 rounded-lg text-sm mt-1">
                                        Hello <strong className="font-bold">{loginAlertName}!</strong>, you already have an account with us, would you like to login and place order? <a className="cursor-pointer font-bold text-blue-300" onClick={()=>props.signInShow()}>Yes, I would like to Login</a>  |  <a className="cursor-pointer font-bold text-red-400" onClick={()=>setCancelLogin(true)}>Cancel</a>
                                    </div>
                                ) }
                            </label>
                            </>
                        ) }
                        <div className="name-label-wrapper flex flex-col sm:flex-row">
                            <label htmlFor="name" className="p-4 relative block sm:w-6/12">
                                First Name:
                                <input type="name" required placeholder="Enter first name ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.first_name} onChange={(e)=>setShipping({...shipping, first_name: e.target.value})} />
                            </label>
                            <label htmlFor="name" className="p-4 relative block sm:w-6/12">
                                Last Name:
                                <input type="name" required placeholder="Enter last name ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.last_name} onChange={(e)=>setShipping({...shipping, last_name: e.target.value})} />
                            </label>
                        </div>
                        <label htmlFor="company" className="p-4 relative block">
                            Company:
                            <input type="text" required placeholder="Enter company name ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.company} onChange={(e)=>setShipping({...shipping, company: e.target.value})} />
                        </label>
                        <label htmlFor="address" className="p-4 relative block">
                            Address <span className="text-red-500">*</span>:
                            <input type="text" required placeholder="Enter address line 1 ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.address1} onChange={(e)=>setShipping({...shipping, address1: e.target.value})} />
                            <input type="text" placeholder="Enter address line 2 ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.address2} onChange={(e)=>setShipping({...shipping, address2: e.target.value})} />
                        </label>
                        <label htmlFor="country" className="p-4 relative block">
                            Country:
                            <select required className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.country} onChange={(e)=>getStatesByCountries(e.target.value, true)}>
                                <option value="">Select country ...</option>
                                {
                                    countriesList.length > 0 && (
                                        countriesList.map((country: any, index: any)=>{
                                            return (<option key={index} value={country.id} selected={shipping.country==country.id && true}>{country.name}</option>)
                                        })
                                    )
                                }
                            </select>
                        </label>
                        <div className="state-city-label-wrapper flex flex-col sm:flex-row">
                            <label htmlFor="state" className="p-4 relative block sm:w-6/12">
                                State:
                                <select required className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" defaultValue={Number(shipping.state)} onChange={(e)=>setShipping({...shipping, state: e.target.value})}>
                                    <option value="" >Select state ...</option>
                                    {
                                        statesByCountry.length > 0 && (
                                            statesByCountry.map((state: any, index: any)=>{
                                                return (<option key={index} value={state.id} selected={shipping.state==state.id && true}>{state.name}</option>)
                                            })
                                        )
                                    }
                                </select>
                            </label>
                            <label htmlFor="city" className="p-4 relative block sm:w-6/12">
                                City:
                                <input type="text" required placeholder="Enter city ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.city} onChange={(e)=>setShipping({...shipping, city: e.target.value})} />
                            </label>
                        </div>
                        <div className="zip-phone-label-wrapper flex flex-col sm:flex-row">
                            <label htmlFor="state" className="p-4 relative block sm:w-6/12">
                                Zip / Postal code:
                                <input type="number" required placeholder="Enter zip/postal code ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.zip} onChange={(e)=>setShipping({...shipping, zip: e.target.value})} />
                            </label>
                            <label htmlFor="city" className="p-4 relative block sm:w-6/12">
                                Phone:
                                <input type="text" required placeholder="Enter phone ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={shipping.phone} onChange={(e)=>setShipping({...shipping, phone: e.target.value})} />
                            </label>
                        </div>
                        {
                            displayError!='' && (
                                <div className="text-red-400 px-4 pb-4">{displayError}</div>
                            )
                        }
                        <button type="submit" className="py-4 px-8 rounded-full dark-blue-bg text-white overflow-hidden relative ml-4">
                            Continue
                        </button>
                        {
                            session!=undefined && session.user!=undefined && (
                                <button type="button" className="border dark-blue-hover capitalize mt-4 overflow-hidden px-8 py-4 relative rounded-full text-blue-400 ml-2" onClick={()=>setUseDifferentAddress(false)}>Use Form Existing Address</button>
                            )
                        }
                    </form>
                    : ''
                }
            </div>
            <div className="shipping-method-container">
                <h3 className="p-4 lite-blue-bg-color rounded-lg font-semibold border-b border-solid border-gray-300 mt-2 cursor-pointer flex items-center" onClick={()=>ShippingShowFunc()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="#333">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>
                        Shipping Method
                    </span>
                </h3>
                <div className={`shippping-method-wrapper detail-wrapper ${shippingShow==false && 'zero-height'}`} style={ shippingShow==true ? { overflow: 'hidden', height: '100%', transition: 'all 0.3s ease-in-out'} : {}}>
                    <div className="p-4">
                        {
                            rates.length > 0 && (
                                rates.map((rate: any, index: any) => {
                                    return (
                                        <label key={index} htmlFor={`shipping_method_${index}`} style={{ display: 'block' }} className="mb-3">
                                            <input type="radio" name="shipping_method" id={`shipping_method_${index}`} value={rate.enc} defaultChecked={shippingMethod.rate != '' && shippingMethod.rate == rate.enc ? true : false} onClick={(e)=>{
                                                setShippingMethod({...shippingMethod, rate: rate.enc})
                                                }} /> {rate.service} ({rate.rate})
                                        </label>
                                    )
                                })
                            )
                        }
                        <br />
                        <div className="shipping-rates text-gray-600 leading-normal">
                            Sorry, no quotes are available for this order at this time.
                        </div>
                        <div className="shipping-notes-wrapper mt-4">
                            <h3 className="font-semibold">Shipping / Order Notes:</h3>
                            <form id="shipping-notes" action="#" onSubmit={() => SubmitNoteFunc()}>
                                <textarea className="w-full mt-4 border border-solid border-gray-300 rounded-lg focus:outline-none p-3" name="shipping-notes" id="shipping-notes1" cols={30} rows={10} defaultValue={shippingMethod.notes} onChange={(e)=>setShippingMethod({...shippingMethod, notes: e.target.value})} />
                            </form>
                        </div>
                        <div>
                            <small className="text-red-500">{shippingErr}</small>
                        </div>
                        <button className="py-4 px-8 rounded-full dark-blue-bg text-white overflow-hidden relative mt-4" onClick={() => SubmitNoteFunc()}>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
            <div className="payment-detail-container">
                <h3 className="p-4 lite-blue-bg-color rounded-lg font-semibold border-b border-solid border-gray-300 mt-2 cursor-pointer flex items-center" onClick={()=>PaymentShowFunc()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="#333">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>
                        Payment Details
                    </span>
                </h3>
                <div className={`payment-detail detail-wrapper ${paymentShow==true ? 'my-4' : 'zero-height'}`} style={ paymentShow==true ? { overflow: 'hidden', height: '100%', transition: 'all 0.3s ease-in-out'} : {}}>
                    <form id="payment-details" onSubmit={handleSubmit((data) => SubmitPaymentFunc(data))}>
                        <label htmlFor="name" className="p-4 relative block">
                            Name On Card:
                            <input type="name" required placeholder="Name on card ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('cc_name')} autoComplete="off" />
                            <small className="text-red-500">{errors.cc_name && <p>{errors.cc_name.message}</p>}</small>
                        </label>
                        <label htmlFor="number" className="p-4 relative block">
                            Card Number:
                            <div className="card-number-input-wrapper flex border border-solid border-gray-300 rounded-lg mt-4 p-3 relative">
                                {/* <input type="text" required placeholder="Card number ..." className="w-11/12 focus:outline-none" {...register('cc_number')} /> */}
                                <Cleave placeholder="Enter your credit card number" className="w-11/12 focus:outline-none" onChange={(e: any)=>setValue('cc_number', e.target.value)}
                                    options={{creditCard: true, 
                                        onCreditCardTypeChanged: function (type: any) {
                                            setCardType(type)
                                    }}} />
                                <div className="card-icon-wrapper inline bg-gray-200 w-max h-full absolute right-0 top-0 rounded-r-lg p-4 flex items-center">
                                    <CreditCardIcon />
                                </div>
                            </div>
                            <small className="text-red-500">{errors.cc_number && <p>{errors.cc_number.message}</p>}</small>
                        </label>
                        <div className="card-expiry-detail-wrapper px-4 flex flex-col sm:flex-row">
                            <label htmlFor="card-expire-month" className="relative block">
                                Expiry Month:
                                <select required className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" defaultValue={""} {...register('cc_month')}>
                                    <option value="" disabled>Please Select ...</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <small className="text-red-500">{errors.cc_month && <p>{errors.cc_month.message}</p>}</small>
                            </label>
                            <label htmlFor="card-expire-year" className="sm:px-4 relative block mt-4 sm:mt-0">
                                Expiry Year:
                                <select required className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" defaultValue={""} {...register('cc_year')}>
                                    <option value="" disabled>Please Select ...</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                    <option>2027</option>
                                    <option>2028</option>
                                    <option>2029</option>
                                    <option>2030</option>
                                    <option>2031</option>
                                </select>
                            </label>
                            <label htmlFor="text" className="pr-4 relative block mt-4 sm:mt-0">
                                CVC:
                                <input type="text" required placeholder="Enter CVC ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('cc_cvv')} />
                                <small className="text-red-500">{errors.cc_cvv && <p>{errors.cc_cvv.message}</p>}</small>
                            </label>
                        </div>
                        <div className="terms-acceptance-wrapper p-4 mt-4 leading-normal">
                            <label htmlFor="terms p-4 block relative" onClick={()=>setReactAndAcceptFunc()}>
                                <input type="checkbox" className="mr-2" checked={readAndAccept==true ? true : false} />
                                I&apos;ve read and accept the <span className="dark-blue-color"><Link href="/pages/terms-and-conditions"><a target='_blank'>terms &amp; conditions.</a></Link></span>
                            </label>
                        </div>
                        <button type="submit" className="place-order-btn py-4 px-8 rounded-full primary-blue-bg text-white overflow-hidden relative ml-4 mt-4" disabled={readAndAccept==true ? false : true} >
                            Place Order
                        </button>
                    </form>
                    <div className="secure-payment-img flex justify-center items-center m-4 pt-4 border-t border-solid border-gray-300">
                        <Image width={444} height={143}  src={`${BASE_URL}static/assets/img/authorize_net.webp`} alt="Authorize" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentForm