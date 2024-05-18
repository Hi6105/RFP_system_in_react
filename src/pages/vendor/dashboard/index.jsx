import { Content } from "antd/es/layout/layout";
import React from "react";
import { useTranslation } from "react-i18next";
import { PAGES } from "../../../constants";
import { APP_ROUTES } from "../../../config/AppConfig";
import { Flex } from "antd";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>{t("sidebar.dashboard")}</h1>
        <div style={{ marginLeft: "auto" }}>
          <Flex gap="middle">
            <Link style={{ color: "black" }} to={APP_ROUTES?.vendorDashboard}>
              {PAGES?.dashboard}
            </Link>
          </Flex>
        </div>
      </div>
      <Content
        style={{
          margin: "0 16px",
          overflow: "initial",
        }}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <p>{t("app.dashboardGreeting")}</p>
        </div>
      </Content>
    </>
  );
};
export default VendorDashboard;
