import React, { useContext, useEffect, useState } from 'react'
import { SITE_URL } from '../../../lib/constants'
import { CustomerAddressesContext } from '../../../contexts/CustomerAddressesContext'
import { MainContext } from '../../../contexts/MainContext'
import { gsap } from 'gsap'
import { MessageContext } from '../../../contexts/MessageContext'
import { DashboardContext } from '../../../contexts/Dashboard'

const AddressesList = (props: any) => {

    const {setIsLoading} = useContext(MainContext)
    const {setDashboardLoading} = useContext(DashboardContext)
    const {getAddress, delAddress} = useContext(CustomerAddressesContext)
    const {setAlert} = useContext(MessageContext)
    const [Addresses, setAddresses] = useState([])
    const editAddress = (address: any) => {
        getAddress(address)
        props.setIsCreateAddress(true)
    }

    const delAddressFunc = async (id: any) => {
        let cnf = confirm('Are you sure to delete this record')
        if(cnf==true)
        {
            let data: any = {
                customer: {id: props.customer.id}
            }
            const res: any = await delAddress(id, data)

            setAlert({
                type: 'danger',
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

            setAddresses(Addresses.filter((address: any)=> address.id!=id))
        }
    }

    useEffect(() => {

        const getAddressesList = async () => {
            let data: any = {
                customer: {id: props.customer.id}
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
            setDashboardLoading(false)
        }
        getAddressesList()
    }, [props.customer.id, setDashboardLoading])

    return (
        <div className="table-heading-container">
            {
                Addresses!=undefined && Addresses.length==0 ? (
                    <div><strong>Sorry!</strong>, no addresses found.</div>
                ) : (
                    <>
                    <div className="table-heading-wrapper grid grid-cols-8 lg:grid-cols-9 bg-gray-100 p-4 rounded-lg border-b border-solid border-gray-300">
                        <div className="table-heading">Name</div>
                        <div className="table-heading ">Company</div>
                        <div className="table-heading col-span-3">Address</div>
                        <div className="table-heading text-center">Phone</div>
                        <div className="table-heading text-center">VAT</div>
                        <div className="table-heading text-center leading-snug">Default Shipping</div>
                        <div className="table-heading text-center">Actions</div>
                    </div>
                    {
                        Addresses.map((address: any, index: any) => {
                            let company = address.company.trim()
                            let phone = address.phone.trim()
                            return (
                                <div key={index} className="db-detail-wrapper text-gray-600 text-sm">
                                    <a className="db-detail grid grid-cols-8 lg:grid-cols-9 mt-5 p-4 rounded-lg bg-white border border-solid border-gray-300 db-links">
                                        <div id="user-name">{`${address.first_name} ${address.last_name}`}</div>
                                        <div id="user-company" className="">
                                            {`${company ? address.company: 'N/A'}`}
                                        </div>
                                        <div className="col-span-3 mr-3" id="user-address">
                                            {`${address.address2 !=null ? `${address.address1} ${address.address2}` : address.address1 }, ${address.city}, ${address.StateName}, ${address.zip}, ${address.CountryName}`}
                                        </div>
                                        <div id="user-phone" className="text-center">{`${phone ? address.phone: 'N/A'}`}</div>
                                        <div id="vat" className="text-center">0</div>
                                        <div id="default-shipping-wrapper" className="flex justify-center items-start text-white">
                                            <div className={`default-shipping ${(address.default_shipping).trim()=='Y' ? 'primary-blue-bg': 'bg-red-600'} w-max p-1 rounded`}>
                                                {(address.default_shipping).trim()=='Y' ? 'Yes': 'No'}
                                            </div>
                                        </div>
                                        <div className="actions-wrapper flex justify-center items-start">
                                            <div className="icon-wrapper cursor-pointer p-0.5 rounded dark-blue-bg mr-1" onClick={()=>editAddress(address)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="#fff">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </div>
                                            <div className="icon-wrapper cursor-pointer p-0.5 rounded bg-red-600" onClick={()=>delAddressFunc(address.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fff">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                    </>
                )
            }
        </div>
    )
}

export default AddressesList
