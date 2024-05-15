import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Flex, Table, Tag, Button } from "antd";
import { API_RESPONSE_TYPE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import RfpServices from "../../../api/services/RfpServices";

// Defining the configuration for the columns of the rfp table.
const columns = [
  {
    title: "RFP No.",
    dataIndex: "rfpNo",
    key: "rfpNo",
  },
  {
    title: "RFP Last Date",
    dataIndex: "lastDate",
    key: "lastDate",
  },
  {
    title: "Min Amount",
    dataIndex: "minAmount",
    key: "minAmount",
  },
  {
    title: "Max Amount",
    dataIndex: "maxAmount",
    key: "maxAmount",
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
  },
];

const fetchRfps = async () => {
  // Fetching all the RFPs
  const response = await RfpServices.getAllRfps();

  const data = [];

  // Returning data of rfps on success response
  if (response?.data?.response == API_RESPONSE_TYPE?.SUCCESS) {
    // Obtaining the data of rfps from the object into an array.
    const rfps = response?.data?.rfps;

    // Iterating over the rfps recieved to formulate data for table rows.
    rfps.map((rfp) => {
      data.push({
        rfpNo: rfp?.rfp_no,
        lastDate: rfp?.last_date,
        minAmount: rfp?.minimun_price,
        maxAmount: rfp?.maximum_price,
        status: rfp?.status,
        action: rfp?.status == "Open" ? "Close" : "",
      });
    });

    // Returning the formulated data
    return data;
  } else {
    // If response from the API was not successful returning an empty array.
    return [];
  }
};

const RfpList = () => {
  const navigate = useNavigate();
  const [rfps, setRfps] = useState([]);

  useEffect(() => {
    // Storing data of rfps from API fetch
    const fetchData = async () => {
      const rfpData = await fetchRfps();
      setRfps(rfpData);
    };

    fetchData();
  }, []);

  const handleAddRfp = () => {
    navigate(APP_ROUTES?.addRfp);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>RFP List</h1>
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
            <h4>RFP</h4>
            <Button type="primary" onClick={handleAddRfp}>
              + Add RFP
            </Button>
          </Flex>
          <Table columns={columns} dataSource={rfps} />
        </div>
      </Content>
    </>
  );
};

export default RfpList;