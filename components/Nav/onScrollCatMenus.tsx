import React, { useContext } from 'react'
import Link from 'next/link'
import { MainContext } from '../../contexts/MainContext'
import styles from './Nav.module.css'

const OnScrollCatMenus = (props : any) => {
    
    const {redirectTo} = useContext(MainContext)

    const redirectToFunc = (e: any, url: any) => {
        e.preventDefault()
        document.body.classList.remove('body-height')
        redirectTo(url)
    }

    return (
        <>
            <div className={`relative cursor-pointer nc-mega-menu-links-container relative rounded-lg m-2 sm:ml-10 ${styles.ScrollNavLinksContainer}`}>
                <Link href={`/${props.menu.slug}`}>
                    <a className="nc-mega-menu-links-wrapper leading-normal text-white relative inline-block" onClick={(e)=>redirectToFunc(e, `/${props.menu.slug}`)}>{props.menu.name}</a>
                </Link>
                {
                    props.sub_categories.length>0 && (
                        <div className={`nc-mega-menu-links-outer-wrapper leading-normal text-sm flex flex-col absolute top-0 left-0 z-10 bg-white rounded-lg shadow-lg border border-gray-300 border-solid opacity-0 invisible overflow-y-scroll ${styles.ScrollNavLinkOuterWrapper}`}>
                            <div className="nc-mega-menu-links-inner-wrapper w-full">
                                {
                                    props.sub_categories.map((subCat : any, index: any) => (
                                        <div key={index} className="relative p-2 sm:p-3 nc-mega-menu-link border-b border-solid border-gray-300 rounded-lg">
                                            <Link href={`/${subCat.slug}`}>
                                                <a className="cursor-pointer" onClick={(e)=>redirectToFunc(e, `/${subCat.slug}`)}> {subCat.name} </a>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default OnScrollCatMenus