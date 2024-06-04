import React, { Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_TYPE } from "../constants";
import { authRoutes } from "./AuthNavigation";
import { AdminRoutes } from "./app-navigation/AdminNavigation";
import { VendorRoutes } from "./app-navigation/VendorNavigation";
import { SuperAdminRoutes } from "./app-navigation/SuperAdminNavigation";

const Navigation = () => {
  // Fetching token and user details from the redux store
  const token = useSelector((state) => state?.auth?.selectedToken);
  const user = useSelector((state) => state?.auth?.selectedUser);

  console.log(user, token);

  const router = useMemo(() => {
    // Based on the user type and token setting the routes for the application
    if (token && user && user.type) {
      if (user.type === USER_TYPE.ADMIN || user.type === "Super Admin") {
        return createBrowserRouter([authRoutes, AdminRoutes, SuperAdminRoutes]);
      } else if (user.type === USER_TYPE.VENDOR) {
        return createBrowserRouter([authRoutes, VendorRoutes]);
      }
    }

    return createBrowserRouter([authRoutes]);
  }, [token, user]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Navigation;
