  import { APP_ROUTES } from "../../config/AppConfig";
  import React, { lazy, Suspense } from "react";
  import { Navigate } from "react-router-dom";

  const AdminPanelLayout = lazy(() =>
    import("../../layout/app-layout/admin-panel-layout")
  );
  const AdminCategories = lazy(() => import("../../pages/Admin/categories"));
  const AddCategory = lazy(() => import("../../pages/Admin/categories/AddCategory"));
  const RfpList = lazy(() => import("../../pages/Admin/RFP-List"));
  const AddRfp = lazy(() => import("../../pages/Admin/RFP-List/AddRfp"));
  const VendorList = lazy(() => import("../../pages/Admin/Vendor-List"));
  const RfpQuotesList = lazy(() => import("../../pages/Admin/RFP-Quotes"));
  const AdminDashboard = lazy(() => import("../../pages/Admin/dashboard"));

  export const AdminRoutes = {
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
      {
        path: `${APP_ROUTES.addCategory}`,
        element: (
          <Suspense fallback={"loading"}>
            <AddCategory />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES.rfpList}`,
        element: (
          <Suspense fallback={"loading"}>
            <RfpList />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES?.addRfp}`,
        element: (
          <Suspense fallback={"loading"}>
            <AddRfp />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES?.vendorList}`,
        element: (
          <Suspense fallback={"loading"}>
            <VendorList />
          </Suspense>
        ),
      },
      {
        path: `${APP_ROUTES?.rfpQuotesList}`,
        element: (
          <Suspense fallback={"loading"}>
            <RfpQuotesList />
          </Suspense>
        ),
      },
    ],
  };
