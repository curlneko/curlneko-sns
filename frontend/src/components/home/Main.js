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
import PostCard from '../../components/common/PostCard'

import './Main.css';

const { Meta } = Card;
const { Content } = Layout;

const { TextArea } = Input;


export default function Main() {
  const navigate = useNavigate();

  const { status, data, refetch } = useQueryPost();
  console.log(data);

  let posts = [];
  if (status === "success") {
    posts = data.data.toReversed().map(value => { 
      console.log(value);
      return (<PostCard key={value.id} value={value} />) 
    })
  }

  const [openModal, setOpenModal] = useState(false);

  const { token } = theme.useToken();
  return (
    <Layout
      className="flex-container"
    >
      <Card
        style={{
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
        }}
        hoverable
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        onClick={() => { navigate("/profile") }}
        className="user-profile"
      >
        <Meta title="佐藤　時穂" description="システムエンジニア" />
      </Card>

      <Space
        direction="vertical"
        size="small"
        className="post-area"
      >
        <Card
          type="inner"
          bordered={false}
          className="to-post"
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
        <Divider orientation="left">以下は投稿内容</Divider>
        {posts}
      </Space>
      <Content
        style={{
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
        }}
        className="other"
      >
        <div classname="App">
          <h1>Users</h1>
        </div>
      </Content>
      <PostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch} />

    </Layout>
  );
}
