import React from 'react'
import { Button, message, Popconfirm, Tooltip } from "antd";

function Delete(props:any) {
    const deleteRequest = (value: any) => {
        fetch(
          "/api/blogs/bloghandler?" +
            new URLSearchParams({
              blogId: value._id,
            }),
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json)
          .then((data) => console.log(data));
    
        message.success("Successfully deleted");
      };
  return (
    <Popconfirm
              title={
                <p style={{ marginBottom: "1rem" }}>
                  Are you sure to delete this document?
                </p>
              }
              onConfirm={(e) => deleteRequest(props.data)}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete">
                <Button type="text" >
                  Delete
                </Button>
              </Tooltip>
    </Popconfirm>
  )
}

export default Delete