import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Card, theme, Menu } from "antd";

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

const headerItems = ["ホーム", "つながり", "メッセージ", "お知らせ"].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

export default function Main() {
  const { token } = theme.useToken();
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "row",
        // alignItems: "center",
      }}
    >
      <Content
        style={{
          padding: "18px 12px",
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          flex: 1,
          minWidth: 0,
          minHeight: 280,
          margin: "0 12PX",
        }}
      >
        1
      </Content>
      <Content
        style={{
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          padding: "18px 12px",
          flex: 3,
          minWidth: 0,
          minHeight: 280,
          margin: "0 12PX",
        }}
      >
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      </Content>
      <Content
        style={{
          padding: "18px 12px",
          minHeight: 280,
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          flex: 1,
          minWidth: 0,
          margin: "0 12PX",
        }}
      >
        Content
      </Content>
    </Layout>
  );
}
