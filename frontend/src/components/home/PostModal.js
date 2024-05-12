import React, { useState } from "react";

import { useMutationPost } from "../../api/post/api";

import {
    Button,
    Form,
    Input,
    Modal,
    Space,
} from "antd";

const { TextArea } = Input;



const layout = {
    // labelCol: {
    //     span: 8,
    // },
    // wrapperCol: {
    //     span: 16,
    // },
};
const tailLayout = {
    wrapperCol: {
        // offset: 8,
        // span: 16,
    },
};
export default function PostModal(props) {
    const { status, data, mutate } = useMutationPost();
    const [form] = Form.useForm();

    if (status === "success") {
        if (data.result.status === true) {
            form.resetFields();
            props.setOpenModal(false);
            props.refetch();
        }
    }

    const onReset = () => {
        form.resetFields();
    };


    const onFinish = (values) => {
        mutate(values);
        console.log(values);
    };


    return (
        <Modal
            title="Post"
            centered
            open={props.openModal}
            onCancel={() => props.setOpenModal(false)}
            width={1000}
            footer={[]}
        >
            <Form
                {...layout}
                form={form}
                name="post"
                onFinish={onFinish}
            >
                <Form.Item name='post' >
                    <TextArea
                        placeholder="何か投稿しよう"
                        rows="10"
                        style={{
                            width: '100%',  /* 横幅 */
                        }} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal >);
}