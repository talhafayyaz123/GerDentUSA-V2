import { useContext, useEffect, useState } from "react"
import { SITE_URL } from "../../../lib/constants"
import Link from "next/link"
import { DashboardContext } from "../../../contexts/Dashboard"

const OrdersList = (props: any) => {
    
    const [orders, setOrders] = useState([])
    const {setDashboardLoading} = useContext(DashboardContext)
    let statuses = [
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

    useEffect(() => {
        const getOrders = async () => {
            let data: any = {
                customer: {id: props.customer.id}
            }
            let res: any = await fetch(`${SITE_URL}api/dashboard/orders`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(respose => { return respose.json() })
            setOrders(res.orders.data)
            setDashboardLoading(false)
        }
        getOrders()
    }, [props.customer.id, setDashboardLoading])

    return (
        <div className="table-heading-container">
            {
                orders.length==0 ? (
                    <div><strong>Sorry!</strong>, no orders found.</div>
                ) : (
                    <>
                    <div className="table-heading-wrapper grid grid-cols-7 lg:grid-cols-8 bg-gray-100 p-4 rounded-lg border-b border-solid border-gray-300">
                        <div className="table-heading">ID</div>
                        <div className="table-heading col-span-2 lg:col-span-3">Ship To Name</div>
                        <div className="table-heading text-center">Amount</div>
                        <div className="table-heading text-center col-span-2">Purchase Date</div>
                        <div className="table-heading text-center">Status</div>
                    </div>
                    {
                        orders.map((order: any, index: any) => {
                            return (
                                <div key={index} className="db-detail-wrapper text-gray-600 text-sm">
                                    <Link href={`/dashboard/orders/${order.id}`}>
                                        <a className="db-detail grid grid-cols-7 lg:grid-cols-8 mt-5 p-4 rounded-lg bg-white border border-solid border-gray-300 db-links">
                                            <div id="product-id">{order.id}</div>
                                            <div id="user-provided-name" className="col-span-2 lg:col-span-3">{`${order.first_name} ${order.last_name}`}</div>
                                            <div className="text-center">$<span id="user-order-amount">{order.grand_total}</span></div>
                                            <div id="purchased-date" className="col-span-2 text-center">{order.created_at}</div>
                                            <div id="status" className="text-center">
                                                {
                                                    statuses.filter((status:any) => status.id===order.order_status )[0].name
                                                }
                                            </div>
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
export default OrdersList