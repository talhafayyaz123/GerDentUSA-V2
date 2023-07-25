import { NextPage } from "next";
import Breadcrumb from "../../UIComponents/Breadcrumb";
import FaqsSection from "../../components/Faqs/FaqsSection";
import { API_BASE_URL } from "../../lib/constants";
import { Fragment, useContext, useEffect } from "react";
import { MainContext } from "../../contexts/MainContext";

export const getServerSideProps = async (context: any) => {
    
    const res = await fetch(`${API_BASE_URL}pages/faqs`)
    const data = await res.json()
    
    return {
        props: {faqs: data}
    }
}

const FAQs:NextPage = ({faqs}: any) => {

    const data = {"name" : "FAQs"};
    const {setIsLoading} = useContext(MainContext)

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading])

    return (
        <Fragment>
            <Breadcrumb data={data} />
            <FaqsSection Faqs={faqs} />
        </Fragment>
    )
}

export default FAQs