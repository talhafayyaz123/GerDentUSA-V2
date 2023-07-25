import Link from 'next/link';
import { useContext } from 'react';
import { MainContext } from '../../contexts/MainContext';

const DesktopNav = () => {
	const { setIsLoading, redirectTo } = useContext(MainContext);

	return (
		<>
			<div className='nav-links-container-desk hidden'>
				<ul className='nav-link-wrapper flex'>
					<li className='mr-6 relative'>
						<Link href={'/'}>
							<a className='cursor-pointer' onClick={() => setIsLoading(true)}>
								{' '}
								Home{' '}
							</a>
						</Link>
					</li>
					{/* <li className="mr-6 relative">
                        <Link href={'/all-instruments'}>
                        <a className="cursor-pointer" onClick={()=>setIsLoading(true)}> All Instruments </a>
                        </Link>
                    </li> */}
					<div className='mr-6 relative cursor-pointer mega-menu-links-container'>
						<div className='mega-menu-links-wrapper-desk text-gray-600 flex'>
							<span className='mr-1'>About Us</span>
							<svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='#aaa'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
							</svg>
						</div>
						<div className='mega-menu-links-inner-wrapper flex flex-col absolute top-12 left-0 z-20 bg-white rounded-lg shadow-lg border border-gray-300 border-solid opacity-0 invisible'>
							<div className='relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg'>
								<Link href='/pages/about-us'>
									<a onClick={() => setIsLoading(true)}>About Us</a>
								</Link>
							</div>
							<div className='relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg'>
								<Link href='/pages/our-mission'>
									<a onClick={() => setIsLoading(true)}>Our Mission</a>
								</Link>
							</div>
							<div className='relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg'>
								<Link href='/pages/payment-info'>
									<a onClick={() => setIsLoading(true)}>Payment Info</a>
								</Link>
							</div>
							<div className='relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg'>
								<Link href='/pages/shipping-and-returns'>
									<a onClick={() => setIsLoading(true)}>Shipping &amp; Returns</a>
								</Link>
							</div>
							<div className='relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg'>
								<Link href='/pages/condition-of-use'>
									<a onClick={() => setIsLoading(true)}>Condition Of Use</a>
								</Link>
							</div>
							<div className='relative p-4 mega-menu-link border-b border-solid border-gray-300 rounded-lg'>
								<Link href='/contacts'>
									<a onClick={() => setIsLoading(true)}>Contact Us</a>
								</Link>
							</div>
						</div>
					</div>
					<li className='mr-6 relative cursor-pointer'>
						<Link href={'/downloads'}>
							<a onClick={() => setIsLoading(true)}> Downloads </a>
						</Link>
					</li>
					<li className='mr-6 relative cursor-pointer'>
						<Link href={'/pages/videos'}>
							<a onClick={() => setIsLoading(true)}> Videos </a>
						</Link>
					</li>
					<li className='mr-6 relative cursor-pointer'>
						<Link href={'/blog'}>
							<a onClick={() => setIsLoading(true)}> Blogs </a>
						</Link>
					</li>
					<li className='mr-6 relative cursor-pointer'>
						<Link href={'/show-special/greater-ny-dental-meeting'}>
							<a onClick={() => setIsLoading(true)}> Show Special </a>
						</Link>
					</li>
					<li className='relative cursor-pointer'>
						<Link href={'/trade-shows'}>
							<a onClick={() => setIsLoading(true)}> Trade Shows </a>
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
};

export default DesktopNav;
