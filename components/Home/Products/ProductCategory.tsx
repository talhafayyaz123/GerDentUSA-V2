import React from 'react'
import Link from 'next/link'

const ProductCategory = (props: any) => {
    return (
        <>
            <Link href={'/'+props.product_categorie.slug}>
                <a className="ml-2 primary-blue-color">
                    {props.product_categorie.name}
                </a> 
            </Link> ,
        </>
    )
}

export default ProductCategory