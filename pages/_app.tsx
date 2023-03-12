import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps, }: AppProps) {
  return (
    <> 
        <DefaultSeo
            title='Blog Application' 
            description='This is a Blog Application'
            openGraph={{
                url: 'https://www.shutterstock.com',
                title: 'Blog_Application',
                description: 'Write and Read Blogs',
                images:[
                    {
                        url: 'https://www.shutterstock.com/image-photo/working-home-laptop-woman-writing-blog-348905468',
                        alt:'Blogs',
                        type:'image/jpeg'
                    },
                ],
                site_name: 'Blog_Application'
            }
            }
        />
        <Component {...pageProps} />
    </>
  )
  
}