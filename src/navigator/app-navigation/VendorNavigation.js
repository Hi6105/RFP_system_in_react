import { APP_ROUTES } from "../../config/AppConfig";
import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const VendorPanelLayout = lazy(() => import("../../layout/app-layout/vendor-panel-layout"));
const VendorDashboard = lazy(() => import("../../pages/vendor/dashboard"));
const RfpForQuotes = lazy(() => import("../../pages/vendor/rfp-for-quotes"));
const ApplyRfp = lazy(() => import("../../pages/vendor/rfp-for-quotes/ApplyRfp"));

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
      {
        path: `${APP_ROUTES?.vendorRfpList}`,
        element: (
          <Suspense fallback={"loading"}>
            <RfpForQuotes />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES?.vendorApplyRfp}`,
        element: (
          <Suspense fallback={"loading"}>
            <ApplyRfp />
          </Suspense>
        ),
      },
    ],
  };
  