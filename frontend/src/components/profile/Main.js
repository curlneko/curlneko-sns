import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import {
  Layout,
  theme,
  Image,
  Button,
  Space
} from "antd";

import { useQueryPost } from "../../api/post/api";
import PostCard from '../../components/common/PostCard';
import ProfileModal from './ProfileModal';

const { Content } = Layout;

export default function Main() {
  const [openModal, setOpenModal] = useState(false);

  const { token } = theme.useToken();

  const { status, data, refetch } = useQueryPost();

  let posts = [];
  if (status === "success") {
    posts = data.data.toReversed().map(value => { 
      return (<PostCard key={value.id} value={value} />) 
    })
  }

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
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
          minHeight: 400,
          margin: "0 12px",
          //中要素の左下寄せ
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          // width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={{
            borderRadius: "50%",
            width: "200px",
            height: "200px",
            margin: "12px 48px",
          }}
        />
        <div>
          <h1>
            佐藤　時穂
          </h1>
          <h4>
            システムエンジニア
          </h4>
        </div>
        <Button
          style={{
            margin: "12px 48px",
          }}
          onClick={() => { setOpenModal(true) }}
        >
          プロフィールを編集
        </Button>
      </Content>
      <Layout
        style={{
          padding: "24px 0px",
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
        </Content>

        <Space
          direction="vertical"
          size="large"
          style={{
            display: 'flex',
            flex: 2,
          }}
        >
          {posts}
        </Space>

      </Layout>
      <ProfileModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        refetch={refetch} />
    </Layout>
  );
}
