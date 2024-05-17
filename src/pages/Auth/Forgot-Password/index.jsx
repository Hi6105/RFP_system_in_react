import { Flex } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import { error, success } from "../../../helper/ToastMessages";
import { API_RESPONSE_TYPE, MESSAGE, VALIDATION } from "../../../constants";
import AuthServices from "../../../api/services/AuthServices";
import { APP_ROUTES } from "../../../config/AppConfig";

const ForgotPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  // Function to authenticate a user through his login credentials
  const onFinish = async (values) => {
    //setting spinning loader to show
    setSpinning(true);
    const response = await AuthServices.forgotPassword(values);

    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      success(MESSAGE?.otpSent, messageApi);
      // Set a timeout to navigate after displaying the success message
      setTimeout(() => {
        navigate(APP_ROUTES?.resetPassword);
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    } else {
      //Showing toast message if credentials entered are wrong.
      error(response?.data?.response, messageApi);
    }
    //setting spinning loader to hide
    setSpinning(false);
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
        <Spin tip="Loading..." spinning={spinning}>
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
          </Flex>
        </Spin>
      </div>
    </>
  );
};

export default ForgotPassword;
