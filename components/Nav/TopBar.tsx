import React from 'react'

const TopBar = (props : any) => {

    return (
        <div className={`top-bar dark-blue-bg text-white text-sm realtive pr-5 sm:pr-0 ${(props.isTopBar==0) ? 'hidden absolute' : ''} `}>
            <div className="top-bar-wrapper width flex items-center py-2">
                <div className="welcome-msg text-left sm:text-center sm:flex sm:justify-center w-full">
                    <span className="mr-2 sm:flex">20% Exclusive discount plus free next day delivery, excludes sale
                        <a href="#" className="font-bold sm:ml-2">
                            <span className="border-b-2 border-white border-solid"> Learn More </span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-2 top-2 cursor-pointer top-bar-close" onClick={() => props.topBarCloseFunc()} fill="none" viewBox="0 0 24 24" stroke="#fff">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    )
}

export default TopBar