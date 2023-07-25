import axios from "axios";
import { useContext, useEffect, useState } from "react";
import VideoSection from "../../components/Videos";
import { API_BASE_URL } from "../../lib/constants";
import { MainContext } from "../../contexts/MainContext";
import Breadcrumb from "../../UIComponents/Breadcrumb"

export const getServerSideProps = async (context: any) => {

    const res = await axios.get(`${API_BASE_URL}pages/videos`).then(response => {
        return response
    })

    return {
        props: {
            videos: res.data,
        }
    }
}

const Videos = ({videos}: any) => {

    const data = {"name" : "Video"};

    const {setIsLoading} = useContext(MainContext)

    useEffect(() => {
        setIsLoading(false)
    }, [setIsLoading])
    

    return (
        <>
            <Breadcrumb data={data} />
            <div id="videos-page relative">
                <div className="videos-page-container width mt-14 mb-28">
                    <h2 className="text-3xl font-bold">Videos</h2>
                    <div className="videos-container mt-6">
                        <div className="videos-wrapper grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                            {
                                videos.length > 0 && (
                                    videos.map((video: any, index: any) => {
                                        return <VideoSection key={index} video={video} />
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Videos