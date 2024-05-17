import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { authRoutes } from "./AuthNavigation";
import { adminRoutes } from "./app-navigation/AdminNavigation";
import { VendorRoutes } from "./app-navigation/VendorNavigation";

const Navigation = () => {
  const router = createBrowserRouter([VendorRoutes, authRoutes, adminRoutes]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Navigation;
