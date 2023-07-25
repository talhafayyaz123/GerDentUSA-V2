import React, { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Image from "next/image"
import GreaterSection from '../../components/Greater/GreaterSection'
import axios from "axios"
import { API_BASE_URL, BASE_URL } from "../../lib/constants"
import { MainContext } from '../../contexts/MainContext'
import Head from 'next/head'
import ShowSpecialGnydm from '../../public/assets/img/slider/show-special-gnydm.jpg'

export const getServerSideProps = async (context: any) => {
    const res = await axios.get(`${API_BASE_URL}show-special/greater-ny-dental-meeting`).then(response => {
        return response
    })
    return {
        props: {shows: res.data}
    }
}

const Greater:NextPage = ({shows}: any) => {

    const {setIsLoading} = useContext(MainContext)
    const special_header_img = 'show-special-gnydm.jpg';

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading, shows])

    return (
        <>
            <Head>
                <title>{`${shows.page.meta_title} - GerDentUSA`}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={shows.page.meta_description} />
                <meta name="keywords" content={shows.page.meta_keywords} />
            </Head>
            <div className="equine-special-disc relative mb-20">
                {/* hero section */}
                <section className="equine-special-disc hero relative">
                    <div className="overlay absolute top-0 left-0 w-full h-full" />
                    <div className="hero-content flex flex-col justify-center items-center text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl relative z-10 text-center width mb-20">
                        <Image src={ShowSpecialGnydm} alt="Virtual Convention" />
                    </div>
                </section>
                {/* HeroSection */}

                {/* equine insturments types */}
                <GreaterSection shows={shows}  />
            </div>
        </>
    )
}

export default Greater
