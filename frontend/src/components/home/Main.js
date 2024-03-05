import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Layout,
  Card,
  theme,
  Avatar,
  Divider,
  Space,
  Input,
} from "antd";

import { useQueryPost } from "../../api/post/api";
import PostModal from './PostModal'
import PostCard from './PostCard'

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

const { TextArea } = Input;


export default function Main() {
  const navigate = useNavigate();

  const { status, data, refetch } = useQueryPost();

  let posts = [];
  if (status === "success") {
    posts = data.data.toReversed().map(value => { return (<PostCard key={value.id} post={value.post} />) })
  }

  const [openModal, setOpenModal] = useState(false);

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
          style={{
            padding: "18px 12px",
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            flex: 1,
            minWidth: 0,
            minHeight: 280,
            margin: "0 12PX",
          }}
          hoverable
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          onClick={() => { navigate("/profile") }}
        >

          <Meta title="佐藤　時穂" description="システムエンジニア" />
        </Card>
      </Content>
      <Space
        direction="vertical"
        size="small"
        style={{
          display: 'flex',
          flex: 3,
        }}
      >
        <Content
          style={{
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
            padding: "18px 12px",
            flex: 3,
            minWidth: 0,
            margin: "0 12PX",
          }}
        >
          <Card
            style={{ width: "auto" }}
            // title="Card title"
            type="inner"
            // actions={[
            //   <LikeOutlined key="like" />,
            //   <CommentOutlined key="comment" />,
            //   <ShareAltOutlined key="share" />,
            // ]}
            bordered={false}
          >

            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={
                <TextArea placeholder="何か投稿しよう" onClick={() => { setOpenModal(true) }} />
              }
            />
          </Card>

        </Content>
        <Divider orientation="left">以下は投稿内容</Divider>
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
          <Space
            direction="vertical"
            size="large"
            style={{
              display: 'flex',
              flex: 3,
            }}
          >
            {posts}
          </Space>

        </Content>
      </Space>

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
          {/* {users.map((user, index) => (
            <div key={index}>{user.name}</div>
          ))} */}
        </div>
      </Content>
      <PostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch} />
    </Layout>
  );
}
