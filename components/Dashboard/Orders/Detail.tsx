import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { DashboardContext } from '../../../contexts/Dashboard'
import { ImagePath, SITE_URL } from '../../../lib/constants'

const Detail = (props: any) => {

    const [order, setOrder] = useState<any>({})
    const [notifications, setNotifications] = useState<any>([])
    const {setDashboardLoading} = useContext(DashboardContext)

    let Months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]


    useEffect(() => {
        const getOrder = async () => {
            let data: any = {
                customer: {id: props.customer.id}
            }
            let res: any = await fetch(`${SITE_URL}api/dashboard/orders/${props.order_id}`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(respose => { return respose.json() })
            let result: any = {
                ...res.order,
                ...res.order_date
            }
            setOrder(result)
            setNotifications(res.notifications)
            setDashboardLoading(false)
        }
        getOrder()
    }, [setDashboardLoading])

    return (
        <>
        <div className="mt-5 font-semibold w-full">
            <div className="order-detail-container w-full">
                <div className="flex flex-col border border-solid border-gray-300 rounded-lg w-full">
                    <div className="p-4 bg-gray-100 rounded-t-lg border-b border-solid border-gray-300">Basic Details</div>
                    <div className="basic-detail-wrapper m-2 sm:m-6 rounded-lg border border-solid border-gray-300">
                        <div className="w-full flex flex-row items-center text-left border-b border-solid border-gray-300 text-sm sm:text-base">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Order ID:</div>
                            <div className="p-2 sm:p-3 user-order-id w-8/12 sm:w-9/12 text-gray-600">{props.order_id}</div>
                        </div>
                        <div className="w-full flex flex-row items-center text-left border-b border-solid border-gray-300 text-sm sm:text-base bg-gray-100">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Order Date:</div>
                            <div className="p-2 sm:p-3 user-order-date w-8/12 sm:w-9/12 text-gray-600">{order.time} ({order.duration})</div>
                        </div>
                        <div className="w-full flex flex-row items-center text-left border-b border-solid border-gray-300 text-sm sm:text-base">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Order Status:</div>
                            <div className="p-2 sm:p-3 user-order-status w-8/12 sm:w-9/12 text-gray-600">{Object.keys(order).length > 0 && props.statusList.filter((status:any) => status.id===order.order_status )[0].name}</div>
                        </div>
                        <div className="w-full flex flex-row items-center text-left text-sm sm:text-base bg-gray-100 rounded-b-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Tracking ID:</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.ups_tracking_id}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5 font-semibold w-full">
            <div className="order-list-container w-full">
                <div className="flex flex-col border border-solid border-gray-300 rounded-lg w-full">
                    <div className="p-4 bg-gray-100 rounded-t-lg border-b border-solid border-gray-300">List of Ordered Items</div>
                    <div className="order-list-outer-wrapper overflow-scroll lg:overflow-hidden">
                        <div className="order-list-wrapper m-6 rounded-lg border border-solid border-gray-300">
                            <div className="cart-detail-wrapper">
                                <div className="grid grid-cols-7 w-full bg-gray-100 p-4 rounded-lg font-bold border-b border-solid border-gray-300 gap-x-2 md:gap-x-4">
                                    <div className="col-span-1 text-center">Image</div>
                                    <div className="col-start-2 col-end-5 text-center">Product</div>
                                    <div className="col-span-1 text-center">Price</div>
                                    <div className="col-span-1 text-center">Quantity</div>
                                    <div className="col-span-1 text-center">Total</div>
                                </div>
                                {
                                    order.items!=undefined &&
                                    order.items.map((item: any, index: any) => {
                                        return (<div key={index} className="grid grid-cols-7 w-full p-4 rounded-lg items-center gap-x-2 md:gap-x-4">
                                            <div className="col-span-1 cart-product-img-wrapper flex justify-center border-gray-300 border-solid border rounded-lg w-full h-full">
                                                <img className="w-full lg:w-10/12 p-2 lg:p-0" src={`${ImagePath + item.cf_image_id}/medium`} alt={item.name} />
                                            </div>
                                            <Link href={`/${item.slug}`}>
                                                <a className="cart-product-detail flex flex-col justify-center col-start-2 col-end-5 border-gray-300 border-solid border rounded-lg w-full h-full p-2">
                                                    <span className="leading-normal font-semibold">{item.name}</span>
                                                    <span className="cart-produ ct-sku mt-2 text-gray-600 text-sm dark-blue-color">{item.sku}</span>
                                                </a>
                                            </Link>
                                            <div className="cart-product-price font-semibold border-gray-300 border-solid border rounded-lg w-full h-full flex flex-col justify-center items-center overflow-hidden p-1">
                                                <div className='text-gray-400 text-xs'> <del>${item.price_original}</del> </div>
                                                <div className='mt-1.5'>${item.price}</div>
                                            </div>
                                            <div className="cart-quantity-wrapper border-gray-300 border-solid border rounded-lg w-full h-full flex justify-center items-center overflow-hidden w-full h-full">{item.quantity}</div>
                                            <div className="cart-total font-semibold border-gray-300 border-solid border rounded-lg w-full h-full flex justify-center items-center overflow-hidden">${item.price * item.quantity}</div>
                                        </div>)
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div className="cart-total-wrapper border-t border-solid border-gray-300 w-full rounded-lg text-sm sm:text-base">
                        <div className="subtotal flex w-full bg-gray-100 rounded-lg border-b border-solid border-gray-300">
                            <div className="w-6/12 text-center p-2 sm:p-3 border-r border-solid border-gray-300">Sub Total</div>
                            <div className="w-6/12 text-center p-2 sm:p-3 text-gray-600">${order.sub_total}</div>
                        </div>
                        <div className="shipping-wrapper flex items-center w-full bg-white rounded-lg border-b border-solid border-gray-300">
                            <div className="w-6/12 text-center p-2 sm:p-3 border-r border-solid border-gray-300">Shiping Fee</div>
                            <div className="w-6/12 text-center text-gray-600">({order.shipping_service}) ${order.shipping_fee}</div>
                        </div>
                        <div className="grandtotal flex items-center w-full bg-gray-100 rounded-lg">
                            <div className="w-6/12 text-center p-2 sm:p-3 border-r border-solid border-gray-300">Grand Total</div>
                            <div className="w-6/12 text-center text-gray-600">${order.grand_total}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5 font-semibold w-full">
            <div className="shipping-detail-container w-full">
                <div className="flex flex-col border border-solid border-gray-300 rounded-lg w-full">
                    <div className="p-4 bg-gray-100 rounded-t-lg border-b border-solid border-gray-300">Shipping Details</div>
                    <div className="shipping-detail-wrapper m-2 sm:m-6 rounded-lg border border-solid border-gray-300 text-sm sm:text-base">
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-b-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Customer Name</div>
                            <div className="p-2 sm:p-3 user-order-id w-8/12 sm:w-9/12 text-gray-600">{order.first_name} {order.last_name}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 bg-gray-100 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Email Address</div>
                            <div className="p-2 sm:p-3 user-order-date w-8/12 sm:w-9/12 text-gray-600">{order.email}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Ship to Name</div>
                            <div className="p-2 sm:p-3 user-order-status w-8/12 sm:w-9/12 text-gray-600">{order.first_name} {order.last_name}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 bg-gray-100 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Company</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.company ? order.company : 'N/A'}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Address Line 1</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.address1}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 bg-gray-100 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Address Line 2</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.address2 ? order.address2 : 'N/A'}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">City</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.city}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 bg-gray-100 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">ZIP / Postal Code</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.zip_code}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">State</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.state_name}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 bg-gray-100 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Country</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.country_name}</div>
                        </div>
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Phone</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.phone ? order.phone : 'N/A'}</div>
                        </div>
                        <div className="w-full flex items-center text-left bg-gray-100 rounded-lg">
                            <div className="p-2 sm:p-3 w-4/12 sm:w-3/12 border-r border-solid border-gray-300">Notes</div>
                            <div className="p-2 sm:p-3 tracking-id w-8/12 sm:w-9/12 text-gray-600">{order.notes ? order.notes : 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5 font-semibold w-full">
            <div className="payment-detail-container w-full">
                <div className="flex flex-col border border-solid border-gray-300 rounded-lg w-full">
                    <div className="p-4 bg-gray-100 rounded-t-lg border-b border-solid border-gray-300">Payment Details</div>
                    <div className="payment-detail-wrapper m-2 sm:m-6 rounded-lg border border-solid border-gray-300 text-sm sm:text-base">
                        <div className="w-full flex items-center text-left border-b border-solid border-gray-300 rounded-b-lg">
                            <div className="p-2 sm:p-3 w-5/12 sm:w-3/12 border-r border-solid border-gray-300">Transaction ID</div>
                            <div className="p-2 sm:p-3 user-order-id w-7/12 sm:w-9/12 text-gray-600">{order.transaction_id}</div>
                        </div>
                        <div className="w-full flex items-center text-left rounded-b-lg bg-gray-100">
                            <div className="p-2 sm:p-3 w-5/12 sm:w-3/12 border-r border-solid border-gray-300">Card Number</div>
                            <div className="p-2 sm:p-3 user-order-id w-7/12 sm:w-9/12 text-gray-600">{order.card_number} - <em><strong>{order.card_type}</strong></em></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-5 font-semibold w-full">
            <div className="order-status-detail-container w-full">
                <div className="flex flex-col border border-solid border-gray-300 rounded-lg w-full font-normal leading-snug">
                    <div className="p-4 bg-gray-100 rounded-t-lg border-b border-solid border-gray-300">Order Status Details</div>
                    <div className="order-detail-outer-wrapper overflow-x-scroll sm:overflow-x-hidden">
                        <div className="order-status-detail-wrapper m-2 sm:m-6 rounded-lg border border-solid border-gray-300 text-sm sm:text-base">
                            <div className='grid grid-cols-5'>
                            <div className="heading border-r border-b border-solid border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold rounded-l-lg">Subject</div>
                            <div className="heading border-r border-b border-solid border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold col-span-2">Message</div>
                            <div className="heading border-r border-b border-solid border-gray-300 p-2 sm:p-3 bg-gray-100 font-semibold text-center">Status</div>
                            <div className="heading p-2 sm:p-3 border-b border-solid border-gray-300 bg-gray-100 font-semibold rounded-r-lg text-center">Date</div>
                            </div>
                            {
                                notifications.map((notify: any, index: any) => {
                                    let timeAr = notify.created_at.split(' ')
                                    let date = timeAr[0].split('-')
                                    let nowTime = new Date().getTime()
                                    let time = new Date(notify.created_at).getTime()
                                    let timePass: any = ((nowTime - time) / (1000 * 60 * 60 * 24 * 30))
                                    timePass = parseInt(timePass)

                                    return (
                                        <div key={index} className={`grid grid-cols-5 ${index%2 == 1 ? 'font-semibold border-gray-300 border-t bg-gray-100 rounded-l-lg rounded-r-lg' : ''}`}>
                                            <div className={`p-2 sm:p-3 text-gray-600 border-r border-solid border-gray-300`}>{notify.subject}</div>
                                            <div className="p-2 sm:p-3 text-gray-600 border-r border-solid border-gray-300 col-span-2">{notify.message}</div>
                                            <div className="p-2 sm:p-3 text-gray-600 border-r border-solid border-gray-300 text-center">{props.statusList.filter((status:any) => status.id===notify.order_status )[0].name}</div>
                                            <div className="p-2 sm:p-3 text-gray-600 border-r border-solid flex flex-col text-center">
                                                <span className="order-date">{Months[Number(date[1]-1)]} {`${date[2]}, ${date[0]}`}</span>
                                                <span className="order-time mt-1">{timeAr[1]}</span>
                                                <span className="order-time-passed mt-1">({timePass} month ago)</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Detail
