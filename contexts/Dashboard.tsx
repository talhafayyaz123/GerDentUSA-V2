import { createContext, useState } from "react";

type DashboardType = {
    dashboardLoading: any,
    setDashboardLoading: any
}

const DashboardContext = createContext<DashboardType>({
    dashboardLoading: null,
    setDashboardLoading: () => false
})

const DashboardProvider = ({children}: any) => {

    const [dashboardLoading, setDashboardLoading] = useState(true)

    return (
        <DashboardContext.Provider value={{ dashboardLoading, setDashboardLoading }}>
            {children}
        </DashboardContext.Provider>
    )
}

export {DashboardProvider, DashboardContext}