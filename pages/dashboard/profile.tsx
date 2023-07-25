import { NextPage } from 'next'
import React, { useContext } from 'react'
import ProfilePage from '../../components/Dashboard/Profile/ProfilePage'
import DashboardLayout from '../../components/Layouts/Dashboard'
import { SessionContext } from '../../contexts/SessionContext'

const Profile:NextPage = () => {

    const {session}: any = useContext(SessionContext)

    return (
        <DashboardLayout pageTitle="Profile">
            <div className="user-title text-3xl font-bold pb-4 border-b border-dashed border-gray-300">Profile</div>
            <div className="mt-5 font-semibold w-full overflow-x-scroll lg:overflow-hidden">
                {
                    session!=undefined && (
                        <ProfilePage customer={session.user} />
                    )
                }
            </div>
        </DashboardLayout>
    )
}

export default Profile
