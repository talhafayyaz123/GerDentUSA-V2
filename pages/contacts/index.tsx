import { NextPage } from 'next';
import { Fragment, useContext, useEffect } from 'react';
import Contacts from '../../components/Contacts/Contacts';
import { API_BASE_URL } from '../../lib/constants';
import Breadcrumb from '../../UIComponents/Breadcrumb';
import Head from 'next/dist/shared/lib/head';
import { MainContext } from '../../contexts/MainContext';

export const getServerSideProps = async (context: any) => {
	const result = await fetch(`${API_BASE_URL}contact`);
	const res: any = await result.json();

	return {
		props: { contact: res }
	};
};

const Contact: NextPage = ({ contact }: any) => {
	const data = { name: contact.breadcrumbs };
	const { setIsLoading } = useContext(MainContext);

	useEffect(() => {
		setIsLoading(false);
	}, [setIsLoading]);
	return (
		<Fragment>
			<Head>
				<title>{`${contact.page.meta_title}`}</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content={contact.page.meta_description} />
				<meta name='keywords' content={contact.page.meta_keywords} />
			</Head>
			<Breadcrumb data={data} />
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1511.4222282238475!2d-73.660289!3d40.743448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3a8f888e638a0c2b!2sGerMedUSA%20Inc!5e0!3m2!1sen!2sus!4v1637927728301!5m2!1sen!2sus'
				className='w-full lite-blue-bg-color'
				style={{ border: 0, width: '100% !important', height: '70vh' }}
				loading='lazy'
			></iframe>

			<Contacts page={contact.page} />
		</Fragment>
	);
};

export default Contact;
