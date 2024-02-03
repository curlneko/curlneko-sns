import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Card, theme, Avatar } from "antd";

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

const headerItems = ["ホーム", "つながり", "メッセージ", "お知らせ"].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

export default function Main() {
  const url = "http://localhost:8083/users";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
        console.log("err");
      });
  }, []);

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
        <Card
          hoverable
          style={{
            width: 200,
          }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta title="佐藤　時穂" description="システムエンジニア" />
        </Card>
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
          style={{ width: "auto" }}
          title="Card title"
          type="inner"
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <LikeOutlined key="like"/>,
            <CommentOutlined key="comment"/>,
            <ShareAltOutlined key="share"/>,
          ]}
          bordered={false}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Card title"
            description="This is the description"
          />
          <div style={{ padding: "18px 0" }}>Card content</div>
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
        <div classname="App">
          <h1>Users</h1>
          {users.map((user, index) => (
            <div key={index}>{user.name}</div>
          ))}
        </div>
      </Content>
    </Layout>
  );
}
