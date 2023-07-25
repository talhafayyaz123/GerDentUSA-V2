import axios from "axios"
import React , { useContext, useEffect, useState } from "react"
import { API_BASE_URL } from "../../../lib/constants"
import { MainContext } from "../../../contexts/MainContext"
import ProfileInfo from "./ProfileInfo"
import ProfilePassword from "./ProfilePassword"
import ProfileUpdate from "./ProfileUpdate"

const ProfilePage = (props : any) => {
    
    const {setIsLoading} = useContext(MainContext)
    const [Section, setSection] = useState(1);

    useEffect(() => {
        // const getProfile = async () => {
        //     let data: any = {
        //         customer: {id: props.customer.id}
        //     }
        //     let res: any = await axios.get(`${API_BASE_URL}dashboard/profile`, {params: data}).then(respose => { return respose })
        //     setProfile(res.data.user)
        //     setIsLoading(false)
        // }
        // getProfile()
    }, [props.customer.id, setIsLoading])

    return (
        <>
            <div className="bg-gray-100 border-b border-gray-300 border-solid flex justify-between sm:justify-start mt-5 overflow-hidden rounded-lg sm:text-lg text-sm w-full">
                <button className={`cursor-pointer db-tab font-bold p-2 sm:px-6 sm:py-3 sm:tracking-wide user-profile ${Section==1 ? 'active-db': ''}`} onClick={()=>setSection(1)}>Profile</button>
                <button className={`cursor-pointer db-tab font-bold p-2 sm:px-6 sm:py-3 sm:tracking-wide user-info ${Section==2 ? 'active-db': ''}`} onClick={()=>setSection(2)}>Update Information</button>
                <button className={`cursor-pointer db-tab font-bold p-2 sm:px-6 sm:py-3 sm:tracking-wide user-password ${Section==3 ? 'active-db': ''}`} onClick={()=>setSection(3)}>Update Passwoard</button>
            </div>
            <div className="mt-5 font-semibold w-full">
                <ProfileInfo profile={props.customer} showSection={Section==1 ? true: false} />
                <ProfileUpdate profile={props.customer} showSection={Section==2 ? true: false} />
                <ProfilePassword profile={props.customer} showSection={Section==3 ? true: false} />
            </div>
        </>

    )
}

export default ProfilePage
