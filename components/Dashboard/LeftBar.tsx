import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { DashboardContext } from "../../contexts/Dashboard"
import { SessionContext } from "../../contexts/SessionContext"
import styles from "./Dashboard.module.css"

const LeftBar = () => {

    const {setDashboardLoading} = useContext(DashboardContext)

    const {session, destroySession, setSession} = useContext(SessionContext)

    const Logout = async () => {
        await destroySession()
        await setSession(undefined)
        router.push('/')
    }

    let router = useRouter()
    useEffect(() => {
    }, [])

    return (
        <div className="bg-gray-100 border border-gray-300 border-solid left-col-wrapper lg:w-3/12 overflow-hidden rounded-lg sm:w-6/12 w-full">
            <ul className="dashboard-links overflow-hidden border-2">
                <li className={`${router.asPath=='/dashboard' ? styles.activeDb : `bg-gray-100 ${styles.dbLinks}`}`}>
                    <Link href={'/dashboard'}>
                        <a className="border-b border-gray-300 border-solid cursor-pointer p-4 rounded-lg flex items-center" onClick={()=>setDashboardLoading(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            <span>Dashboard</span>
                        </a>
                    </Link>
                </li>
                <li className={`${router.asPath.search('/dashboard/orders')!=-1 ? styles.activeDb : `bg-gray-100 ${styles.dbLinks}`}`}>
                    <Link href={'/dashboard/orders'}>
                        <a className="border-b border-gray-300 border-solid cursor-pointer p-4 rounded-lg flex items-center" onClick={()=>setDashboardLoading(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            <span>Orders</span>
                        </a>
                    </Link>
                </li>
                <li className={`${router.asPath=='/dashboard/payment-history' ? styles.activeDb : `bg-gray-100 ${styles.dbLinks}`}`}>
                    <Link href={'/dashboard/payment-history'}>
                        <a className="border-b border-gray-300 border-solid cursor-pointer p-4 rounded-lg flex items-center" onClick={()=>setDashboardLoading(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            <span>Payment History</span>
                        </a>
                    </Link>
                </li>
                <li className={`${router.asPath=='/dashboard/addresses' ? styles.activeDb : `bg-gray-100 ${styles.dbLinks}`}`}>
                    <Link href={'/dashboard/addresses'}>
                        <a className="border-b border-gray-300 border-solid cursor-pointer p-4 rounded-lg flex items-center" onClick={()=>setDashboardLoading(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>My Addresses</span>
                        </a>
                    </Link>
                </li>
                <li className={`${router.asPath=='/dashboard/profile' ? styles.activeDb : `bg-gray-100 ${styles.dbLinks}`}`}>
                    <Link href={'/dashboard/profile'}>
                        <a className="border-b border-gray-300 border-solid cursor-pointer p-4 rounded-lg flex items-center" onClick={()=>setDashboardLoading(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <span>Profile</span>
                        </a>
                    </Link>
                </li>
                <li className={`${styles.dbLinks} cursor-pointer`} onClick={() => Logout()}>
                    <a className="p-4 bg-gray-100 rounded-lg flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default LeftBar