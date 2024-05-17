import { APP_ROUTES } from "../config/AppConfig";
import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/Auth/Login"));
const VendorSignup = lazy(() => import("../pages/Auth/Signup/Vendor-Signup"));
const AdminSignup = lazy(() => import("../pages/Auth/Signup/Admin-Signup"));
const ForgotPassword = lazy(() => import("../pages/Auth/Forgot-Password"));
const AuthLayout = lazy(() => import("../layout/auth-layout"));
const ResetPassword = lazy(() => import("../pages/Auth/Reset-Password"));

export const authRoutes = {
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
    {
        path: `${APP_ROUTES?.resetPassword}`,
        element: (
          <Suspense fallback={"loading"}>
            <ResetPassword />
          </Suspense>
        ),
      },
  ],
};
