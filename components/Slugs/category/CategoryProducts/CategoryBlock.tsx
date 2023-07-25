import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BASE_URL } from '../../../../lib/constants'

const CategoryBlock = (props: any) => {
    return (
        <Link href={`/${props.family_category.slug}`}>
            <a className="featured-product relative shadow-lg rounded-lg bg-white flex flex-col p-4 cursor-pointer" onClick={()=>props.setIsLoading(true)}>
                <div className="featured-products-img-wrapper flex justify-center featured-product-img">
                    <Image layout="fixed" width={200} height={200} src={`${BASE_URL}up_data/categories/large/${props.family_category.image}`} blurDataURL={`${BASE_URL}up_data/categories/large/${props.family_category.image}`} alt={props.family_category.name} placeholder="blur" lazyBoundary="400px" />
                </div>
                <div className="feature-product-detail-wrapper">
                    <div className="product-description leading-snug mt-4 text-center">
                        {props.family_category.name}
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default CategoryBlock
