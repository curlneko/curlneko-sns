import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import {
  Layout,
  Card,
  theme,
  Modal,
  message,
  Upload,
  Input,
  Image,
  Form,
  Button
} from "antd";

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { useMutationUploadPicture } from "../../api/profile/api";

import { getBase64, validateFile } from "../../utils/utils";

const { Header, Content, Footer, Sider } = Layout;

export default function Main() {
  const { status, data, mutate } = useMutationUploadPicture();

  const { token } = theme.useToken();

  const [previewImage, setPreviewImage] = useState('');


  const [fileList, setFileList] = useState([]);

  if (status === "success") {
    if (data.result.status === true) {
      if (fileList.length === 1 && fileList[0].status !== "done") {
        setFileList([{ ...fileList[0], status: "done" }])
        setPreviewImage(data.data.url);
      }
    }
  }


  const handleChange = async ({ fileList, file }) => {
    console.log("handleChange");
    console.log(file);

    const validateResult = validateFile(file);
    console.log(validateResult);
    console.log(fileList);
    console.log(file);

    setFileList(fileList);

    //アップロード時
    if (fileList.length === 1) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
    } else {//削除時
      setPreviewImage("");
    }
  };



  const onFinish = async (values) => {
    console.log(values);
    const submitData = new FormData();
    submitData.append("data", JSON.stringify(values));

    // mutate(submitData);
  };

  const uploadImage = options => {
    console.log("uploadImage")
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    fmData.append("image", file);


    mutate(fmData);
  }

  return (
    <Layout
      style={{
        // display: "flex",
        flexDirection: "row",
        // alignItems: "center",
      }}
    >
      <Content
        style={{
          padding: "18px 12px",
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          // flex: 1,
          minWidth: 0,
          minHeight: 280,
          margin: "0 12PX",
        }}
      >
        {previewImage === "" ? null : (<Image
          width={300}
          height={300}
          src={previewImage}
        />)}
        {/* <Image
          width={300}
          height={300}
          // src={previewImage}
          src="http://localhost:8083/images/1709612134305-gmeioc-image (3).png"
        /> */}
        <Upload
          // action=""
          listType="picture-circle"
          fileList={fileList}
          onChange={handleChange}
          customRequest={uploadImage}
          style={{ width: '2000px' }}
        >
          {fileList.length >= 1 ? null : (
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
            </button>)}
        </Upload>
        <Form
          name="profile"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>



      </Content>
    </Layout>
  );
}
