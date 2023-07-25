import { NextPage } from "next";
import { useContext } from "react";
import RecentOrders from "../../components/Dashboard/RecentOrders";
import DashboardLayout from "../../components/Layouts/Dashboard";
import { SessionContext } from "../../contexts/SessionContext";

const Dashboard:NextPage = () => {
    
    const {session}: any = useContext(SessionContext)

    return (
        <DashboardLayout pageTitle="Dashboard">
        <div className="user-title text-3xl font-bold pb-4 border-b border-dashed border-gray-300">Hello <span className="user-name">{session!=undefined && session.user.first_name}!</span></div>
        <div className="mt-5 bg-gray-100 p-4 font-semibold rounded-lg border-b border-solid border-gray-300">Your Recent Orders</div>
            <div className="mt-5 font-semibold w-full overflow-x-scroll lg:overflow-hidden">
            {
                session!=undefined && (
                    <RecentOrders customer={session.user} />
                )
            }
        </div>
        </DashboardLayout>
    )
}

export default Dashboard