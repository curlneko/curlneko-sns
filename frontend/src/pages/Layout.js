import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { login, logout } from '../features/auth/authSlice'
import { useQueryVerify, useMutationLogout } from "../api/auth/api";

import { Layout, Menu, Spin } from "antd";

import {
  UserOutlined,
  HomeOutlined,
  MessageOutlined,
  LogoutOutlined,
  NotificationOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;



const ReturnLayout = () => {
  const { status: logoutStatus, data: logoutData, mutate } = useMutationLogout();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (logoutStatus === "success") {
    console.log(logoutData.result.status);
    if(logoutData.result.status === true){
      dispatch(logout());
      navigate('/login');
      return <></>
    }
  }

  const headerItems = [
    {
      label: 'ホーム',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: 'つながり',
      key: 'friend',
      icon: <UserOutlined />,
      // disabled: true,
    },
    {
      label: 'メッセージ',
      key: 'message',
      icon: <MessageOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: 'お知らせ',
      key: 'notification',
      icon: <NotificationOutlined />,
    },
    {
      label: 'ログアウト',
      key: 'logout',
      onClick: () => mutate(),
      icon: <LogoutOutlined />,
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
