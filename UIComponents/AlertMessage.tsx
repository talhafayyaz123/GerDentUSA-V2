import { useEffect, useState } from "react"

const AlertMessage = (props: any) => {
    
    const [displayAlert, setDisplayAlert] = useState(false)

    const displayFunc = async () => {
        await setDisplayAlert(props.display)
        displayAlert ?
        setTimeout(() => {
            document.querySelector('.alert-message')?.classList.remove('hidden')
            document.querySelector('.alert-message')?.classList.add('hidden')
            setDisplayAlert(false)
        }, 3000) : ''
    }

    useEffect(() => {
    }, [props])

    return (
        <div className={`alert-message ${props.type=='error' ? 'error': ''}`}>
            {props.message}
        </div>
    )
}

export default AlertMessage