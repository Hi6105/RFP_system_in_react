import { Flex } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./loginForm.css";
const baseStyle = {
  width: "100%",
  height: 54,
};

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div
        style={{
          width: "35%",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "100px",
        }}
      >
        <Flex gap="small" vertical={true}>
          <div key={0} style={{ backgroundColor: "#c1d8f7", padding: "4%" }}>
            <h4 style={{ color: "#3d8ef8" }}>Welcome to RFP System!</h4>
            <p style={{ color: "#3d8ef8" }}>Sign in to continue</p>
          </div>
          <div key={1} style={{ padding: "4%" }}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
          <a href="/VendorSignup">
            <p style={{ textAlign: "center" }}>Register as Vendor</p>
          </a>
          <p style={{ textAlign: "center" }}>Register as Admin</p>
          <p style={{ textAlign: "center" }}>Forgot password</p>
        </Flex>
      </div>
    </>
  );
};

export default LoginForm;
