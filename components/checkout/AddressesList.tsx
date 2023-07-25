import React, { Fragment, useEffect, useState } from 'react'

const AddressesList = (props: any) => {
    
    const setAddress = (address: any) => {
        props.setShipping({
            address_id: address.id,
            email: props.customer.email,
            first_name: address.first_name,
            last_name: address.last_name,
            company: address.company,
            address1: address.address1,
            address2: address.address2,
            country: address.country,
            state: address.state,
            city: address.city,
            zip: address.zip,
            phone: address.phone,
        })
    }

    useEffect(() => {
    }, [])

    return (
        <Fragment>
        {
            props.Addresses.length > 0 && (
                props.Addresses?.map((address: any, index: any) => {
                    return <div key={index} className={`border border-solid flex flex-wrap justify-between p-4 my-4 ${props.shipping.address_id!=undefined && props.shipping.address_id==address.id ? 'border-blue-200 bg-blue-200': 'border-gray-200'}`}>
                        <div className="">
                            <p className="mb-1.5">{address.company}</p>
                            <p className="mb-1.5">{address.address1}</p>
                            <p className="mb-1.5">{address.address2}</p>
                            <p className="mb-1.5">{address.city + ', ' + address.StateName + ', ' + address.zip}</p>
                            <p className="mb-1.5">{address.CountryName}</p>
                            <div>Tel: {address.phone}</div>
                        </div>
                        <div>
                            <button className="capitalize dark-blue-bg mt-4 overflow-hidden px-8 py-4 relative rounded-full text-white" onClick={()=>setAddress(address)}>
                                Use this address
                            </button>
                        </div>
                    </div>
                })
            )
        }
        </Fragment>
    )
}

export default AddressesList
