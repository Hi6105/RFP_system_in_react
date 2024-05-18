import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { useTranslation } from "react-i18next";
const { Header, Sider } = Layout;

const VendorPanelLayout = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1");
  const { t, i18n } = useTranslation();

  const items = [
    {
      key: APP_ROUTES?.vendorDashboard,
      icon: React.createElement(UserOutlined),
      label: t("sidebar.dashboard"),
    },
    {
      key: APP_ROUTES?.vendorRfpList,
      icon: React.createElement(UserOutlined),
      label: t("sidebar.rfpForQuote"),
    },
  ];

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const name = user?.name;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key); // Update selected key state
    // You can also perform additional actions, such as navigation, based on the selected key
    navigate(key);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10px" }}
          className="demo-logo-vertical"
        >
          <img src="/assets/images/velocity_logo.png" alt="" />
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]} // Set selected key
          onClick={handleMenuClick}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
          background: "#e3edfa",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              paddingRight: "20px",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {t("app.welcome")} {name} <a href="/">Logout</a>
            <Button type="primary" onClick={() => changeLanguage("en")}>
              EN
            </Button>
            <Button type="primary" onClick={() => changeLanguage("fr")}>
              FR
            </Button>
          </div>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default VendorPanelLayout;
