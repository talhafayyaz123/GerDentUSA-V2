import React from 'react'
import Style from './Spin.module.css'

const Spin = (props: any) => {
    return (
        <>
        <div className={Style.overlay}></div>
        <svg className={`${props.absolute ? Style.spinnerAbsolute : ''} ${Style.spinner}`} viewBox="0 0 50 50" style={{ zIndex: 60 }}>
            <circle className={Style.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
        </svg>
        </>
    )
}

export default Spin
