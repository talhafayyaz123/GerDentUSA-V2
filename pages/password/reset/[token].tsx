import { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import Breadcrumb from '../../../UIComponents/Breadcrumb'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import styles from './reset.module.css'
import { API_BASE_URL, SITE_URL } from '../../../lib/constants';
import { MessageContext } from '../../../contexts/MessageContext';
import { gsap } from 'gsap';
import { MainContext } from '../../../contexts/MainContext';
import { useRouter } from 'next/router';

const Reset: NextPage = ({reset_data}: any) => {

    const breadcrum = {"name" : "Forget password"};
    const [message, setMessage] = useState<any>({})
    const {setAlert} = useContext(MessageContext)
    const {setIsLoading} = useContext(MainContext)

    interface IFormInputs {
        email: string,
        password: string,
        password_confirmation: string
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        password_confirmation: Yup.string()
            .required('Confirm password is required')
            .min(6, 'Confirm password must be matched with password')
    });
    const validateScehmaforResetLink = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
    });

    const formOptions = { resolver: yupResolver(reset_data.message != 'redirect' ? validationSchema : validateScehmaforResetLink) };
    const { register, handleSubmit, setError, reset, setValue, formState: { errors }  } = useForm<IFormInputs>(formOptions);

    const onSubmit = async (data: any, e: any) => {
        await setIsLoading(true)
        if(data.password_confirmation == data.password)
        {
            const res: any = await fetch(`${SITE_URL}api/user/reset-password`, {
                method: "POST",
                body: JSON.stringify({
                    token: reset_data.message=='success' ? reset_data.token : '',
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.password_confirmation
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(response => response.json())
            if(res.message == 'error')
            {
                setAlert({
                    type: 'danger',
                    message: res.response
                })
            }
            else if(res.message == 'success')
            {
                setAlert({
                    type: 'info',
                    message: res.response
                })
                reset({
                    email: '',
                    password: '',
                    password_confirmation: ''
                })
            }
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
            },'<90%')
        }
        else
        {
            setError("password_confirmation", {
                message: "Your password and confirm password must matched!",
            });
        }
        await setIsLoading(false)
    }


    const submitForgetForm = async (data: any, e: any) => {
        setIsLoading(true)
        e.preventDefault()
        let formData: any = {
            email: data.email,
        }
        let result: any = await fetch(`/api/user/forgetpass`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }).then(response => response.json())
        await setMessage({ [result.message]: result.response})
        setIsLoading(false)
    }

    let router = useRouter()
    useEffect(() => {
        if(reset_data.message == 'redirect')
        {
            localStorage.setItem('error', reset_data.error)
            router.push('/password/reset');
            setMessage({ 'error': reset_data.error})
        }
    }, [])

    return (
        <>
            <Breadcrumb data={breadcrum} />
            <div className="flex justify-center py-14">
                <form className={`grid grid-cols-1 rounded-lg pb-4 shadow-lg ${styles.form}`} onSubmit={handleSubmit((data, e) => {
                    reset_data.message != 'redirect' ? onSubmit(data, e) : submitForgetForm(data, e)
                    })}>
                    <h2 className='font-semibold text-2xl p-4 text-center'>Reset Password</h2>
                    <div className="flex flex-wrap p-4">
                        {
                            (message!='' && message!=undefined && message.error!=undefined) ? (
                                <small className="bg-red-500 text-xs p-1 rounded text-white w-full text-center">{message.error}</small>
                            ) : ''
                        }
                        {
                            (message!='' && message!=undefined && message.success!=undefined) && (
                                <small className="bg-blue-500 text-xs p-1 rounded text-white w-full text-center">{message.success}</small>
                            )
                        }
                    </div>
                    <div className="name-label-wrapper p-4">
                        <label htmlFor="name" className="relative block">
                            Email Address:
                            <input type="email" required placeholder="Enter email address ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('email')} />
                        </label>
                        <small className="text-red-500">{errors.email && <p>{errors.email.message}</p>}</small>
                    </div>
                    {
                        reset_data.message != 'redirect' && (
                            <>
                                <div className="name-label-wrapper p-4">
                                    <label htmlFor="name" className="relative block">
                                        New Password:
                                        <input type="password" required placeholder="Enter new password ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('password')} />
                                    </label>
                                    <small className="text-red-500">{errors.password && <p>{errors.password.message}</p>}</small>
                                </div>
                                <div className="name-label-wrapper p-4">
                                    <label htmlFor="name" className="relative block">
                                        Confirm New Password:
                                        <input type="password" required placeholder="Enter confirm new password ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('password_confirmation')} />
                                    </label>
                                    <small className="text-red-500">{errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}</small>
                                </div>
                            </>
                        )
                    }
                    <div className="name-label-wrapper px-4 text-right">
                        <button type="submit" className="btn w-full px-8 py-4 dark-blue-bg text-white rounded-full shadow-lg mt-2 sm:mt-4 inline-block text-center relative">
                            {reset_data.message != 'redirect' ? 'Reset Password' : 'Send Password Reset Link'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export async function getServerSideProps(context:any) {
    const res = await fetch(`${API_BASE_URL}password/reset/${context.params.token}`)
    .then(response => response.json())
    return {
        props: {
            reset_data: res
        }
    }
}

export default Reset
