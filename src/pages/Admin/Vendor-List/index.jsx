import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { message, Table, Tag, Button, Spin } from "antd";
import { API_RESPONSE_TYPE, MESSAGE } from "../../../constants";
import VendorServices from "../../../api/services/VendorServices";
import { approveVendor } from "../../../helper/Fetchdata";
import { error, success } from "../../../helper/ToastMessages";
import { useNavigate } from "react-router-dom";

const fetchVendors = async () => {
  // Fetching all the RFPs
  const response = await VendorServices.getAllVendors();

  const data = [];

  // Returning data of rfps on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    // Obtaining the data of rfps from the object into an array.
    const vendors = response?.data?.vendors;

    let serialNumber = 1;
    // Iterating over the rfps recieved to formulate data for table rows.
    vendors.map((vendor) => {
      data.push({
        userId: vendor?.user_id,
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
  const [messageApi, contextHolder] = message.useMessage();
  const [spinning, setSpinning] = useState(false);
  const [vendors, setVendors] = useState([]);

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
        text === "Approved" ? (
          <Tag color="green">{text}</Tag>
        ) : (
          <Tag color="red">{text}</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (text, record) =>
        text === "Approve" ? (
          <Button type="link" onClick={() => handleApproveClick(record)}>
            {text}
          </Button>
        ) : (
          ""
        ),
    },
  ];

  useEffect(() => {
    // Storing data of rfps from API fetch
    const fetchData = async () => {
      //setting spinning loader to show
      setSpinning(true);
      const vendorData = await fetchVendors();
      setVendors(vendorData);
      //setting spinning loader to hide
      setSpinning(false);
    };

    fetchData();
  }, []);

  // Handler function for approving a vendor
  const handleApproveClick = async (record) => {
    setSpinning(true);
    // Making the API call
    const response = await approveVendor({
      user_id: record?.userId,
      status: "approved",
      _method: "put",
    });

    // Based on response displaying the toast message
    if (response === API_RESPONSE_TYPE.SUCCESS) {
      success(MESSAGE?.vendorApproved, messageApi);
    } else {
      error(MESSAGE?.wentWrong, messageApi);
    }
    setSpinning(false);
    window.location.reload();
  };

  return (
    <>
      {contextHolder}
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
          <Spin tip="Loading..." spinning={spinning}>
            <Table columns={columns} dataSource={vendors} />
          </Spin>
        </div>
      </Content>
    </>
  );
};

export default VendorList;
