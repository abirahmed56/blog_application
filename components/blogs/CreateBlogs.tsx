import React from "react";
import { FormInstance, Form, Input, Row, Col, Switch, Button } from "antd";
interface Props {
  onSubmit: (document: any) => void;
  form: FormInstance;
}

export const CreateBlogs = () => {

    const sendRequest = (value:any)=>{
        fetch("/api/blogs/bloghandler",{
            method: "POST",
            body:JSON.stringify({
                tittle: value.tittle,
                content: value.content
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
        sendRequest(values);
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
};
