import React, { useContext, useEffect } from 'react'
import Image from 'next/image'
import { BASE_URL } from '../../../lib/constants'
import { DashboardContext } from '../../../contexts/Dashboard'

const ProfileInfo = (props : any) => {

    const {setDashboardLoading} = useContext(DashboardContext)

    const image = ((props.profile.length != 0) ? 
    ((props.profile.avatar_location == null) ? `${BASE_URL}img/frontend/user/profile.png`  : `${BASE_URL + props.profile.avatar_location}`) : `${BASE_URL}img/frontend/user/profile.png`
    )

    useEffect(() => {
        setDashboardLoading(false)
    }, [setDashboardLoading])
     
    return (
        <div className={`profile-container w-full ${!props.showSection && 'hidden'}`}>
            <div className="profile-left-col flex flex-col border border-solid border-gray-300 rounded-lg w-full">
                <div className="w-full flex flex-col sm:flex-row justify-center items-center text-center sm:text-left border-b border-solid border-gray-300 p-2 sm:p-3 text-sm sm:text-base">
                    <div className="sm:w-3/12">Avatar:</div>
                    <div className="user-img-wrapper sm:w-9/12 flex justify-center sm:justify-start mt-2 sm:mt-0">
                        <Image width={150} height={150} className="user-img w-6/12 md:w-4/12 border sm:p-2 border-solid border-gray-300" src={`${image}`} alt={`${props.profile.first_name} ${props.profile.last_name}`} />
                    </div>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center text-center sm:text-left border-b border-solid border-gray-300 p-2 sm:p-3 text-sm sm:text-base bg-gray-100">
                    <div className="sm:w-3/12">Name:</div>
                    <div className="user-name sm:w-9/12 text-gray-600">{props.profile.first_name} {props.profile.last_name}</div>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center text-center sm:text-left border-b border-solid border-gray-300 p-2 sm:p-3 text-sm sm:text-base">
                    <div className="sm:w-3/12">E-mail:</div>
                    <div className="user-email sm:w-9/12 text-gray-600">{props.profile.email}</div>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-center items-center text-center sm:text-left p-2 sm:p-3 bg-gray-100 rounded-b-lg text-sm sm:text-base">
                    <div className="sm:w-3/12">Date Joined:</div>
                    <div className="user-date-join sm:w-9/12 text-gray-600">{props.profile.created_at}</div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
