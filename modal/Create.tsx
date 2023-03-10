import React from "react";
import { Button, Drawer, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useToggle } from "../hooks/toggle";
import { Form, Input, Row, Col } from "antd";

function Create() {
  const { toggle, visible } = useToggle();
  const sendRequest = (value: any) => {
    fetch("/api/blogs/bloghandler", {
      method: "POST",
      body: JSON.stringify({
        tittle: value.tittle,
        content: value.content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json)
      .then((data) => console.log(data));
  };

  const onFinish = async (values: any) => {
    console.log(values);
    if (!values.tittle && !values.content) {
      return;
    } else {
      sendRequest(values);
      message.success("Created Successfull");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Button onClick={toggle} type="primary" icon={<PlusOutlined />}>
        New
      </Button>
      <Drawer
        destroyOnClose
        open={visible}
        width="100%"
        onClose={toggle}
        title="Create Document"
        // extra={[
        //   <Button type="primary" key={0} onClick={console.log}>
        //     Create
        //   </Button>,
        // ]}
      >
        {/* <Spin spinning={loading}>
          <DocumentUpsertForm onSubmit={handleSubmit} form={form} />
        </Spin> */}
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col sm={6}>
              <Form.Item></Form.Item>
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
      </Drawer>
    </>
  );
}

export default Create;
