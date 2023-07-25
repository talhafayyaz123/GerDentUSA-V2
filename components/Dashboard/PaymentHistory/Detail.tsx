import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { DashboardContext } from '../../../contexts/Dashboard'
import { SITE_URL } from '../../../lib/constants'

const PaymentHistoryDetail = (props: any) => {

    const [history, setHistory] = useState<any>({})
    const {setDashboardLoading} = useContext(DashboardContext)
    useEffect(() => {
        const getHistory = async () => {
            let data: any = {
                customer: {id: props.customer.id}
            }
            let res: any = await fetch(`${SITE_URL}api/dashboard/payment-history/${props.payment_history_id}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(respose => { return respose.json() })
            setHistory(res)
            setDashboardLoading(false)
        }
        getHistory()
    }, [setDashboardLoading])

    return (
        <div className="flex flex-col rounded-lg w-full">
            <div className="mt-2 sm:mt-6 rounded-lg border border-solid border-gray-300 text-sm sm:text-base">
                <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-b-lg">
                    <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Title</div>
                    <Link href={`${history.link}`}>
                        <a className="p-2 sm:p-3 user-order-id w-8/12 sm:w-9/12 text-gray-600">{history.payment!=undefined && history.payment.title}</a>
                    </Link>
                </div>
                <div className="w-full flex items-center text-left border-b border-solid border-gray-300 bg-gray-100 rounded-lg">
                    <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Amount</div>
                    <div className="p-2 sm:p-3 user-order-date w-8/12 sm:w-9/12 text-gray-600">{history.payment!=undefined && history.payment.amount}</div>
                </div>
                <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-lg">
                    <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Card Number</div>
                    <div className="p-2 sm:p-3 user-order-status w-8/12 sm:w-9/12 text-gray-600">{history.payment!=undefined && history.payment.card_number}</div>
                </div>
                <div className="w-full flex items-center text-left border-b border-solid border-gray-300 bg-gray-100 rounded-lg">
                    <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Transaction ID</div>
                    <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{history.payment!=undefined && history.payment.transaction_id}</div>
                </div>
                <div className="w-full flex items-center text-left rounded-lg">
                    <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">View Receipt</div>
                    <Link href={`/${history.payment!=undefined && history.payment.receipt_url}`}>
                        <a className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">Click here to View</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistoryDetail
