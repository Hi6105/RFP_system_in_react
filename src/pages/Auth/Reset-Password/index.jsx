import { Flex } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import { error, success } from "../../../helper/ToastMessages";
import {
  API_RESPONSE_TYPE,
  MESSAGE,
  REGEX,
  VALIDATION,
} from "../../../constants";
import AuthServices from "../../../api/services/AuthServices";
import { APP_ROUTES } from "../../../config/AppConfig";

const ResetPassword = () => {
  const [spinning, setSpinning] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // Function to authenticate a user through his login credentials
  const onFinish = async (values) => {
    //setting spinning loader to show
    setSpinning(true);
    //Formulating the data that is to be sent in the API
    const data = {
      email: values?.email,
      new_password: values?.password,
      otp: values?.otp,
    };

    //Making request to the service that updates the password
    const response = await AuthServices.resetPassword(data);

    //Checking the response from the API
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      success(MESSAGE?.passwordReset, messageApi);
      // Set a timeout to navigate after displaying the success message
      setTimeout(() => {
        navigate(APP_ROUTES?.login);
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    } else {
      //Showing toast message if credentials entered are wrong.
      error(response?.data?.message, messageApi);
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
              <p style={{ color: "#3d8ef8" }}>Reset Password</p>
            </div>
            <div key={1} style={{ padding: "4%" }}>
              <Form
                name="normal_login"
                className="login-form"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  label="E-mail"
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

                <Form.Item
                  name="password"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.password,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.confirmpassword?.required,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(VALIDATION?.confirmpassword?.match)
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="otp"
                  label="OTP"
                  rules={[
                    {
                      required: true,
                      message: VALIDATION?.required,
                    },
                    {
                      pattern: REGEX?.number,
                      message: VALIDATION?.noofemployees?.match,
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
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Flex>
        </Spin>
      </div>
    </>
  );
};

export default ResetPassword;
