import { Flex } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Spin } from "antd";
import { error, success } from "../../../helper/ToastMessages";
import { API_RESPONSE_TYPE, MESSAGE, VALIDATION } from "../../../constants";
import AuthServices from "../../../api/services/AuthServices";
import { APP_ROUTES } from "../../../config/AppConfig";
import { useTranslation } from "react-i18next";
import { LockOutlined } from "@ant-design/icons";
import useValidation from "../../../hooks/useValidation";

const ForgotPassword = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [rules, setValidation] = useValidation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  //setting validations in the form
  useEffect(() => {
    setValidation({
      email: [{ rule: "required" }, { rule: "email" }],
    });
  }, []);

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

  const changeLanguage = (lng) => {
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
              <p style={{ color: "#3d8ef8" }}>{t("app.forgotPassword")}</p>
            </div>
            <div key={1} style={{ padding: "4%" }}>
              <Form
                name="normal_login"
                className="login-form"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item label="E-Mail" name="email" rules={rules?.email}>
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {t("app.sendOtp")}
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <Link to="/vendorSignup">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <LockOutlined />
                <p style={{ textAlign: "center" }}>{t("app.registerVendor")}</p>
              </div>
            </Link>
          </Flex>
        </Spin>
      </div>
    </>
  );
};

export default ForgotPassword;
