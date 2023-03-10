import React from "react";
import { EditFilled } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { Button, Drawer, message, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useToggle } from "../hooks/toggle";
import { useEffect } from "react";
import { Form, Input, Row, Col, Switch } from "antd";

function Update(prop:any) {
  const { toggle, visible } = useToggle();
  const resetFields = () => {
    // form.setFieldsValue(props.document);
  };
  const updateRequest = (value: any) => {
    console.log(prop);
    const blogId = prop.data._id;
    console.log(blogId)
    
    fetch(
      "/api/blogs/bloghandler?" + new URLSearchParams({
          blogId
        }),
      {
        method: "PUT",
        body: JSON.stringify({
          tittle: value.tittle,
          content: value.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json)
      .then((data) => console.log(data));
  };

  const onFinish = async (values: any) => {
    console.log(values);
    if (!values.tittle && !values.content) {
      return;
    } else {
      updateRequest(values);
      message.success("UPDATED..")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {/* <Button type="text" size="small" onClick={toggle}>
        <EditFilled />
        Edit
      </Button> */}
      <Drawer
        destroyOnClose
        open={visible}
        width="100%"
        onClose={() => {
          toggle();
          resetFields();
        }}
        title="Update Document"
        extra={[
          <Button type="primary" key={0} onClick={console.log}>
            Update
          </Button>,
        ]}
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
            Update
          </Button>
        </Form>
      </Drawer>
    </>
  );
}

export default Update;
