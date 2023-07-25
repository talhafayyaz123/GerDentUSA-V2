import { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import Breadcrumb from '../../UIComponents/Breadcrumb'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import styles from './reset/reset.module.css'
import { API_BASE_URL, SITE_URL } from '../../lib/constants';
import { MainContext } from '../../contexts/MainContext';
import { useRouter } from 'next/router';

const Reset: NextPage = () => {
    
    const breadcrum = {"name" : "Forget password"};
    const [message, setMessage] = useState<any>({})
    const {setIsLoading} = useContext(MainContext)

    interface IFormInputs {
        email: string,
    }

    const validateScehmaforResetLink = Yup.object().shape({
        email: Yup.string().email()
            .required('Email is required'),
    });

    const formOptions = { resolver: yupResolver(validateScehmaforResetLink) };
    const { register, handleSubmit, setError, reset, setValue, formState: { errors }  } = useForm<IFormInputs>(formOptions);

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
        reset({
            email: ''
        })
        setIsLoading(false)
    }

    useEffect(() => {
        const defaultFunc  = async () => {
            let error = await localStorage.getItem('error')
            await setMessage({'error': error})
            await localStorage.removeItem('error')
        }
        defaultFunc()
    }, [])

    return (
        <>
            <Breadcrumb data={breadcrum} />
            <div className="flex justify-center py-14">
                <form className={`grid grid-cols-1 rounded-lg pb-4 shadow-lg ${styles.form}`} onSubmit={handleSubmit((data, e) => submitForgetForm(data, e))}>
                    <h2 className='font-semibold text-2xl p-4 text-center'>Reset Password</h2>
                        {
                            (message!='' && message!=undefined && message.error!=undefined) ? (
                                <div className="flex flex-wrap p-4">
                                    <small className="bg-red-500 text-xs p-1 rounded text-white w-full text-center">{message.error}</small>
                                </div>
                            ) : ''
                        }
                        {
                            (message!='' && message!=undefined && message.success!=undefined) && (
                                <div className="flex flex-wrap p-4">
                                    <small className="bg-blue-500 text-xs p-1 rounded text-white w-full text-center">{message.success}</small>
                                </div>
                            )
                        }
                    <div className="name-label-wrapper p-4">
                        <label htmlFor="name" className="relative block">
                            Email Address:
                            <input type="email" required placeholder="Enter email address ..." className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('email')} />
                        </label>
                        <small className="text-red-500">{errors.email && <p>{errors.email.message}</p>}</small>
                    </div>
                    <div className="name-label-wrapper px-4 text-right">
                        <button type="submit" className="btn w-full px-8 py-4 dark-blue-bg text-white rounded-full shadow-lg mt-2 sm:mt-4 inline-block text-center relative">
                            Send Password Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Reset
