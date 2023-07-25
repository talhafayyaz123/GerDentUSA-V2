import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import React, { useContext } from 'react'
import * as Yup from 'yup';
import RegisterForm from "../pages/api/customer/registerForm";
import { SessionContext } from '../contexts/SessionContext';
import Link from 'next/link';

const Register = (props: any) => {

    const {storeSession} = useContext(SessionContext)

    interface IFormInputs {
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        password_confirmation: string
    }

    // form validation rules 
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('First Name is required'),
        last_name: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        password_confirmation: Yup.string()
            .required('Confirm password is required')
            .min(6, 'Confirm password must be matched with password')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, reset, setValue, formState: { errors }  } = useForm<IFormInputs>(formOptions);

    const onSubmit = async (data: any, e: any) => {
        if(data.password_confirmation == data.password)
        {
            const result: any = await RegisterForm(data)
            storeSession('user', result.data)
            props.closeSignInUpBox(e)
            reset({first_name: '',
                last_name: '',
                email: '',
                password: '',
                password_confirmation: ''})
        }
        else
        {
            setError("password_confirmation", {
                message: "Your password and confirm password must matched!",
            });
        }
    }

    const showSignInBtn = () => {
        let signInPanel: any = document.querySelector('.sign-in-wrapper')
        let signUpPanel: any = document.querySelector('.sign-up-wrapper')
        signUpPanel.classList.add('hidden')
		signInPanel.classList.remove('hidden')
    }


    return (
        <div className="sign-up-wrapper w-full flex flex-col justify-center items-center mt-2 sm:mt-4 hidden">
            <h2 className="font-semibold text-2xl">
                Sign up for free!
            </h2>
            <p className="mt-2 sm:mt-4 text-gray-600 leading-normal">
                <span>Already registered?</span>
                <span className="dark-blue-color font-semibold">
                    <a className="show-signin-btn cursor-pointer" onClick={() => showSignInBtn()}> Sign in now</a>
                </span>
            </p>
            <form id="signup" className="block text-sm w-full" onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
                <div>
                    <label className="block w-full text-gray-600 mt-2 sm:mt-4" htmlFor="first_name">First Name</label>
                    <input className={`w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid focus:outline-none ${errors.first_name ? 'border-red-400' : 'border-gray-300'}`} type="text" id="first_name" placeholder="Enter your first name ..." {...register('first_name')} />
                    <small className="text-red-500">{errors.first_name && <p>{errors.first_name.message}</p>}</small>
                </div>
                <div>
                    <label className="block w-full text-gray-600 mt-2 sm:mt-4" htmlFor="last_name">Last Name</label>
                    <input className={`w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid focus:outline-none ${errors.last_name ? 'border-red-400' : 'border-gray-300'}`} type="text" id="last_name" placeholder="Enter your last name ..." {...register('last_name')} />
                    <small className="text-red-500">{errors.last_name && <p>{errors.last_name.message}</p>}</small>
                </div>
                <div>
                    <label className="block w-full text-gray-600 mt-2 sm:mt-4" htmlFor="email">Email Address</label>
                    <input className={`w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid focus:outline-none ${errors.email ? 'border-red-400' : 'border-gray-300'}`} type="email" id="email" placeholder="Enter your email ..." {...register('email')} />
                    <small className="text-red-500">{errors.email && <p>{errors.email.message}</p>}</small>
                </div>
                <div>
                    <label className="block w-full text-gray-600 mt-2 sm:mt-4 " htmlFor="password">Password</label>
                    <input className={`w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid focus:outline-none ${errors.password ? 'border-red-400' : 'border-gray-300'}`} type="password" id="password" placeholder="Password ..." {...register('password')} autoComplete="on" />
                    <small className="text-red-500">{errors.password && <p>{errors.password.message}</p>}</small>
                </div>
                <div>
                    <label className="block w-full text-gray-600 mt-2 sm:mt-4 " htmlFor="password_confirmation">Password Confirmation</label>
                    <input className={`w-full rounded-lg p-2 sm:p-4 mt-2 border border-solid focus:outline-none ${errors.password_confirmation ? 'border-red-400' : 'border-gray-300'}`} type="password" id="password_confirmation" placeholder="Password Confirmation ..." {...register('password_confirmation')} autoComplete="on" />
                    <small className="text-red-500">{errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}</small>
                </div>
                <div className="remember-forgot-wrapper flex flex-col sm:flex-row justify-center sm:justify-between items-center text-sm w-full mt-2 sm:mt-4">
                    <div className="remember flex justify-center sm:justify-start items-center w-full sm:w-6/12">
                        <div className="switch-wrapper w-2/12 sm:w-3/12 h-max rounded-full bg-gray-200 inline mr-2 cursor-pointer">
                            <div className="switch-circle bg-white rounded-full shadow-lg" />
                        </div>
                        <span className="cursor-pointer w-max sm:w-9/12">Remember me</span>
                    </div>
                    <Link href={'/pages/privacy-policy'}>
                        <a className="cursor-pointer w-max sm:w-6/12 text-right mt-2 sm:mt-0 privacy-policy-link" onClick={(e) => props.closeSignInUpBox(e)}>
                            Privacy and policy
                        </a>
                    </Link>
                </div>
                <div className="mt-2 sm:mt-4">
                    <button type="submit" className="btn w-full px-8 py-3 dark-blue-bg text-white rounded-full shadow-lg mt-2 sm:mt-4 inline-block text-center text-lg relative">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register