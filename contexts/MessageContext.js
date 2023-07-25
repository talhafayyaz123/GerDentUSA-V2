import { createContext, useEffect, useState } from "react";
import { gsap } from "gsap";
import Style from '../components/Alerts/Alert.module.css'

const MessageContext = createContext();

const MessageProvider = ({children}) => {

    const [message, setMessage] = useState()
    const [alert, setAlert] = useState({
        type: '',
        message: ''
    })

    useEffect(() => {
        gsap.set('.alert-show', {autoAlpha: 0})
    }, [])

    return (
      <MessageContext.Provider value={{ message, setMessage, alert, setAlert }}>
        {children}
        <div
          className={`alert-show alert-message overflow-hidden bg-blue-200 text-white fixed top-14 left-14 z-50 inline-block w-max shadow-lg flex flex-wrap items-center ${
            Style[alert.type]
          }`}
        >
          {alert.type == "danger" || alert.type == "error" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {alert.message}
        </div>
      </MessageContext.Provider>
    );
}

export { MessageProvider, MessageContext };