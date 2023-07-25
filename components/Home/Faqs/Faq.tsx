const Faq = ( props : any ) => {

    return (
        <>
            <ul className={`accordion-wrapper accord${props.faq.id} cursor-pointer`} onClick={(e)=>props.openAccordian(e, props.faq.id)}>
                <li>
                    <h3 className="flex justify-between w-full leading-normal font-semibold p-4 sm:p-6 text-gray-900 items-center border-b border-solid border-gray-300 relative overflow-hidden">
                        <span className="mr-4">
                            {props.faq.question}
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 open-icon-place open-icon ${props.faq.id} absolute`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#52A0F2"
                            style={{ transform: 'translate(2.5%, -50%) rotate(0deg)' }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </h3>
                </li>
                <div className={`text-hider ${props.faq.id} `}>
                    <p className="p-4 sm:p-6 leading-normal bg-white rounded-lg border-b border-solid border-gray-300">
                        {props.faq.answer}
                    </p>
                </div>
            </ul>

        </>
    );
};

export default Faq;
