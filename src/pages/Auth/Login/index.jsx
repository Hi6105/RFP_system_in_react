import { Flex } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Spin } from "antd";
import "./loginPage.css";
import { error } from "../../../helper/ToastMessages";
import { APP_ROUTES } from "../../../config/AppConfig";
import { API_RESPONSE_TYPE, MESSAGE, VALIDATION } from "../../../constants";
import AuthServices from "../../../api/services/AuthServices";
import { useTranslation } from "react-i18next";
import useValidation from "../../../hooks/useValidation";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../redux/slices/auth";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [rules, setValidation] = useValidation();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //setting validations in the form
  useEffect(() => {
    setValidation({
      email: [{ rule: "required" }, { rule: "email" }],
      password: [{ rule: "required" }],
    });
  }, []);

  // Function to authenticate a user through his login credentials
  const onFinish = async (values) => {
    //setting spinning loader to show
    setSpinning(true);
    // Calling the login API service for authentication
    const response = await AuthServices.login(values);
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      // Storing token and user details in the redux store to use it in route protection
      dispatch(setToken(response?.data?.token));
      dispatch(
        setUser({
          type: response?.data?.type,
          user_id: response?.data?.user_id,
          name: response?.data?.name,
          email: response?.data?.email,
        })
      );

      // Saving token and user data to local storage
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          type: response?.data?.type,
          user_id: response?.data?.user_id,
          name: response?.data?.name,
          email: response?.data?.email,
        })
      );
      // Navigate to admin dashboard route
      if (response?.data?.type === "admin")
        navigate(APP_ROUTES?.adminDashboard);
      else navigate(APP_ROUTES?.vendorDashboard);
    } else {
      if (response?.data?.error == "Invalid credential")
        //Showing toast message if credentials entered are wrong.
        error(MESSAGE?.wrongCredentials, messageApi);
      else error(response?.data?.error, messageApi); // else showing the error from the backend
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
              <p style={{ color: "#3d8ef8" }}>{t("app.signIn")}</p>
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
                <Form.Item name="email" rules={rules?.email}>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item name="password" rules={rules?.password}>
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder={t("app.password")}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    {t("app.login")}
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
                }}
              >
                <LockOutlined />
                <p style={{ textAlign: "center" }}>{t("app.registerVendor")}</p>
              </div>
            </Link>
            <Link to="/adminSignup">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <LockOutlined />
                <p style={{ textAlign: "center" }}>{t("app.registerAdmin")}</p>
              </div>
            </Link>
            <Link to="/forgotPassword">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <LockOutlined />
                <p style={{ textAlign: "center" }}>{t("app.forgotPassword")}</p>
              </div>
            </Link>
          </Flex>
        </Spin>
      </div>
    </>
  );
};

export default Login;
