import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../features/auth/authSlice'

import { Button, Checkbox, Form, Input } from "antd";

const url = "http://localhost:8083/auth/login";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Main() {

  const authState = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const result = true;


  const onFinish = async (values) => {
    console.log(values);
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (result === true) {
          dispatch(login())
          navigate("/home");
        } else {
          dispatch(logout())
          navigate("/login");
        }
      })
      .catch((err) => {
        //
      });
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </>
  );
}
