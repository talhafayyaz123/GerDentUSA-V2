import React, { useContext, useEffect, useState } from 'react'
import { SITE_URL } from '../../../lib/constants'
import { CustomerAddressesContext } from '../../../contexts/CustomerAddressesContext'
import { gsap } from 'gsap'
import { MessageContext } from '../../../contexts/MessageContext'
import Style from '../Dashboard.module.css'

const CreateAddress = (props: any) => {

    const {Address, setAddress, postAddress} = useContext(CustomerAddressesContext)
    const {setAlert} = useContext(MessageContext)
    const [countriesList, setCountriesList] = useState([])
    const [statesByCountry, setStatesByCountry] = useState([])
    let formInputs = {
        id: '',
        address1: "",
        address2: "",
        city: "",
        company: "",
        country: 0,
        customer_id: 0,
        default_billing: "N",
        default_shipping: "N",
        first_name: "",
        last_name: "",
        phone: "",
        state: "",
        vat: "0",
        zip: "",
    }

    const getCountries = async () => {
        const result = await fetch(`${SITE_URL}api/countries`, {
            method: "POST",
        }).then(response => response.json())
        setCountriesList(result)
    }

    const getStatesByCountries = async (value: any) => {
        const resut = await fetch(`${SITE_URL}api/states`, {
            method: "POST",
            body: JSON.stringify({ country_id: value }),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        setStatesByCountry(resut)
    }

    const setCountryValue = (value: any) => {
        setAddress({...Address, country: value})
        getStatesByCountries(value)
    }

    const submitFunction = async (event: any) => {
        event.preventDefault()
        let data: any = {
            customer: {id: props.customer.id},
            Address: Address
        }
        const res: any = await postAddress(data)

        setAlert({
            type: 'info',
            message: res.message
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
        cancelAddressFunc()
    }

    const cancelAddressFunc = () => {
        props.setIsCreateAddress(false)
        setAddress(formInputs)
    }

    useEffect(() => {
        getCountries()
        
        if(Address.country!=0 && Address.country!='')
        {
            getStatesByCountries(Address.country)
        }
    }, [Address])

    return (
        <form id="create-address" onSubmit={(e)=>submitFunction(e)}>
            <div className="name-label-wrapper">
                <div className="name-wrapper flex flex-col sm:flex-row">
                    <div className="wrapper flex flex-col sm:w-6/12 p-4">
                        <label htmlFor="first-name" className="relative inline-block"> First Name: </label>
                        <input id="first-name" type="text" required placeholder="Enter first name ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.first_name} onChange={(e)=>setAddress({...Address, first_name: e.target.value})} />
                    </div>
                    <div className="wrapper flex flex-col sm:w-6/12 p-4">
                        <label htmlFor="last-name" className="relative block"> Last Name: </label>
                        <input id="last-name" type="name" required placeholder="Enter last name ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.last_name} onChange={(e)=>setAddress({...Address, last_name: e.target.value})} />
                    </div>
                </div>
            </div>
            <div className="wrapper flex flex-col p-4">
                <label htmlFor="company" className="relative block"> Company: </label>
                <input type="text" required placeholder="Enter company name ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.company} onChange={(e)=>setAddress({...Address, company: e.target.value})} />
            </div>
            <div className="wrapper flex flex-col p-4">
                <label htmlFor="address-1" className="relative block"> Address <span className="text-red-500">*</span>: </label>
                <input id="address-1" type="text" required placeholder="Enter address line 1 ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.address1} onChange={(e)=>setAddress({...Address, address1: e.target.value})}/>
            </div>
            <div className="wrapper flex flex-col p-4">
                <label htmlFor="address-2" className="relative block"> Address : </label>
                <input id="address-2" type="text" placeholder="Enter address line 2 ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.address2} onChange={(e)=>setAddress({...Address, address2: e.target.value})}/>
            </div>
            <div className="wrapper flex flex-col sm:flex-row">
                <div className="wrapper flex flex-col p-4 sm:w-6/12">
                    <label htmlFor="country" className="relative block"> Country: </label>
                    <select id="country" required className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" defaultValue={Address.country} onChange={(e)=>setCountryValue(e.target.value)}>
                        <option value="" selected>Select country ...</option>
                        {
                            countriesList.length > 0 && (
                                countriesList.map((country: any, index: any)=>{
                                    return (<option key={index} value={country.id} selected={Address.country==country.id && true}>{country.name}</option>)
                                })
                            )
                        }
                    </select>
                </div>
                <div className="wrapper flex flex-col p-4 sm:w-6/12">
                    <label htmlFor="state" className="relative block"> State: </label>
                    <select required className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" defaultValue={Number(Address.state)} onChange={(e)=>setAddress({...Address, state: e.target.value})}>
                        <option value="" >Select state ...</option>
                        {
                            statesByCountry.length > 0 && (
                                statesByCountry.map((state: any, index: any)=>{
                                    return (<option key={index} value={state.id} selected={Address.state==state.id && true}>{state.name}</option>)
                                })
                            )
                        }
                    </select>
                </div>
            </div>
            <div className="wrapper flex flex-col sm:flex-row">
                <div className="wrapper flex flex-col p-4 sm:w-6/12">
                    <label htmlFor="city" className="relative block"> City: </label>
                    <input id="city" type="text" required placeholder="Enter city ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.city} onChange={(e)=>setAddress({...Address, city: e.target.value})} />
                </div>
                <div className="wrapper flex flex-col p-4 sm:w-6/12">
                    <label htmlFor="state" className="relative block"> Zip / Postal code: </label>
                    <input type="text" required placeholder="Enter zip/postal code ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.zip} onChange={(e)=>setAddress({...Address, zip: e.target.value})} />
                </div>
            </div>
            <div className="wrapper flex flex-col sm:flex-row">
                <div className="wrapper flex flex-col sm:w-6/12 p-4">
                    <label htmlFor="city" className="relative block"> Phone: </label>
                    <input id="phone" type="text" required placeholder="Enter phone ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.phone} onChange={(e)=>setAddress({...Address, phone: e.target.value})} />
                </div>
                <div className="zip-phone-label-wrapper flex flex-col sm:w-6/12 p-4">
                    <label htmlFor="vat" className="relative block"> VAT: </label>
                    <input id="vat" type="text" required placeholder="Enter phone ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" value={Address.vat} onChange={(e)=>setAddress({...Address, vat: e.target.value})} />
                </div>
            </div>
            <div className="flex w-full">
                <div className="wrapper flex flex-col sm:w-6/12 p-4">
                    <label htmlFor="default-billing">Default Billing Address</label>
                    <div className="check-box-container flex items-center mt-4">
                        <input id="default-billing-yes" type="radio" name="default-billing" defaultValue="Y" className="mr-2" checked={Address.default_billing=='Y' ? true: false} onChange={(e)=>setAddress({...Address, default_billing: 'Y'})} />
                        <label htmlFor="default-billing-yes"> Yes </label>
                        <input id="default-billing-no" type="radio" name="default-billing" defaultValue="N" className="ml-6 mr-2" checked={Address.default_billing=='N' ? true: false} onChange={(e)=>setAddress({...Address, default_billing: 'N'})} />
                        <label htmlFor="default-billing-no"> No </label>
                    </div>
                </div>
                <div className="wrapper flex flex-col sm:w-6/12 p-4">
                    <label htmlFor="default-shipping">Default Shipping Address</label>
                    <div className="check-box-container flex items-center mt-4">
                        <input id="default-shipping-yes" type="radio" name="default-shipping" defaultValue="Y" className="mr-2" checked={Address.default_shipping=='Y' ? true: false} onChange={(e)=>setAddress({...Address, default_shipping: 'Y'})} />
                        <label htmlFor="default-shipping-yes"> Yes </label>
                        <input id="default-shipping-no" type="radio" name="default-shipping" defaultValue="N" className="ml-6 mr-2" checked={Address.default_shipping=='N' ? true: false} onChange={(e)=>setAddress({...Address, default_shipping: 'N'})} />
                        <label htmlFor="default-shipping-no"> No </label>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn px-8 py-4 font-semibold tracking-widest rounded-full relative overflow-hidden mt-2 dark-blue-bg text-white">Submit</button>
            <button type="button" className={`btn px-8 py-4 font-semibold tracking-widest rounded-full relative overflow-hidden mt-2 bg-red-600 ${Style.cancel} text-white ml-5`} onClick={()=>cancelAddressFunc()}>Cancel</button>
        </form>
    )
}

export default CreateAddress