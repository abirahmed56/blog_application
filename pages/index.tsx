import Blogs from "../components/blogs";
import { NextSeo } from "next-seo";
import { useSession, signOut, signIn } from "next-auth/react";
import BlogGuist from "../components/blogs/BlogGuist";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <NextSeo description="This is Blog application Home page..All blogs from different author will be appear here.." />
        <h1>WELCOME {session.user?.name} TO THE BLOG</h1>
        <button onClick={()=> signOut()}>signOut</button>
        <br />
        <br />

        <div>
          <Blogs authorName ={session?.user?.name}/>
        </div>
      </>
    );
  } else if (status === "loading") {
    return <div>Loading.....</div>;
  } else {
    return(
      <>
        <div>You are not signIn..</div>
        <h1>WELCOME AS A GUIST .........</h1>
        <button onClick={()=> signIn()}>signIn</button>
        <br />
        <br />

        <div>
          <BlogGuist />
        </div>
      </>

    ) 
  }
}
