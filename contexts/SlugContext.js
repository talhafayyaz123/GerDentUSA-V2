import { createContext, useState } from "react";
import { API_BASE_URL } from "../lib/constants";

const SlugContext = createContext('')

const SlugProvider = ({ children }) => {

    const [slugRecord, setSlugRecord] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    const getSlug = async (slug) => {
        try {
            const res = await fetch(`${API_BASE_URL}menu/${slug}`)
            const data = await res.json()
            setSlugRecord(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SlugContext.Provider value={{ 
            slugRecord, setSlugRecord,
            getSlug,
            selectedCategories, setSelectedCategories
         }}>
             {children}
         </SlugContext.Provider>
    )

}

export {SlugProvider, SlugContext}