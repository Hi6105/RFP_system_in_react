import React from "react";
import { ConfigProvider } from "antd";
import VendorSignup from "../../../component/login/VendorSignup";

const VendorSignupPage = () => {
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
        <VendorSignup />
      </ConfigProvider>
    </>
  );
};

export default VendorSignupPage;
