import axios from 'axios'
import { NextPage } from 'next'
import React, { useContext, useEffect } from 'react'
import Search from '../../components/Search'
import { API_BASE_URL } from '../../lib/constants'
import { MainContext } from '../../contexts/MainContext'
import Breadcrumb from '../../UIComponents/Breadcrumb'
import Image from 'next/image'
import Link from 'next/link'

export const getServerSideProps = async (context: any) => {
    let page  = context.query.page!=undefined ? `&page=${context.query.page}` : ''
    const res = await axios.get(`${API_BASE_URL}search-results?s=${context.query.search}${page}`).then(response => {
        return response
    })
    return {
        props: {
            params: context.query,
            search: res.data
        }
    }
}

const SearchResult: NextPage = ({params, search}: any) => {

    const data = {"name" : " Search"};
    const {redirectTo, setIsLoading} = useContext(MainContext)

    let num: any = search.products.total/search.products.per_page
    if (num - parseInt(num) > 0)
    {
        num = parseInt(num) +1
    }
    let paging = {
        counts : num,
        window: 5,
        current : params.page!=undefined ? params.page : 1,
        start: 1,
        end: 5
    }

    const range = (start: number, end: number, step = 1) => {
        let output = [];
        if (typeof end === 'undefined') {
          end = start;
          start = 0;
        }
        for (let i = start; i <= end; i += step) {
          output.push(i);
        }
        return output;
    }; 

    if(paging.window/paging.current < paging.current)
    {
        paging.start = paging.current - 2
        if(paging.start < 1)
        {
            paging.start = 1
        }
        paging.end = paging.start+4
    }
    if(paging.end > paging.counts)
    {
        paging.end = paging.counts
    }

    const paginateFunc = (url: any, pageNumber: any) => {
        redirectTo(url)
        // paging.current = pageNumber
    }

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading, params, search])

    return (
        <>
        <Breadcrumb data={data} />
        <div className="Categoery-page relative">
            <div className="category-product-container width mt-14 mb-28 flex flex-col lg:flex-row order-last lg:order-first">
                <div className="category-left-column w-full lg:w-max flex flex-col justify-center items-center lg:items-start lg:justify-start lg:mt-0 mt-4">
                    <Image className="left-column-banner mt-6 rounded-lg" src="/assets/img/mini-bird-beak.png" width={255} height={400} alt="Mini Bird Break" />
                </div>
                <div className="category-right-column lg:ml-10 lg:w-10/12 order-first lg:order-last">
                    <h2 className="category-products-title text-3xl font-bold">
                        {`Search Results For "${params.search!=undefined && params.search}"`}
                    </h2>
                    {
                        params.search!=undefined ?
                        (
                            <Search term={params.search} products={search.products} />
                        ) : ''
                    }
                    
                    {
                        paging.counts > 1 ? (
                            <div className="flex m-2 mt-10 overflow-hidden w-max rounded border border-solid border-gray-300">

                                {/* Got to start of page */}
                                {
                                    paging.start > 2 && (
                                        <a className={`px-3 py-2 cursor-pointer`} onClick={()=>paginateFunc(`/search-result/${params.search}?page=1`, 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                            </svg>
                                        </a>
                                    )
                                }

                                {/* Go to prev page */}
                                {
                                    paging.start > 1 && (
                                        <a className={`border-l border-gray-300 border-solid px-3 py-2 cursor-pointer`} onClick={()=>paginateFunc(`/search-result/${params.search}?page=${paging.current-1}`, paging.current-1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </a>
                                    )
                                }

                                {
                                    range(paging.start, paging.end).map((num: any, index:any) => {
                                        return (
                                            <Link key={index} href={`/search-result/${params.search}?page=${num}`}>
                                                <a className={`border-l border-solid px-3 py-2 cursor-pointer ${paging.current==num ? 'paging active text-white shadow-lg': 'border-gray-300'}`} onClick={()=>setIsLoading(true)}>
                                                    {num}
                                                </a>
                                            </Link>
                                        )
                                    })
                                }

                                {/* Go to next page */}
                                {
                                    paging.end < paging.counts && (
                                        <a className={`border-l border-r border-gray-300 border-solid px-3 py-2 cursor-pointer`} onClick={()=>paginateFunc(`/search-result/${params.search}?page=${Number(paging.current)+1}`, Number(paging.current)+1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    )
                                }
                                {/* Got to end of page */}
                                {
                                    paging.end < paging.counts && (
                                        <a className={`px-3 py-2 cursor-pointer`} onClick={()=>paginateFunc(`/search-result/${params.search}?page=${paging.counts}`, paging.counts)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    )
                                }
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchResult
