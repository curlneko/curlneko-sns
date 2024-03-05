import React, { useState } from "react";

import { useMutationRegister } from "../../api/auth/api";

import {
    Button,
    Form,
    Input,
    Modal,
    Space,
    Select
} from "antd";

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
export default function RegisterModal(props) {
    const { status, data, mutate } = useMutationRegister();

    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };


    const onFinish = (values) => {
        mutate(values);
        console.log(values);
    };

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!',
                });
                break;
            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!',
                });
                break;
            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!',
                });
                break;
            default:
        }
    };

    if (status === "success") {
        if (data.result.status === true) {
            // setPost("");
            props.setOpenModal(false);
            form.resetFields();
        }
    }


    return (
        <Modal
            title="Register"
            centered
            open={props.openModal}
            onOk={() => props.setOpenModal(false)}
            onCancel={() => props.setOpenModal(false)}
            width={800}
            footer={[]}
        >
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    autoComplete="chrome-off"
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    autoComplete="chrome-off"
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item
                                name="customizeGender"
                                label="Customize Gender"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        ) : null
                    }
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
        </Modal>);
}