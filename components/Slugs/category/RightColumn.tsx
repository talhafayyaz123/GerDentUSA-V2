import { useContext, useEffect } from "react"
import { MainContext } from "../../../contexts/MainContext"
import { SlugContext } from "../../../contexts/SlugContext"
import Product from "../../Home/Products/Product"
import CategoryBlock from "./CategoryProducts/CategoryBlock"
import CategoryProductList from "./CategoryProducts/CategoryProductList"
import styles from "./Category.module.css"

const RightColumn = (props: any) => {

    const {selectedCategories} : any = useContext(SlugContext)
    
    const {setIsLoading} = useContext(MainContext)
    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading])
    
    return (
        <div className="category-right-column lg:ml-10 lg:w-10/12 order-first lg:order-last">
            <h2 className="category-products-title text-3xl font-bold">
                {props.view.category.name}
            </h2>
            <div className={`category-description my-4 text-gray-600 leading-normal ${styles.catDesc}`} dangerouslySetInnerHTML={{ __html: props.view.category.description }}></div>

            {
                props.view.category_type=='Shop_Categories' && props.view.categories[0].products.length>0 ?
                (
                    selectedCategories.length!=0 ?
                    (
                        props.view.categories.filter((family_category: any) => selectedCategories.find((e : any) => e === family_category.id)).map((family_category : any) => {
                            return (<CategoryProductList key={family_category.id} family_category={family_category}  />)
                        })
                    ) : (
                        props.view.categories.map((family_category : any) => {
                            return (<CategoryProductList key={family_category.id} family_category={family_category}  />)
                        })
                    )
                ) : ''
            }
            {
                props.view.category_type=='Shop_Categories' && props.view.categories[0].products.length==0 ? (
                    <div className="featured-products-imgs-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 w-full gap-4">
                    {
                        props.view.categories.map((family_category : any) => {
                            return (<CategoryBlock key={family_category.id} family_category={family_category} setIsLoading={setIsLoading}  />)
                        })
                    }
                    </div>
                ) : ''
            }

            {
                props.view.category_type=='Shop_List' ?
                (
                    <div className="category-products-list-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10 w-full gap-4">
                    {
                        props.view.products.data.map((product : any, index : any) => {
                            return (<Product key={index} product={product}  />)
                        })
                    }
                    </div>
                ) : ''
            }
        </div>
    )
}

export default RightColumn