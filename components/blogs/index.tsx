import React from "react";
import { List, Card } from "antd";
import { useState, useEffect } from "react";

const  Blogs=()=> {
  const [data, setData] = useState();
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
              <Card
              title={data.tittle}
              >
              <p> {data.content}</p>
              </Card>  
          </List.Item>
          )}
      />
</div>
  );
}

export default Blogs;
