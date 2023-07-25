import React, { useContext } from 'react'
import Link from "next/link";
import { BASE_URL } from "../../lib/constants"
import { MainContext } from '../../contexts/MainContext';
import Image from 'next/dist/client/image';

const ProductCarousel = (props: any) => {

    const {setIsLoading} = useContext(MainContext)

    return (
        <div className="mr-4">
            <div className="related-product-wrapper bg-gray-100 p-4 rounded-lg w-full h-full">
                <div className="related-product-img rounded-lg w-full">
                    <Link href={`/${props.recommended_products.slug}`}>
                        <a onClick={()=>setIsLoading(true)}>
                            <Image layout="responsive" width={263} height={263}
                                className="related-product-img rounded-lg w-full"
                                src={`${BASE_URL}${props.recommended_products.image != null ? 'up_data/products/images/thumbnails/' + props.recommended_products.image : 'img/image.jpg'}`}
                                blurDataURL={`${BASE_URL}${props.recommended_products.image != null ? 'up_data/products/images/thumbnails/' + props.recommended_products.image : 'img/image.jpg'}`}
                                alt={props.recommended_products.name} lazyBoundary="400px"
                            />
                        </a>
                    </Link>
                </div>
                <div className="related-product-detail-wrapper">
                    <Link href={`/${props.recommended_products.slug}`}>
                        <a onClick={()=>setIsLoading(true)} >
                            <div className="related-product-detail dark-blue-color text-sm mt-2">
                                {props.recommended_products.name}
                            </div>
                            {(props.recommended_products.price_discounted != null && props.recommended_products.price_discounted != 0) ?
                                (<>
                                    <div className="related-product-price mt-2 font-bold">${props.recommended_products.price_discounted}</div>
                                    <div className="related-product-price mt-2 font-bold old-price text-xs text-red-400 line-through">${props.recommended_products.price_catalog}</div>
                                </>
                                ) :
                                (
                                    <div className="related-product-price mt-2 font-bold">${props.recommended_products.price_catalog}</div>
                                )
                            }
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCarousel