import React, { useState, useEffect } from "react";
import { Table, Select, Space, Spin } from "antd";
import { t } from "i18next";
import { APP_ROUTES } from "../../../config/AppConfig";
import { Link } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { API_RESPONSE_TYPE, PAGES } from "../../../constants";
import AuditLogServices from "../../../api/services/AuditLogServices";

const AuditLogs = () => {
  // Declaring all the columns for the table display
  const columns = [
    {
      title: t("app.serialNumber"),
      dataIndex: "sNo",
      key: "sNo",
      fixed: "left",
    },
    {
      title: t("app.userName"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("app.userType"),
      dataIndex: "role_name",
      key: "role_name",
    },
    {
      title: t("app.ipAddress"),
      dataIndex: "ip_address",
      key: "ip_address",
    },
    {
      title: t("app.pageRequestParameter"),
      dataIndex: "page_parameters",
      key: "page_parameters",
    },
    {
      title: "URL",
      dataIndex: "page_accessed",
      key: "page_accessed",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: t("app.createdAt"),
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  //setting default columns in table to be first 4 columns
  const initialSelectedColumns = columns.slice(1, 4).map((col) => col.key);

  const [selectedColumns, setSelectedColumns] = useState(
    initialSelectedColumns
  );
  const [spinning, setSpinning] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // Function to fetch the details of audit logs
  const fetchLogs = async (page, size) => {
    setSpinning(true);
    // Fetching data from the API service
    const response = await AuditLogServices.getAudits({ page, size });

    // If the response from the API is success formulating data for table
    if (response?.statusText === "OK") {
      let serialNumber = (page - 1) * size + 1; // Adjust serial number based on page

      // Looping over the log details to include serial number as an extra key
      const formattedData = response.data.logs.map((log) => ({
        sNo: serialNumber++,
        name: log.name,
        role_name: log.role_name,
        ip_address: log.ip_address,
        page_parameters: log.page_parameters,
        page_accessed: log.page_accessed,
        action: log.action,
        created_at: log.created_at,
      }));

      setData(formattedData);
      setTotal(response.data.total); // Assuming the API returns total number of logs
    }
    setSpinning(false);
  };

  const handleColumnChange = (value) => {
    if (value.length > 3) {
      value = value.slice(-3); // Keep the last 3 selected columns
    }
    setSelectedColumns(value);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    fetchLogs(pagination.current, pagination.pageSize);
  };

  const displayedColumns = [
    columns[0], // Ensure S.No. column is always first
    ...selectedColumns.map((key) => columns.find((col) => col.key === key)),
  ];

  useEffect(() => {
    fetchLogs(currentPage, pageSize);
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>{t("sidebar.auditLogs")}</h1>
        <div style={{ marginLeft: "auto" }}>
          <Space>
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminDashboard}>
              {PAGES?.dashboard}
            </Link>
            <span>/</span>
            <Link style={{ color: "black" }} to={APP_ROUTES?.auditLogs}>
              {PAGES?.auditLogs}
            </Link>
          </Space>
        </div>
      </div>
      <Content
        style={{
          margin: "0 16px",
          overflow: "initial",
        }}
      >
        <div
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>{t("sidebar.auditLogs")}</h4>
            <Space direction="horizontal" style={{ marginBottom: 10 }}>
              <Select
                mode="multiple"
                style={{ width: 400 }}
                placeholder="Select Columns"
                onChange={handleColumnChange}
                value={selectedColumns}
                options={columns
                  .slice(1)
                  .map((col) => ({ value: col.key, label: col.title }))}
              />
            </Space>
          </div>
          <Spin tip="Loading..." spinning={spinning}>
            <Table
              columns={displayedColumns}
              dataSource={data}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: total,
                showSizeChanger: true,
              }}
              onChange={handleTableChange}
            />
          </Spin>
        </div>
      </Content>
    </>
  );
};

export default AuditLogs;
