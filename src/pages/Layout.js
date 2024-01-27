// import { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import TopNavigation from "@cloudscape-design/components/top-navigation";
// import SideNavigation from "@cloudscape-design/components/side-navigation";
// import Grid from "@cloudscape-design/components/grid";

// export default function Layout() {
//   const [activeHref, setActiveHref] = useState("#/page1");
//   const navigate = useNavigate();
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;

//   return (
//     <>
//       <TopNavigation
//         identity={{
//           href: "/",
//           title: "帳票出力",
//         }}
//       />
//       <Grid gridDefinition={[{ colspan: 2 }, { colspan: 10 }]}>
//         <div>
//           <SideNavigation
//             activeHref={activeHref}
//             onFollow={(event) => {
//               if (!event.detail.external) {
//                 event.preventDefault();
//                 setActiveHref(event.detail.href);
//                 navigate(event.detail.href);
//               }
//             }}
//             items={[
//               { type: "link", text: "案件検索", href: "project" },
//               { type: "link", text: "帳票データ", href: "ledger-sheet/1" },
//               { type: "link", text: "履歴照会", href: "output-log" },
//             ]}
//           />
//         </div>
//         <div id="detail">
//           <Outlet />
//         </div>
//       </Grid>
//     </>
//   );
// }
