import { useContext } from "react"
import { MainContext } from "../../contexts/MainContext"

import BottomFooter from "./BottomFooter"
import DesktopFooter from "./DesktopFooter"
import MobileFooter from "./MobileFooter"

const Footer = () => {
    const { isLoading, setIsLoading } = useContext(MainContext)

    return (
        <footer className={`bg-gray-100 pt-28 realtive ${(isLoading==false) ? 'opacity-1-trans' : 'opacity-0'}`}>
            <DesktopFooter setIsLoading={setIsLoading} />
            <MobileFooter />
            <BottomFooter />
        </footer>

    )
}

export default Footer