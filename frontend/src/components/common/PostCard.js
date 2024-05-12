

import React from "react";
import { useState } from "react";
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

import { useMutationLike } from "../../api/like/api";

const { Meta } = Card;

export default function PostCard(props) {
    const { status, data, mutate } = useMutationLike();

    const { token } = theme.useToken();

    const [iconColor, setIconColor] = useState(() => {
        return props.value.isLiked ? '#1890ff' : '#808080';
    });
    const [isLiked, setIsLiked] = useState(() => {
        return props.value.isLiked ? true : false;
    });

    const handleMouseEnter = () => {
        if (!isLiked) {
            setIconColor('#1890ff'); // ホバー時は青に
        }
    };

    const handleMouseLeave = () => {
        if (!isLiked) {
            setIconColor('#808080'); // クリックされていない場合はグレーに戻す
        }
    };

    const handleClick = () => {
        if (isLiked) {
            setIsLiked(false); // 再クリックされた場合はクリックフラグをリセット
            setIconColor('#808080'); // グレーに戻す
        } else {
            setIsLiked(true); // クリックされたフラグをセット
            setIconColor('#1890ff'); // 青に

            console.log({ "like": { "postId": props.value.id, "isCanceled": false } });

            mutate({ "like": { "postId": props.value.id, "isCanceled": false } });
        };
    }

    return (
        <Card
            style={{
                width: "auto",
                borderRadius: token.borderRadiusLG,
                background: token.colorBgContainer,
                minWidth: 0,
                margin: "0 12PX",
                padding: "18px 12px",
            }}
            actions={[
                <LikeOutlined
                    key="like"
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer', color: iconColor }}
                />,
                <CommentOutlined key="comment" />,
                <ShareAltOutlined key="share" />,
            ]}
        >
            <Meta
                avatar={
                    <Avatar src={"http://localhost:8083/images/" + props.value.portrait} />
                }
                title={props.value.name}
            />
            <div style={{ padding: "18px 0" }}>{props.value.post}</div>
        </Card>
    )
}