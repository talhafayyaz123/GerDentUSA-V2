import { useContext } from "react"
import { SlugContext } from "../../../contexts/SlugContext"
import Image from "next/dist/client/image"
const LeftColumn = (props : any) => {

    const {selectedCategories, setSelectedCategories} : any = useContext(SlugContext)

    const familyClickFunc = (id : any, event: any) => {
        if(event.target.checked)
        {
            setSelectedCategories([...selectedCategories, id])
        } else {
            setSelectedCategories((currentCategory : any) => currentCategory.filter((catId : any) => catId != id))
        }
        
    }

    return (
        <div className="category-left-column w-full lg:w-max flex flex-col justify-center items-center lg:items-start lg:justify-start">
            {
                props.view.category_type=='Shop_Categories' ? (
                    <div className="family-wrapper bg-gray-100 w-max p-8 rounded-lg mt-6 lg:mt-0">
                        <div className="family-title font-semibold">
                            Family
                        </div>
                        {
                            props.view.categories!=undefined ?
                            (
                                props.view.categories.map((family : any, index: any) => {
                                    return (
                                        <label key={index} className="relative text-sm mt-3 w-full block family-label flex items-center">
                                            <input type="checkbox" className="mr-2" onChange={(e) => familyClickFunc(family.id, e)} />
                                            {` ${family.name} `} <span className="family-quantity">({family.PoductTotal})</span>
                                        </label>
                                    )
                                })
                            ) : ''
                        }
                    </div>
                ) : ''
            }
            <div className="left-column-banner mt-6 rounded-lg">
                <Image layout="fixed" width={'255px'} height={'400px'} lazyBoundary="400px" className="left-column-banner mt-6 rounded-lg" src="/assets/img/mini-bird-beak.png" alt="Mini Bird Break" />
            </div>
        </div>
    )
}

export default LeftColumn