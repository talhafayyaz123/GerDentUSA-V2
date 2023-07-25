import { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import AddressesList from '../../components/Dashboard/Addresses'
import CreateAddress from '../../components/Dashboard/Addresses/create'
import DashboardLayout from '../../components/Layouts/Dashboard'
import { CustomerAddressProvider } from '../../contexts/CustomerAddressesContext'
import { SessionContext } from '../../contexts/SessionContext'

const Addresses:NextPage = () => {

    const {session}: any = useContext(SessionContext)

    const [isCreateAddress, setIsCreateAddress] = useState(false)

    useEffect(() => {
        
    }, [])

    return (
        <DashboardLayout pageTitle="Addresses">
            <CustomerAddressProvider>
                <div className="user-title text-3xl font-bold pb-4 border-b border-dashed border-gray-300">My Addresses</div>
                <div className="mt-5 font-semibold w-full overflow-x-scroll lg:overflow-hidden">
                    {
                        isCreateAddress ? <CreateAddress customer={session.user} setIsCreateAddress={setIsCreateAddress} /> : (
                            <>
                                <a id="create-address" className="text-white w-max" onClick={()=>setIsCreateAddress(true)}>
                                    <button className="flex items-center relative overflow-hidden px-5 py-3 pl-4 mb-6 rounded-full dark-blue-bg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Create Address
                                    </button>
                                </a>
                                {
                                    session!=undefined && (
                                        <AddressesList customer={session.user} setIsCreateAddress={setIsCreateAddress} />
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </CustomerAddressProvider>
        </DashboardLayout>
    )
}

export default Addresses
