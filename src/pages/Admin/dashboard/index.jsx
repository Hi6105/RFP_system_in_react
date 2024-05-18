import { Content } from "antd/es/layout/layout";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { PAGES } from "../../../constants";

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>{t("sidebar.dashboard")}</h1>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <p>
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminDashboard}>
              {PAGES?.dashboard}
            </Link>
          </p>
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
export default AdminDashboard;
