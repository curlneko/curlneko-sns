import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/auth/authSlice'

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Spin } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const headerItems = ["ホーム", "つながり", "メッセージ", "お知らせ"].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

const App = () => {
  const { token } = theme.useToken();

  const authState = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const result = true;

  const auth = async () => {
    await fetch("http://localhost:8083/auth/verify", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        if (result === true) {
          dispatch(login())
        } else {
          dispatch(logout())
          navigate("/login");
        }

      })
      .catch((err) => { });
  }

  useEffect(() => {
    auth();
  }, [])

  // if (authState) { return <Spin /> }

  if (authState === true) {
    return (
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo">logologo</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={headerItems}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Layout
          style={{
            padding: "24px 48px",
            // background: token.colorBgContainer,
            // borderRadius: token.borderRadiusLG,
          }}
        >
          <Outlet />
        </Layout>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by curlneko
        </Footer>
      </Layout>
    );
  }
  else {
    return <Spin />
  }

};
export default App;
