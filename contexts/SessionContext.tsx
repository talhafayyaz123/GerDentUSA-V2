import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

type SessionContextType = {
    session: any;
    setSession: (value: any) => void;
    storeSession: (keyValue: any, value:any) => void;
    destroySession: () => void;
    Session: () => void;
    User: () => void;
}

const SessionContextDefault: SessionContextType = {
    session: undefined,
    setSession: () => {},
    storeSession: () => {},
    destroySession: () => {},
    Session: () => {},
    User: () => {}
}

const SessionContext = createContext(SessionContextDefault)

const SessionProvider = ({ children }: any) => {
    const [session, setSession] = useState<any>(undefined)
    const router = useRouter()
    const storeSession = async (keyValue: any, value: any) => {
        let session: any = {
            [keyValue] : value
        }
        if(localStorage.getItem('session')==null)
        {
            await localStorage.setItem('session', JSON.stringify(session))
        }
        else
        {
            let sessionData: any = await localStorage.getItem('session')
            sessionData = JSON.parse(sessionData)
            
            let addNew = {
                ...sessionData,
                [keyValue]: value
            }
            await localStorage.setItem('session', JSON.stringify(addNew))
        }
        let data: any = await localStorage.getItem('session')
        data = JSON.parse(data)
        setSession(data)
    }

    const destroySession = async () => {
        await localStorage.removeItem('session')
        router.push('/')
    }
    const Session = async () => {
        let data: any = await localStorage.getItem('session')
        if(data!=null)
        {
            data = await JSON.parse(data)
            await setSession(data)
        }
        return data
    }

    const User = () => {
        return session!=undefined ? session.user : null
    }

    useEffect(() => {
        Session()
    }, [])

    return (
        <SessionContext.Provider value={{ 
            session, setSession,
            storeSession,
            destroySession,
            Session,
            User
        }}>
            { children }
        </SessionContext.Provider>
    )
}

export {SessionProvider, SessionContext}