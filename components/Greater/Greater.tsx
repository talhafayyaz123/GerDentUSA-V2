import React from 'react'
import Product from '../Home/Products/Product'

const Greater = (props: any) => {
    return (
        <section className="equine-types relative h-full block">
            <div className="equine-type-wrapper w-full">
                <div id="equine-dental-elevators" className="equine-type-title bg-gray-100 py-3 font-semibold text-3xl">
                    <h2 className="width" dangerouslySetInnerHTML={{__html: props.show_product}}></h2>
                </div>
                <div className="equine-type-products grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 lg:gap-6 width py-10">
                    {props.products.map((product : any) => (
                        <Product key={product.id} product={product} />
                    ))}
                    {/* <Product /> */}
                </div>
            </div>
        </section>
    )
}

export default Greater