import React from "react";
import Admin from "../components/blogs/AdminContent";
import Create from "../modal/Create";

function admin() {
  return (
    <>
      <h1 className="admin_blog_tittle"> WELCOME TO THE ADMIN PANEL</h1>
      <br />
      <br />
      <Create />
      <Admin />
    </>
  );
}

export default admin;
