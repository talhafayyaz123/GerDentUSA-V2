import React, { useEffect } from 'react'
import {gsap} from "gsap"
import Style from "./Alert.module.css"

const Alerts = (props: any) => {

    useEffect(() => {
    }, [props.display])

    useEffect(() => {
        gsap.set('.alert-show', { autoAlpha: 0 });
    }, [])

    return (
        <>
        <div className={`alert-show alert-message overflow-hidden bg-blue-200 text-white fixed top-14 left-14 w-3/12 z-50 inline-block ${Style[props.type]}`} >
            {props.message}
        </div>
        </>
    )
}

export default Alerts
