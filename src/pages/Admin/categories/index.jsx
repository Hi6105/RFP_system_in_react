import { Content } from "antd/es/layout/layout";
import React from "react";

const AdminCategories = () => {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>Categories</h1>
        <p style={{ marginLeft: "auto" }}>Home</p>
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
          <p>Welcome to RFP System</p>
        </div>
      </Content>
    </>
  );
};

export default AdminCategories;
