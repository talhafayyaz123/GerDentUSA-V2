import { NextPage } from 'next'
import React, { useContext } from 'react'
import Detail from '../../../components/Dashboard/Orders/Detail'
import DashboardLayout from '../../../components/Layouts/Dashboard'
import { SessionContext } from '../../../contexts/SessionContext'

export const getServerSideProps = (context: any) => {
    return {
        props: {
            order_id: context.params.order
        }
    }
}

const Order:NextPage = ({order_id}: any) => {
    const {session}: any = useContext(SessionContext)
    let statusList = [
        {
            id: 1,
            name: 'Pending'
        },
        {
            id: 2,
            name: 'Processing'
        },
        {
            id: 3,
            name: 'Pending Payment'
        },
        {
            id: 4,
            name: 'Suspected Fraud'
        },
        {
            id: 5,
            name: 'Payment Review'
        },
        {
            id: 6,
            name: 'On Hold'
        },
        {
            id: 7,
            name: 'Complete'
        },
        {
            id: 8,
            name: 'Closed'
        },
        {
            id: 9,
            name: 'Canceled'
        },
    ]
    return (
        <DashboardLayout pageTitle="Order">
            <div className="right-col-wrapper mt-10 lg:mt-0 lg:w-9/12 rounded-lg bg-white pt-0 w-full leading-snug">
				<div className="user-title text-3xl font-bold pb-4 border-b border-dashed border-gray-300">Detail of Orders # {order_id}</div>
            </div>
            {
                session!=undefined && (
                    <Detail customer={session.user} order_id={order_id} statusList={statusList} />
                )
            }
        </DashboardLayout>
    )
}

// Order.getInitialProps = async (context: any) => {
//     let storage: any = await localStorage.getItem('session')
//     let data: any = {customer: storage.user.id, order_id: context.params.order}
//     const order = fetch('/api/order/'+context.params.order, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(response => response.json())
//     .then(data => console.log('there'))
//     return {
//         props: { order: order, storage: storage }
//     }
// }

export default Order
