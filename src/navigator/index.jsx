import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AdminDashboard from "../pages/Admin/dashboard";
import { APP_ROUTES } from "../config/AppConfig";

const Navigation = () => {
  //Importing all the components being used in pages
  const Login = lazy(() => import("../pages/Auth/Login"));
  const VendorSignup = lazy(() => import("../pages/Auth/Signup/Vendor-Signup"));
  const AdminSignup = lazy(() => import("../pages/Auth/Signup/Admin-Signup"));
  const AuthLayout = lazy(() => import("../layout/auth-layout"));
  const AdminPanelLayout = lazy(() =>
    import("../layout/app-layout/admin-panel-layout")
  );
  const AdminCategories = lazy(() => import("../pages/Admin/categories"));
  const ForgotPassword = lazy(() => import("../pages/Auth/Forgot-Password"));

  //Authentication routes
  const authRoutes = {
    path: "/",
    element: (
      <Suspense fallback={"loading"}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={`${APP_ROUTES.login}`} />,
      },
      {
        path: `${APP_ROUTES.login}`,
        element: (
          <Suspense fallback={"loading"}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES.vendorSignup}`,
        element: (
          <Suspense fallback={"loading"}>
            <VendorSignup />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES.adminSignup}`,
        element: (
          <Suspense fallback={"loading"}>
            <AdminSignup />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES.forgortPassword}`,
        element: (
          <Suspense fallback={"loading"}>
            <ForgotPassword />
          </Suspense>
        ),
      },
    ],
  };

  //Admin pannel routes
  const adminRoutes = {
    path: `${APP_ROUTES.admin}`,
    element: (
      <Suspense fallback={"loading"}>
        <AdminPanelLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={`${APP_ROUTES.adminDashboard}`} />,
      },
      {
        path: `${APP_ROUTES.adminDashboard}`,
        element: (
          <Suspense fallback={"loading"}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES.adminCategories}`,
        element: (
          <Suspense fallback={"loading"}>
            <AdminCategories />
          </Suspense>
        ),
      },
    ],
  };

  const router = createBrowserRouter([authRoutes, adminRoutes]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Navigation;
