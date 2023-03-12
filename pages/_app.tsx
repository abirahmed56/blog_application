import type { AppProps } from 'next/app'
import nextSeoConfig from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps, }: AppProps) {
  return (
    <>
        <DefaultSeo
            title='Blog Application'
            description='This is a Blog Application'
        />
        <Component {...pageProps} />
    </>
  )
  
}