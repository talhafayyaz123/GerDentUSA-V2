import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { API_BASE_URL } from '../lib/constants'
import { MainContext } from '../contexts/MainContext'
import Breadcrumb from '../UIComponents/Breadcrumb'

export const getServerSideProps = async (context: any) => {
    const res = await axios.get(`${API_BASE_URL}trade-shows`).then(response => {
        return response
    })
    return {
        props: {shows: res.data}
    }
}

const TradeShows = ({shows}: any) => {

    const {setIsLoading} = useContext(MainContext)

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading, shows])

    const breadcrumb = {name: shows.breadcrumbs[0]}

    return (
        <div>
            <Breadcrumb data={breadcrumb} />
            <div className = "relative" >
                <div className="checkout-page-container width mt-14">
                    <h2 className="text-3xl font-bold">
                        {breadcrumb.name}
                    </h2>
                    <div className="returning-customer cursor-pointer rounded-lg my-4 mb-28 leading-normal">
                        <div className="grid grid-cols-1 w-full gap-4 all-instruments-links">
                            {/* <div className={Style.detail} dangerouslySetInnerHTML={{ __html:  pageDetail.page!=undefined && pageDetail.page.content}}></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeShows
