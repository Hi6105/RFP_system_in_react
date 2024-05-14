import React from "react";
import { ConfigProvider } from "antd";
import Navigation from "./navigator";

const App = () => {
  return (
    // This wrapper provides all the theme configuration for the app
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
      {/*This component defines all the route for the application*/}
      <Navigation />
    </ConfigProvider>
  );
};

export default App;
