import { ImagePath } from "../../../../lib/constants"
import { MainContext } from "../../../../contexts/MainContext"
import { useContext } from "react"
import Image from "next/dist/client/image"
import Link from "next/link"

const CategoryProduct = (props: any) => {

    const {setIsLoading} = useContext(MainContext)
    let image = props.product.files.length > 0 ? (ImagePath + props.product.files[0].cf_image_id + '/thumbnail') : '/assets/img/thumbnail-no-img.jpg'

    return (
        <Link href={`/${props.product.slug}`}>
            <a className="category-product-detail relative flex border-t border-solid border-gray-300 justify-between items-center p-3 w-full text-sm cursor-pointer" onClick={()=>setIsLoading(true)}>
                <div className="category-product-img absolute top-0 left-0 z-10 shadow-lg rounded-lg w-3/12">
                    <Image layout="responsive" width={198} height={198} className="rounded-lg" src={image} alt={props.product.files.length > 0 ? props.product.name : ''} lazyBoundary="400px" />
                </div>
                <div className="category-product-detail-wrapper flex items-center pr-2 w-full">
                    <span className="sku">{props.product.sku}</span>
                    <span className="category-product-title w-full ml-2">
                        {props.product.name}
                    </span>
                </div>
                <span className="price text-sm ml-2">${ props.product.price_discounted==0 ? props.product.price_catalog : props.product.price_catalog - props.product.price_discounted}</span>
            </a>
        </Link>
    )
}

export default CategoryProduct