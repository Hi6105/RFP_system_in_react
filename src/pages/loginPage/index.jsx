import React from "react";
import LoginForm from "../../component/login/LoginForm";
import { Button, ConfigProvider, Space } from "antd";

const LoginPage = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#4096ff",
            borderRadius: 10,

            // Alias Token
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <LoginForm />
      </ConfigProvider>
    </>
  );
};

export default LoginPage;
