import { Flex } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import useValidation from "../../../hooks/useValidation";

const ResetPassword = () => {
  const [spinning, setSpinning] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [rules, setValidation] = useValidation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  //setting validations in the form
  useEffect(() => {
    setValidation({
      email: [{ rule: "required" }, { rule: "email" }],
      password: [{ rule: "required" }, { rule: "password" }],
      otp: [{ rule: "digit" }],
    });
  }, []);

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

  const changeLanguage = (lng) => {
    console.log(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "10px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button type="primary" onClick={() => changeLanguage("en")}>
          EN
        </Button>
        <Button type="primary" onClick={() => changeLanguage("fr")}>
          FR
        </Button>
      </div>
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
              <h4 style={{ color: "#3d8ef8" }}>
                {t("app.dashboardGreeting")}!
              </h4>
              <p style={{ color: "#3d8ef8" }}>{t("app.resetPassword")}</p>
            </div>
            <div key={1} style={{ padding: "4%" }}>
              <Form
                name="normal_login"
                className="login-form"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item name="email" label="E-mail" rules={rules?.email}>
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="New Password"
                  rules={rules?.password}
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
                      message: VALIDATION?.required,
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
                <Form.Item name="otp" label="OTP" rules={rules?.otp}>
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
