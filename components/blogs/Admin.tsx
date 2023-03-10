import React from "react";
import { List, Card, Button } from "antd";
import { useState, useEffect } from "react";
import EditBlogs from "./EditBlogs";

const  Admin=()=> {
  const [data, setData] = useState();

  const deleteRequest = (value:any)=>{
    fetch("/api/blogs/bloghandler?" + new URLSearchParams ({
      blogId: value._id
    }),{
        method: "DELETE",
    }).then((res)=>res.json).then((data)=>console.log(data));
}
  const sendRequest = () => {
    fetch("/api/blogs/bloghandler")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <div>
        <h1 className="admin_blog_tittle"> WELCOME TO THE ADMIN PANEL</h1>
    <br/>
    <br />
    <List
      grid={{
      gutter: 16,
      xs: 1,
      sm: 1,
      md: 1,
      lg: 1,
      xl: 1,
      xxl: 1,
      }}
          dataSource={data}
          renderItem={(data: any) => (
          <List.Item>
              <Button>Edit</Button>
              <Button onClick={((e)=>deleteRequest(data))}>Delete</Button>
              <Card
              
              title={data.tittle}
              >
              <p> {data.content}</p>
              </Card>  
              <br />
              <br />
          </List.Item>
          )}
      />
</div>
  );
}

export default Admin;
