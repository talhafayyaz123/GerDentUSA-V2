import React, { useContext } from 'react'
import PaymentHistoryDetail from '../../../components/Dashboard/PaymentHistory/Detail'
import DashboardLayout from '../../../components/Layouts/Dashboard'
import { SessionContext } from '../../../contexts/SessionContext'

export const getServerSideProps = (context: any) => {
    return {
        props: {
            payment_history_id: context.params.payment_history_id
        }
    }
}

const SinglePamentHistory = ({payment_history_id}: any) => {

    const {session}: any = useContext(SessionContext)
    
    return (
        <DashboardLayout pageTitle="Payment">
            <div className="right-col-wrapper mt-10 lg:mt-0 lg:w-9/12 rounded-lg bg-white pt-0 w-full leading-snug">
				<div className="user-title text-3xl font-bold pb-4 border-b border-dashed border-gray-300">Payment Detail</div>
            </div>
            {
                session!=undefined && (
                    <PaymentHistoryDetail payment_history_id={payment_history_id} customer={session.user} />
                )
            }
        </DashboardLayout>
    )
}

export default SinglePamentHistory
