import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import NewsletterForm from '../../pages/api/newsletter/NewsletterForm'
import { MessageContext } from '../../contexts/MessageContext'
import { gsap } from "gsap"
import { MainContext } from '../../contexts/MainContext'

const Newsletter = () => {
    const { setAlert } = useContext(MessageContext)
    const { setIsLoading } = useContext(MainContext)
    const [successMessage, setSuccessMessage] = useState({type: '',message:''})

    interface IFormInputs {
        email: string,
    }

    // form validation rules
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, setValue, formState: { errors }  } = useForm<IFormInputs>(formOptions);

    const onSubmit = async (data: IFormInputs) => {
        setIsLoading(true)
        const result: any = await NewsletterForm(data)
        console.log(result)
        if(result.data.status==1)
        {
            setAlert({
                type: 'success',
                message:'Thanks for your subscription!'
            })

            gsap.timeline().fromTo('.alert-show', {
                xPercent: -50,
                autoAlpha: 0,
            }, {
                xPercent: 0,
                ease: 'back(2)',
                autoAlpha: 1,
                onComplete: () => {
                    gsap.to('.alert-show', {
                        xPercent: -50,
                        autoAlpha: 0,
                        duration: 0.3,
                        delay: 2
                    })
                }
            }, '<90%')
            // setSuccessMessage({type: 'success',message:'Thanks for your subscription!'})
        }
        setIsLoading(false)
    }


    return (
        <>
        <form className="footer-subscribe-wrapper hidden lg:block lg:w-3/12" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="col-title text-black font-bold">Subscribe Now</div>
            <p className="text-gray-600 leading-normal mt-8">Subscribe your email for newsletter updates based on your interest</p>
            <div className="subscribe-input-wrapper border border-gray-300 border-solid text-sm rounded-lg bg-white mt-4 flex items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#bbb">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input className={`p-3 rounded-lg focus:outline-none w-full ${errors.email ? 'border-red-400' : 'border-gray-300'}`} type="email" placeholder="Enter you email" {...register('email')}  />

                <button type="submit" className="subButton">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer transform-gpu rotate-90 justify-self-end mr-2" viewBox="0 0 20 20" fill="#52A0F2">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>
            <small className="text-red-500">{errors.email && <p>{errors.email.message}</p>}</small>
        </form>
        <div className={`alert-message ${successMessage.type=='error' ? 'error': ''}${successMessage.type=='success' || successMessage.type=='error' ? '' : 'hidden'}`}>
            {successMessage.message}
        </div>
        </>
    )
}

export default Newsletter
