import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Flex, Table, Tag, Button, Spin, Space, Upload, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  APP_ROUTES,
} from "../../../config/AppConfig";
import { fetchCategories } from "../../../helper/Fetchdata";
import { useTranslation } from "react-i18next";
import { PAGES } from "../../../constants";
import { t } from "i18next";
import { UploadOutlined } from "@ant-design/icons";

const props = {
  name: "file",
  action: `${API_BASE_URL}/${API_ENDPOINTS?.uploadCategory}`,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  beforeUpload: (file) => {
    return new Promise((resolve, reject) => {
      if (
        !file.type.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        message.error("Invalid file type! Please upload an XLSX file.");
        reject("Invalid file type"); // Reject the upload if file type is not valid
      }
      resolve(true); // Allow upload if file type is valid
    });
  },
};

// Defining the configuration for the columns of the category table.
const columns = [
  {
    title: t("app.serialNumber"),
    dataIndex: "sNo",
    key: "sNo",
  },
  {
    title: t("Category"),
    dataIndex: "category",
    key: "category",
  },
  {
    title: t("app.status"),
    dataIndex: "status",
    key: "status",
    render: (text) =>
      text === "Active" ? (
        <Tag color="green">{text}</Tag>
      ) : (
        <Tag color="red">{text}</Tag>
      ),
  },
];

const AdminCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const data = [];
    // Storing data of categories from API fetch
    const fetchData = async () => {
      //setting spinning loader to show
      setSpinning(true);
      let categoriesData = await fetchCategories();
      // Obtaining the data of categories from the object into an array.
      categoriesData = Object.values(categoriesData);

      // Initialising the serialNumber that would be used in the records of table
      let serialNumber = 1;

      // Iterating over the categories recieved to formulate data for table rows.
      categoriesData.map((category) => {
        data.push({
          sNo: serialNumber,
          category: category?.name,
          status: category?.status,
        });
        serialNumber += 1;
      });
      setCategories(data);
      //setting spinning loader to hide
      setSpinning(false);
    };

    fetchData();
  }, []);

  const handleAddCategory = () => {
    navigate(APP_ROUTES?.addCategory);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>{t("sidebar.categories")}</h1>
        <div style={{ marginLeft: "auto" }}>
          <Flex gap="middle">
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminDashboard}>
              {PAGES?.dashboard}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminCategories}>
              {PAGES?.category}
            </Link>
          </Flex>
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
          <Flex
            style={{ margin: "10px" }}
            justify="space-between"
            align="center"
          >
            <h4>{t("sidebar.categories")}</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="primary" onClick={handleAddCategory}>
                {t("app.addCategory")}
              </Button>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </Flex>
          <Spin tip="Loading..." spinning={spinning}>
            <Table columns={columns} dataSource={categories} />
          </Spin>
        </div>
      </Content>
    </>
  );
};

export default AdminCategories;
