import { useContext, useEffect } from "react"
import { MainContext } from "../../contexts/MainContext";
import LeftColumn from "./category/LeftColumn";
import RightColumn from "./category/RightColumn";
import Product from "./Product";
import BreadcrumbList from "../../UIComponents/BreadcrumbList";
import Head from "next/head";

const IndexSlugPage = (props : any) => {
    
    const {setIsLoading} = useContext(MainContext)

    useEffect(() => {
        setIsLoading(false)
    }, [props, setIsLoading])

    return (
        <>
            {
                props.slugRecord!=undefined && props.slugRecord.page_type=='Category_Slug' && (
                    <>
                        <Head>
                            <title>{`${props.slugRecord.view.category.meta_title}`}</title>
                            <meta name='description' content={props.slugRecord.view.category.meta_description} />
                            <meta name='keywords' content={props.slugRecord.view.category.meta_keywords} />
                        </Head>
                        <BreadcrumbList breadcrumbs={props.slugRecord.view.breadcrumbs} />
                        <div className="Categoery-page relative">
                            <div className="category-product-container width mt-14 mb-28 flex flex-col lg:flex-row order-last lg:order-first">
                                {/* left column */}
                                {props.slugRecord.view!=undefined ? <LeftColumn key={0} view={props.slugRecord.view} /> : ''}
                                
                                {/* right column starts here */}
                                {(props.slugRecord.view!=undefined) ? <RightColumn key={1} view={props.slugRecord.view} /> : ''}
                            </div>
                        </div>
                    </>
                )
            }
            {
                props.slugRecord!=undefined && props.slugRecord.page_type=='Product_Slug' && (
                    <Product slug={props.url} view={props.slugRecord.view} />
                )
            }
        </>
    )
}

export default IndexSlugPage