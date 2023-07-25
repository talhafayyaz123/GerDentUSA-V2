import React, { useEffect } from 'react'

const ReviewSection = (props: any) => {

    useEffect(() => {
    }, [props])

    

    return (
        // <div className={`review-form mt-14 ${props.showSection==true ? '' : 'hidden'}`}>
            <>
                <div className={`review-form mt-14 ${props.showSection==true ? '' : 'hidden'}`}>
                    <h3 className="text-lg font-semibold">Add a review:</h3>
                    <p className="text-sm mt-4">Your rating</p>
                    <div className="star-rating flex mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1 cursor-pointer star" fill="none" viewBox="0 0 24 24" stroke="#52a0f2" data-value={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1 cursor-pointer star" fill="none" viewBox="0 0 24 24" stroke="#52a0f2" data-value={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1 cursor-pointer star" fill="none" viewBox="0 0 24 24" stroke="#52a0f2" data-value={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-1 cursor-pointer star" fill="none" viewBox="0 0 24 24" stroke="#52a0f2" data-value={4}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer star" fill="none" viewBox="0 0 24 24" stroke="#52a0f2" data-value={5}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <div className="comment mt-6">
                        <form action="#">
                            <label>
                                Comment:
                                <textarea className="mt-6 focus:outline-none text-gray-600 w-full" name="user-comment" id="user-comment" cols={30} rows={15} defaultValue={""} />
                            </label>
                            <div className="flex flex-col sm:flex-row justify-between">
                                <label htmlFor="name" className="flex flex-col mt-6 w-full sm:w-3/12">Name
                                    <input className="mt-4 p-3 focus:outline-none text-gray-600 text-sm" type="name" required placeholder="Your Name" />
                                </label>
                                <label htmlFor="email" className="flex flex-col mt-6 w-full sm:w-3/12">Email
                                    <input className="mt-4 p-3 focus:outline-none text-gray-600 text-sm" type="email" required placeholder="Your email" />
                                </label>
                                <label htmlFor="phone" className="flex flex-col mt-6 w-full sm:w-3/12">Phone
                                    <input className="mt-4 p-3 focus:outline-none text-gray-600 text-sm" type="name" required placeholder="Your phone" />
                                </label>
                            </div>
                            <button className="chat-btn bg-black text-white py-4 px-8 rounded-full shadow-lg cursor-pointer w-max font-bold relative mt-6">Post Comment</button>
                        </form>
                    </div>
                </div>
            </>
    )
}

export default ReviewSection
