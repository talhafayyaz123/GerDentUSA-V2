import { useEffect, useState } from "react"
import { API_BASE_URL } from "../../lib/constants"
import Breadcrumb from "../../UIComponents/Breadcrumb"
import Style from "../Page/Details.module.css"

const Detail = (props: any) => {

    const [pageDetail, setPageDetail]: any = useState({})

    useEffect(() => {
        const getPageDetail = async () => {
            const result = await fetch(`${API_BASE_URL}pages/${props.slug}`)
            const res = await result.json()
            setPageDetail(res)
        }
        getPageDetail()
    }, [props])

    return (
        <>
        {/* <div className="breadcrumb width py-4">
            <a className="text-gray-400" href="/">Home</a>
            <span> / </span>
            <a href="/"> {pageDetail.page!=undefined && pageDetail.page.heading}</a>
        </div> */}
        <Breadcrumb data={props.page} />
        <div className = "relative" >
            <div className="checkout-page-container width mt-14">
                <h2 className="text-3xl font-bold">
                    {props.page!=undefined && props.page.heading}
                </h2>
                <div className="returning-customer cursor-pointer rounded-lg my-4 mb-28 leading-normal">
                    <div className="grid grid-cols-1 w-full gap-4 all-instruments-links">
                        <div className={Style.detail} dangerouslySetInnerHTML={{ __html:  props.page!=undefined ? props.page.content : ''}}></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Detail