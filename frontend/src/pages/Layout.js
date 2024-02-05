import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const headerItems = ["ホーム", "つながり", "メッセージ", "お知らせ"].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

const App = () => {
  const { token } = theme.useToken();
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
};
export default App;
