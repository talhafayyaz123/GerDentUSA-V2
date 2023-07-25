import React, { useContext, useEffect, useState } from 'react'
import {ClickEventButton} from '../../../UIComponents/Button'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import updataInfo from '../../../pages/api/dashboard/profile/updataInfo';
import { SessionContext } from '../../../contexts/SessionContext';

const ProfileUpdate = (props : any) => {

    const {storeSession} = useContext(SessionContext)
    interface IFormInputs {
        id: number,
        avatar_location: string,
        first_name: string,
        last_name: string,
    }

    // form validation rules 
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('First Name is required'),
        last_name: Yup.string()
            .required('Last Name is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, setValue, formState: { errors }  } = useForm<IFormInputs>(formOptions);

    const onSubmit = async (data: IFormInputs) => {
        let formData = new FormData()
        formData.append('id', props.profile.id)
        formData.append('first_name', data.first_name)
        formData.append('last_name', data.last_name)
        if(data.avatar_location!=undefined)
        {
            formData.append('avatar_location', data.avatar_location)
        }

        const result: any = await updataInfo(formData)
        if(result.data.error == undefined)
        {
            storeSession('user', result.data)
        }
        setValue('first_name', data.first_name)
        setValue('last_name', data.last_name)
    }
    
    useEffect(() => {
        setValue('id', props.profile.id)
        setValue('first_name', props.profile.first_name)
        setValue('last_name', props.profile.last_name)
    }, [props])

    return (
        <div className={`update-info-container flex flex-col text-gray-600 ${props.showSection ? '' : 'hidden'}`}>
            <form onSubmit={handleSubmit((data) => onSubmit(data))} encType="multipart/form-data">
                <div className="flex flex-col mb-2">
                    <label htmlFor="avatar_location">Upload Profile Picture</label>
                    <input id="avatar_location" type="file" placeholder="No File Choosen..." className="p-3 border border-solid border-gray-300 rounded-lg mt-4" onChange={(e: any)=> setValue('avatar_location', e.target.files[0])} />
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="first_name"> First Name </label>
                    <input id="first_name" type="text" className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('first_name')} />
                    <small className="text-red-500">{errors.first_name && <p>{errors.first_name.message}</p>}</small>
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="last_name"> Last Name </label>
                    <input id="last_name" type="text" className="w-full mt-4 p-3 border border-solid border-gray-300 rounded-lg focus:outline-none" {...register('last_name')} />
                    <small className="text-red-500">{errors.last_name && <p>{errors.last_name.message}</p>}</small>
                </div>
                <div>
                    <ClickEventButton text="Update Profile" classpara="dark-blue-bg read-more-btn "  />
                </div>
            </form>
        </div>
    )
}

export default ProfileUpdate