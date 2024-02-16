import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { login, logout } from '../../features/auth/authSlice'
import { useMutationLogin, useQueryVerify } from "../../api/auth/api";

import RegisterModal from './RegisterModal'

import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  Typography,
  Col,
  Row,
  Select
} from "antd";

const { Header, Footer, Sider, Content } = Layout;

const { Title } = Typography;

const url = "http://localhost:8083/auth/login";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};



const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',

};

export default function Main() {
  const [open, setOpen] = useState(false);

  const [isOkToVerify, setIsOkToVerify] = useState(false)
  const { status: verifyStatus, data: verifyData } = useQueryVerify(isOkToVerify);
  const authState = useSelector((state) => state.auth.value);

  const { status: loginStatus, data: loginData, mutate } = useMutationLogin();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    mutate(values);
  };



  if (loginStatus === "success") {
    if (loginData.result.status === true) {
      dispatch(login())
      navigate("/home");
      return <></>;
    }
  }

  if (authState === true) {
    navigate("/home");
    return <></>;
  }

  if (isOkToVerify === false) {
    setIsOkToVerify(true);
  }

  if (verifyStatus === "success" ) {
    if (verifyData.result.status === true) {
      dispatch(login())
      navigate("/home");
      return <></>;
    } else {
      dispatch(logout())
      return (
        <Layout style={layoutStyle}>
          <Row justify="center">
            <Col span={6}>
              <Row justify="center">
                <Title>Login</Title>
              </Row>
              <Form
                name="login"
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
                  valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            {/* <Button type="link" onClick={setOpen(true)}>Register</Button> */}
          </Row>
          <RegisterModal
            open={open}
            setOpen={setOpen} />
        </Layout>
      );
    }
  }
}
