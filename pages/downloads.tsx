import Head from 'next/head';
import React, { Fragment } from 'react'
import DownloadsSection from '../components/Downloads/DownloadsSection';
import { API_BASE_URL } from '../lib/constants';
import Breadcrumb from '../UIComponents/Breadcrumb';

export const getServerSideProps = async (context: any) => {
    const result = await fetch(`${API_BASE_URL}downloads`)
    const res = await result.json()

    return {
        props: {downloads: res.flyers.data}
    }
}

const downloads = ({downloads}: any) => {

    const data = {"name" : "Downloads"};

    return (
        <Fragment>
            <Head>
                <title>{`Downloads - GerDentUSA`}</title>
            </Head>
            <Breadcrumb data={data} />
            <DownloadsSection downloads={downloads} />
        </Fragment>
    )
}

export default downloads