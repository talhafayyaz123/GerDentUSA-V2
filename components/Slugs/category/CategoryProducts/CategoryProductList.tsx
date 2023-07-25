import { useContext, useEffect } from "react"
import { BASE_URL, ImagePath, SITE_URL } from "../../../../lib/constants"
import CategoryProduct from "./CategoryProduct"
import { MainContext } from "../../../../contexts/MainContext"
import Image from "next/dist/client/image"
import Link from "next/link"

const CategoryProductList = (props : any) => {

    const {setIsLoading} = useContext(MainContext)

    return (
        <div className="category-products-list border border-solid border-gray-300 w-full p-2 sm:p-6 mt-4 rounded-lg flex flex-col sm:flex-row items-center sm:items-start">
            <div className="category-product-thumbnail-wrapper w-3/6 sm:w-2/6 lg:w-1/6">
                <div className="category-product-thumbnail">
                    <Image layout="responsive" width={200} height={200} className="category-product-thumbnail" lazyBoundary="400px" 
                    src={
                        props.family_category.image != null ? 
                        `${BASE_URL}up_data/categories/large/${props.family_category.image}` : 
                        (
                            props.family_category.products.length >0 && props.family_category.products[0].files.length>0 ? 
                                ImagePath + props.family_category.products[0].files[0].cf_image_id + '/thumbnail' : 
                                `/assets/img/thumbnail-no-img.jpg`
                        )
                    } 
                    alt={props.family_category.name} />
                </div>
            </div>
            <div className="catogery-products-container w-full sm:w-5/6 sm:ml-4">
                <Link href={`/${props.family_category.slug}`}>
                    <a className="category-products font-semibold primary-blue-color mb-4 block cursor-pointer pl-2" onClick={()=>setIsLoading(true)}>
                        {props.family_category.name}
                    </a>
                </Link>
                { props.family_category.products.length!=0 ? (
                        props.family_category.products.map((product: any, index: any) => {
                            return (
                                <CategoryProduct key={index} product={product} />
                            )
                        })
                    ) : ''
                }
            </div>
        </div>
    )
}

export default CategoryProductList