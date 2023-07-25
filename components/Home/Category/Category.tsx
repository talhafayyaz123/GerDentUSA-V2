import React, { useContext } from "react";
import Link from "next/link";
import { BASE_URL } from "../../../lib/constants";
import { MainContext } from "../../../contexts/MainContext";
import Image from "next/dist/client/image";

const Category = ( props : any) => {

    const {
        setIsLoading,
    } = useContext(MainContext)

    return (
        <Link href={`/${props.category.slug}`}>
            <a className="featured-category relative flex flex-col items-center justify-center mt-8 cursor-pointer" onClick={()=>setIsLoading(true)} >
                <div className="relative featured-category-img-wrapper p-2 border border-solid border-gray-200 p-4 rounded-full overflow:hidden">
                    <div className="rounded-full featured-img absolute">
                        <Image layout="responsive" width={'151px'} height={'151px'}
                            src={`${BASE_URL}${props.category.image!=null ? 'up_data/categories/thumbnails/'+props.category.image : 'img/image.jpg'}`}
                            sizes="150px"
                            alt={props.category.name}
                        />
                    </div>
                </div>
                <div className="featured-detail mt-4 text-black text-base text-center">
                    {props.category.name}
                </div>
            </a>
        </Link>
    );
}

export default Category