import React from "react";
import { List, Card } from "antd";
import { useState, useEffect } from "react";
import Update from "../../modal/Update";
import Delete from "../../modal/Delete";

const Admin = () => {
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
            <Update data={data} />
            <Delete data={data} />

            <Card title={data.title}>
              <p> {data.content}</p>
            </Card>
            <br />
            <br />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Admin;
