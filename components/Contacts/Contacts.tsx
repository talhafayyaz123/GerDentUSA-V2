import React, { useState } from 'react';
import contactUS from '../../pages/api/contact-us/contactUS';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

const Contacts = (props: any) => {
	const [successMessage, setSuccessMessage] = useState({ type: '', message: '' });

	interface IFormInputs {
		name: string;
		email: string;
		phone: string;
		message: string;
	}

	// form validation rules
	const validationSchema = Yup.object().shape({
		name: Yup.string().required('First Name is required'),
		email: Yup.string().required('Email is required'),
		phone: Yup.string().required('Phone is required'),
		message: Yup.string().required('Message is required')
	});
	const formOptions = { resolver: yupResolver(validationSchema) };

	// get functions to build form with useForm() hook
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors }
	} = useForm<IFormInputs>(formOptions);

	const onSubmit = async (data: IFormInputs) => {
		const result: any = await contactUS(data);
		if (result.data != '') {
			setSuccessMessage({ type: 'success', message: result.data });
		}
	};

	return (
		<>
			<div className='mb-28 mt-14 relative width'>
				<div className='contact-form-details-container flex flex-col md:flex-row'>
					<div className='contact-form-container mt-6 md:w-6/12'>
						<h3 className='text-3xl font-semibold text-black'>Send Us A Message</h3>
						<form id='contact-form' className='block w-full' onSubmit={handleSubmit((data) => onSubmit(data))}>
							<div>
								<label className='block w-full text-gray-600 mt-4 lg:mt-6' htmlFor='name'>
									Full Name
								</label>
								<input className={`w-full p-3 md:p-4 mt-3 focus:outline-none bg-gray-100 w-full rounded ${errors.name ? 'border-red-400' : 'border-gray-300'}`} type='full-name' id='name' placeholder='Full Name ...' {...register('name')} />
								<small className='text-red-500'>{errors.name && <p>{errors.name.message}</p>}</small>
							</div>
							<div>
								<label className='block w-full text-gray-600 mt-4 lg:mt-6' htmlFor='email'>
									Email Address
								</label>
								<input className={`w-full p-3 md:p-4 mt-3 focus:outline-none bg-gray-100 w-full rounded ${errors.email ? 'border-red-400' : 'border-gray-300'}`} type='email' id='email' placeholder='Email Address ...' {...register('email')} />
								<small className='text-red-500'>{errors.email && <p>{errors.email.message}</p>}</small>
							</div>
							<div>
								<label className='block w-full rounded text-gray-600 mt-4 lg:mt-6' htmlFor='phone'>
									Phone
								</label>
								<input className={`w-full p-3 md:p-4 mt-3 focus:outline-none bg-gray-100 w-full rounded ${errors.phone ? 'border-red-400' : 'border-gray-300'}`} type='number' id='phone' placeholder='Phone ...' {...register('phone')} />
								<small className='text-red-500'>{errors.phone && <p>{errors.phone.message}</p>}</small>
							</div>
							<div>
								<label className='block w-full rounded text-gray-600 mt-4 lg:mt-6' htmlFor='message'>
									Message
								</label>
								<textarea
									className={`w-full p-3 md:p-4 mt-3 focus:outline-none bg-gray-100 w-full rounded ${errors.message ? 'border-red-400' : 'border-gray-300'}`}
									rows={8}
									id='message'
									placeholder='Message ...'
									defaultValue={''}
									{...register('message')}
								></textarea>
								<small className='text-red-500'>{errors.message && <p>{errors.message.message}</p>}</small>
							</div>
							{/* <input className="btn px-4 py-2 dark-blue-bg text-white rounded-full text-center relative mt-4 cursor-pointer" type="submit" defaultValue="Send Message" /> */}
							<div>
								<button type='submit' className='text-white py-3 px-6 sm:py-3 sm:px-10 rounded-full shadow-lg cursor-pointer w-max font-bold relative dark-blue-bg read-more-btn mt-2 sm:mt-4 lg:mt-6 sm:text-lg'>
									Send Message
								</button>
							</div>
						</form>
					</div>
					<div className='contact-details-container mt-14 md:mt-6 md:w-6/12 md:ml-8 leading-snug text-gray-600'>
						{/* <div dangerouslySetInnerHTML={{ __html: props.page.content }}></div> */}

						<h3 className='text-3xl font-bold text-black'>Get Office Info</h3>
						<p className='text-gray-600 mt-2'>We appreciate your comments and questions. Please call 516 593 7100 or complete this brief form.</p>
						<div className='contact-location'>
							<div className='text-lg text-black mt-4 font-semibold'>Our Address</div>
							<address className='location-detail flex mt-1'>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='#000000'>
									<path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
								</svg>
								<div>1188 Willis Ave Suite#801, Albertson, NY 11507</div>
							</address>
							<div className='text-lg text-black mt-4 font-semibold'>Contact Number</div>
							<div className='location-detail flex mt-1'>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='#000000'>
									<path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
								</svg>
								<div>Office: (516) 385-3434 - (833) 906-7575</div>
							</div>
							<div className='text-lg text-black mt-4 font-semibold'>Email Address</div>
							<div className='location-detail flex mt-1'>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-1' viewBox='0 0 20 20' fill='#000000'>
									<path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
									<path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
								</svg>
								<div>
									<span className='inline-block'>Email:{' '}
									<span className='primary-blue-color'>
										<a href='mailto:info@gervetusa.com'>info@gervetusa.com</a>
									</span>
                                    </span>
									<br />
                                    <span className='inline-block mt-0.5'>
									Support:{' '}
									<span className='primary-blue-color'>
										<a href='mailto:sales@gervetusa.com'>sales@gervetusa.com</a>
									</span>
                                    </span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`alert-message ${successMessage.type == 'error' ? 'error' : ''}${successMessage.type == 'success' || successMessage.type == 'error' ? '' : 'hidden'}`}>{successMessage.message}</div>
		</>
	);
};

export default Contacts;
