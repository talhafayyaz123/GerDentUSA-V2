import Faq from '../Home/Faqs/Faq';

const FaqsSection = (props: any) => {

    const openAccordian = (e: any, id: any) => {

        let accordionOpener = document.querySelectorAll('.accordion-wrapper li h3');
        let textHider = document.querySelectorAll('.text-hider');
        let openIcons = document.querySelectorAll('.open-icon');

        accordionOpener.forEach((acc, index) => {
            if (e.target == acc || e.target == acc.firstElementChild)
            {
                let thisText: any = textHider[index];
                let thisOpenIcon: any = openIcons[index];

                textHider.forEach((hider: any) => {
                    if (hider != thisText && hider.classList.contains('acc-opened')) {
                        openIcons.forEach((icon: any) => {
                            if (icon != thisOpenIcon && icon.classList.contains('icon-rotated')) {
                                icon.classList.remove('icon-rotated');
                                icon.style.transform = 'translate(2.5%, -50%) rotate(0deg)';
                            }
                        });

                        hider.classList.remove('acc-opened');
                        hider.style.maxHeight = null;
                    }
                });

                if (thisText.classList.contains('acc-opened')) {
                    thisText.classList.remove('acc-opened');

                    if (thisOpenIcon.classList.contains('icon-rotated')) {
                        thisOpenIcon.style.transform = 'translate(2.5%, -50%) rotate(0deg)';
                    }

                    thisText.style.maxHeight = null;
                } else {
                    thisText.classList.add('acc-opened');

                    thisOpenIcon.classList.add('icon-rotated');

                    thisOpenIcon.style.transform = 'translate(2.5%, -50%) rotate(180deg)';

                    thisText.style.maxHeight = thisText.scrollHeight + 'px';
                }
            }
        })
    }

    return (
        <div className="Cart-page relative">
            <div className="cart-page-container width mt-14 mb-28">
                <h2 className="text-3xl font-bold">
                Frequently Asked Question&apos;s
                </h2>
                <section className="blog">
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full md:w-4/5 lg:w-3/4 mx-auto mt-12">
                            <div className="accordion-container w-full rounded-lg shadow-md bg-gray-100 border border-gray-300 border-solid">
                                {props.Faqs.faqs != undefined && 
                                    props.Faqs.faqs.map((faq : any) => {
                                        return (<Faq openAccordian={openAccordian} key={faq.id} faq={faq} />)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FaqsSection