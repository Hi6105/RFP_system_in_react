import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Flex, message, Table, Tag, Button, Spin, Space } from "antd";
import { API_RESPONSE_TYPE, MESSAGE, PAGES } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../config/AppConfig";
import RfpServices from "../../../api/services/RfpServices";
import { error, success } from "../../../helper/ToastMessages";
import { useDispatch } from "react-redux";
import { setItemName, setRfpId } from "../../../redux/slices/rfpSlice";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

// Function to fetch all the RFPs
const fetchRfps = async () => {
  try {
    // Fetching all the RFPs
    const response = await RfpServices.getAllRfps();

    const data = [];

    // Returning data of rfps on success response
    if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
      // Obtaining the data of rfps from the object into an array.
      const rfps = response?.data?.rfps;

      // Iterating over the rfps received to formulate data for table rows.
      rfps.map((rfp) => {
        data.push({
          itemName: rfp?.item_name,
          id: rfp?.id,
          rfpId: rfp?.rfp_id,
          rfpNo: rfp?.rfp_no,
          lastDate: rfp?.last_date,
          minAmount: rfp?.minimum_price,
          maxAmount: rfp?.maximum_price,
          status: rfp?.status,
          action: rfp?.status === "open" ? "Close" : "",
        });
      });

      // Returning the formulated data
      return data;
    } else {
      // If response from the API was not successful returning an empty array.
      return [];
    }
  } catch (err) {
    console.error("Error fetching RFPs:", err);
    return [];
  }
};

const RfpList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [rfps, setRfps] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const { t } = useTranslation();

  // Defining the configuration for the columns of the rfp table.
  const columns = [
    {
      title: t("app.rfpNo"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("app.rfpTitle"),
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: t("app.rfpLastDate"),
      dataIndex: "lastDate",
      key: "lastDate",
    },
    {
      title: t("app.minimumPrice"),
      dataIndex: "minAmount",
      key: "minAmount",
    },
    {
      title: t("app.maximumPrice"),
      dataIndex: "maxAmount",
      key: "maxAmount",
    },
    {
      title: t("app.status"),
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
      title: t("app.action"),
      key: "action",
      dataIndex: "action",
      render: (text, record) =>
        text === "Close" ? (
          <Button type="link" onClick={() => handleCloseRfp(record)}>
            {text}
          </Button>
        ) : (
          ""
        ),
    },
    {
      title: t("app.quotes"),
      render: (record) => (
        <Button type="link" onClick={() => handleShowQuotesRfp(record)}>
          <ArrowRightOutlined />
        </Button>
      ),
    },
  ];

  useEffect(() => {
    // Storing data of rfps from API fetch
    const fetchData = async () => {
      setSpinning(true); // setting spinning loader to show
      try {
        const rfpData = await fetchRfps();
        setRfps(rfpData);
      } catch (err) {
        console.error("Error fetching RFP data:", err);
        error("Failed to fetch RFP data.", messageApi);
      } finally {
        setSpinning(false); // setting spinning loader to hide
      }
    };

    fetchData();
  }, [messageApi]);

  const handleAddRfp = () => {
    navigate(APP_ROUTES?.addRfp);
  };

  // Function to handle action on RFP (Closing a particular rfp)
  const handleCloseRfp = async (rfpDetails) => {
    const data = {
      rfpId: rfpDetails?.rfpId,
    };

    try {
      // Making a request to closeRfp API service
      const response = await RfpServices.closeRfp(data);

      // Based on response displaying the toast message
      if (response?.data?.response === API_RESPONSE_TYPE?.SUCCESS) {
        success(MESSAGE?.rfpClosed, messageApi);
        // Optionally refresh the list after closing an RFP
        const rfpData = await fetchRfps();
        setRfps(rfpData);
      } else {
        error(MESSAGE?.wentWrong, messageApi);
      }
    } catch (err) {
      console.error("Error closing RFP:", err);
      error("An unexpected error occurred while closing the RFP.", messageApi);
    }
  };

  // Function to handle redirection to quotes for a particular RFP
  const handleShowQuotesRfp = async (record) => {
    // Setting RFP Id and Item Name for the selected RFP inside redux store
    dispatch(setRfpId(record?.rfpId));
    dispatch(setItemName(record?.itemName));

    // Navigating to the RFP quotes page
    navigate(APP_ROUTES?.rfpQuotesList);
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <h1>{t("sidebar.rfpList")}</h1>
        <div style={{ marginLeft: "auto" }}>
          <Flex gap="middle">
            <Link style={{ color: "black" }} to={APP_ROUTES?.adminDashboard}>
              {PAGES?.dashboard}
            </Link>
            <Space>/</Space>
            <Link style={{ color: "black" }} to={APP_ROUTES?.rfpList}>
              {PAGES?.rfpList}
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
            <h4>RFP</h4>
            <Button type="primary" onClick={handleAddRfp}>
              {t("app.addRfp")}
            </Button>
          </Flex>
          <Spin tip="Loading..." spinning={spinning}>
            <Table columns={columns} dataSource={rfps} />
          </Spin>
        </div>
      </Content>
    </>
  );
};

export default RfpList;
