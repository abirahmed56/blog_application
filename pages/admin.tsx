import React from "react";
import Admin from "../components/blogs/AdminContent";
import Create from "../modal/Create";
import { NextSeo } from "next-seo";





function admin() {
  return (
    <>
      <NextSeo
            title="Admin"
            description="This is admin page of Blog Application"
            
            
        />
     
      <h1 className="admin_blog_tittle"> WELCOME TO THE ADMIN PANEL</h1>
      <br />
      <br />
      <Create />
      <Admin />
    </>
  );
}

export default admin;
