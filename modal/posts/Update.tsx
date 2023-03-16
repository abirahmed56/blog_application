import React from "react";
import { EditFilled } from "@ant-design/icons";
import { Button, Drawer, message } from "antd";
import { useToggle } from "../../hooks/toggle";
import { useEffect } from "react";
import { Form, Input, Row, Col } from "antd";

function Update(props: any) {
  const { toggle, visible } = useToggle();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.data);
  }, [props.data]);

  const updateRequest = (value: any) => {
    const blogId = props.data._id;

    fetch(
      "/api/blogs/bloghandler?" +
        new URLSearchParams({
          blogId,
        }),
      {
        method: "PUT",
        body: JSON.stringify({
          title: value.title,
          content: value.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json);
  };

  const onFinish = async (values: any) => {
    if (!values.title && !values.content) {
      return;
    } else {
      updateRequest(values);
      message.success("UPDATED..");
      toggle();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button type="text" size="small" onClick={toggle}>
        <EditFilled />
        Edit
      </Button>
      <Drawer
        destroyOnClose
        open={visible}
        width="100%"
        onClose={() => {
          toggle();
        }}
        title="Update Document"
        extra={[
          <Button type="primary" key={0} onClick={form.submit}>
            Update
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

export default Update;
