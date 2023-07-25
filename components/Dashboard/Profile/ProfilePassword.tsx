import React, { useContext } from 'react'
import {ClickEventButton} from '../../../UIComponents/Button'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SITE_URL } from '../../../lib/constants';
import { MessageContext } from '../../../contexts/MessageContext';
import { gsap } from 'gsap';

const ProfilePassword = (props : any) => {

    const {setAlert} = useContext(MessageContext)
    interface IProfilePasswordInputs {
        id: number,
        old_password: string,
        new_password: string,
        cnf_password: string,
    }

    // form validation rules 
    const ProfilePasswordSchema = Yup.object().shape({
            old_password: Yup.string()
            .required('Old password is required'),
            new_password: Yup.string()
            .required('New password is required'),
            cnf_password: Yup.string()
            .required('Confirm password is required'),
    });

    const formOptions = { resolver: yupResolver(ProfilePasswordSchema) };

    const { register, handleSubmit, setError, setValue, formState: { errors }  } = useForm<IProfilePasswordInputs>(formOptions);

    const onSubmit = async (data: IProfilePasswordInputs) => {
        let formData = {
            id: props.profile.id,
            old_password: data.old_password,
            new_password: data.new_password,
            cnf_password: data.cnf_password
        }
        const result: any = await fetch(`${SITE_URL}api/dashboard/profile/update-password`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => response.json())
        console.log(result)
        await setAlert({
            type: result.message,
            display: true,
            message: result.text
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
        },'<90%')
    }

    return (
        <div className={`update-info-container flex flex-col text-gray-600 ${props.showSection ? '' : 'hidden'}`}>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="flex flex-col mb-2">
                        <label htmlFor="old-password">Old Password</label>
                        <input id="old-password" type="password" placeholder="Old Password..." className="p-3 border border-solid border-gray-300 rounded-lg mt-4" {...register('old_password')} />
                        <small className="text-red-500">{errors.old_password && <p>{errors.old_password.message}</p>}</small>
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="new-password" className="mt-4">New Password</label>
                    <input id="new-password" type="password" placeholder="New Password..." className="p-3 border border-solid border-gray-300 rounded-lg mt-4" {...register('new_password')} />
                    <small className="text-red-500">{errors.new_password && <p>{errors.new_password.message}</p>}</small>
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="confirm-password" className="mt-4">Password Confirmation</label>
                    <input id="confirm-password" type="password" placeholder="Password Confirmation..." className="p-3 border border-solid border-gray-300 rounded-lg mt-4" {...register('cnf_password')} />
                    <small className="text-red-500">{errors.cnf_password && <p>{errors.cnf_password.message}</p>}</small>
                </div>
                <div className="flex flex-col mb-2">
                    <ClickEventButton text="Update Password" classpara="dark-blue-bg read-more-btn "  />
                </div>
            </form>
        </div>
    )
}

export default ProfilePassword
