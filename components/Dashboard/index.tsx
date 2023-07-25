import React, { useContext } from 'react'
import { DashboardContext } from '../../contexts/Dashboard'
import Spin from '../../UIComponents/pagination/spinner/spin'

const DashboardRightSection = ({children}: any) => {

    const {dashboardLoading, setDashboardLoading} = useContext(DashboardContext)

    return (
        <div className="bg-white border border-gray-300 border-solid lg:ml-8 lg:mt-0 lg:w-9/12 mt-10 p-2 right-col-wrapper rounded-lg sm:p-6 w-full overflow-hidden relative" style={{ minHeight: '246px' }}>
            {(dashboardLoading==true) && <Spin absolute={true} />}
            {children}
        </div>
    )
}

export default DashboardRightSection
