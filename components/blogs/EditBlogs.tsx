import React from 'react'
import { FormInstance, Form, Input, Row, Col, Switch, Button } from "antd";

function EditBlogs(props:any) {
    const updateRequest = (value:any)=>{
        fetch("/api/blogs/bloghandler2",{
            method: "PUT",
            body:JSON.stringify({
                tittle: value.tittle,
                content: "No",
                _id: props._id
            }),
            headers:{
                "Content-Type":"application/json"
            },
        }).then((res)=>res.json).then((data)=>console.log(data));
    }

  const onFinish = async (values: any) => {
    console.log(values);
    if(!values.tittle && !values.content){
        return;
    }else{
        updateRequest(values);
    }

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
  <Form
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Row>
      <Col sm={6}>
      <Form.Item>
    </Form.Item>
      </Col>
    </Row>
    <Form.Item
      name="tittle"
      label="Tittle"
      rules={[
        {
          required: true,
          message: "Please enter document title",
          max: 30,
        },
      ]}
    >
      <Input placeholder="Tittle" />
    </Form.Item>

    <Form.Item
      name="content"
      label="Content"
      rules={[
        {
          required: true,
          message: "Please enter document content",
        },
      ]}
    >
      <Input.TextArea />
    </Form.Item>
    <Button type="primary" htmlType="submit">
        create
      </Button>
  </Form>
);
}

export default EditBlogs