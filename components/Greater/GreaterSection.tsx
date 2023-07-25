import React from 'react'
import Greater from './Greater'

const GreaterSection = (props: any) => {
    
    return (
        <>
        {
            props.shows.show_products != undefined && 
            (Object.keys(props.shows.show_products)).map((show_product : any, index: any) => {
                return (<Greater show_product={show_product} key={index} products={props.shows.products[index]} />)
            })
        }
        </>
    )
    
}

export default GreaterSection
