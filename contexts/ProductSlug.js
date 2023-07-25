import { createContext, useState } from "react";
import { API_BASE_URL } from "../lib/constants";

const ProductSlug = createContext('')

const ProductProvider = ({ children }) => {

    const [slugRecord, setSlugRecord] = useState([])
    const getSlug = async (slug) => {
        try {
            const res = await fetch(`${API_BASE_URL}${slug}`)
            const data = await res.json()
            setSlugRecord(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ProductSlug.Provider value={{ 
            slugRecord, setSlugRecord,
            getSlug,
         }}>
             {children}
         </ProductSlug.Provider>
    )

}

export {ProductProvider, ProductSlug}