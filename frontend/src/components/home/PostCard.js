

import {
    Card,
    Avatar,
    theme
} from "antd";
import {
    LikeOutlined,
    CommentOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export default function PostCard(props) {
    const { token } = theme.useToken();
    return (
        <Card
            style={{
                width: "auto",
                borderRadius: token.borderRadiusLG,
                background: token.colorBgContainer,
            }}
            // type="inner"
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
            actions={[
                <LikeOutlined key="like" />,
                <CommentOutlined key="comment" />,
                <ShareAltOutlined key="share" />,
            ]}
        >
            <Meta
                avatar={
                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Meta title"
                description="This is the description"
            />
            <div style={{ padding: "18px 0" }}>{props.post}</div>
        </Card>
    )
}