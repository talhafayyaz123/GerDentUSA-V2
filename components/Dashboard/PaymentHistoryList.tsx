import React, { useContext, useEffect, useState } from 'react'
import { SITE_URL } from '../../lib/constants'
import Link from 'next/link'
import { DashboardContext } from '../../contexts/Dashboard'

const PaymentHistoryList = (props: any) => {

    const [PaymentList, setPaymentList] = useState([])
    const {setDashboardLoading} = useContext(DashboardContext)
    useEffect(() => {
        const getPayments = async () => {
            let data: any = {
                customer: {id: props.customer.id}
            }
            let res: any = await fetch(`${SITE_URL}api/dashboard/payment-history`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(respose => { return respose.json() })
            setPaymentList(res.payments.data)
            setDashboardLoading(false)
        }
        getPayments()
    }, [props.customer.id, setDashboardLoading])

    return (
        <div className="table-heading-container">
            {
                PaymentList.length==0 ? (
                    <div><strong>Sorry!</strong>, no payments found.</div>
                ) : (
                    <>
                    <div className="table-heading-wrapper grid grid-cols-5 lg:grid-cols-6 bg-gray-100 p-4 rounded-lg border-b border-solid border-gray-300">
                        <div className="table-heading col-span-2 lg:col-span-3">Ship To Name</div>
                        <div className="table-heading text-center">Amount</div>
                        <div className="table-heading text-center col-span-2">Purchase Date</div>
                    </div>
                    {
                        PaymentList.map((payment: any, index: any) => {
                            return (
                                <div key={index} className="db-detail-wrapper text-gray-600 text-sm">
                                    <Link href={`/dashboard/payment-history/${payment.id}`}>
                                        <a className="db-detail grid grid-cols-5 lg:grid-cols-6 mt-5 p-4 rounded-lg bg-white border border-solid border-gray-300 db-links">
                                            <div id="user-provided-name" className="col-span-2 lg:col-span-3">{payment.title}</div>
                                            <div className="text-center">$<span id="user-order-amount">${payment.amount}</span></div>
                                            <div id="purchased-date" className="col-span-2 text-center">{payment.updated_at}</div>
                                        </a>
                                    </Link>
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

export default PaymentHistoryList
