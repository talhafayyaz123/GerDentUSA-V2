import { NextPage } from "next";
import { useContext } from "react";
import OrdersList from "../../components/Dashboard/Orders";
import DashboardLayout from "../../components/Layouts/Dashboard";
import { SessionContext } from "../../contexts/SessionContext";

const Orders:NextPage = () => {

    const {session}: any = useContext(SessionContext)

    return (
        <DashboardLayout pageTitle="Orders">
            <div className="user-title text-3xl font-bold pb-4 border-b border-dashed border-gray-300">Order History</div>
            <div className="mt-5 font-semibold w-full overflow-x-scroll lg:overflow-hidden">
                {
                    session!=undefined && (
                        <OrdersList customer={session.user} />
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default Orders