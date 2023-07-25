import React from 'react'
import Product from './Home/Products/Product'

const Search = (props: any) => {

    return (
        <div className="featured-products-imgs-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 w-full gap-4">
        {
            props.products!=undefined && (
                props.products.data.map((product : any, index : any) => {
                    return (<Product key={index} product={product} imageType='medium'  />)
                })
            )
        }
        </div>
    )
}

export default Search
