import React from "react";
import { List, Card } from "antd";
import { useState, useEffect } from "react";
import Comments from "./Comments";


const BlogGuist = (props: any) => {
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
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(data: any) => (
          <List.Item>
            <Card title={data.title}>
              <p> {data.content}</p>
            </Card>
            <Comments blogId ={data._id}/>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BlogGuist;