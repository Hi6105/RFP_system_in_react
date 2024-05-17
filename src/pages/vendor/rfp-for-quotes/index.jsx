import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Flex, message, Table, Tag, Button } from "antd";
import { API_RESPONSE_TYPE, MESSAGE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import RfpServices from "../../../api/services/RfpServices";
import { error, success } from "../../../helper/ToastMessages";
import { useDispatch } from "react-redux";
import { setItemName, setRfpId } from "../../../redux/slices/rfpSlice";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getRfpByUserId } from "../../../helper/Fetchdata";

const RfpForQuotes = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [rfps, setRfps] = useState([]);

  // Defining the configuration for the columns of the rfp table.
  const columns = [
    {
      title: "RFP No.",
      dataIndex: "rfp_id",
      key: "rfp_id",
    },
    {
      title: "RFP Title",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "RFP Last Date",
      dataIndex: "last_date",
      key: "last_date",
    },
    {
      title: "Min Amount",
      dataIndex: "minimum_price",
      key: "minimum_price",
    },
    {
      title: "Max Amount",
      dataIndex: "maximum_price",
      key: "maximum_price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) =>
        text === "closed" ? (
          <Tag color="red">{text}</Tag>
        ) : (
          <Tag color="green">{text}</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (text, record) =>
        record?.status === "open" ? (
          <Button type="link" onClick={() => handleApplyRfp(record)}>
            Apply
          </Button>
        ) : (
          ""
        ),
    },
  ];

  useEffect(() => {
    // Storing data of rfps from API fetch
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      const data = {
        userId: userId,
      };
      const rfpData = await getRfpByUserId(data);
      setRfps(rfpData);
    };

    fetchData();
  }, []);

  //Function to handle redirection to quotes for a particular RFP
  const handleApplyRfp = async (record) => {
    //Setting RFP Id for the selected RFP inside redux store
    dispatch(setRfpId(record?.rfp_id));

    //Navigating to the RFP quotes page.
    navigate(APP_ROUTES?.vendorApplyRfp);
  };

  return (
    <>
      {contextHolder}
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
          </Flex>
          <Table columns={columns} dataSource={rfps} />
        </div>
      </Content>
    </>
  );
};

export default RfpForQuotes;
