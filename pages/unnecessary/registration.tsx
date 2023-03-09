import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import React, { useState } from 'react';

const sendRequest = (value:any)=>{
  fetch("/api/user",{
    method: "POST",
    body: JSON.stringify({
      name: value.name,
      email: value.email,
      username: value.username,
      password: value.password

    }),
    headers:{
      "Content-Type":"application/json"
    },
  }).then((res)=>res.json).then((data)=>console.log(data));
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Registration(){
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    if(!values.name && !values.email && !values.username && !values.password){
      return
    }else{
      sendRequest(values);
    }
  };


  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        tooltip="Everyone will see this name in the blog post."
        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Registration;