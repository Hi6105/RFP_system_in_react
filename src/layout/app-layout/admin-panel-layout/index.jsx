import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
const { Header, Sider } = Layout;
const items = [
  {
    key: APP_ROUTES?.adminDashboard,
    icon: React.createElement(UserOutlined),
    label: "Dashboard",
  },
  {
    key: APP_ROUTES?.vendorList,
    icon: React.createElement(UserOutlined),
    label: "Vendors",
  },
  {
    key: APP_ROUTES?.rfpList,
    icon: React.createElement(UserOutlined),
    label: "RFP List",
  },
  {
    key: String(4),
    icon: React.createElement(UserOutlined),
    label: "RFP Quotes",
  },
  {
    key: APP_ROUTES?.adminCategories,
    icon: React.createElement(UserOutlined),
    label: "Categories",
  },
];

const AdminPanelLayout = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("1");

  const name = localStorage.getItem("name");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key); // Update selected key state
    // You can also perform additional actions, such as navigation, based on the selected key
    navigate(key);
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
          <p style={{ textAlign: "right", paddingRight: "20px" }}>
            Welcome {name} <a href="/">Logout</a>
          </p>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};
export default AdminPanelLayout;
