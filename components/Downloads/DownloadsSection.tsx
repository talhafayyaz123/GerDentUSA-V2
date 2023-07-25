import React from 'react';
import { useContext, useEffect } from 'react';
import { BASE_URL } from '../../lib/constants';
import { MainContext } from '../../contexts/MainContext';
import Image from 'next/image';
import Style from './Download.module.css';

const DownloadsSection = (props: any) => {
	const { setIsLoading } = useContext(MainContext);

	useEffect(() => {
		setIsLoading(false);
	}, [setIsLoading, props]);

	return (
		<div className='mb-28 mt-14 relative width'>
			<h2 className='text-3xl font-bold'>Downloads</h2>
			<div className='downloads-imgs-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 gap-x-2 text-sm leading-snug'>
				{props.downloads.map((download: any, index: any) => {
					return (
						<a key={index} href={`${BASE_URL}up_data/flyers/pdfs/${download.pdf_file}`} download className='download-img-container flex flex-col text-center items-center mt-3 sm:mt-6' target='_blank' rel='noreferrer'>
							<div className={`${Style.download_img_wrapper} border border-solid border-gray-300`}>
								<Image layout='intrinsic' width={200} height={260} src={`${BASE_URL}up_data/flyers/images/${download.image}`} alt={download.name} />
							</div>
							<div className='download-img-detail mt-2 w-8/12'>Buy One Get One 50% Off - 2021</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default DownloadsSection;
