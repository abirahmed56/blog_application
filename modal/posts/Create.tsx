import React from "react";
import { Button, Drawer, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useToggle } from "../../hooks/toggle";
import { Form, Input, Row, Col } from "antd";

function Create(props: any) {
  const { toggle, visible } = useToggle();
  const [form] = Form.useForm();

  console.log(props.session?.user);

  const sendRequest = (value: any) => {
    fetch("/api/blogs/bloghandler", {
      method: "POST",
      body: JSON.stringify({
        title: value.title,
        content: value.content,
        authorName: props.session?.user?.name
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json);
  };

  const onFinish = async (values: any) => {
    console.log(values);
    if (!values.title && !values.content) {
      return;
    } else {
      sendRequest(values);
      message.success("Created Successfull");
      toggle();
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
        onClose={() => {
          toggle();
        }}
        title="Create Document"
        extra={[
          <Button type="primary" key={0} onClick={form.submit}>
            Create
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col sm={6}>
              <Form.Item></Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please enter document title",
                max: 30,
              },
            ]}
          >
            <Input placeholder="Title" />
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
        </Form>
      </Drawer>
    </>
  );
}

export default Create;
