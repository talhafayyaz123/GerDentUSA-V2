import React, { useContext } from 'react'
import SubMenu from './SubMenu'
import Link from 'next/link'
import { MainContext } from '../../contexts/MainContext'

const MegaMenu = (props : any) => {
    
    const {setIsLoading} = useContext(MainContext)

    const showMenu = (e: any) => {
        if (e.target == document.querySelector('.nc-mega-menu-links-wrapper')) {
            e.target.parentElement.classList.toggle('active');
        }

        if (e.target == document.querySelector('.nc-mega-menu-links-wrapper svg')) {
            e.target.parentElement.parentElement.classList.toggle('active');
        }

        if (e.target == document.querySelector('.nc-mega-menu-links-wrapper svg path')) {
            e.target.parentElement.parentElement.parentElement.classList.toggle('active');
        }
    }
    return (
        <>
            <div className="relative cursor-pointer nc-mega-menu-links-container rounded-lg w-full p-2 sm:p-3 border-b border-solid border-gray-300">
                {
                    props.sub_categories.length>0 ? (
                        <div className='flex justify-between'>
                            <Link href={`/${props.menu.slug}`}>
                                <a className="nc-mega-menu-links-wrapper leading-normal text-gray-600" onClick={(e) => {
                                    setIsLoading(true)
                                    props.ncCloseBtnFunc(e)
                                }} onMouseOver={(e)=>showMenu(e)} > {props.menu.name}
                                </a>
                            </Link>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    ) : (
                        <Link href={`/${props.menu.slug}`}>
                            <a className="nc-mega-menu-links-wrapper leading-normal text-gray-600" onClick={(e)=>{
                                setIsLoading(true)
                                props.ncCloseBtnFunc(e)
                                }}>{props.menu.name}</a>
                        </Link>
                    )
                }
                {
                    props.sub_categories.length>0 && (
                        <div className="nc-mega-menu-links-outer-wrapper leading-normal text-sm flex flex-col absolute top-0 left-0 z-10 bg-white rounded-lg shadow-lg border border-gray-300 border-solid opacity-0 invisible overflow-y-scroll">
                            <div className="nc-mega-menu-links-inner-wrapper w-full">
                                {
                                    props.sub_categories.map((subCat : any, index: any) => <SubMenu ncCloseBtnFunc={props.ncCloseBtnFunc} key={index} category={subCat}  />)
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default MegaMenu