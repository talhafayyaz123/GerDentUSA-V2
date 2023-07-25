import { NextPage } from 'next';
import Head from 'next/head';
import Footer from './Footer/Footer';
import Script from 'next/script';
import { MainContext } from '../contexts/MainContext';
import { useContext, useEffect, useState } from 'react';
import Nav from './Nav/Nav';
import { MessageProvider } from '../contexts/MessageContext';
import Spin from '../UIComponents/pagination/spinner/spin';
import { SITE_URL } from '../lib/constants';

const Layout: NextPage = ({ children }: any) => {
	const { OpenAllCat, CartOpen, isTopBar, isLoading } = useContext(MainContext);
	const [ncOpen, setNcOpen] = useState(0);
	const [menuRecord, setMenuRecord] = useState<any>([]);
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		window.addEventListener('load', () => {
			document.body.style.visibility = 'visible';
		});

		const mainManu = async () => {
			try {
				const res = await fetch(`${SITE_URL}api/menus`);
				const resData = await res.json();
				setMenuRecord(resData);
			} catch (error) {
				console.error(error);
			}
		};
		mainManu();
		setVisible(true)
	}, [isTopBar]);

	return (
		<>
			<Head>
				<link href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap' rel='stylesheet' />
				<title>Dental Surgical Instruments, Manufacturer and Supplier - GerDentUSA</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='description' content={'GerDentUSA manufactures and sells the finest dental surgical instruments. We have a wide range of oral surgery instruments for your dental practice.'} />
				<meta name='keywords' content={'Dental Surgical Instruments, surgical dental instruments, oral surgery instruments, oral surgical instruments, dentistry instruments'} />
				<meta name='author' content={'GermedUSAIT'} />
				<meta name='msapplication-TileColor' content='#52a0f2' />
				<meta name='msapplication-TileImage' content='/assets/icons/favicons/logo-32x32.png' />
				<meta name='msapplication-config' content='/assets/icons/favicons/browserconfig.xml' />
				<link rel='shortcut icon' type='image/png' sizes='16x16' href='/assets/icons/favicons/logo-16x16.png' />
				<link rel='shortcut icon' type='image/png' sizes='32x32' href='/assets/icons/favicons/logo-32x32.png' />
				<link rel='apple-touch-icon' sizes='180x180' type='image/png' href='/assets/icons/favicons/logo-180x180.png' />
				<link rel='shortcut icon' type='image/x-icon' href='/assets/icons/favicons/favicon.ico' />
				<link rel='mask-icon' href='/assets/icons/favicons/white-logo.svg' color='#52a0f2' />

				<meta property="og:title" content="GerdentUSA" />
				<meta property="og:site_name" content="GerdentUSA" />
				<meta property="og:url" content="https://www.gerdentusa.com/" />
				<meta property="og:description" content="GerDentUSA manufactures and sells the finest dental surgical instruments. We have a wide range of oral surgery instruments for your dental practice." />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/assets/icons/favicons/social-bg.png" />
				<meta property="og:image:width" content="1366" />
				<meta property="og:image:height" content="582" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@Gerdentusa" />
				<meta name="twitter:creator" content="@Gerdentusa" />
				<meta name="twitter:title" content="GerdentUSA" />
				<meta name="twitter:description" content="GerDentUSA manufactures and sells the finest dental surgical instruments. We have a wide range of oral surgery instruments for your dental practice." />
				<meta name="twitter:image" content="/assets/icons/favicons/social-bg.png" />

			</Head>
			<div className={`${OpenAllCat == 1 || CartOpen == 1 ? 'body-height' : ''} ${visible==false ? 'hidden' : 'visible'}`}>
				<MessageProvider>
					<Nav ncOpen={ncOpen} setNcOpen={setNcOpen} menuRecord={menuRecord} />
					{isLoading == true && <Spin />}
					<main className={`home-page relative ${isTopBar == 0 ? 'mt-0' : ''} ${isLoading == false ? 'opacity-1-trans' : 'opacity-0'} `}>{children}</main>
					<Footer />
				</MessageProvider>
			</div>
			<Script src='/assets/js/nav.js' />
		</>
	);
};

export default Layout;
