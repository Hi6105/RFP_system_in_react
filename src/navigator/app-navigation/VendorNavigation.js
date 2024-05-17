import { APP_ROUTES } from "../../config/AppConfig";
import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const VendorPanelLayout = lazy(() => import("../../layout/app-layout/vendor-panel-layout"));
const VendorDashboard = lazy(() => import("../../pages/vendor/dashboard"));

export const VendorRoutes = {
    path: APP_ROUTES?.vendor,
    element: (
      <Suspense fallback={"loading"}>
        <VendorPanelLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={`${APP_ROUTES?.vendorDashboard}`} />,
      },
      {
        path: `${APP_ROUTES?.vendorDashboard}`,
        element: (
          <Suspense fallback={"loading"}>
            <VendorDashboard />
          </Suspense>
        ),
      },
    ],
  };
  