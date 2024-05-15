import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Flex, Table, Tag, Button } from "antd";
import { API_RESPONSE_TYPE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import VendorServices from "../../../api/services/VendorServices";

// Defining the configuration for the columns of the rfp table.
const columns = [
  {
    title: "S.No.",
    dataIndex: "sNo",
    key: "sNo",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Contact No",
    dataIndex: "phoneNo",
    key: "phoneNo",
  },
  {
    title: "Number of Employees",
    dataIndex: "numberOfEmployees",
    key: "numberOfEmployees",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) =>
      text === "Open" ? (
        <Tag color="green">{text}</Tag>
      ) : (
        <Tag color="red">{text}</Tag>
      ),
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    render: (text) =>
      text === "Approve" ? <Button type="link">{text}</Button> : "",
  },
];

const fetchVendors = async () => {
  // Fetching all the RFPs
  const response = await VendorServices.getAllVendors();
  console.log(response);

  const data = [];

  // Returning data of rfps on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    // Obtaining the data of rfps from the object into an array.
    const vendors = response?.data?.vendors;

    let serialNumber = 1;
    // Iterating over the rfps recieved to formulate data for table rows.
    vendors.map((vendor) => {
      data.push({
        sNo: serialNumber,
        email: vendor?.email,
        phoneNo: vendor?.mobile,
        numberOfEmployees: vendor?.no_of_employees,
        status: vendor?.status,
        action: vendor?.status != "Approved" ? "Approve" : "",
      });

      serialNumber += 1;
    });

    // Returning the formulated data
    return data;
  } else {
    // If response from the API was not successful returning an empty array.
    return [];
  }
};

const VendorList = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Storing data of rfps from API fetch
    const fetchData = async () => {
      const vendorData = await fetchVendors();
      setVendors(vendorData);
    };

    fetchData();
  }, []);

  const handleAddRfp = () => {
    navigate(APP_ROUTES?.addRfp);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>Vendors List</h1>
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
          <h4 style={{ margin: "10px" }}>Vendors</h4>
          <Table columns={columns} dataSource={vendors} />
        </div>
      </Content>
    </>
  );
};

export default VendorList;
