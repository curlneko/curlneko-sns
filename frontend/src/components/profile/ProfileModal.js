import React, { useState } from "react";

import { useMutationProfile } from "../../api/profile/api";

import {
    Button,
    Form,
    Input,
    Modal,
    Space,
    Typography
} from "antd";

export default function ProfileModal(props) {
    const { status, data, mutate } = useMutationProfile();
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
            title="Profile"
            centered
            open={props.openModal}
            onCancel={() => props.setOpenModal(false)}
            width={1000}
            footer={[]}
        >
            <Form
                form={form}
                name="profile"
                onFinish={onFinish}
            >
                <Typography.Title level={5}>Name</Typography.Title>
                <Form.Item name='name' >
                    <Input />
                </Form.Item>
                <Typography.Title level={5}>Email</Typography.Title>
                <Form.Item name='email' >
                    <Input />
                </Form.Item>
                <Form.Item>
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