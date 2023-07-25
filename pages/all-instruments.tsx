import { NextPage } from "next"
import { useContext, useEffect } from "react"
import { API_BASE_URL } from "../lib/constants"
import { MainContext } from "../contexts/MainContext"
import Breadcrumb from "../UIComponents/Breadcrumb"
import Link from "next/link"
import Head from "next/head"

export const getServerSideProps = async (context: any) => {
    const result = await fetch(`${API_BASE_URL}all-instruments`)
    const res = await result.json()

    return {
        props: {
            instruments: res.cats.data
        }
    }
}

const Instruments: NextPage = ({instruments}: any) => {

    const {setIsLoading} = useContext(MainContext)

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading, instruments])
    const data = {"name" : "All Instruments"};
    return (
        <>
            <Head>
                <title>{`All Instruments - GerDentUSA`}</title>
            </Head>
            <Breadcrumb data={data} />
            <div className = "relative" >
                <div className="checkout-page-container width mt-14">
                    <h2 className="text-3xl font-bold">
                        All Instruments
                    </h2>
                    <div className="returning-customer cursor-pointer rounded-lg my-4 mb-28 leading-normal">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 all-instruments-links">
                            {
                                instruments.length>0 && (
                                    instruments.map((instrument: any, index: any) => {
                                        return (
                                            <div key={index} className="link relative overfow-hidden inline w-max">
                                                <Link href={`/${instrument.slug}`}>
                                                    <a className="text-sm" onClick={()=>setIsLoading(true)}>{instrument.name}</a>
                                                </Link>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Instruments