import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Flex, Table, Tag, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import { fetchCategories } from "../../../helper/Fetchdata";

// Defining the configuration for the columns of the category table.
const columns = [
  {
    title: "S.No.",
    dataIndex: "sNo",
    key: "sNo",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
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
        <h1>Categories</h1>
        <p style={{ marginLeft: "auto" }}>Home</p>
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
            <h4>Categories</h4>
            <Button type="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
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
