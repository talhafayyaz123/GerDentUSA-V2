
const getPrice = (product: any) => {
    let price = product.price_catalog
    let discount = 0
    if(product.type != 'variation')
    {
        if(product.price_discounted > 0)
        {
            /*
            let today = new Date()
            let dateTime = today.getTime()

            let discountedStartDate = new Date(product.price_discounted_start)
            let discountedEndDate = new Date(product.price_discounted_end)

            let discountedStartTime = discountedStartDate.getTime()
            let discountedEndTime = discountedEndDate.getTime()

            if(product.price_discounted_start != '' && product.price_discounted_start != null && product.price_discounted_end != '' && product.price_discounted_end != null)
            {
                if(dateTime >= discountedStartTime && dateTime <= discountedEndTime)
                    product.on_sale = true;
            }
            else if(product.price_discounted_start != '' && product.price_discounted_start != null)
            {
                if(dateTime >= discountedStartTime)
                    product.on_sale = true;
            }
            else if(product.price_discounted_end != '' && product.price_discounted_end != null)
            {
                if(dateTime <= discountedEndTime)
                    product.on_sale = true;
            }
            else
            {
                product.on_sale = false;
            }

            if(product.on_sale)
            {
                discount = price - product.price_discounted
                price = product.price_discounted
            }
            */
            discount = price - product.price_discounted
            price = product.price_discounted
        }
    }
    return {
        'price' : price,
        'discount' : discount
    }
}

const addToCart = (product: any, qty: any) => {

    let price_info = getPrice(product)
    let attributes : any = {
        'type': product.type,
        'sku': product.sku,
        'slug': product.slug,
        'image': product.image,
        'weight': product.weight,
        'link': product.slug,
        'discount': price_info.discount,
        'price_catalog': product.price_catalog,
        'price_discounted': product.price_discounted,
        'price_discounted_start': product.price_discounted_start,
        'price_discounted_end': product.price_discounted_end
    }
    let discount =  product.price_discounted
    let discount_condition : any = []
    if(discount > 0)
    {
        discount_condition = {
            'name' : 'Discount of $'+discount,
            'type' : 'sale',
            'value' : '-'+discount,
        };
    }

    let quantity = 1
    if(qty!=0)
    {
        quantity = qty
    }

    let item = {
        'id' : product.id,
        'name' : product.name,
        'price' : price_info.price,
        'quantity' : quantity,
        'bogo_free' : 0,
        'bogod_count' : 0,
        'attributes' : attributes,
        'conditions' : discount_condition
    }

    return item
}

const addToCartProcess = (product: any, qty: number, type: any) => {

    let cartItems: any = localStorage.getItem('cart')
    if(cartItems!=null) // When any product exist in cart
    {
        cartItems = JSON.parse(cartItems)
        let selectedCart = cartItems.filter((cartItem: any) => (cartItem.id==product.id)) // Finding product exist in cart
        if(selectedCart.length==0) // if product not exist in cart then add product in cart
        {
            let item = addToCart(product, qty)
            cartItems.push(item)
        }
        else  // if product exist in cart then update quantity in cart
        {
            cartItems.map((cartItem: any, index: any) => {
                if(cartItem.id==product.id && type=='add')
                {
                    cartItem.quantity = Number(cartItem.quantity) + Number(qty)
                }
                else if(cartItem.id==product.id && type=='sub')
                {
                    cartItem.quantity = Number(cartItem.quantity) - Number(qty)
                }
                else if(cartItem.id==product.id && type=='change')
                {
                    cartItem.quantity = Number(qty)
                }

                // when item has 0 quantity then remove item
                if(cartItem.quantity==0)
                {
                    cartItems.splice(index, 1)
                }
            })
        }
        localStorage.setItem('cart',JSON.stringify(cartItems))
    }
    else // When first product adding in cart
    {
        let item = addToCart(product, qty)
        let cart = []
        cart.push(item)
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    cartTotalCounts()
}

const cartTotalCounts = () => {
    let cart: any = localStorage.getItem('cart')
    if(cart!=null)
    {
        let cartItems = JSON.parse(cart)
        let shipping: number = 0
        let shippingStorage: any = localStorage.getItem('shipping')
        shippingStorage = JSON.parse(shippingStorage)
        if(shippingStorage!=null && shippingStorage.shipping_method!=undefined)
        {
            shipping = shippingStorage.shipping_method.rate
        }

        let subTotal = 0
        let discount = 0
        let cartCounts = {}
        if(cartItems.length > 0){
            cartItems.map((cartItem: any) => {
                subTotal += cartItem.quantity * cartItem.price
            })
            let coupon_data: any = localStorage.getItem('ses_coupon')
            
            if(coupon_data!=null)
            {
                coupon_data = JSON.parse(coupon_data)
                if(coupon_data.type=='percent')
                {
                    discount = subTotal * (coupon_data.value)/100
                }
                else
                {
                    discount = subTotal - coupon_data.value
                }
            }
            subTotal = Number(subTotal)
            let total: any = ( Number(subTotal) - discount ) + Number(shipping)
            cartCounts = {
                'subTotal': Number(subTotal).toFixed(2),
                'discount': Number(discount).toFixed(2),
                'shipping': Number(shipping).toFixed(2),
                'total': Number(total).toFixed(2)
            }
        }
        else
        {
            cartCounts = {
                'subTotal': 0.00,
                'discount': 0.00,
                'shipping': 0.00,
                'total': 0.00
            }
        }
        localStorage.setItem('cartTotalCounts',JSON.stringify(cartCounts))
    }
    else
    {
        let cartCounts = {
            'subTotal': 0.00,
            'discount': 0.00,
            'shipping': 0.00,
            'total': 0.00
        }
        localStorage.setItem('cartTotalCounts', JSON.stringify(cartCounts))
    }
}

export {addToCartProcess, cartTotalCounts}