import React from "react";
import Admin from "../components/blogs/AdminContent";
import Create from "../modal/posts/Create";
import { NextSeo } from "next-seo";
import { useSession, signOut } from 'next-auth/react'
import { Button } from "antd";

function admin() {
  const {data: session} = useSession()
  return (
    <>
      <NextSeo
            title="Admin"
            description="This is admin page of Blog Application"
            
        />
     
      <h1 className="admin_blog_tittle"> WELCOME {session?.user?.name}TO THE ADMIN PANEL</h1>
      <br />
      <br />
      <Button type="text" onClick={()=> signOut()}>signOut</Button>
      <Create session ={session}/>
      <Admin />
    </>
  );
}

export default admin;
