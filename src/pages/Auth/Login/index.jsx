import { Flex } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./loginPage.css";
import { error } from "../../../helper/ToastMessages";
import { APP_ROUTES } from "../../../config/AppConfig";
import { API_RESPONSE_TYPE, MESSAGE, VALIDATION } from "../../../constants";
import AuthServices from "../../../api/services/AuthServices";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // Function to authenticate a user through his login credentials
  const onFinish = async (values) => {
    // Calling the login API service for authentication
    const response = await AuthServices.login(values);
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      // Saving token and user data to local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", {
        type: response?.data?.type,
        user_id: response?.data?.user_id,
        name: response?.data?.name,
        email: response?.data?.email,
      });
      // Navigate to admin dashboard route
      if (response?.data?.type === "admin")
        navigate(APP_ROUTES?.adminDashboard);
      else navigate(APP_ROUTES?.vendorDashboard);
    } else {
      //Showing toast message if credentials entered are wrong.
      error(MESSAGE?.wrongCredentials, messageApi);
    }
  };

  return (
    <>
      <div
        style={{
          width: "35%",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "100px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        {contextHolder}
        <Flex gap="small" vertical={true}>
          <div
            key={0}
            style={{
              backgroundColor: "#c1d8f7",
              padding: "4%",
              borderRadius: "10px 10px 0 0",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
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
                name="email"
                rules={[
                  {
                    type: "email",
                    message: VALIDATION?.email?.invalid,
                  },
                  {
                    required: true,
                    message: VALIDATION?.email?.required,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: VALIDATION?.password,
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
          <Link to="/vendorSignup">
            <p style={{ textAlign: "center" }}>Register as Vendor</p>
          </Link>
          <Link to="/adminSignup">
            <p style={{ textAlign: "center" }}>Register as Admin</p>
          </Link>
          <Link to="/forgotPassword">
            <p style={{ textAlign: "center" }}>Forgot password</p>
          </Link>
        </Flex>
      </div>
    </>
  );
};

export default Login;
