import React from 'react'
import { List, Card } from "antd";
import { useState, useEffect } from "react";

function Comments(props: any) {
  const [data, setData] = useState();

  const sendRequest = (value:any) => {
    fetch("/api/comments/commenthandler?" + 
    new URLSearchParams({
      blogId: value
    }),
    )
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    sendRequest(props.blogId);
  }, []);
  return (
    <div>
      <List

        dataSource={data}
        renderItem={(data: any) => (
          <List.Item title={data.authorName}>
              <p>{data.authorName}: {data.content}</p>

          </List.Item>
        )}
      />

    </div>
  )
}

export default Comments