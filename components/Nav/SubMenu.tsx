import { useContext } from 'react'
import Link from 'next/dist/client/link'
import { MainContext } from '../../contexts/MainContext'

const SubMenu = (props: any) => {

    const {setIsLoading} = useContext(MainContext)

    return (
        <div className="relative p-2 sm:p-3 nc-mega-menu-link border-b border-solid border-gray-300 rounded-lg">
            <Link href={`/${props.category.slug}`}>
                <a onClick={(e)=>{
                    setIsLoading(true)
                    props.ncCloseBtnFunc(e)
                    }}> {props.category.name} </a>
            </Link>
        </div>
    )
}


export default SubMenu