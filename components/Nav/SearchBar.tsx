import React, { useContext, useState } from 'react'
import Image from 'next/dist/client/image'
import { API_BASE_URL, BASE_URL } from '../../lib/constants'
import axios from 'axios'
import { MainContext } from '../../contexts/MainContext'

const SearchBar = (props: any) => {

    const { redirectTo } = useContext(MainContext)
    const [searchList, setSearchList]: any = useState({})

    const getSearchFunc = async (e: any) => {
        let value = e.target.value
        if(value.length > 2)
        {
            const res = await axios.get(`${API_BASE_URL}show-search?term=${value}`).then(response => {
                return response
            })
            await setSearchList(res.data)
            props.setIsSearchListPropup(true)
        }
        else
        {
            // props.setIsSearchListPropup(false)
        }
        if(value.length==0)
        {
            await setSearchList({})
        }
    }

    const searchRedirect = (url: any) => {
        redirectTo(url)
        props.setIsSearchListPropup(false)
        document.body.classList.remove('body-height')
    }

    const submitSearchForm = async (e: any) => {
        e.preventDefault()
        if(searchList.term!=undefined)
        {
            await searchRedirect(`/search-result/${searchList.term}`)
        }
    }

    const setBackDrop = () => {
        document.body.classList.add('body-height')
        props.setIsSearchListPropup(true)
    }

    return (
        <form className={props.setClass} onSubmit={(e)=>submitSearchForm(e)}>
            <input type="search" placeholder="What you are looking for" className="desktop-search-bar p-4 focus:outline-none rounded-lg lite-blue-bg-color text-gray-600 w-11/12" onChange={(e)=>getSearchFunc(e)} onClick={()=>setBackDrop()} />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 absolute right-0 cursor-pointer p-1" fill="none" viewBox="0 0 26 26" stroke="#777" onClick={(e)=>submitSearchForm(e)}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {
                props.IsSearchListPropup && searchList!=undefined && searchList.products!=undefined && (
                        <div className="input-search-reslut-container absolute top-full w-full h-auto bg-gray-100 rounded-lg border border-solid border-gray-300">
                        <div className="overflow-y-scroll overflow-x-hidden w-full flex flex-col" style={{ height: '80vh' }}>
                        {
                            searchList!=undefined && searchList.products!=undefined && searchList.products.length > 0 && (
                                searchList.products.slice(0,10).map((product: any, index: any) => {
                                    return (
                                        <a key={index} onClick={()=>searchRedirect('/'+product.detail.url)} className="search-item flex items-center p-2 border-b border-solid border-gray-300 rounded-lg cursor-pointer">
                                            <Image layout="fixed" width={63} height={63} className="mr-1 w-1/12" src={`${BASE_URL}${product.detail.path}`} alt={product.name} />
                                            <div className="flex flex-col text-gray-800 text-xs sm:text-sm p-1">
                                                <div className="search-item-description">{product.name}</div>
                                                <div className="flex items-center mt-2 font-semibold">
                                                    <span className="search-item-sku dark-blue-color mr-2">{product.detail.sku}</span>
                                                    <span className="search-item-price" dangerouslySetInnerHTML={{ __html: product.detail.price_text }}></span>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            )
                        }
                        {
                            searchList.length == 0 && (
                                <div className="p-3 text-center"> Sorry!, no results found</div>
                            )
                        }
                        {
                            searchList.products_count > 10 && (
                                <a onClick={(e)=>submitSearchForm(e)} className="search-item p-4 border-b border-solid border-gray-300 rounded-b-lg cursor-pointer text-center"> View All Search Results {searchList.products_count} </a>
                            )
                        }
                        </div>
                    </div>
                )
            }
        </form>
    )
}

export default SearchBar
