import { APP_ROUTES } from "../../config/AppConfig";
import React, { lazy, Suspense } from "react";

const AdminPanelLayout = lazy(() =>
  import("../../layout/app-layout/admin-panel-layout")
);
const AuditLogs = lazy(() => import("../../pages/Admin/audit-logs"))

export const SuperAdminRoutes = {
  path: `${APP_ROUTES?.auditLogs}`,
  element: (
    <Suspense fallback={"loading"}>
      <AdminPanelLayout />
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <AuditLogs/>,
    },
]
};
