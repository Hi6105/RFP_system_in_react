import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../redux/slices/auth";
import { USER_TYPE } from "../../../constants";
const { Header, Sider } = Layout;

const AdminPanelLayout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1");
  const dispatch = useDispatch();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const name = user?.name;

  const items = [
    {
      key: APP_ROUTES?.adminDashboard,
      icon: React.createElement(UserOutlined),
      label: t("sidebar.dashboard"),
    },
    {
      key: APP_ROUTES?.vendorList,
      icon: React.createElement(UserOutlined),
      label: t("sidebar.vendors"),
    },
    {
      key: APP_ROUTES?.rfpList,
      icon: React.createElement(UserOutlined),
      label: t("sidebar.rfpList"),
    },
    {
      key: APP_ROUTES?.adminCategories,
      icon: React.createElement(UserOutlined),
      label: t("sidebar.categories"),
    },
  ];

  if (user?.type == USER_TYPE?.ADMIN || user.type === "Super Admin") {
    items.push({
      key: APP_ROUTES?.auditLogs,
      icon: React.createElement(UserOutlined),
      label: t("sidebar.auditLogs"),
    });
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key); // Update selected key state
    navigate(key);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Funtion to destroy token from redux and local storage
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/");
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
            {t("app.welcome")} {name}{" "}
            <Button type="link" onClick={handleLogout}>
              Logout
            </Button>
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
export default AdminPanelLayout;
