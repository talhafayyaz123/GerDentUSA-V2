import LeftBar from "../Dashboard/LeftBar"
import Breadcrumb from "../../UIComponents/Breadcrumb"
import Head from 'next/head'
import { useContext, useEffect, useState } from "react"
import { SessionContext } from "../../contexts/SessionContext"
import { useRouter } from "next/router"
import { DashboardProvider } from "../../contexts/Dashboard"
import DashboardRightSection from "../Dashboard"

const DashboardLayout = ({children, pageTitle}: any) => {

    const data = {'name': pageTitle}

    const {session} = useContext(SessionContext)
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {

            let data: any = await localStorage.getItem('session')
            if(data!=null)
            {
                data = await JSON.parse(data)
                if(data.user==undefined)
                {
                    router.push('/')
                }
            }
            else
            {
                router.push('/')
            }
        }

        checkSession()
    }, [session, router])

    return (
        <DashboardProvider>
            <Breadcrumb data={data} />
            <div id="dashboard-page relative width">
                <div className="dashboard-page-container width mt-14 mb-28 flex flex-col lg:flex-row items-center lg:items-start">
                    <LeftBar />
                    <DashboardRightSection children={children} />
                </div>
            </div>
        </DashboardProvider>
    )
}

export default DashboardLayout