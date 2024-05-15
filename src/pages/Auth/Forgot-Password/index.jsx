import { Flex } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { error } from "../../../helper/ToastMessages";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  APP_ROUTES,
} from "../../../config/AppConfig";
import { API_RESPONSE_TYPE, MESSAGE, VALIDATION } from "../../../constants";

const ForgotPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // Function to authenticate a user through his login credentials
  const onFinish = async (values) => {
    try {
      // Making a POST request to the login api for checking the credentials
      const response = await axios.post(
        `${API_BASE_URL}/${API_ENDPOINTS.forgotPassword}`,
        values // This will send the form values as the request body
      );
      if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
        navigate(APP_ROUTES.login);
      } else {
        //Showing toast message if credentials entered are wrong.
        error(MESSAGE?.wentWrong, messageApi);
      }
      // Handle the API response as needed
    } catch (error) {
      console.error("API Error:", error);
      // Handle errors if any
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
            <p style={{ color: "#3d8ef8" }}>Forgot Password</p>
          </div>
          <div key={1} style={{ padding: "4%" }}>
            <Form
              name="normal_login"
              className="login-form"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                label="E-Mail"
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
                <Input />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Send OTP
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
        </Flex>
      </div>
    </>
  );
};

export default ForgotPassword;
