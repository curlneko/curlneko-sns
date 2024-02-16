import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import {
  Layout,
  Card,
  theme,
  Avatar,
  Divider,
  Form,
  Input,
  DatePicker,
  Checkbox,
  Radio,
  Select,
  TreeSelect,
  Cascader,
  Switch,
  ColorPicker,
  InputNumber,
  Upload,
  Button,
  Slider
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  PlusOutlined
} from "@ant-design/icons";

import { useQueryUsers } from "../../api/user/api";

const { Meta } = Card;
const { Header, Content, Footer, Sider } = Layout;

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};


export default function Main() {
  const { status, data } = useQueryUsers();
  const [users, setUsers] = useState([]);



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
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
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
          actions={[
            <LikeOutlined key="like" />,
            <CommentOutlined key="comment" />,
            <ShareAltOutlined key="share" />,
          ]}
          bordered={false}
        >
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
              <Checkbox>Checkbox</Checkbox>
            </Form.Item>
            <Form.Item label="Radio">
              <Radio.Group>
                <Radio value="apple"> Apple </Radio>
                <Radio value="pear"> Pear </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Input">
              <Input />
            </Form.Item>
            <Form.Item label="Select">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
              <TreeSelect
                treeData={[
                  {
                    title: 'Light',
                    value: 'light',
                    children: [
                      {
                        title: 'Bamboo',
                        value: 'bamboo',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Cascader">
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [
                      {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                      },
                    ],
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              <DatePicker />
            </Form.Item>
            <Form.Item label="RangePicker">
              <RangePicker />
            </Form.Item>
            <Form.Item label="InputNumber">
              <InputNumber />
            </Form.Item>
            <Form.Item label="TextArea">
              <TextArea rows={10} />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload action="/upload.do" listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item label="Button">
              <Button>Button</Button>
            </Form.Item>
            <Form.Item label="Slider">
              <Slider />
            </Form.Item>
            <Form.Item label="ColorPicker">
              <ColorPicker />
            </Form.Item>
          </Form>
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Meta title"
            description="This is the description"
          />
          <div style={{ padding: "18px 0" }}>Card content</div>
        </Card>
        <Divider orientation="left">以下は投稿内容</Divider>
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
            <LikeOutlined key="like" />,
            <CommentOutlined key="comment" />,
            <ShareAltOutlined key="share" />,
          ]}
          bordered={false}
        >
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title="Meta title"
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
          {/* {users.map((user, index) => (
            <div key={index}>{user.name}</div>
          ))} */}
        </div>
      </Content>
    </Layout>
  );
}
