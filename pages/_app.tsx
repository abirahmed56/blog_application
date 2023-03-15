import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo';
import { SessionProvider, useSession } from "next-auth/react";

export default function App({  Component,  pageProps: { session, ...pageProps },}: any) {
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
        <SessionProvider >
            <Component {...pageProps} />
        </SessionProvider>
         </>
        

  )
  
}

function Auth({ children }: any) {
    // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
    const { status } = useSession({ required: true })
  
    if (status === "loading") {
      return <div>Loading...</div>
    }
  
    return children
  }