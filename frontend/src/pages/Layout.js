import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/auth/authSlice'
import {
  useQueryVerify,
  useMutationLogout
} from "../api/auth/api";

import {
  Layout,
  Menu
} from "antd";

import {
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  LogoutOutlined,
  NotificationOutlined
} from '@ant-design/icons';

import LoginPage from "./LoginPage";

const { Header, Footer } = Layout;

const ReturnLayout = () => {
  const { status: logoutStatus, data: logoutData, mutate } = useMutationLogout();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (logoutStatus === "success") {
    console.log(logoutData.result.status);
    if (logoutData.result.status === true) {
      dispatch(logout());
      // navigate('/login');
      return <LoginPage />
    }
  }

  const headerItems = [
    {
      label: 'ホーム',
      key: 'home',
      icon: <HomeOutlined />,
      onClick: () => navigate('/home'),
    },
    {
      label: 'つながり',
      key: 'friend',
      icon: <UserOutlined />,
    },
    {
      label: 'メッセージ',
      key: 'message',
      icon: <MessageOutlined />,
      onClick: () => navigate('/chat'),
    },
    {
      label: 'お知らせ',
      key: 'notification',
      icon: <NotificationOutlined />,
    },
    {
      label: 'ログアウト',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: () => mutate(),
    },
  ];

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
          padding: "24px",
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




const App = () => {
  const [isOkToVerify, setIsOkToVerify] = useState(false);
  const { status: verifyStatus, data: verifyData } = useQueryVerify(isOkToVerify);

  const authState = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (authState === true) {
    return <ReturnLayout />;
  }

  if (isOkToVerify === false) {
    setIsOkToVerify(true);
  }

  if (verifyStatus === "success") {
    if (verifyData.result.status === true) {
      dispatch(login());
      return <ReturnLayout />;
    } else {
      navigate("/login");
      return <></>;
    }
  }

};
export default App;
