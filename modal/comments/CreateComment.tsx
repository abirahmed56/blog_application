import React from "react";
import { EditFilled } from "@ant-design/icons";
import { Button, Drawer, message } from "antd";
import { useToggle } from "../../hooks/toggle";
import { Form, Input, Row, Col } from "antd";

function CreateComment(props: any) {
  const { toggle, visible } = useToggle();
  const [form] = Form.useForm();

  const createRequest = (value: any) => {
    const blogId = props.data._id;

    fetch(
      "/api/comments/commenthandler?" +
        new URLSearchParams({
          blogId,

        }),
      {
        method: "POST",
        body: JSON.stringify({
          content: value.content,
          authorName: props.authorName,

          
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
      createRequest(values);
      message.success("successfully commented....");
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
        Comment
      </Button>
      <Drawer
        destroyOnClose
        open={visible}
        width="100%"
        onClose={() => {
          toggle();
        }}
        title="Create Comment"
        extra={[
          <Button type="primary" key={0} onClick={form.submit}>
            Comment
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
            name="content"
            label="Content"
            rules={[
              {
                required: true,
                message: "Please enter comment content",
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

export default CreateComment;
