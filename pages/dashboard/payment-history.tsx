import { NextPage } from 'next'
import React, { useContext } from 'react'
import PaymentHistoryList from '../../components/Dashboard/PaymentHistoryList'
import DashboardLayout from '../../components/Layouts/Dashboard'
import { SessionContext } from '../../contexts/SessionContext'

const PaymentHistory:NextPage = () => {

    const {session}: any = useContext(SessionContext)

    return (
        <DashboardLayout pageTitle="Payment History">
            <div className="user-title text-3xl font-bold pb-4 border-b border-dashed border-gray-300">Payment History</div>
            <div className="mt-5 font-semibold w-full overflow-x-scroll lg:overflow-hidden">
                {
                    session!=undefined && (
                        <PaymentHistoryList customer={session.user} />
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default PaymentHistory