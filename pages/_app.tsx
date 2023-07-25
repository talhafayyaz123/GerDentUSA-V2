import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layouts";
import { MainProvider } from '../contexts/MainContext'
import { SessionProvider } from '../contexts/SessionContext';

function MyApp({ Component, pageProps }: AppProps,) {
    return (
        <MainProvider>
            <SessionProvider>
                <Layout >
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </MainProvider>
    )
}

export default MyApp