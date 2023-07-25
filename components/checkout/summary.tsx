
const CheckoutSummary = (props: any) => {
    return (
        <>
        {
            props.cartItems.length > 0 && (
                props.cartItems.map((cartItems: any, index: any) => {
                    return (<div key={index} className="order-review-product-detail-wrapper flex justify-between items-center border-b border-solid border-gray-300">
                        <div className="ordered-product-title mt-4 font-semibold w-9/12 leading-normal">
                            {cartItems.name}
                            <div className="ordered-product-sku mt-4 dark-blue-color pb-4 font-normal">{cartItems.attributes.sku} (<span className="ordered-quantity">{cartItems.quantity}</span>)</div>
                        </div>
                        <div className="ordered-product-price font-semibold">
                            ${Number(cartItems.price).toFixed(2)}
                        </div>
                    </div>)
                })
            )
        }
        <div className="flex justify-between mt-4 pb-4 border-b border-solid border-gray-300">
            <span>Sub Total</span>
            <span className="order-sub-total">${props.cartTotals.subTotal != undefined ? props.cartTotals.subTotal : 0}</span>
        </div>
        <div className="flex justify-between mt-4 pb-4 border-b border-solid border-gray-300">
            <span>Discount</span>
            <span className="order-discount">${props.cartTotals.discount != undefined ? props.cartTotals.discount : 0}</span>
        </div>
        <div className="flex justify-between mt-4 pb-4 border-b border-solid border-gray-300">
            <span>Shipping Fee</span>
            <span className="order-shipping-cost">${props.cartTotals.shipping != undefined ? props.cartTotals.shipping : 0}</span>
        </div>
        <div className="flex justify-between mt-4 pb-4 font-bold">
            <span>Total</span>
            <span className="order-total">${props.cartTotals.total != undefined ? props.cartTotals.total : 0}</span>
        </div>
        </>
    )
}

export default CheckoutSummary